"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  attendanceType: string;
  isRemoteWork: boolean;
  setIsRemoteWork: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ isOpen, onClose, attendanceType, isRemoteWork, setIsRemoteWork }) => {
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isMounted, setIsMounted] = useState(true);
  const router = useRouter();


  let formName = typeof document !== 'undefined' ? document.getElementById("formName") : null;
  if (formName) {
    formName.innerHTML = attendanceType;
  }

  let remote = typeof document !== 'undefined' ? document.getElementById("remote") : null;
  if (remote && attendanceType !== "出勤") {
    remote.classList.add("hidden");
  }

  const handleAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/confirm`, {
        method: 'POST',
        body: JSON.stringify({ adminName, adminPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Successful response, you can handle the success case here
        console.log('Admin login successful');
        router.push("/admin");

      } else {
        // Handle the error case here
        console.error('Admin login failed');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
    } finally {
      if (isMounted) {
        onClose();
        setAdminName('');
        setAdminPassword('');
      }
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/setAttendance`, {
        method: 'PUT',
        body: JSON.stringify({ name: adminName, password: adminPassword, work: true, remote: isRemoteWork }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("出勤しました");
        alert("おはようございます！\n今日も頑張りましょう");
      } else if (responseData.message === "InvalidCredentials") {
        alert("名前またはパスワードが違います");
      } else if (responseData.message === "AlreadyWorking") {
        alert("既に出勤しています");
      } else {
        console.log("出勤登録失敗しました");
      }
    } catch (error) {
      console.log("エラーが発生しました")
    } finally {
      if (isMounted) {
        onClose();
        setAdminName('');
        setAdminPassword('');
        setIsRemoteWork(false);
      }
      onClose();
      setAdminName('');
      setAdminPassword('');
      setIsRemoteWork(false);
    }

  };

  const handleLeave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/leaveOffice`, {
        method: 'PUT',
        body: JSON.stringify({ name: adminName, password: adminPassword, work: false, remote: false, rest: false, out: false }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("退勤しました");
        alert("お疲れ様でした！");
      } else if (responseData.message === "InvalidCredentials") {
        alert("名前またはパスワードが違います");
      } else if (responseData.message === "AlreadyLeaving") {
        alert("出勤していません");
      } else {
        console.log("退勤登録失敗しました");
      }
    } catch (error) {
      console.log("エラーが発生しました")
    } finally {
      if (isMounted) {
        onClose();
        setAdminName('');
        setAdminPassword('');
        setIsRemoteWork(false);
      }
      onClose();
      setAdminName('');
      setAdminPassword('');
      setIsRemoteWork(false);
    }

  };

  const handleRest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/rest`, {
        method: 'PUT',
        body: JSON.stringify({ name: adminName, password: adminPassword, rest: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("休憩開始");
        alert("休憩開始です！");
      } else if (responseData.message === "InvalidCredentials") {
        alert("名前またはパスワードが違います");
      } else if (responseData.message === "AlreadyLeaving") {
        alert("出勤していません");
      } else {
        console.log("休憩登録失敗しました");
      }
    } catch (error) {
      console.log("エラーが発生しました")
    } finally {
      if (isMounted) {
        onClose();
        setAdminName('');
        setAdminPassword('');
        setIsRemoteWork(false);
      }
      onClose();
      setAdminName('');
      setAdminPassword('');
      setIsRemoteWork(false);
    }

  };

  const handleOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/out`, {
        method: 'PUT',
        body: JSON.stringify({ name: adminName, password: adminPassword, out: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (responseData.message === "AlreadyOut") {
        alert("既に外回りが始まっています");
      }
      else if (response.ok) {
        console.log("外回り出発");
        alert("行ってらっしゃい！");
      } else if (responseData.message === "InvalidCredentials") {
        alert("名前またはパスワードが違います");
      } else if (responseData.message === "AlreadyLeaving") {
        alert("出勤していません");
      } else if (responseData.message === "AlreadyOut") {
        alert("既に外回り開始しています");
      }
      else {
        console.log("外回り登録失敗しました");
      }
    } catch (error) {
      console.log("エラーが発生しました")
    } finally {
      if (isMounted) {
        onClose();
        setAdminName('');
        setAdminPassword('');
        setIsRemoteWork(false);
      }
      onClose();
      setAdminName('');
      setAdminPassword('');
      setIsRemoteWork(false);
    }

  };

  const handleBack = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/back`, {
        method: 'PUT',
        body: JSON.stringify({ name: adminName, password: adminPassword, out: false }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("帰社");
        alert("おかえりなさい！");
      } else if (responseData.message === "InvalidCredentials") {
        alert("名前またはパスワードが違います");
      } else if (responseData.message === "AlreadyLeaving") {
        alert("出勤していません");
      } else if (responseData.message === "AlreadyBack") {
        alert("既に帰社しています");
      }
      else {
        console.log("帰社登録失敗しました");
      }
    } catch (error) {
      console.log("エラーが発生しました");
    } finally {
      if (isMounted) {
        onClose();
        setAdminName('');
        setAdminPassword('');
        setIsRemoteWork(false);
      }
      onClose();
      setAdminName('');
      setAdminPassword('');
      setIsRemoteWork(false);
    }

  };

  useEffect(() => {
    return () => {
      // Component unmounted
      setIsMounted(false);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md h-auto">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold mb-4" id="formName"></h2>
              <div className="flex flex-col">
                <form onSubmit={attendanceType === '管理者ページ' ? handleAdminSubmit : attendanceType === "出勤" ? handleEmployeeSubmit : attendanceType === "退勤" ? handleLeave : attendanceType === "休憩" ? handleRest : attendanceType === "外回り" ? handleOut : attendanceType === "帰社" ? handleBack : undefined}>
                  <label>社員名</label>
                  <input
                    type="text"
                    placeholder="名前を入力してください"
                    maxLength={20}
                    className="rounded-md px-4 w-full py-2 my-2"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)} />
                  <label>パスワード</label>
                  <input
                    type="password"
                    placeholder="パスワードを入力してください"
                    maxLength={20}
                    className="rounded-md px-4 w-full py-2 my-2"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)} />
                  <label id="remote">
                    リモートワーク
                    <input type="checkbox" checked={isRemoteWork} onChange={() => setIsRemoteWork(!isRemoteWork)} />
                  </label>
                  <div className="flex justify-between w-full">
                    <button onClick={() => { onClose(); setAdminName(''); setAdminPassword(''); setIsRemoteWork(false) }} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400">
                      閉じる
                    </button>
                    {attendanceType === '管理者ページ' && (
                      <button type="submit" className="bg-gray-300 p-2 rounded-md hover:bg-gray-400">
                        ログイン
                      </button>
                    )}
                    {attendanceType !== "管理者ページ" && (
                      <button type="submit" className="bg-gray-300 p-2 rounded-md hover:bg-gray-400">
                        登録
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
