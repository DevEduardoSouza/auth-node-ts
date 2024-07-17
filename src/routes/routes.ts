import { Request, Response, Router } from "express";
import { loginController } from "../controllers/Login/loginController";
import { registerController } from "../controllers/Register/registerController";
import { authMiddleware, authorize } from "../auth/authMiddleware";
import { handleValidationErrors, validateUser } from "../validations/userValidation";
import { verifyCodeController } from "../controllers/VerifyCode/verifyCodeController";

const routes = Router();

routes.post("/api/login", (req: Request, res: Response) => loginController(req, res));

routes.post("/api/register", validateUser, handleValidationErrors, (req: Request, res: Response) =>
  registerController(req, res)
);

routes.post("/api/verify", (req: Request, res: Response) => verifyCodeController(req, res));

// route private
routes.post(
  "/api/private",
  authMiddleware,
  authorize(["manager"]),
  (req: Request, res: Response) => {
    res.json({ message: "Private route accessed" });
  }
);

export default routes;
