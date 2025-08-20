import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const stats = [
    { number: "10K+", label: "Happy Travelers" },
    { number: "50+", label: "Destinations" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      title: "Adventure",
      description:
        "We believe in creating unforgettable adventures that push boundaries and create lasting memories.",
      icon: "🏔️",
    },
    {
      title: "Sustainability",
      description:
        "We're committed to responsible travel that preserves the beauty of our destinations for future generations.",
      icon: "🌱",
    },
    {
      title: "Authenticity",
      description:
        "We connect you with genuine local experiences and authentic cultural encounters.",
      icon: "🌍",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of your journey, from planning to execution.",
      icon: "⭐",
    },
  ];

  const team = [
    {
      name: "Salman Sadik Siddiquee",
      role: "Founder & CEO",
      image: "salsadsid.jpg",
      description:
        "With 15+ years in the travel industry, Salman founded Ghuro to make extraordinary travel accessible to everyone.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section - Full Screen */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold"
          >
            About Ghuro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl text-2xl"
          >
            We're passionate about creating extraordinary travel experiences
            that connect you with the world's most beautiful destinations and
            cultures.
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30" />
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2565&auto=format&fit=crop"
          alt="Travel destinations"
          className="h-full w-full object-cover"
        />
      </section>

      {/* Our Story Section - Container */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold">Our Story</h2>
              <p className="text-xl text-gray-600">
                Founded in 2010, Ghuro began as a dream to make exceptional
                travel experiences accessible to everyone. What started as a
                small team of travel enthusiasts has grown into a trusted
                partner for thousands of adventurers worldwide.
              </p>
              <p className="text-xl text-gray-600">
                We believe that travel has the power to transform lives, broaden
                perspectives, and create connections that last a lifetime. Every
                destination we curate and every experience we craft is designed
                with this philosophy at its heart.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
                alt="Our team"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Full Screen */}
      <section className="bg-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Numbers that showcase our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-yellow-600 mb-4">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Container */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do and shape every
                experience we create for our travelers.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="text-5xl mb-6">{value.icon}</div>
                      <h3 className="text-2xl font-semibold mb-4">
                        {value.title}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Container */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate individuals behind your extraordinary travel
                experiences.
              </p>
            </div>
            <div className="flex justify-center">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                      />
                      <h3 className="text-2xl font-semibold mb-2">
                        {member.name}
                      </h3>
                      <p className="text-yellow-600 font-medium mb-4 text-lg">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-base">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Full Screen */}
      <section className="bg-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl max-w-4xl mx-auto leading-relaxed"
            >
              To inspire and enable meaningful travel experiences that foster
              personal growth, cultural understanding, and lasting memories
              while promoting sustainable tourism practices that benefit local
              communities and preserve our planet's natural beauty.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact CTA - Container */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied travelers who have trusted us with
              their dream vacations. Let's create your next unforgettable
              adventure together.
            </p>
            <div className="flex justify-center gap-6">
              <Button
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 text-lg rounded-lg transition-colors"
                onClick={() =>
                  (window.location.href = "mailto:contact@ghuro.com")
                }
              >
                Contact Us
              </Button>
              <Button
                variant="outline"
                className="border border-yellow-600 text-yellow-600 px-10 py-4 text-lg rounded-lg hover:bg-yellow-50 transition-colors"
                onClick={() => navigate("/")}
              >
                View Destinations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
