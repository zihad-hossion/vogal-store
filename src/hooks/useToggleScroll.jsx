import { useEffect } from "react";

export const useToggleScroll = (isOpen) => {
    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add('overflow-hidden');
            document.documentElement.classList.remove('overflow-x-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
            document.documentElement.classList.add('overflow-x-hidden');
        }
    }, [isOpen]);
};
