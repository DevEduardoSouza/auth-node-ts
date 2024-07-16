import User from "../../models/User";
import { IUser } from "../../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (user: IUser) => {
  try {
    const { username, password, email } = user;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return { message: `Usuário ${email} não existe` };
    }

    // Verificar se a senha está correta
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      console.error("Login failed: Incorrect password");
      return { message: "Incorrect password" };
    }

    // Gerar um token JWT se o login for bem-sucedido
    const token = jwt.sign(
      { id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET || "defaultSecretKey", // Use uma variável de ambiente para a chave secreta
      { expiresIn: "1h" }
    );

    console.log("Login successful:", { email, username });
    return { message: "Login successful", token };
  } catch (error) {
    console.error("Error in login service:", error);
    throw error;
  }
};
