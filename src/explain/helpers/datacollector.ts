import { Component } from "../types/explain_types.js";

export class Datacollector extends Component {
  public name: string = "datacollector";
  public description: string = "datacollector component";
  public is_enabled: boolean = true;
  public initialized: boolean = true;

  constructor(model: any) {
    super(model);
  }

  override modelStep(): void {
    if (this.is_enabled) {
      this.collectData();
    }
  }

  collectData(): void {}
}
