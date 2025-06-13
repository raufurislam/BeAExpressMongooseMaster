"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Welcome to Todos App");
    }
    catch (error) {
        next(error);
    }
}));
app.get("/error", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("welcome to error world");
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({
            message: "Something went wrong from global error handler",
            error,
        });
    }
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
