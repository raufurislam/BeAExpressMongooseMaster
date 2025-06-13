// server.ts
import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import { client } from "./config/mongodb";

const port = 5000;
let server;

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
