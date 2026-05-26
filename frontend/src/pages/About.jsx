import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaBriefcase, FaRobot, FaChartLine, FaUsers, FaLightbulb, FaArrowRight, FaCode, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            About <span className="text-blue-600">Athena AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Athena AI is a production-grade, AI-powered placement management platform designed to automate and intelligently streamline campus recruitment workflows. We combine modern full-stack engineering with advanced AI agent systems to deliver intelligent resume analysis, contextual job matching, interview preparation, and personalized career guidance.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Athena AI was born out of a simple observation: campus placements were still being managed with outdated tools and manual processes. We saw an opportunity to leverage artificial intelligence to make the entire process smarter, faster, and more effective for everyone involved.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey began with a small team of engineers and AI specialists who shared a vision of transforming campus recruitment. Today, we're proud to serve thousands of students, hundreds of recruiters, and numerous educational institutions across the country.
              </p>
              <p className="text-gray-600">
                What started as a simple resume analysis tool has evolved into a comprehensive platform that powers every aspect of the placement process - from profile building to final job offers.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                className="rounded-xl shadow-xl w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaLightbulb className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize access to intelligent placement tools, making it possible for every student to present their best self to potential employers and for every recruiter to find the perfect candidate efficiently.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaRobot className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the world's most intelligent placement platform, where AI doesn't just assist but actively enhances every decision in the recruitment process, leading to better matches and more successful careers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Who We Serve
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Athena AI serves three primary user groups, each with their own unique needs and benefits.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Students</h3>
              <p className="text-gray-600 mb-4">
                Build your professional profile, upload and get feedback on your resume, apply for jobs that match your skills, and receive personalized career guidance.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">AI-powered resume analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Personalized job recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Interview preparation tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Career development resources</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Recruiters</h3>
              <p className="text-gray-600 mb-4">
                Post job openings, discover matching candidates, review applications, and schedule interviews - all with AI-powered assistance.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Intelligent candidate matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Automated application screening</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Interview scheduling tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Candidate tracking system</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Placement Officers</h3>
              <p className="text-gray-600 mb-4">
                Manage the entire placement process, track recruitment activity, analyze placement statistics, and generate comprehensive reports.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Placement workflow management</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Recruitment activity tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Placement analytics dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Comprehensive reporting</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Technology Stack
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Athena AI is built using a modern, scalable architecture with the latest technologies.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frontend</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "React 18", desc: "Component-based UI framework" },
                  { name: "Tailwind CSS", desc: "Utility-first styling" },
                  { name: "Framer Motion", desc: "Smooth animations" },
                  { name: "Redux Toolkit", desc: "State management" }
                ].map((tech, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">{tech.name}</h4>
                    <p className="text-sm text-gray-500">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Backend & AI</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "FastAPI", desc: "Python backend framework" },
                  { name: "PostgreSQL", desc: "Relational database" },
                  { name: "OpenAI API", desc: "Foundation models" },
                  { name: "LangChain", desc: "AI orchestration" },
                  { name: "LangGraph", desc: "Agent workflows" },
                  { name: "pgvector", desc: "Vector search" }
                ].map((tech, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">{tech.name}</h4>
                    <p className="text-sm text-gray-500">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Join the Future of Intelligent Placements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Experience how Athena AI can transform your campus placement process.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2"
            >
              Get Started Free <FaArrowRight className="text-xs" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition font-medium"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;