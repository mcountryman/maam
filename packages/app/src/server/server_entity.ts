import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "socket.io";
import { UserEntity } from "../user/user_entity";
import { AuthEntityType, IAuthEntity } from "../auth/iauth_entity";
import { IServer } from "@maam/app-common";

@Entity()
export class ServerEntity implements IServer, IAuthEntity {
  public type: AuthEntityType = AuthEntityType.Server;
  
  @PrimaryGeneratedColumn("uuid") 
  public id: string;

  @Column() 
  public name: string;

  @Column("simple-array")
  public roles: string[];

  @Column()
  public apiKey: string;

  @Column()
  public registered: boolean;

  @OneToOne(type => UserEntity)
  @JoinColumn()
  public registeredBy: UserEntity;
  
  public sockets: Client[] = [];
}
