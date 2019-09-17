import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AuthEntityType, IAuthEntity } from "../auth/iauth_entity";
import { plainToClass } from "class-transformer";
import { UserEntity } from "../user/user_entity";
import { ServerEntity } from "../server/server_entity";

@Entity()
export class SessionEntity implements Express.SessionData {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  
  @Column() 
  public expiresAt: number;
  
  @Column("simple-json")
  public cookie: Express.SessionCookieData;

  @ManyToOne(
    type => UserEntity, 
      user => user.id, 
    { cascade: true, persistence: true },
  )
  @JoinColumn()
  public userEntity?: UserEntity;
  
  @ManyToOne(
    type => ServerEntity,
    server => server.id,
    { cascade: true, persistence: true },
  )
  @JoinColumn()
  public serverEntity?: ServerEntity;
  
  public get entity(): UserEntity | ServerEntity | null {
    if (this.userEntity) { return this.userEntity; }
    if (this.serverEntity) { return this.serverEntity; }
    
    return null;
  }
  
  public set entity(value: UserEntity | ServerEntity | null) {
    this.userEntity = null;
    this.serverEntity = null;
    
    if (value instanceof UserEntity) { this.userEntity = value; }
    if (value instanceof ServerEntity) {this.serverEntity = value; }
  }
  
  public static fromJs(value: any): SessionEntity {
    return plainToClass(SessionEntity, value);
  }
}
