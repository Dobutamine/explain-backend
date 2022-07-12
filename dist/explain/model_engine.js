import { parentPort } from "worker_threads";
// import all models from core-models folder
import * as models from "./core-models/index.js";
// generate a model dictionary from imported models
let modelList = {};
for (const [key, value] of Object.entries(models)) {
    modelList[key] = value;
}
// define a model definition datastructure, the form is depending on the JSON file so no typechecking possible before loading the JSON
let currentModel = {};
parentPort?.on("message", (mes) => {
    switch (mes.command) {
        case "init_engine":
            init(mes.params);
            break;
    }
});
function init(definition) {
    // parse the definition object and build the current model structure from it.
    currentModel["name"] = definition.name;
    currentModel["description"] = definition.description;
    currentModel["weight"] = definition.weight;
    currentModel["model_time_total"] = definition.model_time_total;
    currentModel["modeling_stepsize"] = definition.modeling_stepsize;
    currentModel["components"] = {};
    for (const [name, props] of Object.entries(definition.components)) {
        // parse the component list
        let componentProperties = props;
        let modeltype = componentProperties.model_type;
        try {
            let newComponent = new modelList[modeltype]();
            for (const [prop_name, prop_value] of Object.entries(componentProperties)) {
                newComponent[prop_name] = prop_value;
            }
            // instantiate the correct model
            currentModel.components[name] = newComponent;
            // add the properties to the new model instance
        }
        catch (e) {
            console.log("cant instantiate ", componentProperties.model_type);
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
