import Image from "next/image";
import NOTFOUND from "@assets/images/404.svg";
import { Text } from "@components/elements";
const NotFoundPage = () => {
  return (
    <div className="pt-16 min-h-screen flex justify-center items-center flex-col">
      <Image
        alt="jumbotron"
        src={NOTFOUND}
        width={400}
        className="px-5 md:px-0 mb-7 md:mb-0 "
      />
      <Text variant="jumboSubTitle">O0ps, wrong page i think?</Text>
    </div>
  );
};

export default NotFoundPage;
