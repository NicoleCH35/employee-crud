import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/employees/id
// Get employee by ID
export const GET = async (_req, { params }) => {
    const { id } = params;
    console.log('GET /api/employees/id', `Return employee #${id}`);
    try{
        const db = await connectDB();
        return db.promise().execute("SELECT e.*, a.street_number, a.street, a.city, a.country, a.zip_code FROM employee as e LEFT JOIN address as a ON e.address_id = a.id WHERE e.id = ?", [
            id
        ])
            .then(([result]) => {
                return NextResponse.json({
                    message: `Successfully fetched employee #${id}`,
                    employee: result[0]
                }, {
                    status: 200,
                });
            })
            .catch((err) => {
                return NextResponse.json({
                    message: 'Query Error', err
                }, {
                    status: 500,
                });
            });
    } catch(err) {
        return NextResponse.json({
            message: 'Server Error', err
        }, {
            status: 500,
        });
    }
};

// PUT /api/employees/id
// Update an existing employee by ID
export const PUT = async (req, { params }) => {
    const { id } = params;
    console.log("PUT /api/employees/id", "Update an existing employee");
    try{
        const db = await connectDB();
        const { firstname, lastname, address, role, salary } = await req.json();
        const { street_number, street, city, country, zip_code } = address;

        // Update Employee
        return db.promise().execute("UPDATE employee SET firstname = ?, lastname = ?, role = ?, salary = ? WHERE id = ?", [
            firstname, lastname, role, salary, id
        ])
        .then(() => {
            // Insert Employee
            return db.promise().execute("UPDATE address SET street_number = ?, street = ?, city = ?, country = ?, zip_code = ? WHERE id = (SELECT address_id FROM employee WHERE id = ?)", [
                street_number, street, city, country, zip_code, id
            ])
            .then(() => {
                return NextResponse.json({
                    message: `Successfully updated employee #${id}.`,
                }, {
                    status: 200,
                });
            })
            .catch((err) => {
                return NextResponse.json({
                    message: 'Query Error', err
                }, {
                    status: 500,
                });
            });
        })
        .catch((err) => {
            return NextResponse.json({
                message: 'Query Error', err
            }, {
                status: 500,
            });
        });
    } catch(err) {
        return NextResponse.json({
            message: 'Server Error', err
        }, {
            status: 500,
        });
    }
};

// DELETE /api/employees/id
// Delete employee by ID
export const DELETE = async (_req, { params }) => {
    const { id } = params;
    console.log('DELETE /api/employees/id', `Delete employee #${id}`);
    try{
        const db = await connectDB();
        return db.promise().query("DELETE FROM employee WHERE id = ?", [
            id
        ])
            .then(() => {
                return NextResponse.json({
                    message: `Successfully removed employee #${id}.`
                }, {
                    status: 200,
                });
            })
            .catch((err) => {
                return NextResponse.json({
                    message: 'Query Error', err
                }, {
                    status: 500,
                });
            });
    } catch(err) {
        return NextResponse.json({
            message: 'Server Error', err
        }, {
            status: 500,
        });
    }
};