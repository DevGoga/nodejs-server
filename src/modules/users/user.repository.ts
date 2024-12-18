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
  registration(dto: Omit<User, 'id'>): User {
    const maxId = storage.sort((a, b) => b.id - a.id)[0]?.id ?? 0;
    const newUser = { ...dto, id: maxId + 1 };
    storage.push(newUser);
    saveStorageToFile();

    return newUser;
  },
  getLogin(id: string) {},
  getProfile(id: string) {},
};
