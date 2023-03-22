import type { NextPage } from "next";
import { Button, Meta, Navbar, Text } from "@components/elements";

const Home: NextPage = () => {
  return (
    <div className="p-28 min-h-screen">
      <Meta subTitle="Homepage" />
      Hello World!
      <Button>Sign Up</Button>
      <Button variant="secondary">Sign In</Button>
      <Text>Kelamaan nunggu?</Text>
      <Text variant="jumboSubTitle">
        Pesan meja dan makanan lebih cepat dan praktis
      </Text>
      <Text variant="title">
        Koleksi di <span className="font-bold">Jakarta</span>
      </Text>
      <Text variant="subTitle">
        Temukan restoran, bar, cafe terbaik di lokasimu
      </Text>
    </div>
  );
};

export default Home;
