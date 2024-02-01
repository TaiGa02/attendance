"use client";


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";

interface Employee {
  id: number;
  name: string;
  monthly_overtime: number;
  monthly_time: number;
}


async function fetchEmployees() {
  const res = await fetch(`/api/admin`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.employees;
}

export default function Admin() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();

      const sortedData = data.sort((a: Employee, b: Employee) => {
        if (b.monthly_overtime !== a.monthly_overtime) {
          return b.monthly_overtime - a.monthly_overtime;
        } else {
          return b.monthly_time - a.monthly_time;
        }
      });

      setEmployees(sortedData);
    };

    fetchData();

    const resetMonthly = async () => {
      await fetch(`/api/resetMonthly`, { method: 'POST' });
    };

    const monthlyInterval = setInterval(resetMonthly,  1000);
    return () => {
      clearInterval(monthlyInterval);
    };
  }, []);

  const handleSubmit = (newKeyword: string) => {
    setKeyword(newKeyword);
    router.push(`/resultAdmin?keyword=${newKeyword}`);
  };


  return (
    <>
      <Nav onSubmit={handleSubmit} />
      <main>
        <div className="flex flex-col text-center">
          <table className="border-collapse border w-full mt-4">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="border-r p-2">名前</th>
                <th className="border-r p-2">今月の労働時間</th>
                <th className="p-2">
                  今月の残業時間 ▼
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee: Employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="border-r p-2">{employee.name}</td>
                  <td className="border-r p-2">{employee.monthly_time}</td>
                  <td className="p-2">{employee.monthly_overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
