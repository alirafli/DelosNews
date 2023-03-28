import React, { FC, useState } from "react";
import { Button, Input, Meta, Text } from "@components/elements";
import styles from "@styles/Login.module.css";
import { LoginParams } from "@types";
import * as yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import Link from "next/link";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { AuthRoute } from "@components/modules";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(8).required("Required"),
});

const Login: FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = async (values: LoginParams) => {
    try {
      setisLoading(true);
      await login(values.email, values.password);
      router.push("/");
    } catch (error) {
      alert(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <AuthRoute>
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

              <Button type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </Form>
          </Formik>
          <Text variant="p">
            Don&apos;t have an account yet?{" "}
            <Link href="register" className={styles.registerText}>
              Register here!
            </Link>
          </Text>
        </div>
      </div>
    </AuthRoute>
  );
};

export default Login;
