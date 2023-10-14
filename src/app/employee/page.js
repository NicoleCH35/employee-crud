import { EmployeeList } from '@/components';
import axios from 'axios';

const Employees = async () => {
    const fetchEmployees = async () => {
        return axios.get('http://127.0.0.1:3000/api/employees')
            .then((res) => {
                console.log(res.data.employees);
                return res.data.employees;
            })
            .catch((e) => {
                console.log('e', e);
            });
    };

    const employees = await fetchEmployees();
    
    return (
        <EmployeeList employees={employees} />
    );
};

export default Employees;