import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaSearch, FaLightbulb, FaBrain, FaChartLine, FaDatabase, FaCode, FaLock, FaArrowRight, FaGraduationCap, FaBriefcase, FaUsers } from "react-icons/fa";
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

const Features = () => {
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
            Powerful Features for <span className="text-blue-600">Intelligent Placements</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Discover how Athena AI transforms campus placements with cutting-edge technology and intelligent automation.
          </motion.p>
        </div>
      </section>

      {/* Core Features Section */}
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
              Core Platform Features
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools for students, recruiters, and placement officers.
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
              <h3 className="text-lg font-bold text-gray-800 mb-2">For Students</h3>
              <p className="text-gray-600 mb-4">Build your profile, upload resumes, and get AI-driven career guidance.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">AI Resume Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Personalized Job Matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Interview Preparation</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Career Guidance</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">For Recruiters</h3>
              <p className="text-gray-600 mb-4">Post jobs, review applications, and find the best candidates.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Job Posting</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Smart Candidate Matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Application Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Interview Scheduling</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">For Placement Officers</h3>
              <p className="text-gray-600 mb-4">Manage workflows, track activity, and analyze placement statistics.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Workflow Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Activity Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Placement Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-blue-500 text-xs" />
                  <span className="text-gray-600">Report Generation</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Features Section */}
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
              AI-Powered Features
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our intelligent agents automate and enhance every aspect of the placement process.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaRobot className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Resume Analysis Agent</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Extracts technical skills, evaluates ATS compatibility, detects formatting issues, and generates improvement suggestions.
              </p>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Resume Analysis"
                className="rounded-lg w-full h-48 object-cover mt-4"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaSearch className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Job Matching Agent</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Uses vector similarity search to match resumes against job descriptions and compute compatibility scores.
              </p>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Job Matching"
                className="rounded-lg w-full h-48 object-cover mt-4"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaLightbulb className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Interview Preparation Agent</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Generates technical and behavioral questions, simulates mock interviews, and suggests preparation strategies.
              </p>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Interview Preparation"
                className="rounded-lg w-full h-48 object-cover mt-4"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaBrain className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Career Guidance Agent</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Analyzes skill profiles, recommends career paths, and generates personalized learning roadmaps.
              </p>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Career Guidance"
                className="rounded-lg w-full h-48 object-cover mt-4"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
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
              Built With Modern Technologies
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Athena AI leverages the latest technologies to deliver a powerful, scalable, and intelligent platform.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { name: "React", desc: "Component-based frontend framework" },
              { name: "FastAPI", desc: "High-performance Python backend" },
              { name: "PostgreSQL", desc: "Relational database with pgvector" },
              { name: "OpenAI", desc: "Foundation models for AI agents" },
              { name: "LangChain", desc: "AI orchestration framework" },
              { name: "LangGraph", desc: "Stateful agent orchestration" },
              { name: "Tailwind CSS", desc: "Utility-first styling" },
              { name: "Framer Motion", desc: "Smooth animations" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-4 rounded-lg text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500">{tech.desc}</p>
              </motion.div>
            ))}
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
            Ready to Transform Your Placement Process?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Join Athena AI and experience the future of intelligent campus placements.
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

export default Features;