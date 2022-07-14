import { ModelMain } from "../explain/model_main.js";

const model: ModelMain = new ModelMain("normal_neonate", 3000);
// assign an event
model.messenger.on("model ready", (creds) => {
  console.log(
    `API: model is ready to for use on port: ${creds.port} with ID: ${creds.id}`
  );
});
