import usersRouter from "./api/controllers/users/router";
import adminRouter from "./api/controllers/admin/router";

export default function routes(app) {
  app.use("/users", usersRouter);
  app.use("/admin", adminRouter);
}
