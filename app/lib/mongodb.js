import mongoose from "mongoose"

global.mongoose = {
  conn: null,
  promise: null,
}

export async function dbConnect() {
  if(global.mongoose && global.mongoose.conn){
    console.log('connected from previous')
    return global.mongoose.conn
  }else{
    const conString = process.env.MONGODB_URI

    const promise = mongoose.connect(conString, {
      autoIndex: true,
    })
    global.mongoose = {
      conn: await promise,
      promise,
    }
    console.log("Newly connected")
    return await promise
  }
}

// import { MongoClient, ServerApiVersion } from "mongodb";



// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;

// const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// };

// let client;

// let clientPromise: Promise<MongoClient>;

// client = new MongoClient(uri, options);

// clientPromise = client.connect();

// clientPromise.then(() => {
//     console.log("Connected to MongoDB ------------------------------------");
//   }).catch((error) => {
//     console.error("----------------Error connecting to MongoDB:----------", error);
//   });

// // if (process.env.NODE_ENV === "development") {
// //   // In development mode, use a global variable so that the value
// //   // is preserved across module reloads caused by HMR (Hot Module Replacement).
// //   let globalWithMongo = global as typeof globalThis & {
// //     _mongoClientPromise?: Promise<MongoClient>;
// //   };

// //   if (!globalWithMongo._mongoClientPromise) {
// //     client = new MongoClient(uri, options);
// //     globalWithMongo._mongoClientPromise = client.connect();
// //   }
// //   clientPromise = globalWithMongo._mongoClientPromise;
// // } else {
// //   // In production mode, it's best to not use a global variable.
// //   client = new MongoClient(uri, options);
// //   clientPromise = client.connect();
// // }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;
