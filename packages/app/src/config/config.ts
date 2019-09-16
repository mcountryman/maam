import { Exclude } from "class-transformer";
import { IsFQDN, IsPort } from "class-validator";

const NODE_ENV = process.env.NODE_ENV || "";
const IS_DEV  = NODE_ENV.toLowerCase().startsWith("dev");
const IS_TEST = NODE_ENV.toLowerCase().startsWith("test");
const IS_PROD = !IS_DEV && !IS_TEST;

export class Config {
  @Exclude() public IS_DEV  = IS_DEV;
  @Exclude() public IS_TEST = IS_TEST;
  @Exclude() public IS_PROD = IS_PROD;
  
  public HTTP_PORT: number = 8080;
  public HTTP_SESSION_TTL: number = 60 * 60 * 24; // 1 day
  public HTTP_SESSION_SECRET: string = "sshh";
  public HTTP_SESSION_CLEANUP_LIMIT: number = 2;

  public DB_TYPE: "mysql" | "postgres" | "sqlite" | "maria" = "sqlite";
  
  @IsFQDN()
  public DB_HOST: string = "example.com";
  public DB_PORT: number = 6969;
  public DB_USER: string = "";
  public DB_PASS: string = "";
  public DB_DATABASE: string = "";
  public DB_CERTIFICATE?: string = "";
}
