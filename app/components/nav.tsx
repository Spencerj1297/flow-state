"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { FC, useEffect, useState, useRef, useCallback } from "react";
import { IconHome, IconLayoutDashboard, IconListCheck, IconMenuDeep, IconSettings } from "@tabler/icons-react";

export const Nav: FC = ({}) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const homePage = "/";

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const nameCookie = Cookies.get("first_name");
    setUser(userCookie);
    setUserName(nameCookie);
  }, []);

  const signOut = () => {
    Cookies.remove("user");
    Cookies.remove("email");
    Cookies.remove("first_name");
    Cookies.remove("last_name");
    Cookies.remove("phone");
    window.location.href = "/ ";
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropDown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  console.log(dropDown);

  return (
    <>
      {user && window.location.pathname !== homePage ? (
        <>
          <nav className="hidden lg:flex flex-col text-center justify-between fixed left-0 h-screen p-2 bg-blue">
            <div className="h-1/3 flex  justify-center items-start">
              <Link href="/">
                <button className="text-sm">Flow State</button>{" "}
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center h-1/3 gap-4">
              <div className="flex justify-center items-center text-white hover:text-seafoam">
                <Link href="/pages/user-dashboard">
                  <div className="bg-blue rounded-md p-1">
                    <IconHome />
                  </div>
                </Link>
              </div>
              <div className="flex justify-center items-center text-white hover:text-seafoam">
                <Link href="/pages/user-dashboard">
                  <div className="bg-blue rounded-md p-1">
                    <IconLayoutDashboard />
                  </div>
                </Link>
              </div>
              <div className="flex justify-center items-center text-white hover:text-seafoam">
                <Link href="/pages/tasks">
                  <div className="bg-blue rounded-md p-1">
                    <IconListCheck />
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex items-end justify-center h-1/3">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => setDropDown(!dropDown)}
                  className="h-8 w-8 text-white hover:text-seafoam flex justify-center items-center rounded-full text-sm"
                >
                  <IconSettings />
                </button>
              </div>
            </div>
          </nav>
          <nav className="fixed top-0 left-0 w-full p-8 font-black bg-white shadow-outline z-10">
            <div className="w-full flex">
              <div className="flex w-1/2 justify-start items-center text-blue text-2xl">
                <Link href="/">
                  <button>Flow State</button>{" "}
                </Link>
              </div>

              <div className="flex w-1/2 justify-end items-center gap-8 text-blue">
                <Link href="/">
                  <button className="hidden lg:block">About</button>
                </Link>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setDropDown(!dropDown)}
                    className="hidden lg:block h-8 w-8 bg-blue text-white flex justify-center items-center rounded-full text-sm"
                  >
                    {userName?.slice(0, 1)}
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setDropDown(!dropDown)}
                    className="lg:hidden text-blue flex justify-center items-center rounded-full text-sm"
                  >
                    <IconMenuDeep stroke={2.5}/>
                  </button>
                </div>
              </div>
            </div>
            {dropDown && (
              <div
                ref={dropdownRef}
                className="flex justify-center fixed top-20 right-8 bg-blue text-white shadow-outline rounded-lg py-4 px-8"
              >
                <button onClick={signOut} className="text-sm">
                  sign out
                </button>
              </div>
            )}
          </nav>
        </>
      ) : (
        <nav className="w-full p-8 font-black">
          <div className="w-full flex">
            <div className="flex w-1/2 justify-start items-center text-blue text-2xl">
              <Link href="/">
                <button>Flow State</button>{" "}
              </Link>
            </div>

            <div className="flex w-1/2 justify-end items-center gap-8 text-blue">
              <Link href="/">
                <button>About</button>
              </Link>
              <Link href="/pages/sign-up">
                <button>Sign up</button>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
