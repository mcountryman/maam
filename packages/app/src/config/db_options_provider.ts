import * as fs from "fs";
import * as path from "path";
import * as util from "util";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AppConfig } from "../app_config";

const readFileAsync = util.promisify(fs.readFile);

@Injectable()
export class DbOptionsProvider implements TypeOrmOptionsFactory {
  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    if (AppConfig.DB_TYPE === "sqlite") {
      return {
        type: "sqlite",
        database: AppConfig.DB_DATABASE,
        
        ...this._defaultDbOptions,
      };
    }
    
    return {
      ssl: await this.getSSLOptions(AppConfig.DB_TYPE),
      type: AppConfig.DB_TYPE,
      
      ...this._defaultRemoteDbOptions,
    } as any;
  }
  
  private async getSSLOptions(type: string): Promise<any> {
    if (AppConfig.DB_CERTIFICATE) {
      return {
        ca: await readFileAsync(AppConfig.DB_CERTIFICATE),
      };
    }
    
    return null;
  }
  
  private _defaultDbOptions = {
    entities: [path.join(__dirname, "../**/*_entity.ts")],
    synchronize: true,
  };
  
  private _defaultRemoteDbOptions = {
    host: AppConfig.DB_HOST,
    port: AppConfig.DB_PORT,
    username: AppConfig.DB_USER,
    password: AppConfig.DB_PASS,
    database: AppConfig.DB_DATABASE,
    ...this._defaultDbOptions,
  };
}
