import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
export const useSearchParamsHandler = () => {
    const searchParams = useSearchParams();
    const paramsSetter = useCallback((queries: any) => {
        const params = new URLSearchParams(searchParams);
        Object.keys(queries).map(key => {
            const value = queries[key]
            if (typeof value === 'boolean' && value === false) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        })
        return params.toString();
    }, [searchParams]);
    return paramsSetter;
}