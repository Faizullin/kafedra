import {useEffect, useState} from "react";

export const useDebounced = (value: never, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const t = window.setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                window.clearTimeout(t);
            };
        },
        [value, delay] // re-run if value or delay changes
    );
    return debouncedValue;
};
