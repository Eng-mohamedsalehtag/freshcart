export async function getProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.data;
}
