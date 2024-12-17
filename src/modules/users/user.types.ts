export enum Role {
  admin = 'admin',
  user = 'user',
  unknown = 'unknown user',
}

export type User = {
  id: number;
  nick: string;
  password: string;
  role: Role;
};
