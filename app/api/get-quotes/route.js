import { MongoClient, ObjectId } from "mongodb";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("flow_state");
    const collection = database.collection("quotes");

    const query = { _id: new ObjectId('6661f1ecf9c7f275d43b82ca') };
    const allData = await collection.findOne(query);
    console.log("QUOTESSSSSSS", allData)

    return new Response(JSON.stringify(allData), {
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
