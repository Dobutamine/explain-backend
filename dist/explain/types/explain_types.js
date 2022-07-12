export class Component {
    constructor() {
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
