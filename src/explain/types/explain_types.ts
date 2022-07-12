export type WorkerMessage = {
  command: string;
  target: string;
  params: any;
};

export interface IComponent {
  name: string;
  description: string;
  modeltype: string;
  isEnabled: boolean;
  modelStep(): void;
}
