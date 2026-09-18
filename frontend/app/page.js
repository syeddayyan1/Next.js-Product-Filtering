"use client";

import ProductCard from "./components/ProductCard";
import { useGetProducts } from "@/api/client/product";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { products, isPending, isError, error } = useGetProducts();

  if (isPending) {
    return <div className="text-center justify-center p-20 text-2xl">Loading products...</div>;
  }

  if (isError) {
    return <div className="text-center justify-center p-20 text-2xl">Error: {error.message}</div>;
  }

  // const [selectedCategory, setSelectedCategory] = useState("all");
  
  const router = useRouter();

  const SearchParams = useSearchParams();
  const category = SearchParams.get("category")
  console.log(category)

  const maxPrice = SearchParams.get("maxPrice")
  console.log(maxPrice)
  

const filteredProducts = products.filter((product) => {
  // if (category ) {
  //   return product.category === category;
  // }

  // if (maxPrice) {
  //   return product.price < maxPrice;
  // }

  if (category || maxPrice) {
    return product.category === category || product.price < maxPrice;
  }

  return true;

});
  
  const categories = [...new Set(products.map((product) => product.category))] 
  
  return (
 
    
     <main>
    {/* <div className="mb-6 flex gap-3 justify-center p-10 font-bold">
  <button
    onClick={() =>  router.push("http://localhost:3000")}
    className="rounded bg-black px-4 py-2 text-white"
  >
    All
  </button>

  <button
    onClick={() => router.push("?category=beauty")}
    className="rounded bg-black px-4 py-2 text-white"
  >
    Beauty
  </button>

  <button
    onClick={() => router.push("?category=fragrances")}
    className="rounded bg-black px-4 py-2 text-white"
  >
    Fragrances
  </button>

  <button
    onClick={() => router.push("?category=furniture")}
    className="rounded bg-black px-4 py-2 text-white"
  >
    Furniture
  </button>

  <button
    onClick={() => router.push("?category=groceries")}
    className="rounded bg-black px-4 py-2 text-white"
  >
    Groceries
   </button>
        
  <button
  
    onClick={() => router.push("?maxPrice=200")}
    className="rounded  px-4 py-2 text-black bg-amber-500"
  >
    Under  Rs: 200
  </button>
        


</div> */}
      
       {/* Buttons Ui */}
      <div className="mb-6 flex gap-3 justify-center p-10 font-bold">

        <button
        onClick={() =>  router.push("http://localhost:3000")}
        className="rounded bg-black px-4 py-2 text-white"
        >
        All
       </button>
        
        {categories.map((category) => (
          <button className="rounded bg-black px-4 py-2 text-white capitalize"
            key={category}
            onClick={() => router.push(`?category=${category}`)}>
           {category}
          </button>
        ))}

        <button
         onClick={() => router.push("?maxPrice=200")}
        className="rounded  px-4 py-2 text-black bg-amber-500"
        >
         Under  Rs: 200
        </button>
      </div>

      {/* //  Ui Product Show On Screen */}

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-20 -mt-20">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 
            hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-6">
              <img
               src={product.thumbnail}

                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-900">
                {product.name}
              </h2>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-bold text-blue-600">
                 Rs: {product.price}
                </p>
              </div>

               <div className="mt-3 flex items-center justify-between capitalize">
                <p className="text-xl font-bold text-blue-600">
                  {product.category}
                </p>
              </div>

              <div>
                
                <button onClick={() => router.push(`/products/${product.id}`)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold
             text-white transition hover:bg-blue-700 mt-3 mr-1">
                
               View Details

                </button>  
            
        
              </div>
          </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
