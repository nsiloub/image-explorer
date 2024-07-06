import { useEffect, useRef } from "react"

// for observing window Sizes and update the needed state
export function useObserveSizesAndUpdateBooleanStates(
    property: "min-width" | "max-width",
    value: `${number}px`,
    updateStateTo: React.Dispatch<boolean>): boolean {
        const query = window.matchMedia(`(${property}:${value})`)
        const stateRef =  useRef(query.matches)

        useEffect(() => {

            updateStateTo(query.matches);

            query.addEventListener("change", handleSizeChanges);
            function handleSizeChanges(event: MediaQueryListEvent): void {
                updateStateTo(event.matches);
                stateRef.current = event.matches;
            };
            
            return () => {
                query.removeEventListener("change", handleSizeChanges);
        }}, [property, query, updateStateTo, value]);

        return stateRef.current;
};