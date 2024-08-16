import {useEffect, useState} from "react";

export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        const persistedStateSerialized = localStorage.getItem(key);
        if (persistedStateSerialized) {
            const persistedState = JSON.parse(persistedStateSerialized);
            setState(persistedState);
        }
    }, [key]);

    const setLocalStorageState = (value) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [state, setLocalStorageState];
};