import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";

const port = 5000;
let server;

const uri =
  "mongodb+srv://mongodbS2:mongodbS2@cluster0.xi11k.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const bootstrap = async () => {
  await client.connect();
  console.log("Connected to mongoDb");

  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();

// const db = await client.db("todosDB");
//   const collection = await db.collection("todos").insertOne({
//     title: "MongoDB",
//     body: "MongoDB Body",
//   });
//   console.log(collection, "collection"); to check
