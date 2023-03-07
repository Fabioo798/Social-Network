export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  friends: User[];
  enemies: User[];
};
