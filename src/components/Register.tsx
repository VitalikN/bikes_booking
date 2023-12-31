"use client";

"use client";
import Link from "next/link";
import { Field, Form, Formik } from "formik";

import { validationSchemaRegister } from "../utils/Schema";

import styles from "../sass/layouts/signIn.module.scss";
import { useRegisterForm } from "./hooks";
import ToastProvider from "./ToastProvider";

const Register = () => {
  const { handleSubmit, ErrorFeedback, isLoading } = useRegisterForm();

  return (
    <section>
      <div className={`${styles.container} `}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaRegister}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Name:
                  <Field
                    className={styles.input}
                    type="text"
                    name="name"
                    error={touched.name && errors.name}
                  />
                </label>

                <ErrorFeedback name="name" />
              </div>
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
                {isLoading ? "Loading...." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.text__register}>
          Already have an account?
          <Link className={styles.link__register} href="/sign_in">
            Sign in
          </Link>
        </p>
        <ToastProvider />
      </div>
    </section>
  );
};

export default Register;
