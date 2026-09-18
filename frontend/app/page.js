"use client";

import { useGetProducts } from "@/api/client/product";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { div, main } from "motion/react-client";

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

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-20 ">
        {filteredProducts.map((product) => (
          < motion.div
            initial={{ opacity: 0.25, y: 25, scale: 0.98}}
            whileInView={{opacity: 1,y: 0,scale: 1}}

            viewport={{once: true}}
            transition={{ duration: 0.3, ease: "easeOut"}}

            // whileHover={{
            //   scale: 1.09,
            //   duration:0.3
            // }}

          

            key={product.id}
            className="group overflow-hidden rounded-2xl bg-white  transition duration-300 
            hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-6">
              <motion.img
               src={product.thumbnail}
                whileHover={{
                scale: 1.19,
                duration:0.3
                }}

                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-600 mt-2">
                {product.title}
              </h2>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-bold text-blue-600">
                 Rs: {product.price}
                </p>
              </div>

               <div className=" flex items-center justify-between capitalize">
                <p className="text-md font-semibold text-blue-600">
                  {product.category}
                </p>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold
               text-white transition hover:bg-blue-700 mt-3 mr-1">
                
               View Details

                </motion.button>

              </div>

            </div>
            
          </motion.div>
        ))}
  </div>
          
          
    </main>
  );
};

export default Page;
