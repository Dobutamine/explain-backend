// import the parentPort for communication outside thread
import { parentPort } from "worker_threads";
// import all models from core-models folder
import * as models from "./core-models/index.js";
import { Datacollector } from "./helpers/datacollector.js";
// generate a model dictionary from all imported models needed to dynamically instantiate them
let modelList = {};
for (const [key, value] of Object.entries(models)) {
    modelList[key] = value;
}
// define a model datastructure holding the model generated from the JSON model definition file
let currentModel = {
    name: "",
    description: "",
    weight: 3.0,
    model_time_total: 0,
    modeling_stepsize: 0,
    components: {},
    model: {},
};
// initialize the model using the definition file
function init(definition) {
    // parse the definition object and build the current model structure from it.
    currentModel["name"] = definition.name;
    currentModel["description"] = definition.description;
    currentModel["weight"] = definition.weight;
    currentModel["model_time_total"] = definition.model_time_total;
    currentModel["modeling_stepsize"] = definition.modeling_stepsize;
    currentModel["components"] = {};
    // instantiate the datacollector
    currentModel.components["datacollector"] = new Datacollector(currentModel);
    // parse the component list
    let error = false;
    let errorMessage = "";
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
            error = true;
            errorMessage = "Unable to find " + componentProperties.model_type;
            sendMessage("error", errorMessage);
        }
    }
    // status update
    if (!error) {
        sendMessage("status", "model initialized");
    }
}
function sendMessage(messageType, message, payload = {}) {
    const mes = {
        type: messageType,
        message: message,
        payload: payload,
    };
    parentPort?.postMessage(mes);
}
// open the communication channel with the main thread
parentPort?.on("message", (mes) => {
    switch (mes.type) {
        case "init_engine":
            init(mes.payload);
            break;
        case "calculate":
            calculate(mes.payload);
            break;
        case "start":
            start();
            break;
        case "stop":
            stop();
            break;
        case "reset":
            reset();
            break;
        case "dispose":
            dispose();
            break;
    }
});
function calculate(timeToCalculate) {
    const noOfSteps = timeToCalculate / currentModel.modeling_stepsize;
    const start = performance.now();
    for (let i = 0; i < noOfSteps; i++) {
        for (const comp in currentModel.components) {
            currentModel.components[comp].modelStep();
        }
    }
    const stop = performance.now();
    const duration = stop - start;
    sendMessage("performance", "calculate function", {
        timespan: timeToCalculate,
        steps: noOfSteps,
        duration: duration / 1000,
        step: duration / noOfSteps / 1000,
    });
}
function start() { }
function stop() { }
function reset() { }
function dispose() { }
