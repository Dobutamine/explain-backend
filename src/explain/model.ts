import { Worker } from "worker_threads";

export class Model {
  constructor() {
    const worker: Worker = new Worker("./dist/explain/modelEngine.js");
  }
}
