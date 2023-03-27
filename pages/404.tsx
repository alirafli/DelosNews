import Image from "next/image";
import NOTFOUND from "@assets/images/404.svg";
import { Meta, Text } from "@components/elements";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@styles/404.module.css";


const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, [router]);

  return (
    <div className={styles.container}>
      <Meta subTitle="404 Not Found!" />
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
