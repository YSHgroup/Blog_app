import { useEffect, useState, useRef } from "react";
type USE_LOCAL_STORAGE = Storage | any;
export const useLocalStorage = (key: string, initialState: any) => {
    const isMounted = useRef(false);
    const [value, setValue] = useState<USE_LOCAL_STORAGE>(typeof localStorage !== 'undefined' ? localStorage.getItem(key) || initialState : initialState || initialState);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            localStorage.setItem(key, value);
        }
    }, [key, value])
    return [value, setValue];
}