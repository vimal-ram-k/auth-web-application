import { Request } from "express";
import { Session, SessionData } from "express-session";

interface ExtendedRequest extends Request {
  session: Session &
    Partial<SessionData> & {
      username?: string;
      password?: string;
      token?: string;
    };
}

export default ExtendedRequest;
