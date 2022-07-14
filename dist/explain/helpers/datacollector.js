import { Component } from "../types/explain_types.js";
export class Datacollector extends Component {
    constructor(model) {
        super(model);
        this.name = "datacollector";
        this.description = "component collecting model data";
        this.is_enabled = true;
        this.initialized = true;
    }
    modelStep() {
        if (!this.initialized) {
            this.initialize();
        }
        if (this.is_enabled) {
            this.collectData();
        }
    }
    initialize() {
        this.initialized = true;
    }
    collectData() { }
}
