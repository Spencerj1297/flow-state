import Image from "next/image";
import { SignInForm } from "../signInForm";
import logo from "../../assets/logo.png";

export const Intro = () => {
  return (
    <section className="min-h-96 flex flex-col xl:flex-row w-full rounded-xl bg-blue shadow-custom ">
      <div className="xl:w-1/2 text-aqua flex justify-center items-center text-center lg:text-left py-8 lg:p-16 z-10">
        <h2 className="text-7xl xl:text-9xl font-bold">
          Find <br className="hidden xl:block" /> Your{" "}
          <br className="hidden xl:block" /> Flow...
        </h2>
      </div>
      <div className="xl:w-1/2 flex justify-center items-center z-10 bg-white rounded-b-xl xl:rounded-r-xl xl:rounded-l-none py-8">
        <SignInForm />
      </div>
    </section>
  );
};
