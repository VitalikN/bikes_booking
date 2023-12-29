"use client";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";

import styles from "../sass/layouts/signIn.module.scss";

import * as Yup from "yup";
import { useLoginMutation } from "@/redux/authApi/authAPI";
interface FormValues {
  email: string;
  password: string;
}
interface ErrorFeedbackProps {
  name: string;
}
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong Email")
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Wrong Email")
    .required("This field is required!"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long!")
    .required("This field is required!"),
});

const SignIn = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  const handleLogin = async (values: FormValues) => {
    try {
      const response = await login(values);
      if ("data" in response) {
        console.log("успішно");
      } else {
        console.log("Невірна електронна адреса або пароль. Спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await handleLogin(values);

      resetForm();
    } catch (error) {
      console.log("Невірна електронна адреса або пароль. Спробуйте ще раз.");
    }
  };
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
                {isLoading ? "Loading...." : "Вхід"}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.text__register}>
          Don`t have an account yet?
          <Link className={styles.link__register} href="/register">
            Register now
          </Link>
        </p>
      </div>
    </section>
  );
};
export default SignIn;
