"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname  } from "next/navigation";

interface navProps {
    onSubmit: (keyword: string) => void;
}

const Nav: React.FC<navProps> = ({ onSubmit }) => {


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const router = useRouter();
    const pathname = usePathname()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(keyword);
        console.log("移動");
    };

    const isOnAdminPage = pathname.includes("/admin") || pathname.includes("/resultAdmin") || pathname.includes("/enrol");


    return (
        <>
            <nav className="bg-blue-500 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 border-slate-100 text-slate-100 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded={isMenuOpen} onClick={toggleMenu}>
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className={`block h-6 w-6 ${isMenuOpen ? 'hidden' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className={`hidden h-6 w-6 ${isMenuOpen ? '' : 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                            {!isOnAdminPage ? (
                                <Link href={"/office"} className="text-slate-100 font-bold">社内</Link>
                                ) : (
                                <Link href={"/admin"} className="text-slate-100 font-bold">
                                    管理者ページ
                                </Link>
                                )}
                            </div>
                            <div className="hidden md:ml-6 md:block">
                                <div className="flex space-x-4">
                                    <Link href={"/"} className="bg-gray-900 text-white rounded-md px-3 py-2 text-xs md:text-xs font-medium" aria-current="page">ホーム</Link>
                                    {isOnAdminPage && (
                                        <Link
                                        href={"/enrol"}
                                        className="text-slate-100 hover:bg-red-800 transition-all duration-300 rounded-md px-3 py-2 text-xs font-medium"
                                        >
                                        新規登録
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="hidden md:ml-6 md:block">
                                <form className="text-center" onSubmit={handleSubmit}>
                                    <input
                                        type="search"
                                        name="query"
                                        className="rounded py-2 px-4 text-left border-red-500"
                                        placeholder="名前を入力してください"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button className="ml-2 text-white bg-red-500 rounded py-2 px-6 hover:opacity-75"
                                            type="submit">
                                        検索
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:hidden flex flex-col" id="mobile-menu" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link href={"/"} className="bg-gray-900 text-white rounded-md px-3 py-2 text-base font-medium" aria-current="page">ホーム</Link>
                        {isOnAdminPage && (
                                        <Link
                                        href={"/enrol"}
                                        className="text-slate-100 hover:bg-red-800 transition-all duration-300 rounded-md px-3 py-2 text-xs font-medium"
                                        >
                                        新規登録
                                        </Link>
                        )}
                    </div>
                    <div className="px-2 pb-3 pt-2 left-0 justify-start">
                        <form className="text-center" onSubmit={handleSubmit}>
                            <input
                                type="search"
                                name="query"
                                className="rounded py-2 px-4 text-left border-red-500"
                                placeholder="キーワードを入力して下さい"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button className="ml-2 pt-2 mt-2 text-white bg-red-500 rounded py-2 px-6 hover:opacity-75"
                                    type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;