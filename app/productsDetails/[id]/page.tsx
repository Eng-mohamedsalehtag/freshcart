import getSingleProduct from "@/apis/singleproducts";
import ProductSlider from "./ProductSlider";
import { AddBtnCart } from "@/app/_components/AddBtnCart/AddBtnCart";

export default async function ProductDetailsPage({ params }: any) {
  const { id } = await params;
  const data = await getSingleProduct(id);

  return (
    <div className="container mx-auto p-4 md:p-8 mt-8 lg:mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Product Image */}
        <div className="col-span-1">
          <ProductSlider images={data.images} title={data.title} />
        </div>

        {/* Product Details */}
        <div className="col-span-2 flex flex-col space-y-4">
          <h1 className="text-2xl md:text-3xl text-gray-800">{data.title}</h1>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>

          <p className="text-gray-800">{data.category?.name}</p>

          <div className="flex justify-between items-center w-full mt-2">
            <span className="text-gray-900 font-medium">{data.price} EGP</span>
            <div className="flex items-center text-gray-700">
              <i className="fa-solid fa-star text-yellow-400 mr-1 text-sm"></i>
              <span>{data.ratingsAverage}</span>
            </div>
          </div>

          <AddBtnCart id={data._id} />
        </div>
      </div>
    </div>
  );
}
