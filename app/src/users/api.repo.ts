import { GET_ALL_USERS } from "./model/url.model";
import { ProtoUserStructure, UserStructure } from "./model/user.model";


export interface UserApiRepoStructure {
  loadUsers(token: Partial<UserStructure>): Promise<UserStructure[]>;
  createRelation(User: ProtoUserStructure, relation: string, token: string): Promise<UserStructure>;
  editProfile(User: Partial<ProtoUserStructure>, token: string, ): Promise<UserStructure>;
  removeRelation(User: UserStructure, relation: string, token: string): Promise<UserStructure>;
  register(
    name: string,
    email: string,
    password: string
  ): Promise<{ results: UserStructure[] }>;
  logIn(
    email: string,
    password: string
  ): Promise<{ results: { token: string } }>;
}

export class UserApiRepo {
  url: string;
  constructor() {
    this.url = GET_ALL_USERS;
  }

  async loadUsers(token: string): Promise<{ results: UserStructure[] }> {
    const resp = await fetch(this.url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const users = (await resp.json()) as { results: UserStructure[] };

    return users;
  }

  async editProfile(User: Partial<UserStructure>, token: string) {
    const url = this.url + "edit_profile"
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(User),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });
    const data = (await response.json()) as UserStructure;
    if (!data) {
      throw new Error("Failed to modify your datas");
    }
    return data;
  }

  async createRelation(
    User: UserStructure,
    relation: string,
    token: string
  ): Promise<UserStructure> {
    const url = this.url + "add_relation/" + User.id;
    const userWithRelation = { ...User, relation };
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(userWithRelation),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });
    const data = (await response.json()) as UserStructure;
    if (!data) {
      throw new Error("Failed to place user in your list");
    }
    return data;
  }

  async removeRelation(
    User: UserStructure,
    relation: string,
    token: string,
  ): Promise<UserStructure> {
    const url = this.url + "remove_relation/" + User.id;
    const userWithRelation = { ...User, relation };
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(userWithRelation),
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    const data = (await response.json()) as UserStructure;
    if (!data) {
      throw new Error("Failed to remove user from your list");
    }
    return data;
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ results: UserStructure[] }> {
    const url = this.url + "register";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();
    return data;
  }

  async logIn(
    email: string,
    password: string
  ): Promise<{ results: { token: string } }> {
    const url = this.url + "login";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();

    localStorage.setItem("token", data.token);

    return data.token;
  }
}
