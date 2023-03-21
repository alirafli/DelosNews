import type { NextPage } from "next";
import { Button } from "@components/elements";

const Home: NextPage = () => {
  return (
    <div>
      <Button fullWidth variant="secondary">hi</Button>
      <Button>hi</Button>
      <Button fullWidth>hi</Button>
    </div>
  );
};

export default Home;
