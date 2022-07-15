import { ThreadMessage } from "./types/explain_types.js";
import { readFile, readFileSync } from "fs";
import path from "path";

import { Worker, workerData } from "worker_threads";
import { EventEmitter } from "events";

import { createServer } from "https";
import { WebSocketServer } from "ws";

export class ModelMain {
  public modelId = 1000;
  public engineInitialized = false;
  public messenger = new EventEmitter();

  constructor(
    public modelName: string = "normal_neonate",
    public modelPort: number = 3000
  ) {
    // generate a random model id
    this.modelId = Math.floor(Math.random() * 1000000);

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
            //let the api know there's a model ready for use
            this.messenger.emit("ready", {
              id: this.modelId,
              port: this.modelPort,
            });
            // launch a websocket server
            this.launchWebsocketServer(this.modelId, this.modelPort, worker);
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

  launchWebsocketServer(id: number, port: number, worker: Worker) {
    // create a server
    const httpsServer = createServer({
      cert: readFileSync("./src/api/cert.pem"),
      key: readFileSync("./src/api/key.pem"),
    });

    httpsServer.on("request", (req, res) => {
      res.writeHead(200);
      res.end("Hellow HTTPS world\n");
    });

    // Set up a websocket server
    const wss = new WebSocketServer({ server: httpsServer });
    wss.on("connection", (ws) => {
      // handle an incoming message
      ws.on("message", (data: string) => {
        const mes = JSON.parse(data);
      });
      ws.on("close", () => {
        console.log("websocket connection closed");
      });
    });

    httpsServer.listen(port);
  }

  loadModelDefinition(filename: string, worker: Worker) {
    // construct the correct filename by adding to extension and path
    const abs_path = path.resolve("./" + filename + ".json");
    readFile(abs_path, "utf-8", (err, data) => {
      if (err) {
        this.engineInitialized = false;
        this.messenger.emit(
          "error",
          "MODEL: Error loading the JSON model definition file!"
        );
        return undefined;
      }
      let mes: ThreadMessage = {
        type: "init_engine",
        message: "",
        payload: JSON.parse(data),
      };
      worker.postMessage(mes);
    });
  }
}
