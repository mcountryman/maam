import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity as ISession } from "typeorm-store";
import { IAuthEntity } from "@maam/app/src/auth/iauth_entity";

@Entity()
export class SessionEntity implements ISession {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  
  @Column()
  public data: string;
  
  @Column()
  public expiresAt: number;
  
  public entity?: IAuthEntity;
}
