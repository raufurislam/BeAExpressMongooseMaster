# **`Node.js Learning Guide`**

This guide serves as a reference for installing Node.js using `fnm` and understanding the core fundamentals of Node.js including module systems and architecture. This will help you relate your past learning and continue building advanced concepts in the future.

---

## ✅ Installation (Windows - using `fnm`)

### Install `fnm` via Winget

```bash
winget install Schniz.fnm
```

### Install Node.js version (e.g., v22)

```bash
fnm install 22
```

### Check available versions

```bash
fnm list
```

### If `fnm` is not recognized or doesn't initialize:

#### 1. Manually add `fnm` to environment variables:

- Go to:

```
C:\Users\Raufur\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe
```

- Copy this path.
- Go to **Environment Variables → Path → Edit → Add New → Paste → OK**

#### 2. Also add roaming path if node version throws error:

```
C:\Users\Raufur\AppData\Roaming\fnm\aliases\default
```

### 3. Check `fnm` version

```bash
fnm --version
```

### 4. Enable `fnm` for PowerShell

Run this command to set up fnm in PowerShell:

```bash
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

#### If PowerShell profile is missing:

```powershell
if (-not (Test-Path $profile)) { New-Item $profile -Force }
Invoke-Item $profile
```

Then paste this inside the opened notepad:

```powershell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

Save and close.

### 5. Fix PowerShell execution policy if scripts are blocked:

Run PowerShell as Administrator and:

```powershell
Get-ExecutionPolicy -List
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` when prompted.

### 6. Reload profile

```powershell
. $PROFILE
```

> ✅ You’re now ready to switch Node.js versions easily with `fnm` anytime.

> 📝 If using Bash/Zsh instead of PowerShell, follow documentation to create the appropriate profile.

📚 Follow official docs: [https://nodejs.org](https://nodejs.org) | [fnm GitHub](https://github.com/Schniz/fnm)

---

## 🚀 Core Node.js Fundamentals

### 🧠 How Node.js Works:

- **Single-threaded**: Uses a single thread for handling requests.
- **Event-driven**: Everything revolves around events and callbacks.
- **Non-blocking I/O**: Handles multiple operations asynchronously.
- **Event loop**: Core mechanism to manage execution of async code.

### 📦 Module Systems

#### 1. CommonJS (`require`, `module.exports`)

- Traditional Node.js module system.
- Synchronous.

```js
// file-2.js
const a = 10;
const add = (x, y) => x + y;
const b = 20;
module.exports = { a, add, b };

// file-1.js
const { a, add, b } = require("./file-2");
console.log(add(2, 3));
```

#### 2. ES Modules (ESM - `import`, `export`)

- Modern JavaScript module syntax.
- Async by default.
- Uses `.mjs` extension or `"type": "module"` in `package.json`

```js
// file-2.mjs
export const a = 10;
export const b = 20;
const add = (x, y) => x + y;
export default { add };

// file-1.mjs
import { a, b } from "./file-2.mjs";
import ADD from "./file-2.mjs";
console.log(ADD.add(2, 3));
```

### 🌀 IIFE (Immediately Invoked Function Expression)

Used to create scope and encapsulate logic:

```js
((require, module, __dirname, __filename) => {
  let a = 10;
  ((name) => console.log(`Learning ${name}`))("Node");
  console.log(a);
})(require, module, __dirname, __filename);
```

### 🌍 Global Variables in Node.js

- `__dirname`, `__filename`, `module`, `exports`, `require`, `global`

---

## ✅ Summary of Your Learning

- ✔ Installed `fnm` and set up Node.js versions
- ✔ Learned CommonJS and ES Modules
- ✔ Understood how the event loop and single-thread architecture work
- ✔ Explored how IIFE and global variables behave in Node.js

---

<br>
<br>

# `📘 Node.js Core Modules & Basic Todo App – Summary Notes`

> A concise reference for everything I’ve learned and practiced in Node.js so far.

---

## 🔹 1. Event Module

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

- `EventEmitter` = used to create custom events
- `.on("event", callback)` = listener
- `.emit("event")` = trigger

---

## 🔹 2. File System (`fs`) – Synchronous vs Asynchronous

### ✅ Synchronous Example

```js
const fs = require("fs");

fs.writeFileSync("./hello.txt", "Learning File System");
const data = fs.readFileSync("./hello.txt", "utf-8");
console.log(data);
```

- Blocks execution until done (one-by-one)
- Used for small tasks/testing

---

### ✅ Asynchronous Example

```js
fs.writeFile("./hello.txt", "node js", "utf-8", (err) => {
  if (!err) console.log("Written");
});

fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (!err) console.log(data);
});
```

- Doesn’t block the thread
- Callback executes when task completes

---

## 🔹 3. Streams & Buffer

Efficient for **large files**.

```js
const readStream = fs.createReadStream("./source.txt", "utf-8");
const writeStream = fs.createWriteStream("./dest.txt", "utf-8");

readStream.on("data", (chunk) => writeStream.write(chunk));
readStream.on("end", () => console.log("Read Complete"));
writeStream.on("finish", () => console.log("Write Complete"));
```

---

## 🔹 4. Path Module

```js
const path = require("path");
const filePath = path.join(__dirname, "log.txt");
```

- `__dirname` = current folder
- `path.join()` = avoids hardcoding OS paths

---

## 🔹 5. Logger CLI with `process.argv`

```js
const args = process.argv.slice(2).join(" ");
const message = `${args} - ${new Date().toISOString()}\n`;

fs.appendFile("log.txt", message, () => {
  console.log("✅ Log added");
});
```

- Run via terminal: `node index.js Hello world`
- Stores logs with timestamps

---

## 🔹 6. Basic HTTP Server (Core Module)

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // Handle routes
});

