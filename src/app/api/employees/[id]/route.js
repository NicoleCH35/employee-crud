const db = require("../../../../lib/db");
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, res) => {
    try{
        const employeeID = req.url.split('employees/')[1];
        return db.promise()
            .execute("SELECT * FROM employee WHERE id = ?", [
                employeeID
            ])
            .then(([rows, fields]) => {
                return NextResponse.json({
                    message: 'OK', employee: rows[0]
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

export const PUT = async (req, res) => {
    console.log("PUT [id]");
};

export const DELETE = async (req, res) => {
    console.log("DELETE [id]");
};