import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaBriefcase, FaRobot, FaChartLine, FaSearch, FaLightbulb, FaRocket, FaUsers, FaLock, FaArrowRight, FaBook, FaBrain, FaCode, FaDatabase } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <Navbar/>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                                AI-Powered Campus Placement Platform
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Athena AI revolutionizes campus placements with intelligent resume analysis, smart job matching, and personalized career guidance.
                            </p>
                            <p className="text-gray-500 mb-8">
                                Built with React, FastAPI, PostgreSQL, OpenAI, LangChain, LangGraph, and pgvector.
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 text-sm"
                                >
                                    Get Started <FaArrowRight className="text-xs" />
                                </Link>
                                <Link
                                    to="/demo"
                                    className="border-2 border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-50 transition font-medium text-sm"
                                >
                                    Watch Demo
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Students collaborating"
                                className="rounded-xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Intelligent Features for Modern Placements
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our platform combines cutting-edge AI with practical tools to streamline the entire placement process.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <FaRobot className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">AI Agents</h3>
                            <p className="text-gray-600 text-sm">
                                Autonomous agents for resume analysis, job matching, interview prep, and career guidance.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <FaSearch className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">RAG Pipeline</h3>
                            <p className="text-gray-600 text-sm">
                                Retrieval-Augmented Generation for contextual job matching and recommendations.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <FaDatabase className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Vector Search</h3>
                            <p className="text-gray-600 text-sm">
                                pgvector-powered similarity search for precise resume-job matching.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <FaCode className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Modern Stack</h3>
                            <p className="text-gray-600 text-sm">
                                Built with React, FastAPI, PostgreSQL, and the latest AI technologies.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <FaChartLine className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Analytics</h3>
                            <p className="text-gray-600 text-sm">
                                Comprehensive placement analytics and insights for better decision-making.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <FaLock className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Secure</h3>
                            <p className="text-gray-600 text-sm">
                                JWT authentication and role-based access control for data security.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Advanced AI Capabilities
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our AI agents power every aspect of the placement process with intelligent automation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <FaBook className="text-blue-600 text-2xl" />
                                <h3 className="text-xl font-bold text-gray-800">Resume Analysis Agent</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Extracts technical skills, evaluates ATS compatibility, detects formatting issues, and generates improvement suggestions.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Skill extraction and tagging</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">ATS compatibility scoring</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Formatting quality analysis</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <FaSearch className="text-blue-600 text-2xl" />
                                <h3 className="text-xl font-bold text-gray-800">Job Matching Agent</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Uses vector similarity search to match resumes against job descriptions and compute compatibility scores.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Vector embedding generation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Cosine similarity matching</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Skill gap identification</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <FaLightbulb className="text-blue-600 text-2xl" />
                                <h3 className="text-xl font-bold text-gray-800">Interview Preparation Agent</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Generates technical and behavioral questions, simulates mock interviews, and suggests preparation strategies.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Technical question generation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Behavioral question creation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Mock interview simulation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <FaBrain className="text-blue-600 text-2xl" />
                                <h3 className="text-xl font-bold text-gray-800">Career Guidance Agent</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Analyzes skill profiles, recommends career paths, and generates personalized learning roadmaps.
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Career path recommendations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Learning roadmap generation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaArrowRight className="text-blue-500 text-xs" />
                                    <span className="text-gray-600">Certification suggestions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Built With Modern Technologies
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Athena AI combines the best of modern web development with cutting-edge AI technologies.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">React</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">FastAPI</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">PostgreSQL</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">OpenAI</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">LangChain</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">LangGraph</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">pgvector</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <span className="font-semibold text-gray-700">Tailwind CSS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to Experience Intelligent Placements?
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Join Athena AI and transform your campus placement process with the power of AI.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
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
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/logo.png" alt="Athena AI Logo" className="h-8" />
                                <span className="text-xl font-bold">Athena AI</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Intelligent Placement Management Platform powered by AI, LangChain, and pgvector.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Platform</h3>
                            <ul className="space-y-2">
                                <li><Link to="/features" className="text-gray-400 hover:text-white transition text-sm">Features</Link></li>
                                <li><Link to="/about" className="text-gray-400 hover:text-white transition text-sm">About Us</Link></li>
                                <li><Link to="/demo" className="text-gray-400 hover:text-white transition text-sm">Live Demo</Link></li>
                                <li><Link to="/docs" className="text-gray-400 hover:text-white transition text-sm">Documentation</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><Link to="/blog" className="text-gray-400 hover:text-white transition text-sm">Blog</Link></li>
                                <li><Link to="/careers" className="text-gray-400 hover:text-white transition text-sm">Careers</Link></li>
                                <li><Link to="/community" className="text-gray-400 hover:text-white transition text-sm">Community</Link></li>
                                <li><Link to="/support" className="text-gray-400 hover:text-white transition text-sm">Support</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</Link></li>
                                <li><Link to="/cookies" className="text-gray-400 hover:text-white transition text-sm">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">© 2026 Athena AI. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <Link to="#" className="text-gray-400 hover:text-white transition text-sm">Twitter</Link>
                            <Link to="#" className="text-gray-400 hover:text-white transition text-sm">LinkedIn</Link>
                            <Link to="#" className="text-gray-400 hover:text-white transition text-sm">GitHub</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;