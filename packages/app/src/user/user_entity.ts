import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IAuthEntity } from "@maam/app/src/auth/iauth_entity";

@Entity()
export class UserEntity implements IAuthEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public steamId: string;

  @Column()
  public roles: string[];
}
