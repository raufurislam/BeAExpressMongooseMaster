import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://mongodbS2:mongodbS2@cluster0.xi11k.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
