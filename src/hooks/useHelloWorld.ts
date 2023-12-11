import { useEffect } from "react";

export default function useHelloWorld() {
  useEffect(() => {
    console.log("Hello World!!!");
  }, []);
}
