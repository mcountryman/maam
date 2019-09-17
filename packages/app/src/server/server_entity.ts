import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "socket.io";
import { UserEntity } from "../user/user_entity";
import { IAuthEntity } from "../auth/iauth_entity";

@Entity()
export class ServerEntity implements IAuthEntity {
  @PrimaryGeneratedColumn("uuid") 
  public id: string;

  @Column() 
  public name: string;

  @Column() 
  public type: string;

  @Column()
  public roles: string[];

  @Column()
  public apiKey: string;

  @Column()
  public registered: boolean;

  @Column()
  public registeredBy: UserEntity;
  
  public sockets: Client[] = [];
}
