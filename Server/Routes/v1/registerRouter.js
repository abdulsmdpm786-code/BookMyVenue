import express from "express";
import {
  getAllUsers,
  handleGetMe,
  handleLogout,
  handleLogoutAll,
  handleSignIn,
  handleSignUp,
  refreshToken,
  verifyEmail,
} from "../../Controllers/registerControllers.js";

const registerRouter = express.Router();

registerRouter.post("/signUp", handleSignUp);
registerRouter.post("/verify", verifyEmail);
registerRouter.post("/signIn", handleSignIn);
registerRouter.get("/refresh", refreshToken);
registerRouter.get("/getMe", handleGetMe);
registerRouter.get("/logoutAll", handleLogoutAll);
registerRouter.get("/logout", handleLogout);

registerRouter.get("/getAll", getAllUsers)

export default registerRouter;
