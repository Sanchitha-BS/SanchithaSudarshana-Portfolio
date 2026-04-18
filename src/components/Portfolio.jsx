"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Mail, MapPin, Send, Download,
  GraduationCap, Code2, CheckCircle2, ArrowRight, ArrowUp,
  Database, BarChart3, Brain, Layers, BookOpen,
  ChevronLeft, ChevronRight, PlayCircle, ExternalLink,
  Star, TrendingUp, Award, Phone, ChevronDown,
} from 'lucide-react';
import {
  SiPython, SiPostgresql, SiMysql, SiSnowflake, SiTableau,
  SiApachespark, SiTensorflow, SiScikitlearn, SiPandas,
  SiNumpy, SiGit, SiR, SiDatabricks, SiJupyter,
} from 'react-icons/si';

/* ─── GRADIENT TEXT ─────────────────────────────────────────── */
const G = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 ${className}`}>
    {children}
  </span>
);

/* ─── SKILL PILL ─────────────────────────────────────────────── */
const Pill = ({ name }) => (
  <span className="px-2.5 py-1 rounded-full border border-pink-500/25 bg-pink-500/8 text-pink-300 text-xs font-medium whitespace-nowrap">
    {name}
  </span>
);

/* ─── TYPEWRITER ─────────────────────────────────────────────── */
function Typewriter({ words }) {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const word = words[idx % words.length];
    const speed = deleting ? 50 : 110;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, words, idx]);
  return (
    <span className="inline-flex items-center gap-0.5">
      <G className="font-bold">{text}</G>
      <span className="w-0.5 h-5 bg-pink-400 animate-pulse inline-block" />
    </span>
  );
}

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, x = 0, y = 24, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── PARALLAX SECTION ───────────────────────────────────────── */
const ParallaxSection = ({ id, children, dark = false, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);
  return (
    <section ref={ref} id={id} className={`py-16 px-6 relative overflow-hidden ${dark ? 'bg-white/3' : 'bg-transparent'} ${className}`}>
      <motion.div style={{ y }} className="max-w-5xl mx-auto">
        {children}
      </motion.div>
    </section>
  );
};

/* ─── SECTION HEADING ────────────────────────────────────────── */
const SH = ({ emoji, title, sub }) => (
  <Reveal className="mb-10">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-1">
      {emoji && <span className="mr-2">{emoji}</span>}<G>{title}</G>
    </h2>
    {sub && <p className="text-gray-400 text-sm mt-1 max-w-2xl">{sub}</p>}
    <div className="mt-3 w-12 h-0.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500" />
  </Reveal>
);

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const ROLES = ["Data Science Engineer", "Data Analyst", "Data Engineer", "Business Analyst", "ML Enthusiast"];
const OPEN_ROLES = ["Data Analyst", "Data Engineer", "Business Analyst", "BI Analyst", "Data Science Engineer"];

const EXPERIENCES = [
  { role: "Graduate AI Researcher", company: "NEXIS Student Technology Lab | iSchool, Syracuse University", period: "Sep 2025 – Present", icon: "🔬",
    bullets: ["Engaged with the Nexis AI team, contributing to projects in AI for innovative solutions.", "Developing containerized ML pipelines for reproducible experiments.", "Collaborating with faculty on publications in AI conferences."] },
  { role: "Solution Architect", company: "Oracle Cerner, Bangalore, India", period: "Sep 2023 – Jul 2024", icon: "🏗️",
    bullets: ["Architected ETL/ELT pipelines and BI data models processing 1M+ records/cycle across Finance and HR — reduced pipeline processing time by 20%, saving ~$40K+ annually.", "Mentored 3 junior analysts on SQL optimization, data modeling, and Agile delivery — improving team throughput by ~25%.", "Delivered KPI dashboards (Power BI, Infor Birst/dEPM) for 5+ reporting modules, serving 1,000+ end users."] },
  { role: "Technical Solution Analyst 1", company: "Cerner Healthcare Private Limited, Bangalore, India", period: "May 2022 – Aug 2023", icon: "📊",
    bullets: ["Developed 20+ BI dashboards and SQL-based reporting pipelines across HR, Payroll, and Finance — reduced data retrieval latency by 25%.", "Enabled analytics across high-volume datasets for 500+ stakeholders.", "Prevented downstream reporting errors affecting ~$2M in payroll accuracy per quarter."] },
  { role: "Technical Solution Intern", company: "Cerner Healthcare Private Limited, Bangalore, India", period: "Dec 2021 – May 2022", icon: "💡",
    bullets: ["Optimized SQL/T-SQL queries and supported ETL validation for enterprise reporting workflows.", "Improved query performance by 30% and ensured data accuracy across daily operational pipelines."] },
];

const EDUCATION = [
  { university: "Syracuse University", school: "School of Information Studies (iSchool)", degree: "Master of Science, Applied Data Science", period: "Aug 2024 – May 2026", location: "Syracuse, NY",
    coursework: ["Introduction to Data Science", "Applied Machine Learning", "Data Warehouse", "Business Analytics", "Big Data Analytics", "Lean Six Sigma", "Visual Analytics", "Python Programming", "Database Management Systems"] },
  { university: "New Horizon College of Engineering", school: "Bangalore, India", degree: "Bachelor of Engineering, Information Science and Engineering", period: "Aug 2018 – Jul 2022", location: "Bangalore, India", coursework: [] },
];

const ICON_SKILLS = [
  { name: 'Python', icon: SiPython }, { name: 'PostgreSQL / SQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql }, { name: 'R', icon: SiR },
  { name: 'Snowflake', icon: SiSnowflake }, { name: 'Apache Spark', icon: SiApachespark },
  { name: 'Tableau', icon: SiTableau }, { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'scikit-learn', icon: SiScikitlearn }, { name: 'Pandas', icon: SiPandas },
  { name: 'NumPy', icon: SiNumpy }, { name: 'Git', icon: SiGit },
  { name: 'Jupyter', icon: SiJupyter }, { name: 'Databricks', icon: SiDatabricks },
];

const TEXT_SKILL_GROUPS = [
  { title: "Machine Learning", emoji: "🤖", skills: ["Regression", "Classification", "Time Series Forecasting", "NLP (BERT, Hugging Face)", "XGBoost", "Hypothesis Testing", "Feature Engineering"] },
  { title: "Data Engineering", emoji: "⚙️", skills: ["ETL/ELT Pipelines", "Data Modeling", "Data Warehousing", "dbt", "SQL Server", "T-SQL", "REST APIs"] },
  { title: "Analytics & BI", emoji: "📊", skills: ["Power BI", "Excel", "Infor Lawson BI", "Infor dEPM", "Infor Birst", "Crystal Reports"] },
  { title: "Other", emoji: "🛠️", skills: ["Data Cleaning & Wrangling", "Data Visualization", "Agile / Scrum", "HIPAA Compliance", "PySpark"] },
];

const PROJECTS = [
  { title: "🐦 Bird Migration Data Warehouse", period: "Aug 2025 – Dec 2025",
    problem: "Researchers lacked a scalable analytics platform for wildlife migration patterns across large datasets.",
    dataSource: "100K+ bird migration records across multiple ecological datasets",
    tools: ["dbt", "Snowflake", "Power BI", "SQL", "ELT Pipelines", "Star Schema"],
    approach: ["Engineered ELT pipeline on Snowflake using dbt (RAW → STAGING → CORE → MART)", "Designed star schema data warehouse with fact and dimension tables", "Built Power BI dashboards for self-service analytics", "Improved query performance 30% and data consistency 35%"],
    results: ["Cut stakeholder analysis time by 40%", "Enabled data-driven decisions in wildlife migration research", "Self-service analytics for researchers and conservationists"],
    github: "https://github.com/Sanchitha-BS/Bird-Migration-Data-Warehouse", dashboard: null },
  { title: "✈️ Aviation Delay Analysis Dashboard", period: "Jan 2025 – Apr 2025",
    problem: "Airlines needed better tools to understand flight delay patterns to reduce $8B+ annual industry delay costs.",
    dataSource: "500K+ flight records from 3 public data sources (FAA/OpenAPIs)",
    tools: ["Tableau", "Python", "Pandas", "FAA APIs", "Time-Series Forecasting"],
    approach: ["Integrated 500K+ flight records from 3 public data sources", "Identified 27% delay increase tied to ATC staffing shortages", "Deployed Tableau dashboards with time-series forecasting", "Applied findings to scheduling optimization and policy recommendations"],
    results: ["Improved delay predictability by 35%", "Reduced stakeholder decision time by 40%", "Insights applicable to reducing $8B+ annual delay costs"],
    github: "https://github.com/Sanchitha-BS/Aviation-Delay-Tableau-Dashboard",
    dashboard: "https://public.tableau.com/app/profile/sanchitha.sudarshana/viz/AviationDelayAnalysisDashboard/HOMEPAGE?publish=yes" },
  { title: "🚗 NYPD Traffic Accident Pipeline", period: "Jan 2025 – Apr 2025",
    problem: "Raw NYPD traffic accident data was messy and inconsistent, limiting actionable safety insights at scale.",
    dataSource: "200K+ NYPD traffic accident records",
    tools: ["Python", "Pandas", "SQL", "ETL Pipelines", "PostgreSQL"],
    approach: ["Built pipelines using Python and SQL to ingest and process 200K+ records", "Standardized datasets — handled missing values, inconsistent formats, duplicates", "Optimized data processing workflows and query performance"],
    results: ["Reduced data preparation time by ~35%", "Improved data quality and consistency by ~40%", "Reduced data retrieval time by ~25%"],
    github: "https://github.com/Sanchitha-BS/NYPD-Traffic-Safety-Intelligence", dashboard: null },
  { title: "🏥 Health Insurance Fraud Detection", period: "Jan 2022 – Apr 2022",
    problem: "Insurance companies face multi-million-dollar losses from fraudulent claims difficult to detect at scale.",
    dataSource: "Health insurance claims dataset with labeled fraud indicators",
    tools: ["Python", "XGBoost", "SVM", "MySQL", "scikit-learn", "Feature Engineering"],
    approach: ["Built ML pipeline combining XGBoost and SVM classifiers", "Feature engineering and data preprocessing on claims data", "Optimized model for precision to minimize false negatives", "Published at IEEE ICETET-SIP-22 conference"],
    results: ["Achieved 20% reduction in fraudulent claims", "30% faster data processing pipeline", "IEEE publication — real-world applicability proven"],
    github: "https://github.com/Sanchitha-BS", dashboard: null },
];

/* ── BLOG: single long-form post with accordion sections (like reference image) */
const BLOG_TITLE = "From Data Pipelines to Data Science: My Journey Through Applied Data Science";
const BLOG_SUBTITLE = "A portfolio reflection on growth, real-world projects, and what data science actually looks like in practice.";
const BLOG_SECTIONS = [
  {
    heading: "Where It All Began",
    preview: "I didn't start my data science journey in a classroom — I started it in a production environment.",
    body: `I didn't start my data science journey in a classroom — I started it in a production environment, writing SQL queries and debugging ETL pipelines for one of the world's largest healthcare technology companies. As a Technical Solution Intern at Cerner Healthcare in late 2021, I was responsible for validating data flowing through enterprise reporting workflows that affected hundreds of thousands of patient records and payroll transactions.\n\nData science, to me, wasn't an abstract discipline. It was a set of tools and methods that made the difference between a system that worked reliably and one that silently produced wrong answers. When I optimized a T-SQL query and reduced processing time by 30%, I saw directly how technical decisions translated into operational outcomes. When I caught a data anomaly before it propagated downstream, I understood why data quality wasn't just a technical concern — it was a business-critical one.\n\nEnrolling in the Master of Science in Applied Data Science program at Syracuse University's iSchool in 2024 was a deliberate decision to formalize and deepen that foundation. I came in with three years of experience as a Solutions Architect at Oracle Cerner, having architected pipelines processing 1M+ records per cycle and delivered HIPAA-compliant analytics dashboards to 1,000+ end users. I wasn't starting from zero. I was starting from a place where I knew enough to know what I didn't know.`
  },
  {
    heading: 'Rethinking What Working with Data Actually Means',
    preview: "Enterprise experience teaches you things that textbooks cannot — and exposes gaps that only structured study can fill.",
    body: `Enterprise experience teaches you things that textbooks cannot — and exposes gaps that only structured study can fill. Working at Oracle Cerner, I had built ETL pipelines and BI dashboards that served real clients with real stakes. But I hadn't always known why certain design decisions were optimal. I applied dimensional modeling principles without having formally studied them. I used ML-adjacent techniques without fully understanding the statistical assumptions underlying them.\n\nThe program changed that. The Data Warehouse course gave me the formal grounding in star schema design, slowly changing dimensions, and ETL architecture that made my prior work make rigorous sense. Applied Machine Learning didn't just teach me algorithms — it taught me to interrogate them: when does a decision tree overfit? Why does regularization help? What does a ROC curve actually tell you about model behavior in deployment?\n\nBig Data Analytics introduced me to distributed processing with Spark in a way that connected directly to the PySpark I had used in production, but now with the theoretical underpinnings to understand partitioning strategies, shuffle operations, and why certain transformations are expensive at scale. Lean Six Sigma — an unexpected favorite — provided a process improvement framework that I now apply mentally to every data pipeline I design: what is the waste in this workflow, and how do I eliminate it?\n\nThe program delivered something I hadn't anticipated: not just new skills, but a new way of thinking about problems I had already solved. That reframing is, I think, one of the most valuable things formal education offers to practitioners.`
  },
  {
    heading: "From Spotting Trends to Understanding Them",
    preview: "The Aviation Delay Analysis project was where I first experienced the difference between seeing a pattern in data and truly understanding what caused it.",
    body: `The Aviation Delay Analysis project was where I first experienced the difference between seeing a pattern in data and truly understanding what caused it. Working with 500,000+ flight records from three public data sources — FAA operational data, airport infrastructure databases, and ATC staffing records — the first challenge was integration. Each source used different airport code formats, different time zone conventions, and different levels of granularity.\n\nBefore any analysis was possible, I had to build a consistent, joined dataset. That process — identifying join keys, resolving format mismatches, handling missing values for cancelled and diverted flights — took longer than any other phase of the project. And it was in that process that the most important analytical decisions were made. The finding that emerged — a statistically significant 27% increase in delays tied to ATC staffing shortages — was only visible after careful normalization and temporal alignment of datasets that had never been designed to work together.\n\nThe Tableau dashboards I built on top of that integrated dataset included time-series forecasting models that reduced stakeholder decision time by 40%. But the technical artifact I'm most proud of from that project isn't the dashboard — it's the data integration pipeline that made the dashboard possible. Insight is downstream of integration. Always.\n\nThe Bird Migration Data Warehouse reinforced this lesson at a different scale. Designing a four-layer dbt architecture on Snowflake — RAW, STAGING, CORE, and MART — forced me to think carefully about where business logic should live in a data pipeline. The 30% improvement in query performance and 35% improvement in data consistency weren't accidents; they were the result of deliberate decisions about materialization strategies, incremental models, and schema design.`
  },
  {
    heading: "Machine Learning: Beyond the Accuracy Score",
    preview: "The Health Insurance Fraud Detection project introduced me to something that no benchmark dataset ever will — the weight of a wrong prediction.",
    body: `The Health Insurance Fraud Detection project introduced me to something that no benchmark dataset ever will: the weight of a wrong prediction. In fraud detection, a false negative — a fraudulent claim classified as legitimate — has direct financial impact measured in real dollars. A false positive — a legitimate claim flagged as fraud — harms a real person who may be waiting on reimbursement for a medical procedure they couldn't afford to pay out-of-pocket.\n\nThis wasn't a Kaggle competition. The metric that mattered wasn't accuracy — it was the business consequence of each type of error. Optimizing for precision meant accepting lower recall, and that trade-off had to be explicitly justified, not just reported. I combined XGBoost and SVM classifiers, applied SMOTE to address class imbalance, and worked through multiple iterations of feature engineering on claims-level data before arriving at a model that achieved a 20% reduction in fraudulent claims with a 30% faster processing pipeline.\n\nThe work was published at the IEEE ICETET-SIP-22 conference — not because the accuracy score was impressive, but because the methodology was sound and the framing was honest about trade-offs. That experience — thinking about deployment consequences, not just model performance — shaped how I approach every ML problem since.\n\nApplied Machine Learning as a course reinforced this by forcing me to think about the full lifecycle: data preparation, feature selection, model selection, hyperparameter tuning, evaluation, and — critically — what happens when the model is wrong. Ensemble methods, cross-validation, and regularization aren't just techniques; they're responses to specific failure modes in predictive modeling.`
  },
  {
    heading: "The Underrated Art of Data Communication",
    preview: "Every data science project I've worked on has eventually confronted the same final challenge: making the findings matter to someone who didn't build the model.",
    body: `Every data science project I've worked on has eventually confronted the same final challenge: making the findings matter to someone who didn't build the model, didn't clean the data, and doesn't care about the methodology. They care about the decision they need to make and whether your analysis helps them make it better.\n\nAt Oracle Cerner, I delivered KPI dashboards to 1,000+ end users across healthcare finance and HR operations. Most of those users had no idea how the data was modeled or how the pipeline worked. They needed dashboards that were fast, accurate, and immediately interpretable. Every design decision — which metrics to surface, how to structure drill-downs, when to use a bar chart versus a line chart — was a communication decision.\n\nThe Visual Analytics course in the program gave me formal vocabulary for something I had been doing intuitively: understanding pre-attentive attributes, information density, the cognitive load of different visualization types, and how to design for the user's decision-making process rather than for the analyst's comfort with the data.\n\nThe NEXIS AI Research role at Syracuse's iSchool technology lab added another dimension: communicating with faculty researchers who were domain experts but not always ML specialists. Translating between the technical precision required for an AI conference publication and the accessible language required for a faculty stakeholder meeting is a skill that takes deliberate practice. I'm better at it now than I was when I started the program, and I expect to keep improving.`
  },
  {
    heading: "Project Deep Dive: Bird Migration Data Warehouse",
    preview: "Engineering an end-to-end ELT pipeline on Snowflake using dbt for wildlife conservation analytics.",
    body: `The Bird Migration Data Warehouse project was the most technically comprehensive project in my graduate portfolio. Working with 100,000+ ecological records spanning multiple species, geographic regions, and observation methodologies, the core challenge was building infrastructure that would allow researchers and conservationists to ask complex analytical questions without needing to understand the underlying data model.\n\nI designed a four-layer architecture using dbt on Snowflake: the RAW layer preserved exact source data without transformation; the STAGING layer applied data type enforcement, null handling, and format standardization; the CORE layer implemented business logic — defining what constitutes a valid migration event, how to handle duplicate observations, how to classify species by migration type; and the MART layer produced analytics-ready aggregate tables optimized for the specific queries researchers needed to run.\n\nThe star schema centered on a fact table for migration observations, with dimension tables for species, geographic location, observation season, and observer. This design made common analytical patterns — "how has the migration timing of species X changed over the last decade?" or "which geographic corridors show declining observation frequency?" — efficient to execute without requiring researchers to join multiple normalized tables.\n\nThe result: query performance improved by 30% compared to the flat-file analysis the research team had been doing, data consistency issues that had previously required manual reconciliation were reduced by 35%, and stakeholder analysis time dropped by 40%. The project was presented to the research team as a working system, not just a technical deliverable.`
  },
  {
    heading: "Project Deep Dive: NYPD Traffic Accident Pipeline",
    preview: "Building automated data pipelines to transform 200K+ messy accident records into reliable, analysis-ready datasets.",
    body: `The NYPD Traffic Accident Data Analysis and Pipeline project was a study in what it actually takes to make a public dataset useful. The raw data — 200,000+ records from NYPD traffic accident reports — was messy in ways that are entirely typical of operationally-generated data: inconsistent date formats across different reporting periods, missing borough codes for a significant fraction of records, duplicate entries created by reporting lag in the source system, over a dozen categorical variables with inconsistent encoding across different time periods, and free-text fields that contained structured information (vehicle types, contributing factors) in non-standardized formats.\n\nBefore any analysis was possible, I needed to understand the data's provenance: who collected it, for what operational purpose, and what systematic biases that purpose might have introduced. NYPD accident reports are generated by officers at the scene, which means data quality correlates with officer attention and time pressure — accidents that occurred during high-volume periods may have more missing fields than those that occurred in slower periods.\n\nThe pipeline I built automated the cleaning and transformation process: standardizing date formats, imputing missing borough codes from geographic coordinates where available, deduplicating records using a combination of timestamp, location, and vehicle count fields, and normalizing categorical variables using a consistent encoding scheme derived from NYPD's official data dictionary.\n\nThe results were measurable: data preparation time reduced by ~35%, data quality and consistency improved by ~40%, and data retrieval time reduced by ~25% through optimized query structures. The cleaned dataset enabled spatial and temporal analysis of accident patterns that would have been unreliable on the raw data.`
  },
  {
    heading: "Looking Back: What the Program Actually Did",
    preview: "The MS program didn't teach me data science from scratch. It gave me the formal foundation to do what I was already doing — but better, faster, and with greater confidence.",
    body: `The MS program didn't teach me data science from scratch. It gave me the formal foundation to do what I was already doing — but better, faster, and with greater confidence in why my approaches work.\n\nThe most valuable thing the program gave me wasn't any specific technical skill — it was a more rigorous way of thinking about data problems. Before the program, I would select a modeling approach based on familiarity and past success. After the program, I select it based on the properties of the problem: the distribution of the target variable, the relationship structure in the features, the cost of different types of errors, the interpretability requirements of the stakeholder. That's not a small shift — it's the difference between a practitioner and an engineer.\n\nThe research component at the NEXIS AI Lab introduced me to a different kind of problem-solving: one where the answer isn't known in advance, where the contribution to knowledge is the goal rather than the solution to a defined business problem. Contributing to ML pipeline development and faculty publications has given me a perspective on the frontier of the field that complements my enterprise experience.\n\nLeaning into ambiguity — accepting that real problems don't come pre-packaged with clean datasets and clear success metrics — is the most important professional skill the program reinforced. I'm more comfortable than I've ever been with starting a new problem by exploring what I don't know before claiming to know what I do.`
  },
  {
    heading: "Looking Forward",
    preview: "I'm looking for roles where data complexity is high, the stakes are real, and the team values both technical depth and clear communication.",
    body: `I'm looking for roles where data complexity is high, the stakes are real, and the team values both technical depth and clear communication. The combination of enterprise experience — 3+ years across healthcare, finance, and HR domains — and graduate-level depth in ML, data engineering, and statistical analysis puts me in a position to contribute meaningfully from day one while continuing to grow.\n\nThe domains I'm most drawn to are those where data decisions have tangible consequences: healthcare analytics where insights affect patient outcomes, financial analytics where models affect lending or fraud decisions, operational analytics where pipeline quality determines whether a business can respond to what's happening in real time.\n\nI'm open to Data Analyst, Data Engineer, Business Intelligence Analyst, Business Analyst, and Data Science Engineer roles. I'm open to relocating. I graduate in May 2026 and am actively seeking opportunities for 2025–2026.\n\nIf you're building a team where rigorous thinking, production-grade data engineering, and the ability to communicate findings to non-technical stakeholders are all valued, I'd welcome the conversation. The best data teams I've been part of are the ones where the work actually changes something — where a dashboard drives a decision, where a model prevents a harm, where a pipeline makes an analysis possible that wasn't before. That's the kind of work I want to do.`
  },
];

