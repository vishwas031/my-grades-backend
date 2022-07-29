import AdminService from "../../services/admin.service";

export class Controller {
  async login(req, res, next) {
    try {
      const apiKey = await AdminService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).json({ apiKey, message: "Successfully logged in!" });
    } catch (err) {
      next("Error Logging in");
    }
  }

  async uploadGrades(req, res, next) {
    try {
      if (!req.files?.[0])
        throw { status: 400, message: "Please upload a valid file!" };
      await AdminService.uploadGrades(
        req.files?.[0].originalname,
        req.body.sem
      );
      res.status(200).json({ message: "Successfully uploaded grades" });
    } catch (err) {
      next("Error uploading results");
    }
  }
}

export default new Controller();
