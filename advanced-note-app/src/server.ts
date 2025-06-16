import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
let server: Server;
const port = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://todoapp:todoapp@cluster0.xi11k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to mongodb using mongoose");
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
