"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { useAddBikeFormik } from "./hooks";
import { validationSchemaAdd } from "@/utils/Schema";
import { ErrorFeedbackProps, initialValuesAdd } from "@/utils/type";
import styles from "../sass/layouts/addBike.module.scss";

const AddBike = ({ refetch }: any) => {
  const { id, value, setValue, size, setSize, handleSubmit } = useAddBikeFormik(
    { refetch }
  );

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => (
          <span className={styles.error__add}>{errorMessage}</span>
        )}
      </ErrorMessage>
    );
  };

  return (
    <div className={styles.container__form}>
      <Formik
        initialValues={initialValuesAdd}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaAdd}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.form__box__flex}>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  placeholder="Name"
                  type="text"
                  name="name"
                  error={touched.name && errors.name}
                />
                <ErrorFeedback name="name" />
              </div>
              <div className={styles.form__box}>
                <Field
                  component="select"
                  className={styles.input}
                  name="type"
                  error={touched.type && errors.type}
                >
                  <option value="" disabled>
                    Type
                  </option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Unavailable">Unavailable</option>
                </Field>
                <ErrorFeedback name="type" />
              </div>
            </div>
            <div className={styles.form__box__flex}>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  placeholder="Color"
                  type="text"
                  name="color"
                  error={touched.color && errors.color}
                />
                <ErrorFeedback name="color" />
              </div>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  placeholder={"Wheel size"}
                  type="number"
                  name="size"
                  value={size}
                  onChange={(e: any) => setSize(e.target.value)}
                  error={touched.size && errors.size}
                />
                <ErrorFeedback name="size" />
              </div>
            </div>
            <div className={styles.form__box__flex}>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  placeholder={"Price"}
                  type="number"
                  name="price"
                  value={value}
                  onChange={(e: any) => setValue(e.target.value)}
                  error={touched.price && errors.price}
                />
                <ErrorFeedback name="price" />
              </div>
              <div className={styles.form__box}>
                <Field
                  className={styles.input}
                  type="text"
                  name="id"
                  value={id}
                  error={touched.id && errors.id}
                  disabled
                />
                <ErrorFeedback name="id" />
              </div>
            </div>
            <div
              className={`${styles.form__box}  ${styles.form__box__textarea}`}
            >
              <Field
                className={`${styles.input} ${styles.textarea} ${
                  errors.description && touched.description
                    ? styles.errorBorder
                    : "none"
                }`}
                placeholder="Description"
                id="text"
                as="textarea"
                name="description"
                error={touched.description && errors.description}
              />

              <ErrorFeedback name="description" />
            </div>
            <div className={styles.form__box__flex}>
              <button className={styles.styledBtn} type="submit">
                SAVE
              </button>
              <button className={styles.styledBtn} type="reset">
                CLEAR
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBike;
