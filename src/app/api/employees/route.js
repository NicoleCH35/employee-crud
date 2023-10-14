// const db = require("../../../lib/db");
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/employees
export const GET = async (req, res) => {
    console.log('GET /api/employees', 'Returns all employees');
    try{
        const db = await connectDB();
        return db.promise().query("SELECT * FROM employee")
            .then(([rows, fields]) => {
                return NextResponse.json({
                    message: 'OK', employees: rows
                }, {
                    status: 200,
                });
            })
            .catch(() => {
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
export const POST = async (req, res) => {
    console.log("POST /api/employees", "Create new employee");
    try{
        const db = await connectDB();
        const { firstname, lastname, address, role, salary } = await req.json();
        const { street_number, street, city, country, zip_code } = address;

        // Insert Address
        db.promise().execute("INSERT INTO address (street_number, street, city, country, zip_code) VALUES (?, ?, ?, ?, ?)", [
            street_number, street, city, country, zip_code
        ])
        .then(([result]) => {
            console.log('rows 1', result.insertId);
            const address_id = result.insertId;

            // Insert Employee
            db.promise().execute("INSERT INTO employee (firstname, lastname, address_id, role, salary) VALUES (?, ?, ?, ?, ?)", [
                firstname, lastname, address_id, role, salary
            ])
            .then(([rows, fields]) => {
                console.log('rows 2', rows);
                return NextResponse.json({
                    message: 'OK',
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

export const DELETE = async (req, res) => {
    console.log("DELETE");
};