import express from "express";
import {errorHandler} from "./middleware/errorMiddleware.js"
import {runMongo} from "./db/mondoClient.js"
import { runPostgres } from "./db/postgresClient.js";
import authRoutes from "./route/auth.routes.js"
import cors from "cors"
import testRouter from "./route/test.routes.js"
import weatherRoutes from "./route/weather.routes.js"

runMongo();
runPostgres();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", testRouter);

app.use("/auth", authRoutes);

app.use("/weather", weatherRoutes);

app.use(errorHandler);

export default app;