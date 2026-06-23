import { LoginFormData } from "@/schemas/loginSchema";
import axios from "axios";
export default async function loginApi(userData: LoginFormData) {
  const res = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    userData,
  );
  return res;
}
