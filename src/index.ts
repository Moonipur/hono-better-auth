import { Hono } from "hono";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import { todos } from "./routes/todos.routes";

const app = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .route("/api/todos", todos)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

export default app;
