import { Store } from "express-session";
import { Injectable, Logger } from "@nestjs/common";
import { SessionEntity } from "./session_entity";
import { SessionService } from "./session_service";

type StoreCallback = (err?: any) => void;
type StoreAllCallback = (err?: any, obj?: { [sid: string]: SessionEntity; } | null) => void;
type StoreGetCallback = (err?: any, session?: SessionEntity | null) => void;
type StoreLengthCallback = (err?: any, length?: number | null) => void;

@Injectable()
export class SessionStore extends Store {
  public get expirationInterval(): number { return this._expirationInterval; }
  public set expirationInterval(value: number) { this.updateExpirationInterval(value); }
  
  public constructor(
    private readonly _sessionService: SessionService,
  ) {
    super({});
  }

  public length = (callback: StoreLengthCallback) => {
    this._sessionService
      .count()
      .then((length) => callback(null, length))
      .catch((err) => callback(err, 0))
    ;
  };
  
  public get = (id: string, callback: StoreGetCallback) => {
    this._sessionService
      .findOne(id)
      .then((session) => callback(null, session))
      .catch((err) => callback(err))
    ;
  };
  
  public set = async (id: string, session: Express.SessionData, callback?: StoreCallback) => {
    this._sessionService
      .save(SessionEntity.fromJs({ ...session, id }))
      .then(() => callback && callback())
      .catch((err) => this._logger.error(`${err.name}: ${err.message}`, `${err.stack}\r${JSON.stringify(err, null, 2)}`))
    ;
  };
  
  public all = (callback: StoreAllCallback) => {
    this._sessionService
      .find()
      .then((sessions: SessionEntity[]) =>
        sessions.reduce((obj, item) => {
          obj[item.id] = item;
          return obj;
        }, {}),
      )
      .then((sessions) => callback(null, sessions))
      .catch((err) => callback(err))
    ;
  };
  
  public clear = (callback?: StoreCallback) => {
    this._sessionService
      .clear()
      .then(() => callback())
      .catch((err) => callback(err))
    ;
  };
  
  public touch = (id: string, session: Express.SessionData, callback?: StoreCallback) => {
    this.set(id, session, callback);
  };
  
  public destroy = (id: string, callback?: StoreCallback) => {
    this._sessionService
      .delete(id)
      .then(() => callback && callback())
      .catch((err) => callback && callback(err))
    ;
  };
  
  private updateExpirationInterval(interval: number) {
    if (this._expirationIntervalId) {
      clearInterval(this._expirationIntervalId);
    }

    this._expirationInterval = interval;
    this._expirationIntervalId = setInterval(
      () => this._sessionService.deleteExpired(),
      interval
    );
  }

  private _expirationInterval: number;
  private _expirationIntervalId?: NodeJS.Timeout;
  private readonly _logger: Logger = new Logger(SessionStore.name);
}
