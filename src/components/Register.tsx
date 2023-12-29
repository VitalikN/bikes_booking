"use client";

"use client";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";

import styles from "../sass/layouts/signIn.module.scss";

import * as Yup from "yup";
import { useRegisterMutation } from "@/redux/authApi/authAPI";

interface ErrorFeedbackProps {
  name: string;
}
interface FormValuesRegister {
  name: string;
  email: string;
  password: string;
}
export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum length is 2 characters")
    .matches(/^[A-Za-z\s]+$/, "Wrong Fullname")
    .required("This field is required!"),
  email: Yup.string()
    .email("Wrong Email")
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Wrong Email")
    .required("This field is required!"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long!")
    .required("This field is required!"),
});

const Register = () => {
  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  const handleRegister = async (values: FormValuesRegister) => {
    try {
      const response = await register(values);
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
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await handleRegister(values);

      resetForm();
    } catch (error) {
      console.log("Невірна електронна адреса або пароль. Спробуйте ще раз.");
    }
  };
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
                {isLoading ? "Loading...." : "Вхід"}
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
      </div>
    </section>
  );
};

export default Register;
