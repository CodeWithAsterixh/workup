// src/routes/Home.tsx
import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { Button } from "~/components/ui/button";
import { Edit3, Layers, Clock } from "lucide-react";
import useGSAP from "../lib/useGsap";

export default function Home() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = SplitText.create(headlineRef.current!, { type: "chars, words" });
    gsap.from(split.chars, {
      y: 20,
      opacity: 0,
      ease: "power3.out",
      stagger: 0.02,
      duration: 0.5,
    });
    gsap.from(featuresRef.current!.children, {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
    });
  });

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 md:px-20 pt-24">
        <div className="space-y-6 max-w-lg text-center sm:!text-left">
          <h1
            ref={headlineRef}
            className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Create your business card
            <br />
            in just minutes
          </h1>
          <p className="text-sm sm:text-lg opacity-75">
            Pick a template, fill out your details, and instantly download a
            high-res image. No design skills needed — completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-blue-500 px-4 text-white shadow-lg hover:scale-[1.02] transition"
            >
              <Link
                to="/templates"
                className="flex items-center gap-2 px-8 !text-sm sm:!text-base !py-6 rounded-lg"
              >
                Browse Templates <Edit3 size={18} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="!border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              <Link
                to="/templates/SimpleProfessional"
                className="flex items-center gap-2 px-8 !text-sm sm:!text-base !py-6 rounded-lg"
              >
                Start Now <Clock size={18} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Full-fill image + fade-down overlay */}
        <div className="relative mx-auto w-full bg-white p-4 rounded-lg shadow-md">
          <img
            src="/landin/landin.png"
            alt="Business card preview"
            className="w-full h-full object-fit"
          />
          
        </div>
      </section>

      {/* TEMPLATE CATEGORIES */}
      <section
        ref={featuresRef}
        className="px-6 md:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
      >
        {[
          {
            title: "Corporate",
            icon: <Layers size={24} className="text-blue-900" />,
            description: "Clean layouts ideal for businesses & agencies.",
          },
          {
            title: "Creative",
            icon: <Layers size={24} className="text-blue-900" />,
            description: "Bold designs for artists, photographers & more.",
          },
          {
            title: "Modern",
            icon: <Layers size={24} className="text-blue-900" />,
            description: "Sleek, minimal cards that stand out.",
          },
        ].map((cat) => (
          <div
            key={cat.title}
            className="bg-white p-6 shadow hover:shadow-lg rounded-lg transition-transform hover:-translate-y-2"
          >
            <div className="flex items-center gap-3 mb-4">
              {cat.icon}
              <h3 className="font-semibold text-lg">{cat.title}</h3>
            </div>
            <p className="text-gray-600">{cat.description}</p>
          </div>
        ))}
      </section>

      {/* WORKFLOW STEPS */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Layers className="text-blue-900" size={32} />,
              title: "1. Choose Template",
              text: "Browse our library of professional layouts.",
            },
            {
              icon: <Edit3 className="text-blue-900" size={32} />,
              title: "2. Fill Your Info",
              text: "Enter name, title, contact details & logo.",
            },
            {
              icon: <Clock className="text-blue-900" size={32} />,
              title: "3. Download Image",
              text: "Get a high-res PNG/JPG ready for print or web.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4"
            >
              {step.icon}
              <h4 className="font-semibold">{step.title}</h4>
              <p className="text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
