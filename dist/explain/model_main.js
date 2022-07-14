import { readFile } from "fs";
import path from "path";
import { Worker } from "worker_threads";
export class ModelMain {
    constructor(modelName = "normal_neonate") {
        this.modelName = modelName;
        // instantiate a worker thread for the model engine
        const worker = new Worker("./dist/explain/model_engine.js");
        // load the JSON model definition file and inject it into the worker thread running the model engine
        this.loadModelDefinition(this.modelName, worker);
        // setup communication channel with thread
        worker.on("message", (mes) => {
            console.log(mes);
        });
        worker.on("error", (error) => {
            console.log(error);
        });
        worker.on("exit", (mes) => {
            console.log(mes);
        });
    }
    loadModelDefinition(filename, worker) {
        // construct the correct filename by adding to extension and path
        const abs_path = path.resolve("./" + filename + ".json");
        readFile(abs_path, "utf-8", (err, data) => {
            if (err) {
                console.log("MODEL-MAIN: Error loading the JSON model definition file!");
                return undefined;
            }
            console.log("MODEL-MAIN: Model definition file succesfully loaded.");
            let mes = {
                type: "init_engine",
                message: "",
                payload: JSON.parse(data),
            };
            worker.postMessage(mes);
            let mes2 = {
                type: "calculate",
                message: "",
                payload: 10.0,
            };
            worker.postMessage(mes2);
        });
    }
}
