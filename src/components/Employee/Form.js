'use client';

import React from 'react';
import { Col, Form, Row, Typography, Input, InputNumber, Button, Space } from 'antd';
import { useRouter } from 'next/navigation';

const EmployeeForm = (props) => {
    const { id, firstname, lastname, role, salary, address } = props;
    const { Title } = Typography;

    const router = useRouter();

    const create = async (values) => {
        try {
            const res = await fetch('http://localhost:3000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...values,
                    address: {
                        street_number: values.street_number,
                        street: values.street,
                        city: values.city,
                        country: values.country,
                        zip_code: values.zip_code,
                    }
                })
            });
            if (!res.ok){
              throw Error("Failed to create employee");
            }
            router.push('/');
        } catch(e) {
            console.log('Error occurred while trying to create new employee.');
        }
    };

    const update = async (values) => {
        try {
            const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...values,
                    address: {
                        street_number: values.street_number,
                        street: values.street,
                        city: values.city,
                        country: values.country,
                        zip_code: values.zip_code,
                    }
                })
            });
            if (!res.ok){
              throw Error("Failed to update employee");
            }
            router.refresh();
            router.push('/');
        } catch(e) {
            console.log('Error occurred while trying to update an employee.');
        }
    };

    const onFinish = async (values) => {
        if (!id){
            create(values);
        } else {
            update(values);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name='employeeForm'
            initialValues={{
                firstname,
                lastname,
                role,
                salary,
                street_number: address?.street_number || null,
                street: address?.street || null,
                city: address?.city || null,
                country: address?.country || null,
                zip_code: address?.zip_code || null,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Title level={4}>Personal Details</Title>
            <Row gutter={16}>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Firstname"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Lastname"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your lastname!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Title level={5}>Address</Title>
            <Row gutter={16}>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Street Number"
                        name="street_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your street number!',
                            },
                        ]}
                        >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Street Name"
                        name="street"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your street name!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your city!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Zip Code"
                        name="zip_code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your zip code!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Title level={4}>Company Details</Title>
            <Row gutter={16}>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your role!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Salary"
                        name="salary"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your salary!',
                            },
                        ]}
                        >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Space>
                <Button
                    type='default'
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Submit
                </Button>
            </Space>
        </Form>
    );
};

export default EmployeeForm;