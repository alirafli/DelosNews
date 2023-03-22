import React, { FC } from "react";
import { Button, Input, Meta, Text } from "@components/elements";
import styles from "@styles/Login.module.css";
import { LoginParams } from "@types";
import * as yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import Link from "next/link";

export const registerSchema = yup.object().shape({
  username: yup.string().min(6).required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(8).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const onSubmit = async (values: LoginParams) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Meta subTitle="Register" />

      <div className={styles.boxWrapper}>
        <Text variant="jumboSubTitle" className="mb-3">
          Register
        </Text>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
            <Field
              as={Input}
              label="Username"
              name="username"
              type="text"
              placeholder="Input your username"
              error={<ErrorMessage name="username" />}
            />

            <Field
              as={Input}
              label="Email"
              name="email"
              type="email"
              placeholder="Input your email"
              error={<ErrorMessage name="email" />}
            />

            <Field
              as={Input}
              label="Password"
              name="password"
              type="password"
              placeholder="Input your password"
              error={<ErrorMessage name="password" />}
            />

            <Field
              as={Input}
              label="Comfirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Comfirm your password"
              error={<ErrorMessage name="confirmPassword" />}
            />

            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
        <Text variant="p">
          have an account?{" "}
          <Link href="login" className={styles.registerText}>
            Login here!
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Register;
