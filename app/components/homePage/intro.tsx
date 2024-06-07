import Image from "next/image";
import { SignInForm } from "../signInForm";
import logo from "../../assets/logo.png";

export const Intro = () => {
  return (
    <section className="min-h-96 flex flex-col xl:flex-row w-full rounded-xl bg-blue shadow-custom px-8">
      <div className="xl:w-1/2 text-aqua flex justify-center items-center py-8 lg:p-16 z-10">
        <h2 className="text-8xl xl:text-9xl font-bold">
          Find <br className="hidden lg:block" /> Your{" "}
          <br className="hidden lg:block" /> Flow...
        </h2>
      </div>
      <div className="xl:w-1/2 flex justify-center items-center py-8 lg:p-8 z-10">
        <SignInForm />
      </div>
      <div className="hidden xl:block absolute z-0 top-64 right-[650px] opacity-30">
        <Image
          height={400}
          width={400}
          quality={100}
          src={logo}
          alt="Flow State Logo"
        />
      </div>
    </section>
  );
};
