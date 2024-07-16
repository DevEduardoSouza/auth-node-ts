import { Request, Response, Router } from "express";
import { loginController } from "../controllers/Login/loginController";
import { registerController } from "../controllers/Register/registerController";

const routes = Router();

routes.post("/api/login", (req: Request, res: Response) =>
  loginController(req, res)
);

routes.post("/api/register", (req: Request, res: Response) =>
  registerController(req, res)
);

export default routes;
