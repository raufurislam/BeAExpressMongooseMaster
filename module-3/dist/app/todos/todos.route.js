"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
// todosRouter.route.ts
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log("From todos router");
    res.json({
        message: "From todos router",
        data,
    });
});
exports.todosRouter.post("/create-todo", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("Creating todo");
});
exports.todosRouter.get("title", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("Creating todo");
});
exports.todosRouter.put("/update-todo/:title", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("Creating todo");
});
exports.todosRouter.delete("/delete-todo/:title", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("Creating todo");
});
