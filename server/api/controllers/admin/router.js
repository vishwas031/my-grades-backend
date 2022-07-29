import * as express from "express";
import multer from "multer";

import isAdmin from "../../middlewares/isAdmin";

import controller from "./controller";

const fileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/))
    return callback(new Error("Please upload a valid .csv file"), false);
  else return callback(null, true);
};

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, __dirname + `/../../../../public/`);
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default express
  .Router()
  .post("/login", controller.login)
  .post("/grades", upload.any(), isAdmin, controller.uploadGrades);
