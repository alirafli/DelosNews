import { FC, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MenuToggle, navbarItem, navLink } from "./navbarProperty";
import { motion, useCycle } from "framer-motion";
import LOGO from "@assets/images/logo/logo.svg";
import { Text, ButtonLink, Button } from "@components/elements";
import styles from "./Navbar.module.css";
import { useAuth } from "context/AuthContext";

export const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useCycle<boolean>(false, true);
  const containerRef = useRef(null);
  const { pathname } = useRouter();

  return (
    <>
      <div className={styles.container}>
        <Link href="/" className={styles.imageContainer}>
          <Image src={LOGO} height={24} alt="logo" />
        </Link>

        <div className={styles.navlinkContainer}>
          {navLink.map((data, key) => {
            return (
              <Link
                href={data.linkTo}
                key={key}
                className={`mx-2 hover:text-primary transition-all ${
                  pathname.includes(data.linkTo) &&
                  data.name !== "Home" &&
                  "text-primary"
                } ${data.name === "Home" && pathname === "/" && "text-primary"}
                `}
                onClick={() => console.log(pathname)}
              >
                <Text variant="subTitle">{data.name}</Text>
              </Link>
            );
          })}
        </div>

        {user ? (
          <div className={styles.btnContainer}>
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Logout
            </Button>
            <Button
              onClick={() => {
                router.push("/profile");
              }}
            >
              Profile
            </Button>
          </div>
        ) : (
          <div className={styles.btnContainer}>
            <ButtonLink linkTo="/login">Login</ButtonLink>
            <ButtonLink variant="secondary" linkTo="/register">
              register
            </ButtonLink>
          </div>
        )}
      </div>

      <motion.nav
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        ref={containerRef}
        className={`${styles.mobileContainer} `}
      >
        <div className={styles.mobileHeader}>
          <MenuToggle toggle={() => setIsSidebarOpen()} />

          <Link href="/">
            <Image
              src={LOGO}
              height={20}
              alt="logo"
              onClick={() => setIsSidebarOpen(0)}
            />
          </Link>
          <div className="flex" onClick={() => setIsSidebarOpen(0)}>
            {user ? (
              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  setIsSidebarOpen(0);
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            ) : (
              <ButtonLink linkTo="/login">Login</ButtonLink>
            )}
          </div>
        </div>

        <motion.div
          variants={navbarItem}
          className={`${styles.mobileContent} `}
        >
          {user && (
            <Button
              onClick={() => {
                setIsSidebarOpen(0);
                router.push("/profile");
              }}
            >
              Profile
            </Button>
          )}
          {navLink.map((data, key) => {
            return (
              <Link
                href={data.linkTo}
                key={key}
                className={`mx-2 hover:text-primary my-3
                ${
                  pathname.includes(data.linkTo) &&
                  data.name !== "Home" &&
                  "text-primary"
                }
                ${data.name === "Home" && pathname === "/" && "text-primary"}
                `}
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
