import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineXMark,
  HiBars3,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import {
  SiReact,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
} from "react-icons/si";
import { TbBrain, TbRobot, TbFileSearch, TbRoute } from "react-icons/tb";

const NAV_LINKS = ["Overview", "Features", "Stack", "Agents", "Contact"];

const FEATURES = [
  {
    icon: <TbFileSearch size={22} />,
    title: "Resume Analysis",
    desc: "AI-powered ATS scoring, skill extraction, and actionable resume improvement suggestions.",
    color: "from-violet-500/20 to-violet-600/5",
    accent: "text-violet-400",
  },
  {
    icon: <HiOutlineBriefcase size={22} />,
    title: "Job Matching",
    desc: "Vector similarity search to rank and surface the most compatible job opportunities.",
    color: "from-sky-500/20 to-sky-600/5",
    accent: "text-sky-400",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight size={22} />,
    title: "Interview Prep",
    desc: "Role-specific question banks and multi-turn mock interview sessions with memory.",
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
  },
  {
    icon: <TbRoute size={22} />,
    title: "Career Guidance",
    desc: "Personalized learning roadmaps, skill gap analysis, and career path recommendations.",
    color: "from-amber-500/20 to-amber-600/5",
    accent: "text-amber-400",
  },
  {
    icon: <HiOutlineShieldCheck size={22} />,
    title: "Role-Based Access",
    desc: "Granular RBAC for Students, Recruiters, and Placement Officers with JWT auth.",
    color: "from-rose-500/20 to-rose-600/5",
    accent: "text-rose-400",
  },
  {
    icon: <HiOutlineChartBar size={22} />,
    title: "Analytics Dashboard",
    desc: "Placement statistics, application tracking, and recruitment insights at a glance.",
    color: "from-fuchsia-500/20 to-fuchsia-600/5",
    accent: "text-fuchsia-400",
  },
];

const STACK = [
  { icon: <SiReact size={20} />, label: "React 18", color: "text-cyan-400" },
  { icon: <SiFastapi size={20} />, label: "FastAPI", color: "text-teal-400" },
  { icon: <SiPostgresql size={20} />, label: "PostgreSQL", color: "text-blue-400" },
  { icon: <TbBrain size={20} />, label: "Claude AI", color: "text-violet-400" },
  { icon: <SiDocker size={20} />, label: "Docker", color: "text-sky-400" },
  { icon: <SiTailwindcss size={20} />, label: "Tailwind CSS", color: "text-cyan-300" },
];

