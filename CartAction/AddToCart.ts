"use server";

import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function AddToCart(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: id,
    },
    {
      headers: {
        token: session.accessToken,
      },
    },
  );

  return data;
}
