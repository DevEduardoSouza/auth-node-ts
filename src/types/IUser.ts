export interface IUser {
  username?: string;
  password: string;
  email: string;
  createdAt?: Date | string;
  verificationCode?: string;
  role?: string;
  updatedAt?: Date | string;
}