server.listen(5000, () => console.log("Server running"));
```

---

## 🔹 7. Routing + JSON Header

```js
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify({ message: "Hello" }));
```

---

## 🔹 8. Basic Todo App – Features

**✅ Endpoints:**

| Method | Path                           | Description              |
| ------ | ------------------------------ | ------------------------ |
| GET    | `/todos`                       | Get all todos            |
| GET    | `/todo?title=...`              | Get single todo by title |
| POST   | `/todos/create-todo`           | Create a new todo        |
| PATCH  | `/todos/update-todo?title=...` | Update a todo            |
| DELETE | `/todos/delete-todo?title=...` | Delete a todo            |

### 💾 Data stored in: `./db/todo.json`

---

## 🔹 9. Sample POST (Create Todo)

```js
req.on("data", (chunk) => {
  data += chunk;
});
req.on("end", () => {
  const { title, body } = JSON.parse(data);
  const allTodos = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  allTodos.push({ title, body, createdAt: new Date() });
  fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2));
});
```

- Collects body data in chunks
- Parses JSON and saves to file

---

## 🔹 10. Sample GET (Single Todo)

```js
const title = url.searchParams.get("title");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const todo = data.find((t) => t.title === title);
res.end(JSON.stringify(todo));
```

---

## 🔹 11. Sample PATCH (Update Todo)

```js
const title = url.searchParams.get("title");
req.on("end", () => {
  const { body } = JSON.parse(data);
  const todos = JSON.parse(fs.readFileSync(filePath));
  const index = todos.findIndex((t) => t.title === title);
  todos[index].body = body;
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
});
```

---

## 🔹 12. Sample DELETE (Todo) – \[Add Logic]

```js
// Same pattern: get title → filter out → save remaining
```

---

## ✅ Tips

- Use `fs.readFileSync()` for small reads, async version for large apps
- Always set `Content-Type` headers (`application/json`)
- Use `process.argv` for CLI input
- Wrap async code in `try-catch` when using Promises
- Avoid nested callbacks → consider using Promises in future

<br>
<br>
<br>

# **`📘 Node.js Core Modules & Basic Todo App – Summary Notes`**

## 🧩 ToDo API with Express, TypeScript & MongoDB

A minimal but structured ToDo REST API built using **Express.js**, **TypeScript**, and **MongoDB** without using Mongoose. This project is ideal for learning core concepts of API development, route handling, error management, and connecting to a NoSQL database natively.

---

## ✅ Project Setup

```bash
npm init -y
npm i express
npm i -D typescript @types/express nodemon
tsc --init
```

**Optional:**

```bash
npm install -g nodemon
```

### TypeScript Watch Mode

```bash
tsc -w
```

### package.json Script

```json
"scripts": {
  "dev": "nodemon ./dist/server.js"
}
```

Run the server:

```bash
npm run dev
```

---

## 📁 Folder Structure

```
module-3/
├── db/
│   └── todo.json              # Sample data (if needed)
├── dist/                      # Compiled JS output
│   ├── app/
│   ├── config/
│   ├── app.js
│   └── server.js
├── src/
│   ├── app/
│   │   └── todos/
│   │       └── todos.route.ts   # ToDo Routes
│   └── config/
│       └── mongodb.ts           # MongoDB client connection
├── app.ts                      # Express app & middleware
├── server.ts                   # Main entry: connects DB & starts server
├── tsconfig.json
```

---

## 🔥 Features Implemented

### 1. Express App & Middleware

- `express.json()` for parsing requests
- Custom middleware logs request data

```ts
app.use(express.json());

