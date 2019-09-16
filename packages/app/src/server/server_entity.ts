import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "socket.io";

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
  
  public sockets: Client[] = [];
}
