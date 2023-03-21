import React, { FC } from "react";
import { Button, Input, Meta, Text } from "@components/elements";
import styles from "@styles/Login.module.css";
import { LoginParams } from "@types";
import * as yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(8).required("Required"),
});

const Login: FC = () => {
  const onSubmit = async (values: LoginParams) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Meta subTitle="Login" />

      <div className={styles.boxWrapper}>
        <Text variant="jumboSubTitle" className="mb-3">
          Login
        </Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
            <Field
              as={Input}
              label="email"
              name="email"
              type="email"
              placeholder="Input your email"
              error={<ErrorMessage name="email" />}
            />

            <Field
              as={Input}
              label="password"
              name="password"
              type="password"
              placeholder="Input your password"
              error={<ErrorMessage name="password" />}
            />

            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
