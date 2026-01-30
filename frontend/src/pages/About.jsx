import React, { useEffect } from "react";
import { ArrowRight, Sparkles, Target, Zap, Globe, ShieldCheck } from "lucide-react";

import HeroImg from "../assets/hero-ai.jpeg";
import VisionImg from "../assets/vision-map.jpeg";
import ValuesImg from "../assets/vision-globe.jpeg";
import JourneyImg from "../assets/journey-path.jpeg";

import NavBar from "../components/NavBar";
import Footer from "./Footer";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-['Outfit'] text-[#1a2e52] overflow-x-hidden">
      <NavBar />

      <main>
        {/* --- SECTION 1: HERO --- */}
        <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="absolute top-0 right-0 w-1/3 h-full translate-x-20 -skew-x-12 bg-slate-50/50 -z-10" />
          
          <div className="flex flex-col items-center gap-12 mx-auto max-w-7xl lg:flex-row lg:gap-16">
            <div className="z-10 flex-1 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0077cc] rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                <Sparkles size={12} /> Established 2026
              </div>
              <h1 className="text-5xl lg:text-7xl font-[1000] tracking-tighter leading-tight text-slate-900">
                Empowering <br />
                <span className="text-[#0077cc]">Global Talent.</span>
              </h1>
              <p className="max-w-lg text-lg font-medium leading-relaxed text-slate-500">
                We are a team of engineers and career strategists dedicated to 
                leveling the professional playing field through AI innovation.
              </p>
              <button 
                onClick={() => handleFeatureClick("/user/my-resumes")} 
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#e65100] to-[#f4511e] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_10px_25px_rgba(230,81,0,0.3)] hover:shadow-[0_15px_35px_rgba(230,81,0,0.45)] hover:-translate-y-1 active:scale-95"
              >
                <span className="relative z-10">Join our story</span>
                <ArrowRight size={22} className="relative z-10 transition-transform group-hover:rotate-12" />
              </button>
            </div>

            <div className="flex-1 w-full lg:max-w-[500px]">
              <div className="relative p-2 bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl">
                <img 
                  src={HeroImg} 
                  alt="Corporate Leadership" 
                  className="w-full h-[350px] lg:h-[450px] object-cover rounded-[2rem]" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: CORE PILLARS --- */}
        <section className="py-20 bg-[#f8fafc]">
          <div className="px-6 mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-3">
              <div className="space-y-4">
                <h2 className="text-3xl font-black leading-tight tracking-tight">The Philosophy <br/>Behind the Builder</h2>
                <p className="font-medium text-slate-500">
                  We build tools that translate human potential into machine-readable success.
                </p>
              </div>

              <div className="grid gap-6 lg:col-span-2 md:grid-cols-2">
                {[
                  { title: "Our Mission", desc: "To democratize career success by offering AI-powered resume tools that were once only available to professionals.", icon: <Target className="text-[#0077cc]"/>, bg: "bg-blue-50" },
                  { title: "Our Approach", desc: "Data-driven optimization ensures ATS-friendly formatting so your resume performs—not just looks good.", icon: <Zap className="text-[#ff6b35]"/>, bg: "bg-orange-50" }
                ].map((pillar, idx) => (
                  <div key={idx} className="p-10 bg-white rounded-[2rem] border border-slate-100 hover:shadow-lg transition-all">
                    <div className={`w-12 h-12 ${pillar.bg} rounded-xl flex items-center justify-center mb-6`}>
                      {pillar.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-black">{pillar.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-slate-500">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: VISION & VALUES --- */}
        <section className="py-20 overflow-hidden bg-white">
          <div className="px-6 mx-auto space-y-24 max-w-7xl">
            
            {/* Vision Row */}
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="flex-1 order-2 lg:order-1">
                <div className="relative p-2 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl">
                  <img src={VisionImg} alt="Our Vision" className="w-full h-[300px] lg:h-[400px] object-cover rounded-[2rem]" />
                </div>
              </div>
              <div className="flex-1 order-1 space-y-6 lg:order-2">
                <h2 className="text-4xl font-black tracking-tight">Our Vision</h2>
                <blockquote className="pl-6 text-2xl italic font-medium leading-snug border-l-4 border-blue-600 text-slate-400">
                  "A future where technology removes barriers to growth, allowing talent to be the only metric."
                </blockquote>
              </div>
            </div>

            {/* Values Row - JourneyImg added here */}
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="flex-1 space-y-10">
                <h2 className="text-4xl font-black tracking-tight">Our Values</h2>
                <div className="space-y-4">
                  {[
                    { title: "Collaboration", color: "text-blue-600", bg: "bg-blue-50" },
                    { title: "Innovation", color: "text-orange-600", bg: "bg-orange-50" },
                    { title: "Inclusivity", color: "text-green-600", bg: "bg-green-50" }
                  ].map((value, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 transition-all border border-transparent rounded-2xl hover:bg-slate-50 hover:border-slate-100">
                      <div className={`p-2 ${value.bg} ${value.color} rounded-lg`}>
                        <ShieldCheck size={20} />
                      </div>
                      <h4 className="text-lg font-black">{value.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="relative p-2 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl">
                   <img src={JourneyImg} alt="Our Journey" className="w-full h-[300px] lg:h-[400px] object-cover rounded-[2rem]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-12 lg:flex-row">
  <div className="flex-1 order-2 lg:order-1">
    <div className="relative p-2 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl">
      <img 
        src={JourneyImg} 
        alt="Our Journey" 
        className="w-full h-[300px] lg:h-[400px] object-cover rounded-[2rem]" 
      />
    </div>
  </div>
  <div className="flex-1 order-1 space-y-6 lg:order-2">
    <h2 className="text-4xl font-black tracking-tight text-slate-900">The Path Forward</h2>
    <p className="text-lg font-medium leading-relaxed text-slate-500">
      Our journey began with a simple goal: to map out the most efficient route 
      for job seekers to reach their destination. We believe the road to a 
      dream career should be clear, supported, and powered by innovation.
    </p>
    <blockquote className="pl-6 text-2xl italic font-semibold leading-snug border-l-4 border-[#0077cc] text-slate-400">
      "Every great career is a journey, and we are here to provide the 
      compass and the fuel for yours."
    </blockquote>
  </div>
</div>
          </div>
        </section>


        <Footer />
      </main>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AboutUs;