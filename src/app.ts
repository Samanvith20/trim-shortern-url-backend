import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import urlRoutes from "./routes/url.routes.js";
import { redirectToUrl } from "./controllers/url.controller.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Import routes
app.use("/api/urls",urlRoutes)
app.get("/:code", redirectToUrl);


export default app;