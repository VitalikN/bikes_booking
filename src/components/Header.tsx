"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { saira, saira_Stencil_One } from "@/utils/fonts";
import styles from "../sass/layouts/header.module.scss";

const Header: React.FC = () => {
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
          <Link className={styles.header__link} href="/sign_in">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
