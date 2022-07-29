import UsersService from "../../services/users.service";

export class Controller {
  async register(req, res, next) {
    try {
      await UsersService.register(req.body.roll);
      res.status(200).json({ message: "OTP has been sent to mail!" });
    } catch (err) {
      next("Unable to send OTP");
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { roll, otp, pubKey } = req.body;
      await UsersService.verifyOtp(roll, otp, pubKey);
      res.status(200).json({ message: "Successfully verified!" });
    } catch (err) {
      next("Unable to verify user");
    }
  }

  async fetchResults(req, res, next) {
    try {
      const result = await UsersService.fetchResults(
        req.query.roll,
        req.query.sem
      );
      res.status(200).json({ result, message: "Successful" });
    } catch (err) {
      next("There was some error fetching result");
    }
  }

  async verify(req, res, next) {
    try {
      const { roll, sem, targetHash } = req.query;
      console.log({roll, sem, targetHash})
      const verified = await UsersService.verify(roll, sem, targetHash);
      res.status(200).json({ verified, message: "Successful" });
    } catch (err) {
      next("There was some error in verifying result");
    }
  }
}

export default new Controller();
