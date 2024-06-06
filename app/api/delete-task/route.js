import { MongoClient, ObjectId } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    console.log("bodyyyy", body);

    await client.connect();

    const database = client.db("flow_state");
    const collection = database.collection("tasks");

    let allDeleted = true

    for (let i = 0; i < body.length; i++) {
      const taskId = body[i]._id;
      const query = { _id: new ObjectId(taskId) };
      
      const result = await collection.deleteOne(query);
      if (result.deletedCount === 0) {
        allDeleted = false;
      }
    }

    if (allDeleted) {
      return new Response(JSON.stringify({message: "Task(s) Deleted"}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Task not deleted" }), {
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
