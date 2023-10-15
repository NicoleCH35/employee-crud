'use client';

import React from 'react';
import { Space, Table, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Link from 'next/link';
import RemoveEmployee from './Remove';

const List = (props) => {
    const { employees } = props;
    const { Text } = Typography;

    const columns = [
        {
          title: 'Firstname',
          dataIndex: 'firstname',
          key: 'firstname',
        },
        {
          title: 'Lastname',
          dataIndex: 'lastname',
          key: 'lastname',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          render: (_, record) => {
            return <Tag color='blue'>{record.role}</Tag>
          }
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          key: 'salary',
          render: (_, record) => {
            return (
            <Text>{(record.salary).toLocaleString('en-ZA', {
                style: 'currency',
                currency: 'ZAR'
              })}
            </Text>)
          }
        },
        {
          title: 'Address',
          key: 'address',
          render: (_, record) => {
            const addressKeys = ['street_number', 'street', 'city', 'country', 'zip_code'];
            const address = Object.keys(record).reduce((ac, key) => {
              if (addressKeys.includes(key)){
                ac.push(record[key]);
              }
              return ac;
            }, []);
            return <Text>{address.join(", ")}</Text>
          },
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Link href={`/employee/update/${record.id}`}>
                <EditOutlined />
              </Link>
              <RemoveEmployee id={record.id} />
            </Space>
          ),
        },
    ];

    return (
        <Table columns={columns} dataSource={employees} rowKey={(record) => { return record.id; }} />
    );
};

export default List;