import { useEffect, useState } from "react";

export const useDelay = (value, delay) => {
    const [delayedValue, setDelayedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return delayedValue;
};