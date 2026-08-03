import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Choice Enterprises — Manpower Supplier & Labour Contractor
 * Converted from static HTML/CSS to a single-file React + Tailwind component.
 *
 * Notes on asset paths:
 * - Replace the `src` values below (assets/logo.png, assets/aerofine1.png, etc.)
 *   with wherever you host these images in your React project (e.g. /public/assets/...
 *   or imported from src/assets).
 */

const CLIENTS = [
  { name: "Aerofine", src: "assets/aerofine1.png", height: 47 },
  { name: "Akwel", src: "assets/akwel1.png" },
  { name: "DDE", src: "assets/dde1.png", height: 50 },
  { name: "Fine Pac Forge", src: "assets/finepac1.png" },
  { name: "Galaxy", src: null },
  { name: "INOX", src: "assets/inox.jpg" },
  { name: "Kross Link", src: null },
  { name: "Kwality", src: "assets/kwality1.png", height: 60 },
  { name: "Mahindra Forge", src: null },
  { name: "Mahindra Gear", src: "assets/mahindraGear1.jpeg" },
  { name: "Premium", src: "assets/premium1.jpeg" },
  { name: "Sany", src: "assets/sany1.png", height: 60 },
  { name: "Sharda", src: "assets/sharda.png" },
  { name: "York", src: "assets/york1.png" },
];

const FEATURES = [
  {
    title: "Skilled Workforce",
    body: "Access to a pool of qualified and experienced professionals across various industries, ensuring you get the right talent for your specific requirements and operational needs.",
  },
  {
    title: "Reliable Service",
    body: "Consistent and dependable manpower supply with 24/7 support, ensuring your operations run smoothly without workforce disruptions or delays.",
  },
  {
    title: "Industry Experience",
    body: "Years of expertise serving leading companies like Mahindra, York, and Sany, with deep understanding of industry-specific workforce requirements and compliance standards.",
  },
  {
    title: "Compliance & Safety",
    body: "Full adherence to labor laws, safety regulations, and industry standards, ensuring legal compliance and maintaining the highest safety protocols for all workforce deployments.",
  },
];

