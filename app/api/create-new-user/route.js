import { MongoClient } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json()
    console.log("_______________________________________________")
    console.log("The body", body)
    console.log("_______________________________________________")
    await client.connect();
    const database = client.db("flow_state");
    const collection = database.collection("users");

    const doc = {
      email: body.email,
      password: body.password,
      first_name: "",
      last_name: "",
      phone: "",
      username: body.username,
    };

    const result = await collection.insertOne(doc);
    console.log("A document was inserted into the users collection", result);

    return new Response(JSON.stringify({ message: "Document inserted", result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

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
