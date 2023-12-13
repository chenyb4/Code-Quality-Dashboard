import sqlite3 from "sqlite3";
import {open, Database} from "sqlite";
import type {NextApiRequest, NextApiResponse} from "next";
import {sq} from "date-fns/locale";

let db = null;

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    const projectKey=req.nextUrl.searchParams.get(['projectKey']);
    const metricKey=req.nextUrl.searchParams.get(['metricKey']);


    let sql="SELECT * FROM history where ";
    sql+=" projectKey='"+projectKey+"' and";
    sql+=" metricKey='"+metricKey+"'";


    if (!db) {
        db = await open({
            filename: "./src/app/db/db.db",
            driver: sqlite3.Database,
        });
    }

    const items = await db.all(sql);

    return new Response(JSON.stringify(items), {
        headers: {"Content-Type": "application/json"},
        status: 200,
    });
}



export async function POST(req: NextApiRequest, res: NextApiResponse) {

    try {
        const body=await req.json();
        const {projectKey, metricKey, date, value} =body;

        if (!db) {
            db = await open({
                filename: "./src/app/db/db.db",
                driver: sqlite3.Database,
            });
        }

        const result = await db.run('INSERT INTO history(projectKey, metricKey, date, value) VALUES(?, ?,?,?)', [projectKey, metricKey, date, value], (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log('Row was added to the table: ${this.lastID}');
        })

        console.log(result);

        return new Response(
            JSON.stringify(
                {message: "success"},
                {
                    headers: {"content-type": "application/json"},
                    status: 200,
                }
            )
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal Server Error'});
    }
}