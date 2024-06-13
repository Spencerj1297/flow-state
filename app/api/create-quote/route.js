import { MongoClient, ObjectId } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();

    await client.connect();
    const database = client.db("flow_state");
    const collection = database.collection("quotes");

    const filter = { _id: new ObjectId("6661f1ecf9c7f275d43b82ca") };

    const newQuote = body;

    const updateDoc = {
      $push: {
        quotes: newQuote,
      },
    };

    const result = await collection.updateOne(filter, updateDoc);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
