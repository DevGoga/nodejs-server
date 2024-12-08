export enum Severity {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export type Task = {
  id: number;
  title: string;
  description: string;
  severity: Severity;
};
