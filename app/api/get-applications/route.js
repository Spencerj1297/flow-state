import { MongoClient} from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    await client.connect();
    const database = client.db("flow_state");
    const collection = database.collection("applications");

    const query = { user_id: body.user_id };
    const tasksCursor = await collection.find(query);
    const applications = (await tasksCursor.toArray()).reverse();

    if (applications.length >= 0) {
      return new Response(JSON.stringify(applications), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "No Applications found" }), {
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
