import { Worker } from "worker_threads";
export class Model {
    constructor() {
        const worker = new Worker("./dist/explain/modelEngine.js");
    }
}
