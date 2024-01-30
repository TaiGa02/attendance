"use client";


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";




export default function Enrol() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSubmit = (newKeyword: string) => {
    setKeyword(newKeyword);
    router.push(`/resultAdmin?keyword=${newKeyword}`);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    // 登録前にバリデーションを実行
    // 必要に応じて他のバリデーションルールを追加できます

    if (
      formData.password !== formData.confirmPassword ||
      formData.password.length < 8 ||
      !/(?=.*\d)(?=.*[A-Z])/.test(formData.password)
    ) {
      alert("パスワードが要件を満たしていません");
      return;
    }

    // 登録ロジックを実行
    try {
      const response = await fetch(`/api/enrol`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        router.push("/admin");
        // 成功ページにリダイレクトしたり、その他の必要なアクションを実行したりします
      } else {
        console.error("登録に失敗しました");
        alert("登録に失敗しました");
      }
    } catch (error) {
      console.error("登録中にエラーが発生しました", error);
      alert("登録中にエラーが発生しました");
    }
  };

  return (
    <>
      <Nav onSubmit={handleSubmit}/>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">新規登録</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">名前:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">メールアドレス:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">パスワード:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">パスワード確認:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            登録
          </button>
        </form>
      </main>
    </>
  );
}
