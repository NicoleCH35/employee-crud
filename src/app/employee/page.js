import { EmployeeList } from '@/components';

const Employees = async () => {
    const fetchEmployees = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/employees', {
            method: 'GET',
            cache: 'no-store',
          });
      
          if (!res.ok){
            throw Error("Failed to fetch employees");
          }
          const data = await res.json();
          return data.employees;
        } catch (e) {
          console.log("Error fetching employees", e);
        }
    };

    const employees = await fetchEmployees();
    
    return (
        <EmployeeList employees={employees} />
    );
};

export default Employees;