import { useState } from "react"
import { Steps, Form, Spin, Button, Select, Input } from "antd"
import { useNavigate } from "react-router-dom";

const wrapperStyle = {
  width: '100%'
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function PersonalInfo() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [formPersonal] = Form.useForm()
  const [formAddress] = Form.useForm()

  function onFinishPersonal() {
    setStep(1)
  }

  function onFinishAddress() {
    setLoading(true)
    // fetch data & register
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div style={wrapperStyle}>
      <Steps
        size="small"
        labelPlacement='vertical'
        style={{marginBottom: '3rem'}}
        current={step}
        items={[
          {
            title: 'Account Information',
          },
          {
            title: 'Address',
          },
        ]}
      />

      <Spin spinning={loading}>
        {step === 0 && (
          <Form
            form={formPersonal}
            onFinish={onFinishPersonal}
            // layout="vertical"
            {...formItemLayout}
            style={{maxWidth: '500px'}}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: 'Please select a Country!',
                },
              ]}
            >
              <Select placeholder="select your country">
                <Select.Option value="Turkey">Turkey</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Continue
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 1 && (
          <Form
            form={formAddress}
            onFinish={onFinishAddress}
            // layout="vertical"
            {...formItemLayout}
            style={{maxWidth: '500px'}}
          >
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: 'Please input your City!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address1"
              label="Address1"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="postal_code"
              label="Postal Code"
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button style={{ margin: '0 8px 0 0' }} onClick={() => setStep(0)}>
                Prev
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Spin>
    </div>
  )
}

export default PersonalInfo