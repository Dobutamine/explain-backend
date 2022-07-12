import { parentPort } from "worker_threads";
// define a model definition datastructure, the form is depending on the JSON file so no typechecking possible before loading the JSON
let modelDefinition;
parentPort?.on("message", (mes) => {
    switch (mes.command) {
        case "init_engine":
            init(mes.params);
            modelDefinition = mes.params;
            break;
    }
});
function init(definition) {
    console.log(definition);
    // parse the definition object and build the current model structure from it.
}
function calculate(timeToCalculate) { }
function start() { }
function stop() { }
function reset() { }
function dispose() { }
function readJSONFile(filename = "normal_neonate") { }
function writeJSONFile(filename) { }
