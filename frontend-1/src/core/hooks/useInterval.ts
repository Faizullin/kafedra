import {useEffect, useRef} from "react";

export default function useInterval(callback: () => void, delay: number = 1000) {
    const intervalRef = useRef<number | null>(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);


    useEffect(() => {
        const tick = () => savedCallback.current();
        intervalRef.current = window.setInterval(tick, delay);
        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current)
            }
        };
    }, [delay]);
    return intervalRef.current
}
