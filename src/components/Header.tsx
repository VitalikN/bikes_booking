"use client";

import Link from "next/link";
import { saira, saira_Stencil_One } from "@/utils/fonts";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

import ToastProvider from "./ToastProvider";
import styles from "../sass/layouts/header.module.scss";
import { useHeader } from "./hooks";

const Header: React.FC = () => {
  const { token, nameUser, handleLogout } = useHeader();

  return (
    <header className={`${styles.header__section} ${saira.className} `}>
      <div className={`${styles.container} ${styles.header__container}`}>
        <h1 className={`${styles.header__logo} ${saira_Stencil_One.className}`}>
          ADMIN.BIKE-BOOKING.COM
        </h1>
        <nav className={styles.header__nav}>
          <Link className={`${styles.header__icon} `} href="/">
            <FaHome />
          </Link>
          {token ? (
            <>
              <h2
                className={`${styles.header__logo} ${saira_Stencil_One.className}`}
              >
                {nameUser}
              </h2>
              <LuLogOut
                onClick={handleLogout}
                className={styles.header__icon}
              />
            </>
          ) : (
            <Link className={styles.header__link} href="/sign_in">
              Sign in
            </Link>
          )}
        </nav>
        <ToastProvider />
      </div>
    </header>
  );
};
export default Header;
