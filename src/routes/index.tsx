import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ArrowRight, ArrowUp,
  Brain, BarChart3, Code2, Layers, ShoppingBag, Palette,
  GraduationCap, Briefcase, Award, ExternalLink, Sparkles, Cpu, Database,
  Globe, Wrench, Users, Menu, X,
} from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { Typewriter } from "@/components/Typewriter";
import { CertificateModal } from "@/components/CertificateModal";
import profileImg from "@/assets/Santanu.png";
import emailjs from "@emailjs/browser";


const EMAILJS_SERVICE_ID = "service_qce10c2";
const EMAILJS_TEMPLATE_ID = "template_iosni5d";
const EMAILJS_PUBLIC_KEY = "VaPjgOR3EX90plQ6L";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Santanu Maity — AI & ML Engineer | Full-Stack Developer" },
      { name: "description", content: "AI & Machine Learning Engineer, Data Analytics Enthusiast, and Full-Stack Developer crafting intelligent, modern solutions." },
      { property: "og:title", content: "Santanu Maity — AI & ML Engineer" },
      { property: "og:description", content: "AI, Data Analytics, and Full-Stack Development portfolio." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const on = () => { setScrolled(window.scrollY > 30); setShowTop(window.scrollY > 600); };
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
        <div className="mx-auto max-w-7xl px-4">
          <nav className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
            <button onClick={() => go("home")} className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-mix)] text-background">SM</span>
              <span className="hidden sm:inline">Santanu<span className="text-gradient">.</span></span>
            </button>
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => go(n.id)} className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground hover:bg-[var(--primary)]/10">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button onClick={() => go("contact")} className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-blue">
                Hire Me <ArrowRight className="h-4 w-4" />
              </button>
              <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg glass lg:hidden">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {open && (
            <div className="mt-2 rounded-2xl glass-strong p-3 lg:hidden">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => go(n.id)} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[var(--primary)]/10">
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />

      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-[image:var(--gradient-mix)] text-background glow-blue transition hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-hero pt-28 pb-16">
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon)]" />
            </span>
            Available for opportunities
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Santanu Maity</span>
          </h1>
          <div className="mt-4 flex min-h-[2.5rem] items-center text-xl font-medium text-muted-foreground sm:text-2xl">
            <Typewriter
              words={[
                "AI & Machine Learning Engineer",
                "Data Analytics Enthusiast",
                "Full-Stack Developer",
              ]}
            />
          </div>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Building intelligent solutions through Artificial Intelligence, Data Analytics, and modern Software Development.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground glow-blue transition hover:scale-[1.02]">
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-accent)] px-6 py-3 font-semibold text-accent-foreground glow-orange transition hover:scale-[1.02]">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-semibold transition hover:bg-[var(--primary)]/15">
              Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <Social href="https://www.linkedin.com/in/santanu-maity-8934b8372/" label="LinkedIn"><Linkedin className="h-5 w-5" /></Social>
            <Social href="https://github.com/santanumaity3155-spec" label="GitHub"><Github className="h-5 w-5" /></Social>
            <Social href="mailto:santanu.maity3155@gmail.com" label="Email"><Mail className="h-5 w-5" /></Social>
          </div>
        </div>

        {/* Profile */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="absolute h-[360px] w-[360px] rounded-full bg-[conic-gradient(from_0deg,var(--neon),var(--ember),var(--neon))] opacity-40 blur-3xl animate-spin-slow sm:h-[440px] sm:w-[440px]" />
          <div className="relative animate-float">
            {/* Outer rotating conic ring */}
            <div className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,var(--neon),transparent_40%,var(--ember),transparent_70%,var(--neon))] animate-spin-slow opacity-70" />
            {/* Soft glow halo behind the face/shoulders */}
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--neon)_55%,transparent),transparent_60%)] blur-2xl" />
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_50%_70%,color-mix(in_oklab,var(--ember)_45%,transparent),transparent_55%)] blur-2xl" />

            {/* Circular mask */}
            <div className="relative h-72 w-72 overflow-hidden rounded-full glass-strong p-1 ring-2 ring-[color-mix(in_oklab,var(--neon)_60%,transparent)] shadow-[0_0_60px_-10px_var(--neon),0_0_80px_-20px_var(--ember)] sm:h-80 sm:w-80">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <img
                  src={profileImg}
                  alt="Santanu Maity"
                  width={512}
                  height={512}
                  loading="eager"
                  className="h-full w-full rounded-full object-cover object-[center_28%] scale-[1.02]"
                />
                {/* Inner rim light */}
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[var(--border)]" />
              </div>
            </div>

            <span className="absolute -right-2 top-8 rounded-xl glass px-3 py-2 text-xs font-mono text-[var(--neon)]">
              <Cpu className="mr-1 inline h-3.5 w-3.5" /> AI / ML
            </span>
            <span className="absolute -left-4 bottom-12 rounded-xl glass px-3 py-2 text-xs font-mono text-[var(--ember)]">
              <Code2 className="mr-1 inline h-3.5 w-3.5" /> Full-Stack
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      className="grid h-11 w-11 place-items-center rounded-xl glass text-muted-foreground transition hover:text-[var(--neon)] hover:scale-110">
      {children}
    </a>
  );
}

