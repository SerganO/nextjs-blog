import { useEffect } from "react";
import { useActions } from "src/hooks/useEntity";

export default function IdentityWorker(pageProps) {
  const { getIdentity } = useActions("Identity");

  useEffect(() => {
    console.log("worker getIdentity");
    getIdentity();
  }, [pageProps]);

  return <div />;
}
