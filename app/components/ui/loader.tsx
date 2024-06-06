import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="flex gap-2 ">
      <motion.div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#9fe2bf",
        }}
        animate={{
          scale: [1, 1.5, 1],
          transition: {
            delay: 0 
          }
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#9fe2bf",
        }}
        animate={{
          scale: [1, 1.5, 1],
          transition: {
            delay: 0.2 
          }
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#9fe2bf",
        }}
        animate={{
          scale: [1, 1.5, 1],
          transition: {
            delay: 0.4 
          }
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  );
};
