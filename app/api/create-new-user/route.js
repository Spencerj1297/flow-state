import { dbConnect } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    const con = await dbConnect()

    if (con) {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        const client = await clientPromise;
        
        const db = client.db('flow_state'); // Use your database name
        const usersCollection = db.collection('users'); // Use your collection name

        const userData = req.body;
        console.log("body",req.body)
        
        await usersCollection.insertOne(userData);
        
        res.status(200).json({ message: 'User signed up successfully', userData });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Failed to sign up user' });
    }
};


