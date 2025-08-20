import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, Home, MapPin, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br pt-20 from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating clouds */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-10 bg-white rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-32 right-20 w-20 h-12 bg-white rounded-full opacity-40"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-8 bg-white rounded-full opacity-50"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating travel icons */}
        <motion.div
          className="absolute top-1/4 right-1/4 text-yellow-300 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Plane size={40} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/5 text-orange-300 opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <Compass size={32} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/12 text-red-300 opacity-25"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <MapPin size={28} />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center px-4 max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Large 404 with travel theme */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="relative inline-block">
            <motion.h1
              className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              404
            </motion.h1>
            {/* Airplane flying through the 4 */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, type: "spring" }}
            >
              <Plane size={48} className="rotate-12" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div className="mb-8 space-y-4" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Oops! You've Lost Your Way
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Looks like this destination doesn't exist in our travel map. But
            don't worry, every great adventure starts with getting a little
            lost!
          </p>
        </motion.div>

        {/* Motivational Travel Quote */}
        <motion.div className="mb-12" variants={itemVariants}>
          <blockquote className="text-lg md:text-xl italic text-gray-700 max-w-3xl mx-auto">
            "Not all who wander are lost, but in this case, the page definitely
            is."
          </blockquote>
          <cite className="text-sm text-gray-500 mt-2 block">
            - Every Traveler, Probably
          </cite>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Home className="mr-2" size={20} />
            Back to Home
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Compass className="mr-2" size={20} />
            Go Back
          </Button>
        </motion.div>

        {/* Fun Facts Section */}
        <motion.div
          className="mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-200"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🧭 Fun Travel Fact While You're Here
          </h3>
          <p className="text-gray-700 text-lg">
            The term "404" comes from the room number at CERN where the World
            Wide Web was born. Just like how every journey has unexpected
            detours, the web has its missing pages too!
          </p>
        </motion.div>

        {/* Subtle animation hint */}
        <motion.div
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>✨ Watch the airplane fly and the elements float around you ✨</p>
        </motion.div>
      </motion.div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100 to-transparent opacity-50" />
    </div>
  );
};

export default NotFound;
