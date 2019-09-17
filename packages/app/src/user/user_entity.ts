import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntityType, IAuthEntity } from "../auth/iauth_entity";

@Entity()
export class UserEntity implements IAuthEntity {
  public type: AuthEntityType = AuthEntityType.User;
  
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column("simple-json")
  public ids: { [provider: string]: string } = {
    steamID: "",
    minecraftUUID: "",
  };

  @Column()
  public name: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public steamId: string;

  @Column("simple-array")
  public roles: string[];
}
