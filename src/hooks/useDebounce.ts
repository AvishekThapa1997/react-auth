import { useCallback, useMemo } from "react";
const useDebounce = (
  operation: Function,
  delay: number,
  ...dependencies: any[]
) => {
  const debounce = useCallback(() => {
    let timeout: NodeJS.Timeout;
    return (...props: any) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        operation(...props);
      }, delay);
    };
  }, [...dependencies, delay, operation]);
  const callback = useMemo(() => debounce(), [debounce, ...dependencies]);
  return callback;
};

export default useDebounce;
