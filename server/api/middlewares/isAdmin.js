import { adminApiKey } from "../../common/config";

// eslint-disable-next-line no-unused-vars, no-shadow
export default async function isAdmin(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) throw { status: 401, message: "Token missing" };

    if (token !== adminApiKey) throw { status: 401, message: "Invalid token!" };
    next();
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong, please try again.",
    });
  }
}
