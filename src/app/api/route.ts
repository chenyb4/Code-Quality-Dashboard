import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import type { NextApiRequest, NextApiResponse } from 'next';

let db : Database | null = null;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.json();
    const {
      projectKey, metricKey, date, value,
    } = body;

    if (!db) {
      db = await open({
        filename: './src/app/db/db.db',
        driver: sqlite3.Database,
      });
    }

    db.run('INSERT INTO history(projectKey, metricKey, date, value) VALUES(?, ?,?,?)', [projectKey, metricKey, date, value], (err:Error | null) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('Row was added to the table: ${this.lastID}');
    });

    return new Response(
      JSON.stringify(
        { message: 'success' },
        {
          headers: { 'content-type': 'application/json' },
          status: 200,
        },
      ),
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