/* ══════════════════════════════════════════════════════════════
   NAV SECTIONS (for active highlight)
══════════════════════════════════════════════════════════════ */
const NAV_SECTIONS = [
  { href: "#about", label: "About", id: "about" },
  { href: "#overview", label: "Academic", id: "overview" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#tabs", label: "Experience", id: "tabs" },
  { href: "#video", label: "Video", id: "video" },
  { href: "#blog", label: "Blog", id: "blog" },
  { href: "#contact", label: "Contact", id: "contact" },
];

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("experience");
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [openBlogIdx, setOpenBlogIdx] = useState(null);

  /* ── Active section tracker (IntersectionObserver) */
  useEffect(() => {
    const observers = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleContact = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${contactForm.name}`);
    const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`);
    window.open(`mailto:sanchithashetty95@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setContactForm({ name: "", email: "", message: "" });
  };

  const tabDefs = [
    { key: "experience", label: "💼 Experience" },
    { key: "education", label: "🎓 Education" },
    { key: "skills", label: "⚡ Skills" },
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-x-hidden">

      {/* ── SCROLL TO TOP ──────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            onClick={scrollTop}
            className="fixed right-5 bottom-8 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── NAV ────────────────────────────────────────────────── */}
      <nav className={`fixed w-full top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-gray-900/96 backdrop-blur-md shadow-lg shadow-black/25 py-2' : 'bg-transparent py-3'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="font-black text-sm tracking-wider"><G>SS</G></a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map(link => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.label}>
                  <a href={link.href}
                    className={`relative text-xs uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-300 font-semibold
                      ${isActive
                        ? 'text-white bg-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/8'}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
            <li>
              <a href="/Sanchitha_Sudarshana_Resume.pdf" download
                className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition ml-1">
                📄 Resume
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button className="md:hidden text-gray-300 p-1" onClick={() => setMenuOpen(o => !o)}>
            <div className="space-y-1">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-gray-900/98 border-t border-white/8 px-6 pb-4 overflow-hidden">
              {[...NAV_SECTIONS, { href: "/Sanchitha_Sudarshana_Resume.pdf", label: "📄 Resume", id: "" }].map(link => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  className={`block py-2.5 text-sm border-b border-white/5 transition-colors ${activeSection === link.id ? 'text-pink-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20 bg-transparent">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-600 blur-3xl" />
        </div>

        {/* ── Layout: left text | right photo ── */}
        <div className="relative w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT: intro text — matches reference spacing */}
          <div className="flex-1 max-w-xl">
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="text-pink-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Hello, I'm
            </motion.p>

            <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3 leading-tight">
              <G>Sanchitha<br />Sudarshana</G>
            </motion.h1>

            {/* Thin separator line — matches reference */}
            <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="origin-left w-16 h-0.5 bg-gradient-to-r from-pink-500 to-indigo-400 mb-4" />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-gray-300 mb-3 h-8 flex items-center">
              <Typewriter words={ROLES} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              MS in Applied Data Science @ <strong className="text-white">Syracuse University</strong><br />
              3+ yrs Enterprise Data Engineering · BI · ML · Turning data into impactful decisions.
            </motion.p>


          </div>

          {/* RIGHT: circular photo + icon row + location */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5 shrink-0"
          >
            {/* Circular photo with ring */}
            <div className="relative">
              {/* Outer glow ring — animated */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-60 blur-sm"
              />
              <div className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-gray-900 shadow-2xl">
                <img
                  src="/SanchithaPhoto.jpg"
                  alt="Sanchitha Sudarshana"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>

            {/* Social icon row — horizontal, symbols only, like reference */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="flex items-center gap-3">
              {[
                { icon: <Github size={18} />, href: "https://github.com/Sanchitha-BS", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/sanchitha-sudarshana", label: "LinkedIn" },
                { icon: <BookOpen size={18} />, href: "/Sanchitha_Sudarshana_Resume.pdf", label: "Resume", download: true },
                { icon: <Mail size={18} />, href: "mailto:sanchithashetty95@gmail.com", label: "Email" },
              ].map(({ icon, href, label, download }) => (
                <a key={label} href={href} {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                  title={label}
                  className="w-9 h-9 rounded-full border border-white/15 bg-gray-800/60 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500/60 hover:bg-pink-500/10 transition-all duration-200">
                  {icon}
                </a>
              ))}
            </motion.div>

            {/* Location */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex items-center gap-1.5 text-gray-500 text-xs">
              <MapPin size={12} className="text-pink-400" /> Syracuse, NY, USA
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-5 bg-gradient-to-b from-gray-600 to-transparent" />
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <ParallaxSection id="about" dark>
        <SH emoji="👩‍💻" title="About Me" />
        <div className="grid md:grid-cols-3 gap-8">
          <Reveal x={-25} className="md:col-span-2 space-y-4 text-gray-300 leading-relaxed text-sm">
            <p>Data professional with <strong className="text-white">3+ years of enterprise experience</strong> delivering scalable data solutions across <strong className="text-white">healthcare, finance, and HR domains</strong>. Proven expertise in end-to-end data pipelines, warehouses, and analytics dashboards on datasets of 100K–1M+ records.</p>
            <p>Skilled in <strong className="text-white">SQL, Python, Snowflake, dbt, and BI tools</strong>, with a strong foundation in data modeling, statistical analysis, and machine learning. Currently conducting AI research at Syracuse iSchool's NEXIS Technology Lab.</p>
            <div className="pt-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2.5">Open to roles in</p>
              <div className="flex flex-wrap gap-2">
                {OPEN_ROLES.map((r, i) => (
                  <motion.span key={r} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/15 to-indigo-500/15 border border-pink-500/30 text-pink-300">
                    {r}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2.5">📍 Open to relocate — Yes</p>
            </div>
          </Reveal>
          <Reveal x={25} delay={0.15} className="space-y-2.5">
            {[
              { icon: <Database size={14} />, label: "Data Engineering", val: "ETL/ELT · Snowflake · dbt" },
              { icon: <BarChart3 size={14} />, label: "Analytics & BI", val: "Tableau · Power BI · SQL" },
              { icon: <Brain size={14} />, label: "Machine Learning", val: "Python · scikit-learn · TF" },
              { icon: <Layers size={14} />, label: "Domains", val: "Healthcare · Finance · HR" },
            ].map(({ icon, label, val }) => (
              <motion.div key={label} whileHover={{ x: 4 }} className="flex items-center gap-3 bg-gray-900/60 rounded-xl px-4 py-3 border border-white/5 hover:border-pink-500/25 transition-all cursor-default">
                <span className="text-pink-400">{icon}</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider leading-none mb-0.5">{label}</p>
                  <p className="text-sm text-white">{val}</p>
                </div>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </ParallaxSection>

      {/* ── ACADEMIC OVERVIEW ──────────────────────────────────── */}
      <ParallaxSection id="overview">
        <SH emoji="🎓" title="Academic & Program Overview" sub="A summary of my learning journey, project portfolio, and how I achieved the program's core outcomes." />
        <Reveal className="mb-8">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><Award size={15} className="text-pink-400" /> Program Learning Outcomes</h3>
          <div className="bg-gray-800/50 border border-white/8 rounded-xl p-5 text-gray-300 text-sm leading-relaxed space-y-3">
            <p>Throughout the Applied Data Science program, I developed a strong foundation in working with data across its entire lifecycle — from acquisition and preparation to analysis, modeling, and communication.</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Data Collection & Management", "Statistical Analysis", "Machine Learning", "Data Visualization", "Scalable Data Systems"].map(s => <Pill key={s} name={s} />)}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mb-8">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><BookOpen size={15} className="text-pink-400" /> Project Portfolio Overview</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "✈️ Aviation Delay Analysis", desc: "Analyzed 500K+ flight records to surface delay patterns and operational inefficiencies via interactive Tableau dashboards." },
              { title: "🐦 Bird Migration Data Warehouse", desc: "Designed an end-to-end ELT pipeline and star schema warehouse on Snowflake/dbt enabling efficient querying of migration patterns." },
              { title: "🚗 NYPD Traffic Accident Pipeline", desc: "Built automated data pipelines in Python/SQL to clean and process 200K+ accident records, improving data quality by 40%." },
              { title: "🏥 Health Insurance Fraud Detection", desc: "Applied ML classification to identify fraudulent claims with 20% reduction — published at IEEE ICETET-SIP-22." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08} className="rounded-xl border border-white/8 bg-gray-800/40 p-4 hover:border-pink-500/35 hover:bg-gray-800/60 transition-all">
                <h4 className="font-semibold text-white mb-1.5 text-sm">{p.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><CheckCircle2 size={15} className="text-pink-400" /> How I Achieved the Program Learning Outcomes</h3>
          <div className="space-y-2.5">
            {[
              { icon: "🔧", text: "Developed strong data collection and cleaning skills through NYPD and Bird Migration projects — transforming raw datasets into reliable formats." },
              { icon: "🔍", text: "Strengthened exploratory data analysis through the Aviation project — interpreting patterns and extracting meaningful insights from large-scale flight records." },
              { icon: "🤖", text: "Applied ML techniques in the Health Insurance project — practical experience in model development, evaluation, and improvement." },
              { icon: "📢", text: "Focused on communicating insights effectively across all projects — using dashboards to make findings actionable for non-technical audiences." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start bg-gray-800/40 border border-white/5 rounded-lg px-4 py-3">
                <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border-l-2 border-pink-500 pl-4">
            <p className="text-gray-400 italic text-sm leading-relaxed">These experiences helped me develop a well-rounded skill set — approaching data problems end-to-end and translating data into meaningful insights.</p>
          </div>
        </Reveal>
      </ParallaxSection>

      {/* ── PROJECTS ──────────────────────────────────────────── */}
      <ParallaxSection id="projects" dark>
        <SH emoji="🚀" title="Projects" sub="Selected work demonstrating end-to-end data science capabilities." />
        <div className="flex gap-2 mb-5 flex-wrap">
          {PROJECTS.map((p, i) => (
            <motion.button key={i} onClick={() => setActiveProject(i)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${i === activeProject ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md shadow-pink-500/20' : 'border border-white/20 text-gray-400 hover:border-pink-500/50 hover:text-white'}`}>
              {p.title.split(' ').slice(0, 3).join(' ')}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeProject}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32 }}
            className="bg-gray-800/60 border border-white/10 rounded-2xl p-6 md:p-8"
          >
            {(() => {
              const p = PROJECTS[activeProject];
              return <>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <p className="text-gray-500 text-xs mt-1">📅 {p.period}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 border border-white/20 rounded-full px-3 py-1.5 hover:text-white hover:border-pink-500/50 transition">
                      <Github size={12} /> GitHub
                    </a>
                    {p.dashboard && <a href={p.dashboard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 border border-white/20 rounded-full px-3 py-1.5 hover:text-white hover:border-pink-500/50 transition">
                      <ExternalLink size={12} /> Dashboard
                    </a>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">{p.tools.map(t => <Pill key={t} name={t} />)}</div>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5"><TrendingUp size={13} className="text-pink-400" /> Problem</h4>
                      <p className="text-gray-400 leading-relaxed">{p.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5"><Database size={13} className="text-pink-400" /> Data Source</h4>
                      <p className="text-gray-400">{p.dataSource}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5"><Code2 size={13} className="text-pink-400" /> Approach</h4>
                      <ul className="space-y-1.5">{p.approach.map((a, j) => <li key={j} className="flex gap-2 text-gray-400"><span className="text-pink-500 shrink-0 mt-0.5">▸</span>{a}</li>)}</ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-1.5"><Star size={13} className="text-pink-400" /> Results</h4>
                      <ul className="space-y-1.5">{p.results.map((r, j) => <li key={j} className="flex gap-2 text-gray-400"><CheckCircle2 size={13} className="text-green-400 shrink-0 mt-0.5" />{r}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </>;
            })()}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-3 mt-4 md:hidden">
          <button onClick={() => setActiveProject(p => (p === 0 ? PROJECTS.length - 1 : p - 1))} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400"><ChevronLeft size={16} /></button>
          <span className="text-sm text-gray-500 self-center">{activeProject + 1} / {PROJECTS.length}</span>
          <button onClick={() => setActiveProject(p => (p === PROJECTS.length - 1 ? 0 : p + 1))} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400"><ChevronRight size={16} /></button>
        </div>
      </ParallaxSection>

      {/* ── EXPERIENCE | EDUCATION | SKILLS ───────────────────── */}
      <ParallaxSection id="tabs">
        <SH emoji="📋" title="Experience, Education & Skills" />
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-800 border border-white/10 rounded-full p-1 gap-1">
            {tabDefs.map(tab => (
              <motion.button key={tab.key} onClick={() => setActiveTab(tab.key)} whileTap={{ scale: 0.96 }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.key ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "experience" && (
            <motion.div key="exp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="relative pl-10">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500/60 via-purple-500/30 to-transparent" />
                <div className="space-y-5">
                  {EXPERIENCES.map((exp, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
                      <div className="absolute -left-10 top-4 w-7 h-7 rounded-full bg-gray-900 border-2 border-pink-500 flex items-center justify-center text-xs">{exp.icon}</div>
                      <motion.div whileHover={{ x: 4 }} className="bg-gray-800/60 border border-white/8 rounded-xl p-5 hover:border-pink-500/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                          <h3 className="font-bold text-white text-sm">{exp.role}</h3>
                          <span className="text-xs text-pink-400 border border-pink-500/30 rounded-full px-2.5 py-0.5 shrink-0">{exp.period}</span>
                        </div>
                        <p className="text-gray-400 text-xs mb-3">{exp.company}</p>
                        <ul className="space-y-2">{exp.bullets.map((b, j) => <li key={j} className="flex gap-2 text-xs text-gray-400"><CheckCircle2 size={12} className="text-pink-400 shrink-0 mt-0.5" />{b}</li>)}</ul>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "education" && (
            <motion.div key="edu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {EDUCATION.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -3 }} className="bg-gray-800/60 border border-white/8 rounded-xl p-6 hover:border-pink-500/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-4">
                    <GraduationCap size={18} className="text-pink-400" />
                  </div>
                  <h3 className="font-black text-white text-base mb-0.5">{edu.university}</h3>
                  <p className="text-gray-400 text-xs mb-2">{edu.school}</p>
                  <p className="text-pink-400 font-semibold text-sm mb-2">{edu.degree}</p>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs border border-pink-500/30 text-pink-300 rounded-full px-2.5 py-0.5">📅 {edu.period}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500"><MapPin size={11} /> {edu.location}</span>
                  </div>
                  {edu.coursework.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><BookOpen size={11} /> Relevant Coursework</p>
                      <div className="flex flex-wrap gap-1.5">{edu.coursework.map(c => <Pill key={c} name={c} />)}</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
          {activeTab === "skills" && (
            <motion.div key="skills" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Tools & Technologies</p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 mb-8">
                {ICON_SKILLS.map((skill, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.18, y: -4 }} className="flex flex-col items-center gap-1.5 group">
                    <div className="w-11 h-11 rounded-xl bg-gray-800 border border-white/8 flex items-center justify-center group-hover:border-pink-500/60 group-hover:bg-pink-500/8 group-hover:shadow-lg group-hover:shadow-pink-500/10 transition-all">
                      <skill.icon className="w-5 h-5 text-pink-400" />
                    </div>
                    <span className="text-gray-500 text-xs text-center leading-tight">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Skill Areas</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TEXT_SKILL_GROUPS.map((cat, i) => (
                  <motion.div key={cat.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -3 }} className="bg-gray-800/60 border border-white/8 rounded-xl p-4 hover:border-pink-500/30 transition-all">
                    <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">{cat.emoji} {cat.title}</h4>
                    <div className="flex flex-wrap gap-1.5">{cat.skills.map(s => <Pill key={s} name={s} />)}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ParallaxSection>

      {/* ── VIDEO ─────────────────────────────────────────────── */}
      <ParallaxSection id="video" dark>
        <SH emoji="🎬" title="Video Presentation" sub="A short 1–2 minute overview of my portfolio, key projects, and what I bring to a data science role." />
        <Reveal>
          <div className="max-w-3xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <video
              controls
              className="w-full"
              poster=""
            >
              <source src="/Presentation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>
      </ParallaxSection>

      {/* ── BLOG — accordion style matching reference screenshot ── */}
      <ParallaxSection id="blog">
        <SH emoji="📖" title="Blog Post" />

        {/* Title + subtitle like reference */}
        <Reveal className="mb-8">
          <p className="text-gray-300 text-base italic font-medium">{BLOG_TITLE}</p>
          <p className="text-gray-500 text-sm mt-1">{BLOG_SUBTITLE}</p>
        </Reveal>

        {/* Accordion rows — exact same style as reference */}
        <div className="space-y-2 max-w-3xl">
          {BLOG_SECTIONS.map((section, i) => {
            const isOpen = openBlogIdx === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="border border-white/10 rounded-xl overflow-hidden bg-gray-800/40 hover:border-pink-500/30 transition-colors"
              >
                {/* Header row */}
                <button
                  onClick={() => setOpenBlogIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                >
                  <div className="flex-1 pr-4">
                    <span className="font-semibold text-white text-sm group-hover:text-pink-300 transition-colors">{section.heading}</span>
                    {/* Preview sentence always visible */}
                    {!isOpen && (
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-1">{section.preview}</p>
                    )}
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
                    className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'border-pink-500/60 bg-pink-500/10 text-pink-400' : 'border-white/15 text-gray-500 group-hover:border-pink-500/40'}`}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                {/* Expanded body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/8">
                        <div className="pt-4 space-y-3">
                          {section.body.split('\n\n').map((para, j) => (
                            <p key={j} className="text-gray-400 text-sm leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </ParallaxSection>

      {/* ── CONTACT — email, phone, location only ─────────────── */}
      <ParallaxSection id="contact" dark>
        <SH emoji="💬" title="Get In Touch" sub="Whether you have a role in mind or just want to connect — drop me a message." />
        <div className="grid md:grid-cols-5 gap-10 max-w-3xl">

          {/* Left: email, phone, location only */}
          <Reveal x={-20} className="md:col-span-2 space-y-4">
            {[
              { icon: <Mail size={16} />, label: "Email", value: "sanchithashetty95@gmail.com", href: "mailto:sanchithashetty95@gmail.com" },
              { icon: <Phone size={16} />, label: "Phone", value: "+1 (612) 600-2393", href: "tel:+16126002393" },
              { icon: <MapPin size={16} />, label: "Location", value: "Syracuse, NY, USA", href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-800 border border-white/8 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-white hover:text-pink-300 transition">{value}</a>
                  ) : (
                    <p className="text-sm text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          {/* Right: message form */}
          <Reveal x={20} delay={0.15} className="md:col-span-3">
            <form onSubmit={handleContact} className="space-y-4">
              {[
                { label: "Your Name", type: "text", key: "name", placeholder: "Jane Doe" },
                { label: "Your Email", type: "email", key: "email", placeholder: "jane@example.com" },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">{label}</label>
                  <input type={type} required placeholder={placeholder} value={contactForm[key]}
                    onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/20 transition" />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea required rows={5} placeholder="Tell me about the role or opportunity..."
                  value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/20 transition resize-none" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-pink-500/20">
                {sent ? "✅ Message Sent!" : <><Send size={14} /> Send Message</>}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </ParallaxSection>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="py-7 bg-gray-900 border-t border-white/5 text-center">
        <div className="flex justify-center gap-4 mb-3">
          <a href="https://github.com/Sanchitha-BS" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition"><Github size={17} /></a>
          <a href="https://www.linkedin.com/in/sanchitha-sudarshana" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition"><Linkedin size={17} /></a>
          <a href="mailto:sanchithashetty95@gmail.com" className="text-gray-600 hover:text-white transition"><Mail size={17} /></a>
        </div>
        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} <G>Sanchitha Sudarshana</G> · Built with Next.js &amp; Tailwind CSS</p>
      </footer>

    </main>
  );
}
