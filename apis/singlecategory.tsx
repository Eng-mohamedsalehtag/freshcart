export async function getSingleCategory(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data.data;
}
