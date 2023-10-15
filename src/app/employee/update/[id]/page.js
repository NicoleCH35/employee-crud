import { EmployeeForm } from '@/components';

const EmployeeUpdate = async ({ params }) => {
    const { id } = params;

    const fetchEmployee = async () => {
        return fetch(`http://localhost:3000/api/employees/${id}`, {
            method: 'GET',
            cache: 'no-store',
        })
            .then(async (res) => {
                const data = await res.json();
                return data.employee;
            })
            .catch((e) => {
                console.log('e', e);
            });
    };

    const employee = await fetchEmployee();

    return (
        <EmployeeForm
            {...employee}
            address={{
                street_number: employee.street_number,
                street: employee.street,
                city: employee.city,
                country: employee.country,
                zip_code: employee.zip_code,
            }}
        />
    );
};

export default EmployeeUpdate;