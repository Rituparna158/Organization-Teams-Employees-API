export interface User {
  id: number;
  email: string;
  passwordHash: string;
  //role:"user"|"admin";
  isActive: number;
  createdAt: string;
}
