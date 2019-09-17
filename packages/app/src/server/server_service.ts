import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { ServerEntity } from "./server_entity";

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly _serverRepo: Repository<ServerEntity>,
  ) {}
  
  public async findById(id: string): Promise<ServerEntity | undefined> {
    return this._serverRepo.findOne(id);
  }

  public async findByApiKey(apiKey: string): Promise<ServerEntity | undefined> {
    return await this._serverRepo.findOne({ apiKey });
  }
  
  public async save(server: DeepPartial<ServerEntity>) {
    return await this._serverRepo.update(server.id, server);
  }
  
}
