"use client";
import Link from "next/link";
import { Field, Form, Formik } from "formik";

import styles from "../sass/layouts/signIn.module.scss";

import ToastProvider from "./ToastProvider";
import { validationSchema } from "../utils/Schema";
import { ErrorFeedback, useSignInForm } from "./hooks";
import authSelector from "@/redux/authApi/authSelector";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Linkedin from "./Linkedin";

const SignIn = () => {
  const { handleSubmit, isLoading } = useSignInForm();
  const router = useRouter();

  const token = useSelector(authSelector.selectToken);
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <section>
      <div className={`${styles.container} `}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Email:
                  <Field
                    className={styles.input}
                    type="email"
                    name="email"
                    error={touched.email && errors.email}
                  />
                </label>
                <ErrorFeedback name="email" />
              </div>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Password:
                  <Field
                    className={styles.input}
                    type="password"
                    name="password"
                    error={touched.password && errors.password}
                  />
                </label>

                <ErrorFeedback name="password" />
              </div>
              <button className={styles.styledBtn} type="submit">
                {isLoading ? "Loading...." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>
        <Linkedin />
        <p className={styles.text__register}>
          Don`t have an account yet?
          <Link className={styles.link__register} href="/register">
            Register now
          </Link>
        </p>
        <ToastProvider />
      </div>
    </section>
  );
};
export default SignIn;
