import { parentPort } from "worker_threads";

import { WorkerMessage, Component } from "./types/explain_types.js";
import { Datacollector } from "./helpers/datacollector.js";

// import all models from core-models folder
import * as models from "./core-models/index.js";

// generate a model dictionary from imported models
let modelList: any = {};
for (const [key, value] of Object.entries(models)) {
  modelList[key] = value;
}

// define a model definition datastructure, the form is depending on the JSON file so no typechecking possible before loading the JSON
let currentModel: any = {};

parentPort?.on("message", (mes) => {
  switch (mes.command) {
    case "init_engine":
      init(mes.params);
      break;
  }
});

function init(definition: any): void {
  // parse the definition object and build the current model structure from it.
  currentModel["name"] = definition.name;
  currentModel["description"] = definition.description;
  currentModel["weight"] = definition.weight;
  currentModel["model_time_total"] = definition.model_time_total;
  currentModel["modeling_stepsize"] = definition.modeling_stepsize;
  currentModel["components"] = {};

  for (const [name, props] of Object.entries(definition.components)) {
    // parse the component list
    let componentProperties = props as any;
    let modeltype = componentProperties.model_type;
    try {
      let newComponent = new modelList[modeltype]();
      for (const [prop_name, prop_value] of Object.entries(
        componentProperties
      )) {
        newComponent[prop_name] = prop_value;
      }
      // instantiate the correct model
      currentModel.components[name] = newComponent;
      // add the properties to the new model instance
    } catch (e) {
      console.log("cant instantiate ", componentProperties.model_type);
    }
  }
}

function calculate(timeToCalculate: number): void {}

function start(): void {}

function stop(): void {}

function reset(): void {}

function dispose(): void {}

function readJSONFile(filename: string = "normal_neonate"): void {}

function writeJSONFile(filename: string): void {}
