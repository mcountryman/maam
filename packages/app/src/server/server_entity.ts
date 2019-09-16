import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "socket.io";
import { UserEntity } from "../user/user_entity";

@Entity()
export class ServerEntity {
  @PrimaryGeneratedColumn("uuid") 
  public id: string;

  /**
   * Display name
   */
  @Column() 
  public name: string;
  
  /**
   * Game name or server type
   */
  @Column() 
  public type: string;

  @Column()
  public registered: boolean;

  @Column()
  public registeredBy: UserEntity;
  
  public sockets: Client[] = [];
}
