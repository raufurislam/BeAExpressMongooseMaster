# Node.js Learning Guide

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

✅ This is your clean starting point for learning Node.js.
