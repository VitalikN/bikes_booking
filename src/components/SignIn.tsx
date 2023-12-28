"use client";

import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <p>
        Don`t have an account yet?
        <Link href="/register">Register now</Link>
      </p>
    </>
  );
};
export default SignIn;
