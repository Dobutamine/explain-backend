export type WorkerMessage = {
  command: string;
  target: string;
  params: any;
};

export class Component {
  public name: string = "";
  public description: string = "";
  public isEnabled: boolean = false;
  public initialized: boolean = false;
  modelStep(): void {
    if (!this.initialized) {
      this.initialize();
    }
    if (this.isEnabled) {
      this.calculateStep();
    }
  }
  initialize(): void {
    this.initialized = true;
  }
  calculateStep(): void {}
}
