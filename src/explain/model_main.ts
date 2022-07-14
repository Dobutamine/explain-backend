import { ThreadMessage } from "./types/explain_types.js";
import { readFile } from "fs";
import path from "path";

import { Worker } from "worker_threads";
import { EventEmitter } from "events";

export class ModelMain {
  public modelId = 1000;
  public engineInitialized = false;
  public messenger = new EventEmitter();

  constructor(
    public modelName: string = "normal_neonate",
    public modelPort: number = 3000
  ) {
    // generate a random model id
    this.modelId = Math.floor(Math.random() * 100000);

    // instantiate a worker thread for the model engine
    const worker: Worker = new Worker("./dist/explain/model_engine.js");

    // load the JSON model definition file and inject it into the worker thread running the model engine
    this.loadModelDefinition(this.modelName, worker);

    // setup communication channel with thread
    worker.on("message", (mes: ThreadMessage) => {
      switch (mes.type) {
        case "status":
          if (mes.message === "model initialized") {
            this.engineInitialized = true;
            console.log("MODEL: Model engine initialized.");
            //Fire the 'scream' event:
            this.messenger.emit("model ready", {
              id: this.modelId,
              port: this.modelPort,
            });
          }
          break;
        case "error":
          this.engineInitialized = false;
          break;
      }
    });

    worker.on("error", (error) => {
      console.log(error);
    });

    worker.on("exit", (mes) => {
      console.log(mes);
    });
  }

  loadModelDefinition(filename: string, worker: Worker) {
    // construct the correct filename by adding to extension and path
    const abs_path = path.resolve("./" + filename + ".json");
    readFile(abs_path, "utf-8", (err, data) => {
      if (err) {
        this.engineInitialized = false;
        console.log("MODEL: Error loading the JSON model definition file!");
        return undefined;
      }
      console.log("MODEL: Model definition file loaded.");
      let mes: ThreadMessage = {
        type: "init_engine",
        message: "",
        payload: JSON.parse(data),
      };
      worker.postMessage(mes);
    });
  }
}
