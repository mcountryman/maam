import { Injectable } from "@nestjs/common";
import { LessThan, Repository } from "typeorm";
import { SessionEntity } from "./session_entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly _sessionRepo: Repository<SessionEntity>,
  ) {}
  
  public async find(): Promise<SessionEntity[]> {
    return await this._sessionRepo.find({ 
      relations: [ "userEntity", "serverEntity" ],
    });
  }

  public async count(): Promise<number> {
    return await this._sessionRepo.count();
  }
  
  public async clear(): Promise<void> {
    await this._sessionRepo.clear();
  }

  public async findOne(id: string): Promise<SessionEntity> {
    return await this._sessionRepo.findOne(
      id, 
      { relations: [ "userEntity", "serverEntity" ] },
    );
  }
  
  public async save(session: SessionEntity): Promise<void> {
    this.updateExpiresAt(session);
    await this._sessionRepo.save(session);
  }
  
  public async delete(id: string): Promise<void> {
    await this._sessionRepo.delete(id);
  }
  
  public async deleteExpired(): Promise<void> {
    const timestamp = Math.round(new Date().getTime() / 1000);
    await this._sessionRepo.delete({ expiresAt: LessThan(timestamp) });
  }
  
  private updateExpiresAt(session: SessionEntity) {
    session.expiresAt = 
      Math.floor(new Date().getTime() / 1000) +
      (
        session.cookie && session.cookie.maxAge
          ? Math.floor(session.cookie.maxAge / 1000)
          : 86400
      )
    ;
  }
}
