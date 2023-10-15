import { EmployeeList } from "@/components";

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
    return data;
  } catch (e) {
    console.log("Error fetching employees", e);
  }
};

export default async function Home() {
  const { employees } = await fetchEmployees();
  return (
    <EmployeeList employees={employees} />
  )
}
