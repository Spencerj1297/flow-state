import { MongoClient, ObjectId } from "mongodb";
import { parse } from 'cookie'

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    console.log("body", body);

    await client.connect();

    const cookies = parse(req.headers.get('cookie') || '')
    const userCookie = cookies.user
    console.log("cookie", userCookie);

    const database = client.db("flow_state");
    const collection = database.collection("tasks");

    const query = {
      user_id: userCookie,
      title: body.title,
      description: body.description,
      status: body.status,
    };

    const tasksCursor = await collection.insertOne(query);


    return new Response(JSON.stringify({ message: "Task created", tasksCursor }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating document:", error);
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
