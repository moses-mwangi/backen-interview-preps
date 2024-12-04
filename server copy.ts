import app from "./app";
import os from "os";
import cluster from "cluster";

const cores = os.cpus().length;

if (cluster.isMaster) {
  console.log(`The worker ${process.pid} is runing`);

  for (let i = 0; i < cores; i++) {
    cluster.fork();
  }

  cluster.on("exit", (Worker, code, signal) => {
    console.log(`Woker ${Worker.process.pid} has died`);
  });
} else {
  const port: number = +process.env.PORT!;
  app.listen(port, "127.0.0.1", () => {
    console.log(`Listening to port ${port}`);
  });
}
