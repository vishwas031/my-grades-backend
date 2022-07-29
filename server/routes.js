import examplesRouter from "./api/controllers/examples/router";
import usersRouter from "./api/controllers/users/router";
import adminRouter from "./api/controllers/admin/router";

export default function routes(app) {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/users", usersRouter);
  app.use("/admin", adminRouter);
}
