import SearchBox from "@/components/SearchBox";
import { motion } from "framer-motion";
import { useState } from "react";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  console.log(searchTerm);
  return (
    <div className="space-y-8">
      <section className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg"
          >
            Find the perfect destination for your dream vacation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-md"
          >
            <SearchBox onSearch={setSearchTerm} />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30" />
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2565&auto=format&fit=crop"
          alt="Travel"
          className="h-full w-full object-cover"
        />
      </section>
    </div>
  );
}
