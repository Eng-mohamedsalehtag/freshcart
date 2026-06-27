import axios from "axios";

export async function getUserCart(accessToken?: string) {
  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token: accessToken,
      },
    },
  );

  return data;
}
