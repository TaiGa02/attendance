"use client";

import styles from './Links.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Form from '../components/Form';

export default function Home() {
  const [clock, setClock] = useState({ date: '', time: '' });
  const [ isFormOpen, setFormOpen ] = useState(false);
  const [ attendanceType, setAttendanceType ] = useState('出勤');
  const [ isRemoteWork, setIsRemoteWork ] = useState(false);
  const router = useRouter();

  const openForm = (type:string) => {
    setFormOpen(true);
    setAttendanceType(type)
  };
  const closeForm = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    // 初回実行
    buildClock();

    const intervalId = setInterval(() => {
      buildClock();
    }, 1000);

    // コンポーネントがアンマウントされたときにクリーンアップ
    return () => clearInterval(intervalId);
  }, []);

  function buildClock(){
    const d = new Date();

    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString();
    let date = d.getDate().toString();
    let hour = d.getHours().toString();
    let min = d.getMinutes().toString();

    // 1桁の月や日に対して0を追加
    if(month.length === 1){
      month = "0" + month;
    }
    if(date.length === 1){
      date = "0" + date;
    }
    if(hour.length === 1){
      hour = "0" + hour;
    }
    if(min.length === 1){
      min = "0" + min;
    }

    setClock({
      date: `${year}.${month}.${date}`,
      time: `${hour}:${min}`,
    });

  };

  const movetoOffice = () => {
    router.push("/office");
  };

  return (
    <>
      <main className="bg-blue-500 min-h-screen">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="p-3 m-3">
            <h1 className="md:text-5xl text-3xl text-slate-100">株式会社〇〇〇</h1>
          </div>
          <div className="text-center p-3 m-3">
            <p className="text-slate-100 lg:text-9xl md:text-8xl text-6xl p-2 m-1">{clock.date}</p>
            <p className="text-slate-100 lg:text-9xl md:text-8xl text-6xl">{clock.time}</p>
          </div>
          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col">
              <button onClick={() => openForm("出勤")} className="bg-pink-500 rounded-md p-1 px-5 text-3xl m-2 text-slate-100 hover:bg-pink-200 hover:text-pink-600 transition-all duration-300">出勤</button>
              <button onClick={() => openForm("退勤")} className="bg-blue-800 rounded-md p-1 px-5 text-3xl m-2 text-slate-100 hover:bg-blue-200 hover:text-blue-800 transition-all duration-300">退勤</button>
              <button onClick={() => openForm("休憩")} className="bg-green-800 rounded-md p-1 px-2 text-3xl m-2 text-slate-100 hover:bg-green-200 hover:text-green-800 transition-all duration-300">休憩</button>
              <button onClick={() => openForm("外回り")} className="bg-orange-800 rounded-md p-1 px-2 text-3xl m-2 text-slate-100 hover:bg-orange-200 hover:text-orange-800 transition-all duration-300">外回り</button>
              <button onClick={() => openForm("帰社")} className="bg-orange-800 rounded-md p-1 px-2 text-3xl m-2 text-slate-100 hover:bg-orange-200 hover:text-orange-800 transition-all duration-300">帰社</button>
            </div>
            <div className="flex flex-col px-4 m-10 justify-center">
              <button 
                onClick={movetoOffice}
                className={`rounded-md ${styles.card}`}>
                <h2>社内<span>-&gt;</span></h2>
                <p>社内の様子を見ることが出来ます</p>
              </button>
              <button
                onClick={() => openForm("管理者ページ")}
                className={`rounded-md ${styles.card}`}>
                <h2>管理者ページ<span>-&gt;</span></h2>
                <p>管理者用のページです</p>
              </button>
            </div>
          </div>
          <Form isOpen={isFormOpen} onClose={closeForm} attendanceType={attendanceType} isRemoteWork={isRemoteWork} setIsRemoteWork={setIsRemoteWork} />
        </div>
      </main>
    </>
  );
}
