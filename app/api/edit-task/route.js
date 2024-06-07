import { MongoClient, ObjectId } from "mongodb";

export async function PATCH(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    console.log("bodyyyy", body);

    await client.connect();

    const database = client.db("flow_state");
    const collection = database.collection("tasks");
    
    const filter = { _id: new ObjectId(body._id) };
    
    const updateDoc = {
      $set: {
        user_id: body.user_id,
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority
      }
    };

    const updateTask = await collection.updateOne(filter, updateDoc);

    if (updateTask.modifiedCount === 1) {
      return new Response(JSON.stringify(updateTask), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "No tasks found" }), {
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
