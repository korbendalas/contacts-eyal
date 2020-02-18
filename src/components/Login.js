import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { Form, Icon, Input, Button, Card, Typography } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION } from "../services/query";
import { useAuth } from "../auth-context";

const { Title } = Typography;

const Login = props => {
  const initialValues = {
    email: "",
    password: ""
  };
  const { authenticate } = useAuth();

  const [login, { data }] = useMutation(LOGIN_MUTATION);
  const token = data?.login?.token;

  React.useEffect(() => {
    if (token) {
      authenticate(token);
    }
  }, [token]);

  return (
    <Card style={{ width: "600px", margin: "150px auto" }}>
      <Title level={2}>Sign In</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          login({
            variables: {
              payload: values
            }
          });
        }}
      >
        {props => (
          <FormikForm>
            <div>
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  name="email"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  name="password"
                />

                {props.errors.password && (
                  <div id="feedback">{props.errors.password}</div>
                )}
              </Form.Item>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Card>
  );
};
export default Login;
