import { WorkerMessage } from "./types/explain_types.js";
import { fstat, readFile } from "fs";
import path from "path";

import { Worker } from "worker_threads";

export class Model {
  constructor() {
    const worker: Worker = new Worker("./dist/explain/model_engine.js");

    this.loadModelDefinition("normal_neonate", worker);
  }

  loadModelDefinition(filename: string, worker: Worker) {
    // construct the correct filename by adding to extension and path
    const abs_path = path.resolve("./" + filename + ".json");
    readFile(abs_path, "utf-8", (err, data) => {
      if (err) {
        console.log("Error loading model definition file!");
        return undefined;
      }
      worker.postMessage({
        command: "init_engine",
        target: "",
        params: JSON.parse(data),
      });
    });
  }
}
