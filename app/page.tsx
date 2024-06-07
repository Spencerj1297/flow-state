import { About } from "./components/homePage/about";
import { Intro } from "./components/homePage/intro";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 lg:py-24 px-4 lg:px-44">
      <Intro />
      <About />
    </main>
  );
}
