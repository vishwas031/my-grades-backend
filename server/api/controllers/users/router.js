import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .post("/register", controller.register)
  .post("/verifyOtp", controller.verifyOtp)
  .get("/results", controller.fetchResults)
  .get("/verify", controller.verify);