app.get("/", (req, res, next) => {
  console.log({ url: req.url, method: req.method, header: req.headers });
  next();
});
```

---

### 2. RESTful Routing

Modular routing via `todos.route.ts`:

```ts
app.use("/todos", todosRouter);
```

#### Route Endpoints

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| GET    | `/todos/`                | Get all todos     |
| POST   | `/todos/create-todo`     | Add a new todo    |
| GET    | `/todos/:id`             | Get a single todo |
| PUT    | `/todos/update-todo/:id` | Update a todo     |
| DELETE | `/todos/delete-todo/:id` | Delete a todo     |

---

### 3. MongoDB Native Client

- File: `mongodb.ts`

```ts
export const client = new MongoClient(uri);
```

Connected inside `server.ts`:

```ts
await client.connect();
```

---

### 4. Query & Params Support

Supports:

- Query: `/todos?title=task&body=learning`
- Param: `/todos/:id`

Handles `ObjectId` conversion as needed.

---

### 5. Error Handling

✅ 404 Handler:

```ts
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
```

✅ Global Error Handler:

```ts
app.use((error, req, res, next) => {
  res.status(400).json({
    message: "Something went wrong from global error handler",
    error,
  });
});
```

---

## 🧠 Key Concepts Practiced

| Topic                       | ✅ Status |
| --------------------------- | --------- |
| Express Server Setup        | ✅ Done   |
| Middleware Usage            | ✅ Done   |
| Route Params & Queries      | ✅ Done   |
| Modular Route Splitting     | ✅ Done   |
| MongoDB Native Integration  | ✅ Done   |
| RESTful CRUD Operations     | ✅ Done   |
| 404 & Global Error Handling | ✅ Done   |

---

## 📦 Tech Stack

| Tool       | Description               |
| ---------- | ------------------------- |
| Express.js | Web framework for Node.js |
| TypeScript | Type-safe JavaScript      |
| MongoDB    | NoSQL Database            |
| Nodemon    | Dev-time server reloader  |
| Postman    | API testing tool          |

---

## 📌 Final Notes

- This is a **foundation-level setup** to help you **master raw Express + TypeScript + MongoDB** integration.
- No use of Mongoose makes the DB logic more transparent and raw.
- Modular file structure is **scalable for future features**, like controllers, services, or middlewares.
- Future improvements can include:

  - `dotenv` for environment variables
  - CORS and cookie-parser for frontend integration
  - JWT Auth & Validation Middleware

---

<br>
<br>
<br>

# **`📘 In-Depth Exploration of MongoDB Queries`**

---

## 🧩 Setup

### 🔹 Download Tools

- [ ] **MongoDB Compass** (GUI Tool)
- [ ] **MongoDB Shell** (CLI Tool)

### 🔹 Set Mongo Shell Path

1. Copy this path: `C:\Program Files\MongoDB\Server\8.0\bin`
2. Set it in the **Environment Variable** → `Path`

> ✅ After this setup, you can use `mongod` and `mongosh` directly in your command prompt.

### 🔹 Check Version

```bash
mongod --version
mongosh
```

---

## 📂 Basic Database Commands

```js
show dbs
use practise
db.createCollection("test")
db.getCollection("test").insertOne({ name: "NLWD" })
db.getCollection("test").find()
```

> 🖥️ GUI Option: You can also use **Studio 3T** or **SQLBooster** as alternatives to Compass.

---

## 📥 Insert Documents

```js
db.test.insertOne({ name: "Something" });
db.test.insertMany([
  { name: "Complete web development" },
  { name: "Next level web development" },
]);
```

---

## 📤 Read (Find) Queries

```js
// Find by ID
db.test.findOne({ _id: ObjectId("6406ad63fc13ae5a40000066") });

