import { getCategories } from "@/apis/allcategory";
import SwiperCategory from "../swiperCategory/SwiperCategory";
import type { Category } from "@/types/category.type";
export default async function CategorySlider() {
  const data: Category[] = await getCategories();

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Shop Popular Categories
      </h1>
      <SwiperCategory categories={data} />
    </div>
  );
}
