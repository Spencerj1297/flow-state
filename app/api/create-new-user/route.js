import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();
    console.log("_______________________________________________");
    console.log("The body", body);
    console.log("_______________________________________________");

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await client.connect();
    const database = client.db("flow_state");
    const collection = database.collection("users");

    const doc = {
      email: body.email,
      hash: hashedPassword,
      first_name: "",
      last_name: "",
      phone: "",
      username: body.username,
    };

    const result = await collection.insertOne(doc);

    return new Response(
      JSON.stringify({ message: "Document inserted", result }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error inserting document:", error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client.close();
  }
}
