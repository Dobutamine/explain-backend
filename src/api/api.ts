import { ModelMain } from "../explain/model_main.js";

const model: ModelMain = new ModelMain("normal_neonate", 3000);
// assign eventlisteners
model.messenger.on("ready", (creds) => {
  console.log(
    `MODEL: ready for use on port: ${creds.port} with ID: ${creds.id}`
  );
});
model.messenger.on("error", (err) => {
  console.log(err);
});
