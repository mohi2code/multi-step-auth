import { Steps, Form, Button, Select, Input, Spin } from 'antd';
import { InputOTP } from "antd-input-otp"; 
import { useDispatch, useSelector } from 'react-redux';
import { selectRegisterForm, sendOTP, statusEnum, verifyOTP } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const wrapperStyle = {
  width: '100%'
}

const prefixSelector = (
  <Form.Item name="phone_number_prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Select.Option value="+90">+90</Select.Option>
    </Select>
  </Form.Item>
);

function AccountTypePhoneNumber() {
  const dispatch = useDispatch()
  const registerForm = useSelector(selectRegisterForm)
  const [currentStep, setCurrentStep] = useState(0)

  const navigate = useNavigate()

  const onFinishStepOne = (values) => {
    dispatch(sendOTP(values)).then(() => setCurrentStep(1))
  }

  const onFinishStepTwo = (values) => {
    dispatch(verifyOTP(values)).then(() => navigate('/auth/register/personal_information'))
  }

  return (
    <div style={wrapperStyle}>
      <Steps
        size="small"
        labelPlacement='vertical'
        style={{marginBottom: '3rem'}}
        current={currentStep}
        items={[
          {
            title: 'Account information',
          },
          {
            title: 'Verification',
          },
        ]}
      />

      {currentStep === 0 && (
        <Form
          onFinish={onFinishStepOne}
          name='account_type_phone_number'
          initialValues={{
            phone_number_prefix: '+90',
            account_type: 'client'
          }}
          style={{maxWidth: '400px'}}
        >
          <Spin spinning={registerForm.status === statusEnum.loading}>
          <Form.Item
            name="account_type"
            label="I'm"
            rules={[
              {
                required: true,
                message: 'Account type is required',
              },
            ]}
          >
            <Select placeholder="Please select your account type">
              <Select.Option value="translator">Providing tranlsation services</Select.Option>
              <Select.Option value="client">Looking for translators</Select.Option>
            </Select>
          </Form.Item>
      
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
      
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Send verification code
            </Button>
          </Form.Item>
          </Spin>
        </Form>
      )}

      {currentStep === 1 && (
        <Form
          name='otp_verification'
          onFinish={onFinishStepTwo}
          layout='vertical'
        >
          <Spin spinning={registerForm.status === statusEnum.loading}>
          <Form.Item 
            label="Enter the verification code that was sent to you" name="otp"
            rules={[
              {
                required: true,
                message: 'Please enter the verification code',
              },
            ]}
          >
            <InputOTP wrapperStyle={{ justifyContent: 'flex-start' }} inputType="numeric" length={4} />
          </Form.Item>
      
          <Form.Item>
            <Button style={{ margin: '0 8px 0 0' }} onClick={() => setCurrentStep(0)}>
                Change phone number
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </Spin>
        </Form>
      )}
    </div>
  )
}

export default AccountTypePhoneNumber