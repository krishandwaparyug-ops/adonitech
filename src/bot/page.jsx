import { useEffect, useState } from "react";
import Bot from "./components/Bot";

const Page = () => {
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Bot showTip={showTip} setShowTip={setShowTip}/>
    </>
  );
}

export default Page