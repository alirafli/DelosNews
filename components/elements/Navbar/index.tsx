import { FC, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuToggle, navbarItem, navLink } from "./navbarProperty";
import { motion, useCycle } from "framer-motion";
import LOGO from "@assets/images/logo/logo.svg";
import { Button, Text } from "@components/elements";
import styles from "./Navbar.module.css";

export const Navbar: FC<any> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useCycle<boolean>(false, true);
  const containerRef = useRef(null);

  return (
    <>
      <div className={styles.container}>
        <Link href="/" className="w-3/12 ">
          <Image src={LOGO} height={24} alt="logo" />
        </Link>

        <div className="flex w-6/12 justify-center ">
          {navLink.map((data, key) => {
            return (
              <Link
                href={data.linkTo}
                key={key}
                className="mx-2 hover:text-primary transition-all"
              >
                <Text variant="subTitle">{data.name}</Text>
              </Link>
            );
          })}
        </div>

        <div className="w-3/12 flex justify-end">
          <Button>Login</Button>
        </div>
      </div>

      <motion.nav
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        ref={containerRef}
        className={styles.mobileContainer}
      >
        <div
          className={`${styles.mobileHeader} ${
            isSidebarOpen ? "shadow-none" : "shadow-xl"
          }`}
        >
          <Link href="/">
            <Image src={LOGO} height={24} alt="logo" />
          </Link>
          <MenuToggle toggle={() => setIsSidebarOpen()} />
        </div>
        
        <motion.div
          variants={navbarItem}
          className={`${styles.mobileContent} `}
        >
          {navLink.map((data, key) => {
            return (
              <Link
                href={data.linkTo}
                key={key}
                className="mx-2 hover:text-primary my-3"
                onClick={() => setIsSidebarOpen()}
              >
                <Text variant="subTitle">{data.name}</Text>
              </Link>
            );
          })}
        </motion.div>
      </motion.nav>
    </>
  );
};
