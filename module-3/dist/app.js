"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const todos_route_1 = require("./app/todos/todos.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
app.use("/todos", todos_route_1.todosRouter); // organize code and splitting the route (todos.route.ts)
app.use("/users", userRouter);
app.get("/", (req, res, next) => {
    console.log({ url: req.url, method: req.method, header: req.header });
    // res.send("Inside middleware");
    next();
}, (req, res) => {
    res.send("Welcome to Todos App");
});
exports.default = app;
// [app]-[express.json()]-[todosRouter]-[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
//[todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
/**
 * Basic file structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like CRUD and database related work
 */
