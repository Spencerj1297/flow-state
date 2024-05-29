import Link from "next/link";

export const Nav = () => {
  return (
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
  );
};
