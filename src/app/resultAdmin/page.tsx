"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";
import useSWR from "swr";

interface Employee {
  id: number;
  name: string;
  monthly_overtime: number;
  monthly_time: number;
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

export default function Admin() {
  const router = useRouter();

  // useSuspenseSearchParams関数を即時実行関数内で呼び出し
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
    setKeyword(newKeyword);
    router.push(`/resultAdmin?keyword=${newKeyword}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResult(keyword);
    };

    fetchData();

    const resetMonthly = async () => {
      await fetch(`/api/resetMonthly`, { method: 'POST' });
    };

    const monthlyInterval = setInterval(resetMonthly, 12 * 60 * 60 * 1000);
    return () => {
      clearInterval(monthlyInterval);
    };
  }, [keyword]);

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
                <th className="p-2">今月の残業時間</th>
              </tr>
            </thead>
            <tbody>
              {resultEmployees.data?.map((employee: Employee) => (
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
