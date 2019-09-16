import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { plainToClass } from "class-transformer";
import { Config } from "./config";
import { validateSync } from "class-validator";

export class ConfigLoader {
  public static readonly CONFIG_PATH: string = path.resolve(process.cwd(), ".env");
  
  public static load(): Config {
    let config;
    
    if (fs.existsSync(this.CONFIG_PATH)) {
      let result = dotenv.config({ path: this.CONFIG_PATH });
      if (result.error) {
        throw result.error;
      }

      console.log(`Loading config from '.env'`);
      config = plainToClass(Config, result.parsed);
    } else {
      console.log(`Loading config from environment`);
      config = plainToClass(Config, process.env);
    }
    
    let errors = validateSync(config);
    if (errors.length > 0) {
      for (let error of errors) {
        console.error(error.toString());
      }
      
      throw new Error(`Invalid config`);
    }
    
    return config;
  }
  
}