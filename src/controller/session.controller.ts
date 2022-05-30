import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  //validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } //15m
  );
  //create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } //15m
  );
  //return access & refresh tokens
  return res.send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
