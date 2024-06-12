


const About = () => {
const thing = process.env.MONGODB_URI
  return (
    <>
    <h2 className="text-[100px]">Hello</h2>
    <h2 className="text-[10px]">{thing}</h2>
    </>
  );
};

export default About;
