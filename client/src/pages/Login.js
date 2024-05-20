import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const onFinish = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://invoice-app-steel-seven.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }
      const data = await response.json();
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, id: data.userId })
      );
      window.location.reload();
    } catch (error) {
      alert(error.message);
      // console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_container">
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Login to your Invoice Generator
      </h3>
      <Form
        form={form}
        name="login"
        // labelCol={{
        //   span: 12,
        // }}
        style={{
          maxWidth: 300,
          margin: "0 auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="auth_form"
      >
        <Form.Item
          label={"Email"}
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            // {
            //   pattern: emailValidateRegex,
            //   message: "Invalid Format",
            // },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            // {
            //   pattern: emailValidateRegex,
            //   message: "Invalid Format",
            // },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <span
          style={{
            color: "#1677FF",
            cursor: "pointer",
          }}
        >
          Forgot password?
        </span>
        <div
          style={{
            marginTop: "6px",
          }}
        >
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
        </div>
        <p>
          Don't have an account? <Link to="/register">Sign up now</Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
