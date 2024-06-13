import { MongoClient, ObjectId } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();
    await client.connect();
    
    const database = client.db("flow_state");
    const collection = database.collection("applications");
    const filter = { _id: new ObjectId(body._id) };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount > 0) {
      return new Response(JSON.stringify({ message: "Application Deleted" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Application not deleted" }), {
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
