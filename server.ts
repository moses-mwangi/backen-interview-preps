import app from "./app";
import dotenv from "dotenv";
import os from "os";
import cluster from "cluster";
import { error } from "console";

dotenv.config({ path: ".env" });

process.on("uncaughtException", (err) => {
  console.error("Handling Exceptional Error. Shutting down...💥💥💥💥");
  console.error(err.name, err.message);
  process.exit(1);
});
// console.log(gg);
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exited with code ${code}, signal ${signal}.`
    );
    console.log("Starting a new worker...");
    cluster.fork();
  });
} else {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  const server = app.listen(port, "127.0.0.1", () => {
    console.log(`Worker ${process.pid} is listening on port ${port}`);
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection.Shutting down...💥💥💥💥");
    console.error(err);

    server.close(() => {
      process.exit(1);
    });
  });
}