/* ---------------- SECTION HELPERS ---------------- */
function SectionHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--neon)]">
        <Sparkles className="h-3 w-3" /> {tag}
      </span>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
const STATS = [
  { v: "10+", l: "Projects Completed", i: Layers },
  { v: "2+", l: "Certifications", i: Award },
  { v: "25+", l: "Technologies Learned", i: Cpu },
  { v: "1", l: "Internship Experience", i: Briefcase },
];

const QUICK_SKILLS = [
  { l: "AI / Machine Learning", v: 88 },
  { l: "Data Analytics", v: 85 },
  { l: "Full-Stack Web Development", v: 82 },
  { l: "Python & Data Science", v: 90 },
];

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="About Me" title={<>Engineer of <span className="text-gradient">intelligent systems</span></>} />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="glass rounded-3xl p-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground font-semibold">Santanu Maity</span>, an aspiring <span className="text-[var(--neon)] font-semibold">AI & Machine Learning Engineer</span> and Data Analytics enthusiast with a strong passion for building intelligent, impactful solutions.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I specialize in Python, Machine Learning, Data Science, and Full-Stack Web Development — developing AI-powered applications and analytics-driven platforms. I enjoy transforming complex problems into practical solutions and continuously expanding my expertise in emerging technologies.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              My goal is to craft innovative systems that combine <span className="text-[var(--ember)] font-semibold">artificial intelligence, analytics, and modern software development</span> to deliver meaningful real-world impact.
            </p>

            <div className="mt-8 space-y-5">
              {QUICK_SKILLS.map((s) => (
                <div key={s.l}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{s.l}</span>
                    <span className="font-mono text-[var(--neon)]">{s.v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-[image:var(--gradient-mix)] transition-[width] duration-1000"
                      style={{ width: `${s.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 content-start">
            {STATS.map((s) => (
              <div key={s.l} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:glow-blue">
                <s.i className="h-7 w-7 text-[var(--neon)]" />
                <div className="mt-3 font-display text-3xl font-bold text-gradient">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
            <div className="col-span-2 glass rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm font-mono text-[var(--ember)]">
                <Sparkles className="h-4 w-4" /> Vision
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                To engineer next-generation AI systems that empower people, automate the complex, and turn data into clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */
const EDU = [
  {
    title: "B.Tech in Computer Science & Engineering (AI & ML)",
    place: "Brainware University",
    period: "2023 – 2027 • Currently Pursuing",
    desc: "Building a strong foundation in Computer Science with practical work in AI, Machine Learning, Data Analytics, and Full-Stack Development.",
  },
  {
    title: "Higher Secondary (Class XII)",
    place: "Gobindapur High School • WBCHSE",
    period: "2023",
    desc: "Completed higher secondary education with a focus on Science & Mathematics.",
  },
  {
    title: "Secondary (Class X)",
    place: "Sonapetya High School • WBBSE",
    period: "2021",
    desc: "Completed secondary schooling, building strong academic fundamentals.",
  },
];

function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Education" title={<>Academic <span className="text-gradient">journey</span></>} />
        <div className="relative mt-14 mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon)] via-[var(--ember)] to-transparent md:left-1/2 md:-translate-x-px" />
          <div className="space-y-8">
            {EDU.map((e, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={e.title} className="relative md:grid md:grid-cols-2 md:gap-10">
                  <div className="absolute left-4 top-6 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-[image:var(--gradient-mix)] glow-blue md:left-1/2">
                    <GraduationCap className="h-4 w-4 text-background" />
                  </div>
                  <div className={`ml-12 md:ml-0 ${isEven ? "md:col-start-1 md:pr-10 md:text-right" : "md:col-start-2 md:pl-10 text-left"}`}>
                    <div className="glass rounded-2xl p-6 transition hover:-translate-y-1">
                      <div className="font-mono text-xs uppercase tracking-wider text-[var(--ember)]">{e.period}</div>
                      <h3 className="mt-2 font-display text-xl font-semibold">{e.title}</h3>
                      <div className="mt-1 text-sm text-[var(--neon)]">{e.place}</div>
                      <p className="mt-3 text-sm text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
const EXPERIENCE = [
  {
    role: "AI & Machine Learning Intern",
    org: "Kodacy (in association with SPACE)",
    icon: Brain,
    color: "var(--neon)",
    points: [
      "Practical AI and Machine Learning implementation",
      "Model development and experimentation",
      "Data-driven problem solving",
      "Hands-on AI project exposure",
    ],
  },
  {
    role: "Blockchain, Big Data & Data Science Training",
    org: "NIELIT Kolkata",
    icon: Database,
    color: "var(--ember)",
    points: [
      "Blockchain Technology fundamentals",
      "Big Data concepts and tools",
      "Data Science methodologies",
      "Data processing and analytics",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Experience & Training" title={<>Where I <span className="text-gradient">grew</span></>} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {EXPERIENCE.map((x) => (
            <div key={x.role} className="group relative overflow-hidden rounded-3xl glass p-7 transition hover:-translate-y-1">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40" style={{ background: `radial-gradient(circle, ${x.color}, transparent 70%)` }} />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl glass-strong" style={{ color: x.color as string }}>
                    <x.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{x.role}</h3>
                    <div className="text-sm text-muted-foreground">{x.org}</div>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {x.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: x.color as string }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
const SKILL_GROUPS: { title: string; icon: any; color: string; items: string[] }[] = [
  { title: "Programming Languages", icon: Code2, color: "var(--neon)", items: ["Python", "Java", "C", "JavaScript", "SQL", "HTML5", "CSS3"] },
  { title: "Web Development", icon: Globe, color: "var(--ember)", items: ["React.js", "Node.js", "Express.js", "REST APIs", "Bootstrap", "Tailwind CSS", "Git", "GitHub"] },
  { title: "Frameworks & Libraries", icon: Layers, color: "var(--neon)", items: ["React", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "OpenCV"] },
  { title: "AI & Machine Learning", icon: Brain, color: "var(--ember)", items: ["Machine Learning", "Deep Learning", "Data Mining", "NLP", "Computer Vision", "Feature Engineering", "Model Training", "AI App Dev"] },
  { title: "Databases", icon: Database, color: "var(--neon)", items: ["MySQL", "SQLite", "MongoDB"] },
  { title: "Data Analytics", icon: BarChart3, color: "var(--ember)", items: ["Power BI", "Pandas", "NumPy", "Excel", "Data Visualization", "Statistical Analysis", "Jupyter Notebook"] },
  { title: "Core CS", icon: Cpu, color: "var(--neon)", items: ["DSA", "Operating Systems", "DBMS", "Computer Networks", "Software Engineering", "OOP"] },
  { title: "Professional", icon: Users, color: "var(--ember)", items: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Communication", "Time Management", "Adaptability", "Continuous Learning", "Project Management"] },
];

function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Skills" title={<>My <span className="text-gradient">tech arsenal</span></>} sub="A growing toolkit spanning AI, data, and full-stack engineering." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1">
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at top right, ${g.color}, transparent 60%)`, mixBlendMode: "screen", filter: "blur(20px)" }} />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl glass-strong" style={{ color: g.color }}>
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-md border border-[var(--border)] bg-[var(--primary)]/[0.05] px-2 py-1 text-xs text-muted-foreground transition hover:border-[color:var(--neon)] hover:text-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Brain, title: "AI & Machine Learning Solutions", desc: "Develop intelligent systems using Machine Learning, Deep Learning, NLP, and Computer Vision." },
  { icon: BarChart3, title: "Data Analytics & Visualization", desc: "Transform complex datasets into actionable insights through dashboards and visual reports." },
  { icon: Globe, title: "Web Development", desc: "Build responsive, interactive, and modern websites using contemporary web technologies." },
  { icon: Layers, title: "Full-Stack Development", desc: "Develop complete end-to-end web applications with scalable architecture." },
  { icon: ShoppingBag, title: "E-Commerce Development", desc: "Create secure, scalable online shopping platforms tailored to your brand." },
  { icon: Palette, title: "UI / UX Design", desc: "Design user-friendly, visually appealing, and engaging digital experiences." },
];

function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Services" title={<>What I <span className="text-gradient">deliver</span></>} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group relative overflow-hidden rounded-3xl glass p-7 transition hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition group-hover:opacity-60"
                style={{ background: i % 2 ? "var(--ember)" : "var(--neon)" }} />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-mix)] text-background">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--neon)] opacity-0 transition group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  {
    name: "MindHaven",
    sub: "Mental Health Analytics Dashboard",
    desc: "Analyzed user mood and journaling data to identify behavioral trends and visualize mood patterns through interactive dashboards.",
    features: ["Sentiment Analysis", "Interactive Dashboards", "Mood Pattern Viz", "ML Classification"],
    tech: ["Python", "Streamlit", "Machine Learning"],
    accent: "var(--neon)",
  },
  {
    name: "Stock Market Analysis",
    sub: "Python Data Analytics",
    desc: "Collected and analyzed historical stock market data using advanced analytics and predictive techniques.",
    features: ["Data Cleaning", "Exploratory Analysis", "Trend Analysis", "Predictive Modeling"],
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "ML"],
    accent: "var(--ember)",
  },
  {
    name: "CareBot+",
    sub: "AI-Powered Mental Health Platform",
    desc: "AI-powered digital mental health and psychological support platform designed for higher education students.",
    features: ["AI Emotional Support", "Counseling Booking", "Health Resources", "Peer Support", "Anonymous Analytics"],
    tech: ["AI", "Machine Learning", "Web Dev", "Analytics"],
    accent: "var(--neon)",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Projects" title={<>Selected <span className="text-gradient">work</span></>} sub="A glimpse at the AI, analytics, and full-stack systems I've built." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.name} className="group relative flex flex-col overflow-hidden rounded-3xl glass transition hover:-translate-y-1">
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 60%), linear-gradient(135deg, oklch(0.94 0.02 240), oklch(0.9 0.03 240))` }} />
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="relative grid h-full place-items-center">
                  <div className="font-display text-5xl font-bold text-gradient">{p.name.slice(0,2)}</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <div className="text-sm text-[var(--neon)]">{p.sub}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1 w-1 rounded-full" style={{ background: p.accent }} /> {f}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md border border-[var(--border)] bg-[var(--primary)]/[0.05] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90">
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                  <a href="https://github.com/santanumaity3155-spec" target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg glass px-3 py-2 text-xs font-semibold transition hover:bg-[var(--primary)]/15">
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
const certificates = [
  {
    id: "1",
    title: "Exploring Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    date: "07 May 2026",
    preview: "/certificates/previews/ibm-exploring-artificial-intelligence.jpg",
    file: null,
    downloadName: null,
    credentialId: "ALM-COURSE_3825247",
    category: "AI & Machine Learning"
  },
  {
    id: "2",
    title: "Navigating AI Tools: A Selection Framework",
    issuer: "IBM SkillsBuild",
    date: "28 June 2026",
    preview: "/certificates/previews/ibm-navigating-ai-tools-selection-framework.jpg",
    file: "/certificates/pdf/ibm-navigating-ai-tools-selection-framework.pdf",
    downloadName: "IBM_Navigating_AI_Tools.pdf",
    credentialId: "ALM-COURSE_4068818",
    category: "AI & Machine Learning"
  },
  {
    id: "3",
    title: "Machine Learning Using Python",
    issuer: "IBM SkillsBuild",
    date: "12 February 2026",
    preview: "/certificates/previews/ibm-machine-learning-using-python.jpg",
    file: "/certificates/pdf/ibm-machine-learning-using-python.pdf",
    downloadName: "Machine_Learning_Using_Python.pdf",
    credentialId: "9838026",
    category: "AI & Machine Learning"
  },
  {
    id: "4",
    title: "Exploring Data Transformation with Google Cloud",
    issuer: "Google Cloud",
    date: "08 March 2026",
    preview: "/certificates/previews/google-cloud-exploring-data-transformation.jpg",
    file: "/certificates/pdf/google-cloud-exploring-data-transformation.pdf",
    downloadName: "Google_Cloud_Data_Transformation.pdf",
    credentialId: "9933929",
    category: "Cloud"
  },
  {
    id: "5",
    title: "AWS Application Migration Service (AWS-MGN) – A Technical Introduction",
    issuer: "AWS",
    date: "11 February 2026",
    preview: "/certificates/previews/aws-application-migration-service.jpg",
    file: "/certificates/pdf/aws-application-migration-service.pdf",
    downloadName: "AWS_MGN_Technical_Introduction.pdf",
    credentialId: "9832166",
    category: "Cloud"
  },
  {
    id: "6",
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "15 March 2026",
    preview: "/certificates/previews/be10x-ai-tools-chatgpt-workshop.jpg",
    file: "/certificates/pdf/be10x-ai-tools-chatgpt-workshop.pdf",
    downloadName: "be10x_AI_Tools_Workshop.pdf",
    credentialId: null,
    category: "Developer Tools"
  },
  {
    id: "7",
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: "01 July 2026",
    preview: "/certificates/previews/linkedin-what-is-generative-ai.jpg",
    file: "/certificates/pdf/linkedin-what-is-generative-ai.pdf",
    downloadName: "LinkedIn_What_Is_Generative_AI.pdf",
    credentialId: "7e8646dfaba0528b38aa56add2162091b16f4fc4faadc443d40283194586195d",
    category: "AI & Machine Learning"
  },
  {
    id: "8",
    title: "Your Top AI Questions Answered: AI Literacy for Everyone",
    issuer: "LinkedIn Learning",
    date: "01 July 2026",
    preview: "/certificates/previews/linkedin-top-ai-questions-answered.jpg",
    file: "/certificates/pdf/linkedin-top-ai-questions-answered.pdf",
    downloadName: "LinkedIn_AI_Literacy.pdf",
    credentialId: "6868c0742d1e86ec42d93c615e3cc950c0b7619fa7701fbe8c5dd00285662cf2",
    category: "AI & Machine Learning"
  },
  {
    id: "9",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata",
    platform: "Forage",
    date: "06 August 2025",
    preview: "/certificates/previews/forage-tata-genai-data-analytics.jpg",
    file: "/certificates/pdf/forage-tata-genai-data-analytics.pdf",
    downloadName: "Tata_GenAI_Data_Analytics_Job_Simulation.pdf",
    credentialId: null,
    category: "Data Analytics"
  },
  {
    id: "10",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    platform: "Forage",
    date: "12 February 2026",
    preview: "/certificates/previews/forage-deloitte-data-analytics.jpg",
    file: "/certificates/pdf/forage-deloitte-data-analytics.pdf",
    downloadName: "Deloitte_Data_Analytics_Job_Simulation.pdf",
    credentialId: null,
    category: "Data Analytics"
  },
  {
    id: "11",
    title: "GitHub for Open Standards Development (LFD140)",
    issuer: "The Linux Foundation",
    date: "11 February 2026",
    preview: "/certificates/previews/linux-foundation-github-open-standards.jpg",
    file: "/certificates/pdf/linux-foundation-github-open-standards.pdf",
    downloadName: "Linux_Foundation_GitHub_LFD140.pdf",
    credentialId: "LF-2hfrz6of8m",
    category: "Developer Tools"
  }
];

function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[number] | null>(null);

  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Certifications" title={<>Certificates</>} sub="Professional certifications, courses, and industry learning achievements." />
        <div className="mt-14 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="group relative overflow-hidden rounded-3xl glass p-6 transition hover:-translate-y-1 hover:glow-blue">
              {/* Controlled partial preview container - full certificate is NOT readable from card */}
              <div className="relative mb-4 h-[180px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <img
                  src={cert.preview}
                  alt={`${cert.title} preview`}
                  className="h-full w-full object-cover object-top opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background,#0b0f17)]/90 via-transparent to-transparent" />
                <div className="pointer-events-none absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground backdrop-blur-md">
                  Preview
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono text-[var(--neon)] uppercase tracking-wider">{cert.issuer}</div>
                <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
                <div className="text-sm text-muted-foreground">{cert.date}</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:scale-[1.02] cursor-pointer"
                  >
                    SHOW
                  </button>
                  {cert.file ? (
                    <a
                      href={cert.file}
                      download={cert.downloadName}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)]/20 bg-[image:var(--gradient-accent)]/20 px-4 py-2 text-xs font-semibold text-accent-foreground transition hover:scale-[1.02] hover:border-[var(--border)]/10 hover:bg-[image:var(--gradient-accent)]/30"
                    >
                      DOWNLOAD
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-accent)]/20 px-4 py-2 text-xs font-semibold text-accent-foreground cursor-not-allowed"
                    >
                      DOWNLOAD
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader tag="Contact" title={<>Let's <span className="text-gradient">build</span> together</>} sub="Have an idea, a role, or a collaboration in mind? Send a message." />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { i: Mail, l: "Email", v: "santanu.maity3155@gmail.com", h: "mailto:santanu.maity3155@gmail.com" },
              { i: Phone, l: "Phone", v: "+91 7601815490", h: "tel:+917601815490" },
              { i: MapPin, l: "Location", v: "Kolkata, West Bengal, India", h: "https://maps.google.com/?q=Kolkata,West+Bengal,India" },
              { i: Linkedin, l: "LinkedIn", v: "santanu-maity", h: "https://www.linkedin.com/in/santanu-maity-8934b8372/" },
              { i: Github, l: "GitHub", v: "santanumaity3155-spec", h: "https://github.com/santanumaity3155-spec" },
            ].map((c) => (
              <a key={c.l} href={c.h} target={c.h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl glass p-4 transition hover:-translate-y-0.5 hover:bg-[var(--primary)]/[0.08]">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-mix)] text-background">
                  <c.i className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{c.l}</div>
                  <div className="truncate font-medium">{c.v}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            ))}
            <div className="overflow-hidden rounded-2xl glass">
              <iframe
                title="Map - Kolkata"
                src="https://www.google.com/maps?q=Kolkata,%20West%20Bengal,India&output=embed"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              setStatus("sending");
              setErrorMsg("");
              try {
                await emailjs.sendForm(
                  EMAILJS_SERVICE_ID,
                  EMAILJS_TEMPLATE_ID,
                  form,
                  { publicKey: EMAILJS_PUBLIC_KEY },
                );
                setStatus("sent");
                form.reset();
              } catch (err: any) {
                console.error("EmailJS error:", err);
                setErrorMsg(err?.text || err?.message || "Failed to send message. Please try again.");
                setStatus("error");
              }
            }}
            className="rounded-3xl glass p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Jane Doe" required />
              <Field label="Email" name="email" type="email" placeholder="jane@example.com" required />
            </div>
            <Field className="mt-4" label="Subject" name="subject" placeholder="Let's collaborate" />
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Tell me about your project, role, or idea…"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--primary)]/[0.05] px-4 py-3 text-sm outline-none transition focus:border-[var(--neon)] focus:ring-2 focus:ring-[color:var(--neon)]/30"
              />
            </div>
            <button type="submit" disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground glow-blue transition hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed">
              {status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✓" : "Send Message"}
              <ArrowRight className="h-4 w-4" />
            </button>
            {status === "sent" && (
              <p className="mt-3 text-center text-xs text-[var(--neon)]">Thanks! Your message has been delivered.</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-center text-xs text-red-400">{errorMsg}</p>
            )}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Or email me directly at <a href="mailto:santanu.maity3155@gmail.com" className="text-[var(--neon)] hover:underline">santanu.maity3155@gmail.com</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, className = "", ...rest }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--primary)]/[0.05] px-4 py-3 text-sm outline-none transition focus:border-[var(--neon)] focus:ring-2 focus:ring-[color:var(--neon)]/30"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-mix)] text-background">SM</span>
            Santanu Maity
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            AI & Machine Learning Engineer building intelligent, real-world solutions.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Quick Links</div>
          <ul className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="hover:text-[var(--neon)]">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Connect</div>
          <div className="flex gap-2">
            <Social href="https://www.linkedin.com/in/santanu-maity-8934b8372/" label="LinkedIn"><Linkedin className="h-5 w-5" /></Social>
            <Social href="https://github.com/santanumaity3155-spec" label="GitHub"><Github className="h-5 w-5" /></Social>
            <Social href="mailto:santanu.maity3155@gmail.com" label="Email"><Mail className="h-5 w-5" /></Social>
          </div>
          <p className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-1">
            <Wrench className="h-3 w-3" /> Crafted with React, Tailwind & a love for AI.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--border)] px-4 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Santanu Maity. All rights reserved.
      </div>
    </footer>
  );
}
