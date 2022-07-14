import { Component } from "../types/explain_types.js";

export class Datacollector extends Component {
  public name: string = "datacollector";
  public description: string = "component collecting model data";
  public is_enabled: boolean = true;
  public initialized: boolean = true;

  constructor(model: any) {
    super(model);
  }

  override modelStep(): void {
    if (!this.initialized) {
      this.initialize();
    }
    if (this.is_enabled) {
      this.collectData();
    }
  }

  override initialize(): void {
    this.initialized = true;
  }
  collectData(): void {}
}
