// import the parentPort for communication outside thread
import { parentPort } from "worker_threads";
// import all models from core-models folder
import * as models from "./core-models/index.js";
// generate a model dictionary from all imported models needed to dynamically instantiate them
let modelList = {};
for (const [key, value] of Object.entries(models)) {
    modelList[key] = value;
}
// communication channel
parentPort?.on("message", (mes) => {
    switch (mes.command) {
        case "init_engine":
            init(mes.params);
            break;
    }
});
// define a model definition datastructure, the form is depending on the JSON file so no typechecking possible before loading the JSON
let currentModel = {};
// initialize the model using the definition file
function init(definition) {
    // parse the definition object and build the current model structure from it.
    currentModel["name"] = definition.name;
    currentModel["description"] = definition.description;
    currentModel["weight"] = definition.weight;
    currentModel["model_time_total"] = definition.model_time_total;
    currentModel["modeling_stepsize"] = definition.modeling_stepsize;
    currentModel["components"] = {};
    // parse the component list
    for (const [name, props] of Object.entries(definition.components)) {
        let componentProperties = props;
        try {
            // instantiate the correct model
            let newComponent = new modelList[componentProperties.model_type](currentModel);
            // iterate over the properties and set them on the model instance
            for (const [prop_name, prop_value] of Object.entries(componentProperties)) {
                newComponent[prop_name] = prop_value;
            }
            // store the components in the model dictionary
            currentModel.components[name] = newComponent;
        }
        catch (e) {
            console.log("MODEL-ENGINE: unable to find", componentProperties.model_type);
        }
    }
}
function calculate(timeToCalculate) { }
function start() { }
function stop() { }
function reset() { }
function dispose() { }
function readJSONFile(filename = "normal_neonate") { }
function writeJSONFile(filename) { }
