import { getToken } from './apis/github';
import { db, getData } from './db';
import { Request, Response } from 'express';

import config from './config';

export const handlers = {
  callbackUrlHandler: async (req: Request, res: Response) => {
    const { state, code } = req.query;

    if (state !== state) {
      return res.redirect('/github-auth-error');
    }

    const { access_token, token_type } = await getToken(
      config.clientId,
      config.clientSecret,
      code as string
    );

    config.githubAccessToken = access_token;
    config.githubAccessTokenType = token_type;

    res.redirect(`/`);
  },
  getDataHandler: (req: Request, res: Response) => {
    res.send(getData(db));
  },
};
