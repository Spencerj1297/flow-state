

export const About = () => {
  return (
    <section className="min-h-screen flex flex-col xl:flex-row w-full rounded-xl bg-seafoam shadow-custom p-8 mt-8 gap-16">
      <div className="xl:w-1/2 text-blue flex justify-center items-center py-8 lg:p-16 z-10">
        <h2 className="text-6xl xl:text-9xl font-bold">
          Flow State Exist So Stress Doesn&apos;t
        </h2>
      </div>
      <div className="xl:w-1/2 flex justify-center items-center py-8 lg:p-8 ">
        <div className="flex justify-center items-center w-full bg-black h-96 rounded-xl">
        <video
            autoPlay
            playsInline
            loop
            muted
            className="w-full object-cover z-10"
          >
            <source src="/home/meeting.mp4" type="video/mp4" />
            Sorry, your browser doesn&apost support videos.
          </video>
        </div>
      </div>
    </section>
  );
};