// Field filtering
db.test.find({ gender: "Female" }, { gender: 1 });

// Projection
db.test.find({ gender: { $eq: "Female" } }).project({ gender: 1 });
db.test.find({ age: { $ne: 15 } }).project({ age: 1 });

// Comparisons
// $gt, $gte, $lt, $lte
db.test.find({ age: { $gt: 15 } }).sort({ age: 1 });
db.test.find({ age: { $lte: 18 } }).sort({ age: -1 });

// Combine conditions (Implicit AND)
db.test
  .find({ gender: "Female", age: { $gte: 18, $lte: 30 } })
  .sort({ age: -1 });

// $in, $nin
db.test.find({ age: { $in: [18, 20, 22] } });
db.test.find({ age: { $nin: [20, 22] } });
```

---

## ⚙️ Logical Operators

```js
// $and (explicit)
db.test
  .find({
    $and: [{ gender: "Female" }, { age: { $gt: 15 } }, { age: { $lt: 30 } }],
  })
  .project({ name: 1, age: 1 });

// $or
db.test
  .find({
    $or: [{ interests: "Travelling" }, { interests: "Cooking" }],
  })
  .project({ name: 1, interests: 1 });

// $not
// Only works inside operators

// $nor (negate multiple)
db.test.find({
  $nor: [{ gender: "Female" }, { age: { $lt: 18 } }],
});
```

---

## 🧬 Element Queries

```js
db.test.find({ phone: { $exists: true } });
db.test.find({ company: { $exists: false } });
db.test.find({ age: { $type: "string" } });
db.test.find({ "interests.2": "Cooking" });
```

---

## 🔁 Array Queries

```js
// $all
db.test.find({
  interests: { $all: ["Gardening", "Gaming", "Cooking"] },
});

// Nested array query
db.test
  .find({
    "skills.name": { $in: ["JAVASCRIPT", "PYTHON"] },
  })
  .project({ name: 1, "skills.name": 1 });
```

---

## 🔧 Update Queries

### 🧱 Field Updates

```js
db.test.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $set: { interests: "Gaming" } }
);
```

### 📚 Array Updates

```js
// Add single non-duplicate value
db.test.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $addToSet: { interests: "Gaming" } }
);

// Add multiple values
db.test.updateOne(
  { _id: ObjectId("6406ad63fc13ae5a40000065") },
  { $addToSet: { interests: { $each: ["Cooking", "Driving"] } } }
);

// Remove fields
$unset;
$pop;
$pull;
$pullAll;

// Update nested fields
db.test.updateOne(
  { _id: ObjectId("..."), "education.institute": "East West University" },
  { $set: { "education.$.institute": "Brac" } }
);

// Increment field
db.test.updateOne({ _id: ObjectId("...") }, { $inc: { age: 2 } });
```

---

## ❌ Delete and Drop

```js
db.test.deleteOne({ _id: ObjectId("...") });
db.createCollection("post");
db.post.insertOne({ name: "Prisma" });
db.posts.drop();
```

---

## 🔗 Always Follow the Docs

📚 [MongoDB Official Query Docs](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)

> ℹ️ Important: Always validate with the MongoDB shell version and field structure before applying updates.

<br>
<br>

## 🙋‍♂️ Author

**Raufur Islam Nayem**
Junior Full Stack Developer

📧 [raufurislam@gmail.com](mailto:raufurislam@gmail.com)
🌐 [Portfolio](https://raufurislam-portfolio.web.app)
🐱 [GitHub](https://github.com/raufurislam)
📱 +8801648068834
