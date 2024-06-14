"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { FC, useEffect, useState, useRef, useCallback } from "react";
import {
  IconFileDescription,
  IconLayoutDashboard,
  IconListCheck,
  IconMenuDeep,
  IconSettings,
  IconBubbleText,
  IconDoorExit,
  IconReportAnalytics,
} from "@tabler/icons-react";
import axios from "axios";
import { signOut } from "../lib/utils";
import { MobileNavMenu } from "./mobileNavMenu";
import { Modal } from "./ui/modal";
import { Quote } from "../types/types";

export const Nav: FC = ({}) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const [randomQuote, setRandomQuote] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openQuotes, setOpenQuotes] = useState<boolean>(false);
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialQuote = { quote: "" };
  const [newQuote, setNewQuote] = useState<Quote>(initialQuote);

  const homePage = "/";

  const closeAndReset = () => {
    setOpenSettings(false);
    setOpenQuotes(false);
  };

  const handleSettings = () => {
    setOpenSettings(true);
  };

  const handleQuotes = () => {
    setOpenQuotes(true);
  };

  const dropDownButtons = () => {
    const buttons = [
      {
        title: "Sign out",
        icon: <IconDoorExit />,
        callback: signOut,
      },
      {
        title: "Settings",
        icon: <IconSettings />,
        callback: handleSettings,
      },
      {
        title: "Quotes",
        icon: <IconBubbleText />,
        callback: handleQuotes,
      },
    ];

    return buttons.map((button, ind) => (
      <>
        <div key={ind}>
          <button
            onClick={button.callback}
            className="flex gap-2 text-sm text-blue hover:opacity-80"
          >
            {button.icon}
            {button.title}
          </button>
        </div>
        <div className="w-full h-[1px] w-full bg-blue"></div>
      </>
    ));
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropDown(false);
    }
  }, []);

  const getQuotes = async () => {
    try {
      const response = await axios.get("/api/get-quotes");
      if (response.status === 200) {
        const randomNumber = Math.floor(
          Math.random() * response.data.quotes.length
        );
        setRandomQuote(response.data.quotes[randomNumber]?.quote || "");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };

  const createQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-quote", newQuote);
      if (response.status === 200) {
        console.log("Succesfully added new quote");
        setOpenQuotes(false);
        setLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNewQuote((prevData) => ({
      ...prevData,
      quote: value,
    }));
  };

  const quoteSection = (quote: Quote) => {
    return (
      <div className="w-full rounded-lg flex justify-center items-center p-4">
        <textarea
          placeholder="Enter a new quote"
          onChange={handleChange}
          className="min-h-[300px] w-full h-full p-4 shadow-outline border rounded-lg"
        >
          {newQuote.quote}
        </textarea>
      </div>
    );
  };

  useEffect(() => {
    const emailCookie = Cookies.get("email");
    const nameCookie = Cookies.get("first_name");
    setEmail(emailCookie);
    setUserName(nameCookie);
    if (emailCookie) {
      getQuotes();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {email && window.location.pathname !== homePage ? (
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
              <div className="flex justify-center items-center text-white hover:text-seafoam">
                <Link href="/pages/applications">
                  <div className="bg-blue rounded-md p-1">
                    <IconFileDescription />
                  </div>
                </Link>
              </div>
              <div className="flex justify-center items-center text-white hover:text-seafoam">
                <Link href="/pages/data">
                  <div className="bg-blue rounded-md p-1">
                    <IconReportAnalytics />
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex items-end justify-center h-1/3">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => setOpenSettings(true)}
                  className="h-8 w-8 text-white hover:text-seafoam flex justify-center items-center rounded-full text-sm"
                >
                  <IconSettings />
                </button>
              </div>
            </div>
          </nav>

          <nav className="fixed top-0 left-0 w-full p-8 font-black bg-white shadow-outline z-10">
            <div className="w-full flex">
              <div className="flex w-1/2 lg:w-1/6 justify-start items-center text-blue text-2xl">
                <Link href="/">
                  <button>Flow State</button>{" "}
                </Link>
              </div>
              <div className="hidden lg:flex w-4/6 justify-center items-center text-black text-sm">
                <p>{randomQuote}</p>
              </div>

              <div className="flex w-1/2 lg:w-1/6 justify-end items-center gap-8 text-blue">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setDropDown(!dropDown)}
                    className="hidden lg:block h-8 w-8 bg-blue text-white flex justify-center items-center rounded-full text-sm"
                  >
                    {userName
                      ? userName?.slice(0, 1)
                      : email.slice(0, 1).toUpperCase()}
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setMobileNav(!mobileNav)}
                    className="lg:hidden text-blue flex justify-center items-center rounded-full text-sm"
                  >
                    <IconMenuDeep size={40} />
                  </button>
                </div>
              </div>
            </div>
            {dropDown && (
              <div
                ref={dropdownRef}
                className="flex flex-col justify-center items-start fixed top-20 right-16 bg-white shadow-outline rounded-lg py-4 px-8 gap-2"
              >
                {dropDownButtons()}
              </div>
            )}
          </nav>
        </>
      ) : (
        <nav className="w-full p-8 font-black bg-white shadow-outline z-30">
          <div className="w-full flex">
            <div className="flex w-1/2 justify-start items-center text-blue text-2xl z-10">
              <Link href="/">
                <button className="">Flow State</button>{" "}
              </Link>
            </div>

            <div className="flex w-1/2 justify-end items-center gap-8 text-blue">
              <Link href="/pages/about">
                <button>About</button>
              </Link>
              <Link href="/pages/sign-up">
                <button>Sign up</button>
              </Link>
            </div>
          </div>
        </nav>
      )}
      {mobileNav && <MobileNavMenu setOpen={setMobileNav} />}
      {openQuotes && (
        <Modal
          modalTitle="Add a Quote"
          closeModal={closeAndReset}
          customSection={quoteSection(newQuote)}
          callBack={createQuote}
          loading={loading}
        />
      )}
    </>
  );
};
