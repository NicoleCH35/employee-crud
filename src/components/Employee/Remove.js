'use client';

import React, { useState } from 'react';
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';

const RemoveEmployee = (props) => {
    const { id } = props;
    const router = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const deleteEmployee = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
                method: "DELETE"
            });
            if (!res.ok){
              throw Error("Failed to delete employee");
            }
            router.refresh();
        } catch(e) {
            console.log('Error occurred while trying to delete an employee.', e);
        }
    };

    return (
        <Popconfirm
            open={confirmOpen}
            title="Delete"
            description="Are you sure to delete this employee?"
            onConfirm={deleteEmployee}
            onCancel={() => { setConfirmOpen(false); }}
            okText="Yes"
            cancelText="No"
            icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red',
                  }}
                />
            }
        >
            <CloseCircleOutlined style={{ color: 'red' }} onClick={() => { setConfirmOpen(true); }} />
        </Popconfirm>
    );
};

export default RemoveEmployee;