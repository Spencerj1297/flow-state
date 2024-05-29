import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db("user_data_db"); // Choose a name for your database
      const collection = database.collection("user_data_collection"); // Choose a name for your collection
      const allData = await collection.find({}).toArray();

      res.status(200).json(allData);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}

// import mongoose from "mongoose";

// const dbConnect = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return true;
//   }
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('*'.repeat(50));
//     console.log('Connected to database');
//     console.log('*'.repeat(50));
//     return true;
//   } catch (error) {
//     console.error("Database connection error:", error);
//     throw new Error("Database connection failed");
//   }
// };

// export default dbConnect;

// global.mongoose = {
//   conn: null,
//   promise: null,
// }

// export async function dbConnect() {
//   if(global.mongoose && global.mongoose.conn){
//     console.log('connected from previous')
//     return global.mongoose.conn
//   }else{
//     const conString = process.env.MONGODB_URI

//     const promise = mongoose.connect(conString, {
//       autoIndex: true,
//     })
//     global.mongoose = {
//       conn: await promise,
//       promise,
//     }
//     console.log("Newly connected")
//     return await promise
//   }
// }
