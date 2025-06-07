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

## 🔮 What’s Next?

> Keep this section short until future additions are made.

- Working with the file system (`fs` module)
- Creating HTTP servers
- Learning Express.js framework
- Debugging and error handling
- Working with async/await and Promises

---

Got it! You want the README to be **cleaner, more practical, and easier to come back to when needed** — like a **personal note with headings**, short code references, and comments on _where and why_ something is used.

Here’s a more **summarized, structured, and recall-friendly** version of your README with corrected notes:

---

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

---
