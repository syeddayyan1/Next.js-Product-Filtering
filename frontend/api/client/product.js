
"use client";

import api from "../axios";
import endpoints from "../endpoints";
import { useQuery} from "@tanstack/react-query";

export function useGetProducts() {
    const { data, ispending, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await api.get(endpoints.products)
            return response.data.products;
        },  
    });

    return {
        products: data || [],
        ispending,
        isError,
        error
    };
    
};



export function useGetProductsById(id) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const response = await api.get(endpoints.productsById(id))
            return response.data;
        }, 
    });

    return {
        products: data ,
        isError,
        isPending,
        error
}
};

