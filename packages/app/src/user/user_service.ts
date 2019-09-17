import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UserEntity } from "./user_entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  public async fromCredentials(username: string, password: string): Promise<UserEntity | undefined> {
    const user = await this._userRepo.create();

    user.username = username;
    user.password = await bcrypt.hash(password, 1000);

    return await this._userRepo.save(user);
  }

  public async findByCredentials(username: string, password: string): Promise<UserEntity | undefined> {
    const user = await this._userRepo.findOne({ username });
    if (!user) {
      return null;
    }

    if (!await bcrypt.compare(password, user.password)) {
      return null;
    }

    return user;
  }

}
