export const About = () => {
  return (
    <section className="min-h-screen flex flex-col xl:flex-row w-full rounded-xl bg-seafoam shadow-custom p-8 mt-8">
      <div className="xl:w-1/2 text-blue flex justify-center items-center py-8 lg:p-16 z-10">
        <h2 className="text-8xl xl:text-9xl font-bold">
          Flow State Exist So Stress Doesn&apos;t
        </h2>
      </div>
      <div className="xl:w-1/2 flex justify-center items-center py-8 lg:p-8 ">
        <div className="flex justify-center items-center w-full bg-black h-96 rounded-xl">
            <p className="text-white">future video</p>
        </div>
      </div>
    </section>
  );
};
