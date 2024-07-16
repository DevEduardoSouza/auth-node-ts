import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUser = [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
