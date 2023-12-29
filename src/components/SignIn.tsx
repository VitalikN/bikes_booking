"use client";

import Link from "next/link";

const SignIn = () => {
  return (
    <section>
      <p>
        Don`t have an account yet?
        <Link href="/register">Register now</Link>
      </p>
    </section>
  );
};
export default SignIn;
