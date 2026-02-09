import { useState } from "react";
import Gatekeeper from "@/components/Gatekeeper";
import ValentinePage from "@/components/ValentinePage";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Gatekeeper onAccessGranted={() => setUnlocked(true)} />;
  }

  return <ValentinePage />;
};

export default Index;
