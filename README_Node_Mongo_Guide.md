# Node.js & MongoDB Learning Guide

This is a curated reference and summary of my hands-on learning experience with Node.js, Express, TypeScript, MongoDB, and Mongoose. Each section includes practical examples and modular project setups to help revisit concepts easily.

---

## Table of Contents

- [Node.js Learning Guide](#nodejs-learning-guide)
- [Node.js Core Modules and Basic Todo App](#nodejs-core-modules-and-basic-todo-app)
- [Core Node.js Fundamentals](#core-nodejs-fundamentals)
- [ToDo API with Express, TypeScript and MongoDB](#todo-api-with-express-typescript-and-mongodb)
- [In-Depth Exploration of MongoDB Queries](#in-depth-exploration-of-mongodb-queries)
- [Mastering MongoDB Aggregation and Indexing](#mastering-mongodb-aggregation-and-indexing)
- [Mastering Core Concepts of Mongoose with TypeScript and Express](#mastering-core-concepts-of-mongoose-with-typescript-and-express)
- [Author Info](#author-info)

---

## Node.js Learning Guide

A guide for installing Node.js using `fnm` and understanding core Node.js concepts.

### Installation (Windows - Using `fnm`)

```bash
winget install Schniz.fnm
fnm install 22
fnm list
```

Docs:

- https://nodejs.org
- https://github.com/Schniz/fnm

---

## Node.js Core Modules and Basic Todo App

### 1. Event Module

```js
const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on("ring", () => console.log("Class sesh!😊"));
schoolBell.on("ring", () => console.log("One more class!?😒"));
schoolBell.on("broken", () => console.log("Class will continue forever.😁"));

schoolBell.emit("ring");
schoolBell.emit("broken");
```

### 2. File System (`fs`) – Synchronous

```js
const fs = require("fs");

fs.writeFileSync("./hello.txt", "Learning File System");
const data = fs.readFileSync("./hello.txt", "utf-8");
console.log(data);
```

---

## ToDo API with Express, TypeScript and MongoDB

A minimal REST API with Express, TypeScript, and MongoDB (no Mongoose).

### Setup

```bash
npm init -y
npm i express
npm i -D typescript @types/express nodemon
tsc --init
```

### Watch Mode & Scripts

```bash
tsc -w
```

```json
"scripts": {
  "dev": "nodemon ./dist/server.js"
}
```

Run:

```bash
npm run dev
```

---

## In-Depth Exploration of MongoDB Queries

Use MongoDB CLI tools, Compass, and NoSQL Booster for raw query practice.

### Installation

- MongoDB Compass
- MongoDB Shell (`mongosh`)

```bash
mongod --version
mongosh
```

Add to PATH:

```
C:\Program Files\MongoDB\Server\8.0\bin
```

---

# `Mastering MongoDB Aggregation and Indexing`

Quick-reference note format on aggregation pipeline & indexing.

### Aggregation Pipeline Stages

- `$match`, `$project`, `$group`, `$addFields`, `$lookup`, `$facet`, `$unwind`, `$bucket`, `$sort`, `$limit`, `$out`, `$merge`

### Example

```js
db.test.aggregate([
  { $match: { gender: "Male", age: { $lt: 30 } } },
  { $project: { name: 1, gender: 1, age: 1 } },
]);
```

```js
db.test.aggregate([{ $group: { _id: "$gender", count: { $sum: 1 } } }]);
```

### Indexing

```js
db.test.find({ _id: ObjectId("...") }).explain("executionStats");
db.getCollection("massive-data").createIndex({ email: 1 });
db.getCollection("massive-data").createIndex({ about: "text" });
```

#### Text Search

```js
db.getCollection("massive-data")
  .find({ $text: { $search: "dolor" } })
  .project({ about: 1 });
```

References:

- https://www.mongodb.com/docs/manual/reference/operator/aggregation/
- https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/

---

## Mastering Core Concepts of Mongoose with TypeScript and Express

Learned how to integrate Mongoose in a TypeScript + Express project using MVC pattern.

### Tech Stack

- Express.js
- MongoDB
- Mongoose
- TypeScript
- ts-node-dev

### What is Mongoose?

- ODM library for MongoDB
- Enables schema-based validation
- Makes queries & updates more structured

### Project Setup

```bash
npm i express mongoose
npm i -D typescript @types/express nodemon
npm i ts-node-dev
```

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}
```

---

## Author Info

**Raufur Islam Nayem**  
Junior Full Stack Developer

- Email: [raufurislam@gmail.com](mailto:raufurislam@gmail.com)
- Portfolio: [https://raufurislam-portfolio.web.app](https://raufurislam-portfolio.web.app)
- GitHub: [https://github.com/raufurislam](https://github.com/raufurislam)
- Phone: +8801648068834

---

_Keep learning. Keep building._  
_Your future is created by what you do today, not tomorrow!_
