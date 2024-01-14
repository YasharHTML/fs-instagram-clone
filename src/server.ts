import { config } from "dotenv";
config();

import cluster from "node:cluster";
import { availableParallelism } from "node:os";

import { app } from "./app";

if (cluster.isPrimary) {
    for (let i = 0; i < availableParallelism(); i++) {
        cluster.fork();
    }
} else {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}, PID: ${process.pid}`);
    });
}
