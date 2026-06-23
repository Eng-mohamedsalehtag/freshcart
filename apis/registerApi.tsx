import { RegisterFormData } from "@/schemas/registerSchema";
import axios from "axios";
export default async function registerApi(userData: RegisterFormData) {
  const res = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    userData,
  );
  return res;
}
