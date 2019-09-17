
export enum AuthEntityType {
  User,
  Server,
}

export interface IAuthEntity {
  id: string;
  type: AuthEntityType;
  roles: string[];
}
