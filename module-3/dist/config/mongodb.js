"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// mongodb.ts
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://mongodbS2:mongodbS2@cluster0.xi11k.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
