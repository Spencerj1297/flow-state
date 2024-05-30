import { MongoClient } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    const body = await req.json();
    console.log("body", body);
    await client.connect();
    const database = client.db("flow_state");
    const collection = database.collection("users");
    const query = { email: body.email, password: body.password };
    const user = await collection.findOne(query);
    console.log("USERS INFO", user);

    if (user) {
      return new Response(
        JSON.stringify({
          message: "Sign in successful",
          redirectUrl: "pages/user-dashboard",
          user: user
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "User not found", redirectUrl: "/sign-up" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
