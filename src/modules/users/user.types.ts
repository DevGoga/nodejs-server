export enum Role {
  admin = 'admin',
  user = 'user',
}

export type User = {
  id: number;
  nick: string;
  password: string;
  role: Role;
};
