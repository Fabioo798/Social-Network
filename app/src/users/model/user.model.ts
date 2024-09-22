type HasId = {
 id: string;
};

export type ProtoUserStructure = {
 id: string;
 name: string;
 email: string;
 password: string;
 friend: [];
 enemies: [];
 token: string;
 relation: "friend" | "enemy";
};

export type UserStructure = HasId & ProtoUserStructure;

// loginUser = { email, pass}
//proto user = { * exept  id}
