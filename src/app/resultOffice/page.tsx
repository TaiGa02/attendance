"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";
import useSWR from "swr";

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

  const useSuspenseSearchParams = async () => {
    const searchParams = await useSearchParams();
    return searchParams;
  };


  async function fetchResult(keyword: string | null) {
    try {
      if (!keyword) {
        const result = await fetch(`/api/admin`);
        const data = await result.json();
        return data.resultEmployee.sort((a: Employee, b: Employee) => a.id - b.id);
      }
  
      const result = await fetch(`/api/admin`, {
        method: "POST",
        body: JSON.stringify({ keyword }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await result.json();
      return data.resultEmployee.sort((a: Employee, b: Employee) => a.id - b.id);
    } catch (error) {
      console.error("Error fetching results:", error);
      return [];
    }
  }
  

  export default function ResultOffice() {
    const [hoveredEmployee, setHoveredEmployee] = useState<Employee | null>(null);
    const router = useRouter();
    const searchParams = useSuspenseSearchParams();
    const [keyword, setKeyword] = useState<string | null>(null);

    useEffect(() => {
        // Promiseから値を取り出すために.thenを使用
        searchParams.then((params) => {
          setKeyword(params.get("keyword"));
        });
      }, [searchParams]);

      const resultEmployees = useSWR(["/api/admin", keyword], () => fetchResult(keyword));

      const handleSubmit = (newKeyword: string) => {
        // 検索ボタンがクリックされたときに呼ばれるハンドラー
        setKeyword(newKeyword);
        router.push(`/resultOffice?keyword=${newKeyword}`);
      };
  
    useEffect(() => {
      const fetchData = async () => {
  
          const data = await fetchResult(keyword);
        };
      
  
        fetchData();
  
      const interval = setInterval(fetchData, 1 * 60 * 1000);
  
      const resetDailyData = async () => {
        await fetch(`/api/resetDailyData`, { method: 'POST' });
      };
  
      const midnightResetInterval = setInterval(resetDailyData,  1000);
  
      return () => {
        clearInterval(interval);
        clearInterval(midnightResetInterval);
      };
    }, [keyword]);
  

  const handleMouseEnter = (employee: Employee) => {
    setHoveredEmployee(employee);
  };

  const handleMouseLeave = () => {
    setHoveredEmployee(null);
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
  

  return (
    <>
       <Nav onSubmit={handleSubmit} />
      <main>
        <div className="flex flex-col text-center">
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
              {resultEmployees.data?.map((employee: Employee) => (
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
