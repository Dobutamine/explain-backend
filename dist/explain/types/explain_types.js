export class Component {
    constructor(model) {
        this.model = model;
        this.name = "";
        this.description = "";
        this.is_enabled = false;
        this.initialized = false;
    }
    modelStep() {
        if (!this.initialized) {
            this.initialize();
        }
        if (this.is_enabled) {
            this.calculateStep();
        }
    }
    initialize() {
        this.initialized = true;
    }
    calculateStep() { }
}
