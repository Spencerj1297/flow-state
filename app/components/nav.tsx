import Link from "next/link";


export const Nav = () => {
  return (
    <nav className="w-full p-8 font-black">
      <div className="w-full flex">
        <div className="w-1/2 text-darkGreen text-2xl">Flow State</div>
        <div className="flex w-1/2 justify-end gap-8">
          <button>About</button>
          <Link href="/sign-in">
          <button>Sign in</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
