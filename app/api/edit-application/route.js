import { MongoClient, ObjectId } from "mongodb";

export async function PATCH(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();
    await client.connect();

    const database = client.db("flow_state");
    const collection = database.collection("applications");

    const filter = { _id: new ObjectId(body._id) };

    const updateDoc = {
      $set: {
        company: body.company,
        response: body.response,
        applied_via: body.applied_via,
        email: body.email,
        connection: body.connection,
        notes: body.notes,
      },
    };

    const updatedApp = await collection.updateOne(filter, updateDoc);

    if (updatedApp.modifiedCount === 1) {
      return new Response(JSON.stringify(updatedApp), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "No Application found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
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
