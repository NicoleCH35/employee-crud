import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/employees
// Get all employees
export const GET = async (req, res) => {
    console.log('GET /api/employees', 'Returns all employees');
    try{
        const db = await connectDB();
        return db.promise().query("SELECT e.*, a.street_number, a.street, a.city, a.country, a.zip_code FROM employee as e LEFT JOIN address as a ON e.address_id = a.id")
            .then(([rows]) => {
                return NextResponse.json({
                    message: 'Successfully fetched all employees.',
                    employees: rows
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

// POST /api/employees
// Create a new employee
export const POST = async (req, res) => {
    console.log("POST /api/employees", "Create new employee");
    try{
        const db = await connectDB();
        const { firstname, lastname, address, role, salary } = await req.json();
        const { street_number, street, city, country, zip_code } = address;

        // Insert Address
        return db.promise().execute("INSERT INTO address (street_number, street, city, country, zip_code) VALUES (?, ?, ?, ?, ?)", [
            street_number, street, city, country, zip_code
        ])
        .then(([result]) => {
            const address_id = result.insertId;

            // Insert Employee
            return db.promise().execute("INSERT INTO employee (firstname, lastname, address_id, role, salary) VALUES (?, ?, ?, ?, ?)", [
                firstname, lastname, address_id, role, salary
            ])
            .then(([result]) => {
                return NextResponse.json({
                    message: `Successfully created new employee #${result.insertId}.`,
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

// DELETE /api/employees
// Delete all employees
export const DELETE = async (req, res) => {
    console.log('DELETE /api/employees', 'Deletes all employees');
    try{
        const db = await connectDB();
        return db.promise().query("DELETE FROM employee")
            .then(([result]) => {
                return NextResponse.json({
                    message: `Successfully removed all ${result.affectedRows} employees.`, employees: rows
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