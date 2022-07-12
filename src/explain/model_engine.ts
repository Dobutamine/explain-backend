import { parentPort } from "worker_threads";

import { Ecg } from "./core-models/ecg.js";
import { Heart } from "./core-models/heart.js";
import { Breathing } from "./core-models/breathing.js";
import { Kidneys } from "./core-models/kidneys.js";
import { Lymphatics } from "./core-models/lymphatics.js";
import { IntrathoracicPressure } from "./core-models/intrathoracic_pressure.js";
import { Blood } from "./core-models/blood.js";
import { TimeVaryingElastance } from "./core-models/time_varying_elastance.js";
import { BloodCompliance } from "./core-models/blood_compliance.js";
import { BloodResistor } from "./core-models/blood_resistor.js";
import { Valve } from "./core-models/valve.js";
import { Gas } from "./core-models/gas.js";
import { GasCompliance } from "./core-models/gas_compliance.js";
import { GasResistor } from "./core-models/gas_resistor.js";
import { GasExchanger } from "./core-models/gas_exchanger.js";
import { GasDiffusor } from "./core-models/gas_diffusor.js";
import { Environment } from "./core-models/environment.js";
import { Metabolism } from "./core-models/metabolism.js";
import { Container } from "./core-models/container.js";
import { Sensor } from "./core-models/sensor.js";
import { SensorIntegrator } from "./core-models/sensor_integrator.js";
import { Effector } from "./core-models/effector.js";
import { Compressions } from "./core-models/compressions.js";
import { MechanicalVentilator } from "./core-models/mechanical_ventilator.js";
import { Pda } from "./core-models/pda.js";
import { Placenta } from "./core-models/placenta.js";
import { Drugs } from "./core-models/drugs.js";
import { Ecls } from "./core-models/ecls.js";
import { Birth } from "./core-models/birth.js";

import { WorkerMessage, IComponent } from "./types/explain_types.js";
import { Datacollector } from "./helpers/datacollector.js";

// define a model definition datastructure, the form is depending on the JSON file so no typechecking possible before loading the JSON
let modelDefinition: any;

parentPort?.on("message", (mes) => {
  switch (mes.command) {
    case "init_engine":
      init(mes.params);
      modelDefinition = mes.params;
      break;
  }
});

function init(definition: any): void {
  console.log(definition);
  // parse the definition object and build the current model structure from it.
}

function calculate(timeToCalculate: number): void {}

function start(): void {}

function stop(): void {}

function reset(): void {}

function dispose(): void {}

function readJSONFile(filename: string = "normal_neonate"): void {}

function writeJSONFile(filename: string): void {}