function useRevealOnScroll() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children }: { as?: React.ElementType; className?: string; delay?: number; children: React.ReactNode }) {
  const [ref, visible] = useRevealOnScroll();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const heroStage = (delayMs: number) => ({
    opacity: heroLoaded ? 1 : 0,
    transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "1s",
    transitionTimingFunction: "ease",
    transitionDelay: `${delayMs}ms`,
  });

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-[#3b2a2a]"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <style>{`
        @keyframes scrollClients {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .clients-track {
          animation: scrollClients 30s linear infinite;
        }
        .clients-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.40)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
          <div className="flex items-end justify-center">
            <img
                src="assets/logo.png"
                alt="Choice Enterprises"
                className="h-6 sm:h-9 md:h-10 w-auto"
            />
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-none relative top-[3px]">
                hoice Enterprises
            </span>
          </div>

          <ul className="hidden md:flex list-none gap-8">
            {[
              { label: "Home", href: "#home", id: "home" },
              { label: "Why Choose Us", href: "#why-choose-us", id: "why-choose-us" },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={scrollToId(item.id)}
                  className="relative font-medium text-[#3b2a2a] hover:text-[#b30000] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#b30000] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={() => navigate('/contact')}
                className="relative font-medium text-[#3b2a2a] hover:text-[#b30000] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#b30000] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/login')}
                className="relative font-medium text-[#3b2a2a] hover:text-[#b30000] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#b30000] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Login
              </a>
            </li>
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {menuOpen && (
          <ul className="md:hidden flex flex-col gap-4 bg-white px-8 py-4 shadow-md list-none">
            <li>
              <a href="#home" onClick={scrollToId("home")} className="font-medium text-[#3b2a2a]">
                Home
              </a>
            </li>
            <li>
              <a
                href="#why-choose-us"
                onClick={scrollToId("why-choose-us")}
                className="font-medium text-[#3b2a2a]"
              >
                Why Choose Us
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/contact')}
                className="font-medium text-[#3b2a2a]"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/login')}
                className="font-medium text-[#3b2a2a]"
              >
                Login
              </a>
            </li>
          </ul>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fef7ed 0%, #fce7f3 50%, #fdf2f8 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "url('assets/logo.png') center/contain no-repeat",
            opacity: 0.1,
          }}
        />
        <div className="relative z-10 max-w-3xl px-8">
          <h1
            className="font-extrabold mb-6 leading-tight tracking-tight text-3xl sm:text-5xl md:text-6xl"
            style={heroStage(500)}
          >
            Your Partner in Reliable Labour &amp; Manpower Supply
          </h1>
          <p className="text-lg mb-6 text-gray-500" style={heroStage(800)}>
            Your trusted manpower supplier &amp; labour contractor, delivering skilled
            workforce solutions that enhance productivity and support industry growth
          </p>
          <div style={heroStage(1100)}>
            <a
              onClick={() => navigate('/contact')}
              className="inline-block bg-white text-[#3b2a2a] px-10 py-5 rounded-xl font-semibold text-lg border border-black/10 shadow-md hover:bg-[#b30000] hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
          <div className="text-sm text-gray-400 mt-4" style={heroStage(1400)}>
            Trusted by 15+ leading companies •{" "}
            <a
              href="#why-choose-us"
              onClick={scrollToId("why-choose-us")}
              className="text-[#b30000] font-medium hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-20 bg-[#f8f9fa]">
        <Reveal
          as="h2"
          className="text-center text-4xl text-[#3b2a2a] mb-12"
        >
          Our Trusted Clients
        </Reveal>

        <div className="overflow-hidden whitespace-nowrap relative">
          <div className="clients-track inline-flex gap-16 items-center">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex items-center justify-center min-w-[120px] h-[60px] hover:opacity-70 transition-opacity duration-300"
              >
                {client.src ? (
                  <img
                    src={client.src}
                    alt={client.name}
                    className="w-auto object-contain grayscale opacity-70"
                    style={{
                      height: client.height ? `${client.height}px` : "40px",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : (
                  <span className="text-2xl font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto text-center">
        <Reveal as="h2" className="text-4xl text-[#3b2a2a] mb-6">
          Why Choose Us?
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="text-lg text-[#666] mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Discover reliable manpower solutions with experienced workforce management,
          trusted industry partnerships, and seamless service delivery.
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.1}
              className="text-left p-8 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#fdf2f8] hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="text-2xl text-[#3b2a2a] mb-4 font-semibold">{f.title}</h3>
              <p className="text-base text-[#666] leading-relaxed">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal
        as="section"
        className="relative mx-auto my-20 w-[90%] max-w-6xl py-16 px-8 rounded-[20px] text-center shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 rounded-[20px] -z-10"
          style={{
            background: "linear-gradient(135deg, #fef7ed 0%, #fce7f3 50%, #fdf2f8 100%)",
          }}
        />
        <div className="max-w-xl mx-auto relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3b2a2a] mb-5 leading-tight tracking-tight">
            Ready to Transform Your Workforce Solutions?
          </h2>
          <a
            onClick={() => navigate('/contact')}
            className="inline-block bg-white text-[#3b2a2a] px-10 py-5 rounded-xl font-semibold text-lg border border-black/10 shadow-md hover:bg-[#b30000] hover:text-white hover:-translate-y-1 transition-all duration-300 mb-4 cursor-pointer"
          >
            Get in Touch
          </a>
          <div className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
            <p>Trusted by 15+ leading companies •{" "}</p>
            <a
              href="tel:+919881464331"
              className="text-[#b30000] font-medium hover:underline inline-flex items-center gap-1"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-center">
            <img src="assets/logo.png" alt="Choice Enterprises" className="h-5 sm:h-7 md:h-8 w-auto" />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold leading-none relative top-[2px] sm:top-[3px]">hoice Enterprises</span>
          </div>
          <p className="text-sm text-[#666]">&copy; {new Date().getFullYear()} Choice Enterprises. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}