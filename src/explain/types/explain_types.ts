export type ThreadMessage = {
  type: string;
  message: string;
  payload: any;
};

export type ModelDefinition = {
  name: string;
  description: string;
  weight: number;
  model_time_total: number;
  modeling_stepsize: number;
  components: object;
};

export type Model = {
  name: string;
  description: string;
  weight: number;
  model_time_total: number;
  modeling_stepsize: number;
  components: Record<string, Component>;
  model: {};
};

export class Component {
  public name: string = "";
  public description: string = "";
  public is_enabled: boolean = false;
  public initialized: boolean = false;

  constructor(public model: any) {}

  modelStep(): void {
    if (!this.initialized) {
      this.initialize();
    }
    if (this.is_enabled) {
      this.calculateStep();
    }
  }

  initialize(): void {
    this.initialized = true;
  }

  calculateStep(): void {}
}