const AGENTS = [
  {
    name: "Resume Agent",
    icon: <TbFileSearch size={26} />,
    trigger: "Triggered on resume upload",
    steps: ["Parse PDF / DOCX", "Extract skills & tools", "ATS compatibility check", "Generate feedback report"],
    color: "border-violet-500/30 bg-violet-500/5",
    badge: "bg-violet-500/20 text-violet-300",
  },
  {
    name: "Job Match Agent",
    icon: <HiOutlineBriefcase size={26} />,
    trigger: "Triggered on profile update",
    steps: ["Embed student profile", "Cosine similarity search", "Rank job listings", "Highlight skill gaps"],
    color: "border-sky-500/30 bg-sky-500/5",
    badge: "bg-sky-500/20 text-sky-300",
  },
  {
    name: "Interview Agent",
    icon: <TbRobot size={26} />,
    trigger: "Triggered on job application",
    steps: ["Analyse job description", "Generate technical Qs", "STAR behavioral Qs", "Multi-turn mock session"],
    color: "border-emerald-500/30 bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  {
    name: "Career Agent",
    icon: <TbRoute size={26} />,
    trigger: "Triggered on profile complete",
    steps: ["Analyse skill set", "Map career paths", "Identify skill gaps", "Build learning roadmap"],
    color: "border-amber-500/30 bg-amber-500/5",
    badge: "bg-amber-500/20 text-amber-300",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("Student");
  const [form, setForm] = useState({ email: "", password: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((n) => document.getElementById(n));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActiveSection(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleContact = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-100 font-sans antialiased selection:bg-violet-500/30">

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#080B10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
              <HiOutlineSparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white text-lg">Athena <span className="text-violet-400">AI</span></span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  activeSection === link
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setLoginOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
            >
              Sign In <HiOutlineArrowRight size={14} />
            </motion.button>
            <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiOutlineXMark size={22} /> : <HiBars3 size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-[#080B10] px-6 py-4 flex flex-col gap-2 overflow-hidden"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left text-sm text-slate-300 py-2 border-b border-white/5"
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setLoginOpen(true); }}
                className="mt-2 w-full py-2 rounded-lg bg-violet-600 text-white text-sm font-medium"
              >
                Sign In
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="Overview" className="relative pt-32 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-600/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8"
          >
            <HiOutlineSparkles size={12} /> AI-Agent Powered Campus Placement Platform
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
          >
            Intelligent<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
              Placement
            </span>{" "}
            Management
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Athena AI combines autonomous multi-agent workflows with intelligent recruitment,
            resume analysis, and career guidance — built for the modern campus ecosystem.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started <HiOutlineArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("Features")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-all"
            >
              Explore Features
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[["4", "AI Agents"], ["3", "User Roles"], ["10+", "API Routes"], ["RAG", "Powered"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white">{val}</p>
                <p className="text-sm text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="Features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-violet-400 text-sm font-medium mb-3 tracking-widest uppercase">Platform Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Everything for campus recruitment</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`${f.accent} mb-4`}>{f.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="Stack" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-sky-400 text-sm font-medium mb-3 tracking-widest uppercase">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Built on modern foundations</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              React · FastAPI · PostgreSQL with pgvector · LangChain · Claude Sonnet · Docker · Nginx
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {STACK.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition-colors"
              >
                <span className={s.color}>{s.icon}</span>
                <span className="text-sm text-slate-300">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* RAG Pipeline */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-8"
          >
            <h3 className="text-white font-semibold mb-6 text-center">RAG Pipeline Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 flex-wrap">
              {[
                "Raw Text Input",
                "Text Chunking",
                "Embedding Model",
                "pgvector Store",
                "Similarity Search",
                "Claude Prompt",
                "Grounded Response",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs font-mono text-violet-400 mb-1">0{i + 1}</div>
                    <div className="px-3 py-2 rounded-lg border border-violet-500/20 bg-violet-500/5 text-slate-300 text-xs whitespace-nowrap">
                      {step}
                    </div>
                  </div>
                  {i < 6 && <HiOutlineArrowRight size={14} className="text-slate-600 hidden md:block" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AGENTS ── */}
      <section id="Agents" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-emerald-400 text-sm font-medium mb-3 tracking-widest uppercase">AI Agent Architecture</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Four autonomous agents</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm">
              Each agent is a self-contained module with a clearly defined responsibility,
              triggered by the orchestration layer based on user actions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AGENTS.map((agent, i) => (
              <motion.div
                key={agent.name}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className={`rounded-2xl border p-6 ${agent.color} transition-all hover:scale-[1.01] duration-300`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="text-slate-300">{agent.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold">{agent.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${agent.badge}`}>
                      {agent.trigger}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {agent.steps.map((step, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs text-slate-500 shrink-0">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Workflow Pipeline */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-8"
          >
            <h3 className="text-white font-semibold mb-6 text-center">Automated Workflow — On Resume Upload</h3>
            <div className="flex flex-col gap-0 max-w-lg mx-auto">
              {[
                { label: "Student Uploads Resume", color: "border-slate-600 bg-slate-800/50 text-slate-300" },
                { label: "Resume Analysis Agent", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
                { label: "Skill Extraction & Scoring", color: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300" },
                { label: "Job Matching Agent", color: "border-sky-500/40 bg-sky-500/10 text-sky-300" },
                { label: "Interview Preparation Agent", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
                { label: "Career Guidance Agent", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
              ].map((step, i) => (
                <div key={step.label} className="flex flex-col items-center">
                  <div className={`w-full text-center py-3 px-5 rounded-xl border text-sm font-medium ${step.color}`}>
                    {step.label}
                  </div>
                  {i < 5 && (
                    <div className="w-px h-6 bg-white/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-rose-400 text-sm font-medium mb-3 tracking-widest uppercase">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Contact & Support</h2>
            <p className="text-slate-400 mt-4 text-sm">Have questions about Athena AI? We'd love to hear from you.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                { icon: <HiOutlineEnvelope size={18} />, label: "Email", value: "hello@athena-ai.dev" },
                { icon: <HiOutlinePhone size={18} />, label: "Phone", value: "+91 98765 43210" },
                { icon: <HiOutlineMapPin size={18} />, label: "Location", value: "Thrissur, Kerala, India" },
              ].map((c) => (
                <motion.div
                  key={c.label}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{c.label}</p>
                    <p className="text-slate-200 text-sm">{c.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="mt-2 p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <p className="text-slate-400 text-xs leading-relaxed">
                  Athena AI is an open-source project licensed under the MIT License.
                  Contributions, bug reports, and feature requests are welcome on GitHub.
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="lg:col-span-3 rounded-2xl border border-white/5 bg-white/[0.02] p-8"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center py-16 text-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl">✓</div>
                    <p className="text-white font-semibold">Message sent!</p>
                    <p className="text-slate-400 text-sm">We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleContact} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Name</label>
                        <input
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                        <input
                          required type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">Message</label>
                      <textarea
                        required rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your query or feedback..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Send Message <HiOutlineArrowRight size={15} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
            <HiOutlineSparkles size={12} className="text-white" />
          </div>
          <span className="text-sm font-medium text-slate-300">Athena AI</span>
        </div>
        <p className="text-slate-600 text-xs">MIT License · Built with React, FastAPI, PostgreSQL & Claude AI</p>
      </footer>

      {/* ── LOGIN MODAL ── */}
      <AnimatePresence>
        {loginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(4,6,10,0.85)", backdropFilter: "blur(12px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setLoginOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md bg-[#0D1117] border border-white/10 rounded-2xl p-8 relative"
            >
              <button
                onClick={() => setLoginOpen(false)}
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <HiOutlineXMark size={20} />
              </button>

              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                  <HiOutlineSparkles size={15} className="text-white" />
                </div>
                <span className="font-semibold text-white">Sign in to Athena <span className="text-violet-400">AI</span></span>
              </div>

              {/* Role Selector */}
              <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 mb-6">
                {["Student", "Recruiter", "Admin"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      role === r
                        ? "bg-violet-600 text-white shadow-lg"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={`${role.toLowerCase()}@athena.ai`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPass ? <HiOutlineEyeSlash size={17} /> : <HiOutlineEye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
                    <input type="checkbox" className="accent-violet-500 rounded" />
                    Remember me
                  </label>
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</button>
                </div>

                <button className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.98]">
                  Sign in as {role}
                </button>

                <p className="text-center text-xs text-slate-500">
                  No account?{" "}
                  <button className="text-violet-400 hover:text-violet-300 transition-colors">
                    Register now
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}