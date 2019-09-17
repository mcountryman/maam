import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServerEntity } from "./server_entity";

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly _serverRepo: Repository<ServerEntity>,
  ) {}

  public async findByApiKey(apiKey: string): Promise<ServerEntity | undefined> {
    return await this._serverRepo.findOne({ apiKey });
  }

}
