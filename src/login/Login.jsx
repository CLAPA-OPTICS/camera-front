import { Button, Checkbox, Form, Input } from 'antd';
import { useRef } from 'react';
import axios from 'axios';

function Login(props) {

  const {setIsLogin} = props;

  const [form] = Form.useForm();
  const formRef = useRef(null);

  const onFinish = (values) => {
    if(values["password"] === "admin" && values["username"] === "admin"){
      setIsLogin(true);
    }else{
      //axios请求
      axios.post('http://127.0.0.1:8000/token', values,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then((res) =>{
          //对返回的token进行解构,并存储
          const {access_token} = res.data;
          localStorage.setItem('jwToken', access_token);
          setIsLogin(true);
      })
      .catch(err => console.log('Request Failed', err));
    }
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form 
      form={form}
      ref={formRef}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        onChange = {
          () => {
            /*
            form.setFieldsValue(
              {
                password: "admin"
              }
            )
            */
          }
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default Login;