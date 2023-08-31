import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, selectLoginForm, statusEnum } from './authSlice';
import { useEffect } from 'react';

const pageStyle = { 
  minHeight: '100vh', 
  display: "flex", 
  flexDirection: 'column' ,
}

const formStyle = {
  width: '100%',
  maxWidth: '500px',
  margin: 'auto'
}

function Login() {
  const dispatch = useDispatch()
  const loginForm = useSelector(selectLoginForm)
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = ({ email, password }) => {
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (loginForm.status === statusEnum.failed)
      messageApi.error(loginForm.error)
    else if (loginForm.status === statusEnum.loading)
      message.loading('In progress')
    else if (loginForm.status === statusEnum.succeeded)
      message.success('Login successful').then(() => navigate('/'))
  }, [loginForm?.status])

  return (
    <main style={pageStyle}>
      {contextHolder}
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={formStyle}
        disabled={loginForm.status === statusEnum.loading}
      >
      <Spin spinning={loginForm?.status === statusEnum.loading}>
        <Typography.Title level={2} style={{marginBottom: '2rem'}}>
          Login
        </Typography.Title>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input type="email" prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to="" >
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button loading={loginForm.status === statusEnum.loading} type="primary" htmlType="submit">
            Log in
          </Button>
          Or <Link to="/auth/register">Register now!</Link>
        </Form.Item>
      </Spin>
      </Form>
    </main>
  )
}

export default Login