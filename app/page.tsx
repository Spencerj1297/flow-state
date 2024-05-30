import Image from "next/image";
import { SignInForm } from "./components/signInForm";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="min-h-96 flex w-full rounded-xl bg-blue">
        <div className="w-1/2 text-aqua flex justify-center items-center p-16">
          <h2 className="text-9xl font-bold">
            Find <br/> Your <br/> Flow
          </h2>
        </div>
        <div className="w-1/2 flex justify-center items-center p-16">
          <SignInForm />
        </div>
      </section>
    </main>
  );
}
