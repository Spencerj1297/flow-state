import { MongoClient, ObjectId } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    console.log("body", body);

    await client.connect();

    const database = client.db("flow_state");
    const collection = database.collection("tasks");

    const query = { user_id: body.user_id };
    console.log("queryy", query);
    const tasksCursor = await collection.find(query);

    const tasks = await tasksCursor.toArray();

    console.log("USERS TASKS", tasks);

    if (tasks.length > 0) {
      return new Response(JSON.stringify(tasks), {
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
