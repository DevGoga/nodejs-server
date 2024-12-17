import { existsSync, readFileSync, writeFileSync } from 'fs';
import { User } from './user.types';

let storage: User[] = [];
const filename = 'users.json';

const saveStorageToFile = () => writeFileSync(filename, JSON.stringify(storage, null, 2));

if (existsSync(filename)) {
  storage = JSON.parse(readFileSync(filename, 'utf-8'));
} else {
  saveStorageToFile();
}

export const UserRepository = {
  registration(dto: Omit<User, 'id'>, nick: User['nick']): User {
    const existingUser = storage.find((user) => user.nick === nick);

    if (existingUser) {
      throw new Error('A user with this nickname already exists');
    }

    const maxId = storage.sort((a, b) => b.id - a.id)[0]?.id ?? 0;
    const newUser: User = { ...dto, id: maxId + 1 };
    storage.push(newUser);
    saveStorageToFile();

    return newUser;
  },
  getLogin(id: string) {},
  getProfile(id: string) {},
};
