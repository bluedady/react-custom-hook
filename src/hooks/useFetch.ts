import { useEffect, useState } from "react";

type Props<T> = {
  func: () => Promise<any>;
  popupErrorMsg?: boolean;
  loadInitially?: boolean;
};

export default function useFetch<T>({
  func,
  popupErrorMsg = false,
  loadInitially = true,
}: Props<T>) {
  const [response, setResponse] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(loadInitially ? true : false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);

    try {
      const responseData = await func();
      setResponse(responseData);
    } catch (e: any) {
      setResponse(undefined);
      setIsError(true);
      setError(e.message || "Something went wrong, please try again later.");

      if (popupErrorMsg) {
        alert(e.message || "Something went wrong, please try again later.");
      }
    }
    setIsLoading(false);
  };

  const refetch = () => {
    setIsError(false);
    setError(null);
    loadData();
  };

  useEffect(() => {
    if (loadInitially) {
      loadData();
    }
  }, []);

  return { response, isLoading, isError, error, loadInitially, refetch };
}
