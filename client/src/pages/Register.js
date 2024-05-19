import { Button, Form, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// function Register() {
//   const [form] = Form.useForm();

//   const [loading, setLoading] = useState(false);
//   const onFinish = async (values) => {
//     // const onFinish = () => {
//     //   setLoading(true);
//     //   setTimeout(() => {
//     //     setLoading(false);
//     //   }, 1000);
//     // };
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:3005/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: values.username,
//           email: values.email,
//           password: values.password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Registration failed: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log("Registration successful:", data);
//       // logic for redirecting to the login page
//     } catch (error) {
//       console.error("Registration failed:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3005/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/login");
      // Redirect to login page or perform other actions
    } catch (error) {
      console.error("Registration failed:", error.message);
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
        Login to your Invoice Generator{" "}
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
          label={"Name"}
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
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
        {/* <span>Forgot password?</span> */}
        <div>
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Register
          </Button>
        </div>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
