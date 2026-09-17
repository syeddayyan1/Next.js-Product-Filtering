"use client";

import { use } from "react";
import { useGetProductsById } from "@/api/client/product";


export default function page({ params }) {

  const { id } = use(params);

  const {products,isPending,isError,error} = useGetProductsById(id);

  if (isPending) {
    return <div className="text-center justify-center p-10 text-2xl" >Loading product...</div>;
  }

  if (isError) {
    return <div className="text-center justify-center p-10 text-2xl">{error.message}</div>;
  }

   return (
    <main className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl
        border border-gray-800 bg-gray-900 shadow-2xl md:grid-cols-2">

          {/* Product Image */}
          <div className="flex min-h-[450px] items-center justify-center bg-white p-10">
            <img
              src={products.thumbnail}
              className="max-w-full max-h-95
              transition duration-500 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center p-8 md:p-12">

            <p className="mb-3 text-sm font-semibold uppercase  text-blue-400">
              {products.category}
            </p>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {products.title}
            </h1>

            <p className="mt-5 text-3xl font-bold text-blue-400">
              ${products.price}
            </p>

            <p className="mt-6 leading-7 text-gray-400">
              {products.description}
            </p>
            
            {/* Button */}
            <button className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3
            font-semibold text-white  hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20">
              Add to Cart
            </button>

          </div>

        </div>

      </div>
     </main>
    
  );
}