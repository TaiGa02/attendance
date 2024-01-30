"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";

interface Employee {
  id: number;
  name: string;
  email: string;
  work: boolean;
  rest: boolean;
  remote: boolean;
  out: boolean;
  startTime: Date;
  endTime: Date;
}


async function fetchEmployees() {
  const res = await fetch(`/api/admin`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.employees;
}

enum Tab {
  All,
  Available,
}

export default function Office() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const [hoveredEmployee, setHoveredEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All); // Default to show all

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      const sortedData = data.sort((a: Employee, b: Employee) => a.id - b.id);
      setEmployees(sortedData);
    };

    fetchData();

    const interval = setInterval(fetchData, 1 * 60 * 1000);

    const resetDailyData = async () => {
      await fetch(`/api/resetDailyData`, { method: 'POST' });
    };

    const midnightResetInterval = setInterval(resetDailyData, 1 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(midnightResetInterval);
    };
  }, []);

  const handleMouseEnter = (employee: Employee) => {
    setHoveredEmployee(employee);
  };

  const handleMouseLeave = () => {
    setHoveredEmployee(null);
  };

  const handleSubmit = (newKeyword: string) => {
    setKeyword(newKeyword);
    router.push(`/resultOffice?keyword=${newKeyword}`);
  };

  const renderStatusIcon = (employee: Employee) => {
    if (employee.work && !employee.remote && !employee.rest && !employee.out) {
      return <div className="rounded-full w-4 h-4 bg-pink-500"></div>;
    } else if (employee.work && employee.remote && !employee.rest && !employee.out) {
      return <div className="rounded-full w-4 h-4 bg-blue-500"></div>;
    } else if (employee.out) {
      return <div className="rounded-full w-4 h-4 bg-gray-500"></div>;
    } else if (employee.rest){
      return <div className="rounded-full w-4 h-4 bg-green-500"></div>;
    } else if (!employee.work){
        return <div className="rounded-full w-4 h-4 bg-gray-500"></div>;
    }
  };

  function formatTime(date: Date | null | string): string {
    if (!date) {
      return '';
    }

    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    let hours = parsedDate.getHours().toString();
    let mins = parsedDate.getMinutes().toString();

    if (hours.length === 1) {
      hours = "0" + hours;
    }
    if (mins.length === 1) {
      mins = "0" + mins;
    }

    return `${hours}:${mins}`;
  }

  const filteredEmployees = employees.filter((employee) => {
    if (activeTab === Tab.All) {
      return true;
    } else if (activeTab === Tab.Available) {
      return employee.work && !employee.remote && !employee.rest && !employee.out;
    }
    return true;
  });

  return (
    <>
      <Nav onSubmit={handleSubmit} />
      <main>
        <div className="flex flex-col text-center">
          {/* タブ */}
          <div className="flex space-x-4 my-4 justify-center">
            <button
              className={`border border-blue-500 text-sm px-4 py-2 rounded ${activeTab === Tab.All ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => setActiveTab(Tab.All)}
            >
              全体
            </button>
            <button
              className={`border border-pink-500 text-sm px-4 py-2 rounded ${activeTab === Tab.Available ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'}`}
              onClick={() => setActiveTab(Tab.Available)}
            >
              オフィス内対応可能
            </button>
          </div>

          {/* テーブル */}
          <table className="border-collapse border w-full mt-4">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="border-r p-2">名前</th>
                <th className="border-r p-2">出勤時間</th>
                <th className="border-r p-2">退勤時間</th>
                <th className="border-r p-2">状態</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee: Employee) => (
                <tr key={employee.id} className="border-b">
                  <td
                    className="border-r p-2"
                    onMouseEnter={() => handleMouseEnter(employee)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {employee.name}
                    {hoveredEmployee && hoveredEmployee.id === employee.id && (
                      <div className="text-xs text-blue-500">{employee.email}</div>
                    )}
                  </td>
                  <td className="border-r p-2">{employee.startTime ? formatTime(employee.startTime) : ''}</td>
                  <td className="border-r p-2">{employee.endTime ? formatTime(employee.endTime) : ''}</td>
                  <td className="border-r p-2 flex items-center justify-center">{renderStatusIcon(employee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
