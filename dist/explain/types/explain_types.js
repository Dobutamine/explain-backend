export class Component {
    constructor(model) {
        this.model = model;
        this.name = "";
        this.description = "";
        this.isEnabled = false;
        this.initialized = false;
    }
    modelStep() {
        if (!this.initialized) {
            this.initialize();
        }
        if (this.isEnabled) {
            this.calculateStep();
        }
    }
    initialize() {
        this.initialized = true;
    }
    calculateStep() { }
}
