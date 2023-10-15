import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';

const AddEmployee = () => {
    return (
        <Link href={"/employee/create"}>
            <Button type="primary" icon={<UserAddOutlined />}>
                Add Employee
            </Button>
        </Link>
    );
};

export default AddEmployee;