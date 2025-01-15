import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import sequelize from "./config/Pg_Database";
import cluster from "cluster";
import os from "os";

dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.error("Handling Exceptional Error. Shutting down...💥💥💥💥");
  console.error(err.name, err.message);
  process.exit(1);
});

const db = String(process.env.MG_DATABASE_URL);

const connect_Pg = async () => {
  try {
    sequelize.authenticate();
    console.log("The PostgreSQL database has successfully connected");
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
};
connect_Pg();

const numCpu = os.cpus().length + 6;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exit with code ${code}, signal ${signal}`
    );
    cluster.fork();
  });
} else {
  const workerIndex = cluster.worker?.id;
  const port = Number(process.env.PORT) + Number(workerIndex);

  const server = app.listen(port, "127.0.0.1", () => {
    console.log(`Worker process ${process.pid} listening on port ${port}`);
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection. Shutting down...💥💥💥💥");
    console.error(err);
    server.close(() => {
      process.exit(1);
    });
  });
}
