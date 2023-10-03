export function debounced(){
    let timeoutId: any;
    return (func: Function, delay: number) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        }
}