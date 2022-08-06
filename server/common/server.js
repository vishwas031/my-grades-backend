import Express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as os from "os";
import cookieParser from "cookie-parser";
import cors from "cors";

import oas from "./oas";
import mongo from "./mongo";

import logger from "./logger";

const app = new Express();
const exit = process.exit;

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set("appPath", `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
    app.use(cors());
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const start = (p) => () =>
      logger.info(
        `up and running in ${process.env.NODE_ENV ||
          "development"} @: ${os.hostname()} on port: ${p}}`
      );

    oas(app, this.routes)
      .then(() => {
        mongo().then(() => {
          logger.info(`Database loaded!`);
          http.createServer(app).listen(port, start(port));
        });
      })
      .catch((e) => {
        logger.error(e);
        exit(1);
      });

    return app;
  }
}
