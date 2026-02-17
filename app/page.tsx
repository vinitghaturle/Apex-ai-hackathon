'use client'
import { useState } from "react";
import IntroLoader from "@/components/IntroLoader";
import { SparklesCore } from '@/components/ui/sparkles'
import { Hero } from '@/components/hero'
import Navbar from "@/components/nav"
import Tracks from '@/components/tracks'
import { HorizontalTimeline } from "@/components/AmongUsTimeline";
import { Imposter } from "@/components/imposter";
import { Crew } from "@/components/crew";
import { CommunityPartner } from "@/components/communityPartner";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import AboutUS from "@/components/AboutUS";
import ProblemGrid, { ProblemStatement } from "@/components/ProblemGrid";
import Specialps, { SpecialStatement } from "@/components/Specialps";
import AuthModal from "@/components/AuthModal";

const timelineData = [
  {
    title: "REGISTRATION & INAUGURATION",
    date: "FEBRUARY 18, 2026 · 08:00 AM",
    content: (
      <p>
        Check-in and team assembly followed by an official opening ceremony
        at GHRCE, setting the stage for a day of intense AI innovation.
      </p>
    ),
  },
  {
    title: "HACKATHON KICKOFF & MENTORING",
    date: "FEBRUARY 18, 2026 · 09:00 AM",
    content: (
      <p>
        The 10-hour sprint begins. Teams dive into problem statements with
        an initial mentoring round for idea validation and PPT submissions.
      </p>
    ),
  },
  {
    title: "PROTOTYPE EVALUATION",
    date: "FEBRUARY 18, 2026 · 02:00 PM",
    content: (
      <p>
        Mid-way progress check where experts evaluate live prototypes and
        provide technical guidance to refine AI-driven solutions.
      </p>
    ),
  },
  {
    title: "FINAL PITCH & WRAP-UP",
    date: "FEBRUARY 18, 2026 · 05:30 PM",
    content: (
      <p>
        The final evaluation phase leading to the Top 10 team pitches,
        followed by the winners' announcement and event conclusion.
      </p>
    ),
  },
];
const facultyMembers = [
  {
    imageSrc: "https://apex-assets-exl.pages.dev/image/sir.jpeg",
    name: "Dr. Abhay Khalatkar",
    role: "Associate Professor, GHRCE",
    linkedin: "https://www.linkedin.com/in/abhay-khalatkar-523a1748/"
  },

  {
    imageSrc: "https://apex-assets-exl.pages.dev/image/maam.jpeg",
    name: "Prof. Archana Deshpande",
    role: "Asscoiate Professor, GHRCE",
    linkedin: "https://www.linkedin.com/in/archana-deshpande-890ab6b5/"
  }
];
const teamMembers = [
  {
    imageSrc: "https://apex-assets-exl.pages.dev/image/soham.jpeg",
    name: "Soham Kale",
    role: "Technorian President",
    linkedin: "https://www.linkedin.com/in/soham-kale-60134a2b0"
  },
  {
    imageSrc: "https://apex-assets-exl.pages.dev/image/karan.jpeg",
    name: "Karan Dubey",
    role: "APEX - AI Lead",
    linkedin: "https://www.linkedin.com/in/karan-dubey-193b25287/"
  },
  {
    imageSrc: "https://apex-assets-exl.pages.dev/image/Nandini.jpeg",
    name: "Nandini Jaiswal",
    role: "Organizer - GDGoC GHRCE",
    linkedin: "https://www.linkedin.com/in/nandini-jaiswalll/"
  },
  {
    imageSrc: "https://apex-assets-exl.pages.dev/image/prince.jpeg",
    name: "Prince Rayamwar",
    role: "Chair, IEEE CS SB",
    linkedin: "https://www.linkedin.com/in/prince-rayamwar-47b49428a"
  }
];
const sampleProblems: ProblemStatement[] = [
  {
    id: "2",
    code: "PS-02",
    title: "AI-Based Maternal Health Risk Assessment Chatbot",
    organization: "GHRCE",
    category: "Software",
    description:
      "Pregnant women, especially in rural and low-resource settings, lack timely access to healthcare professionals. Delayed identification of high-risk pregnancy symptoms often leads to maternal complications. There is a need for an AI-powered conversational system that can collect symptoms, assess maternal health risks in real time, and notify healthcare providers for early intervention.",
    expectedSolution: [
      "Develop an AI-powered chatbot.",
      "Collect pregnancy-related symptoms through text/voice interaction.",
      "Use machine learning to assess risk levels.",
      "Generate real-time alerts for high-risk cases.",
      "Integrate with hospital dashboards for healthcare providers.",
    ],
    expectedOutcome:
      "Early detection of maternal risks, reduced complications, and improved maternal healthcare delivery.",
  },
  {
    id: "3",
    code: "PS-03",
    title: "AI-Based Skin Cancer Detection Using Smartphone Images",
    organization: "GHRCE",
    category: "Software",
    description:
      "Skin cancer often goes undiagnosed in early stages due to lack of awareness and specialist availability. An accessible screening solution using smartphone cameras can help identify high-risk lesions.",
    expectedSolution: [
      "Develop an AI model using image processing and deep learning.",
      "Analyze images of skin lesions captured via smartphones.",
      "Classify lesions into risk categories.",
      "Provide guidance for medical consultation.",
    ],
    expectedOutcome:
      "Early screening and increased awareness, especially in remote areas.",
  },
  {
    id: "4",
    code: "PS-04",
    title: "Real-Time Vaccine Cold Chain Monitoring System",
    organization:
      "GHRCE",
    category: "Hardware + Software",
    description:
      "Maintaining vaccine temperature during transportation and storage is critical. Cold chain failure can reduce vaccine effectiveness, especially in large immunization drives.",
    expectedSolution: [
      "IoT-based temperature monitoring sensors.",
      "Real-time tracking dashboard.",
      "SMS/Email alerts on temperature breach.",
      "Data logging for audit purposes.",
    ],
    expectedOutcome:
      "Improved vaccine safety and minimized wastage.",
  },
  {
    id: "5",
    code: "PS-05",
    title: "AI-Based Early Disease Outbreak Prediction System",
    organization:
      "GHRCE",
    category: "Software",
    description:
      "Disease outbreaks are often detected after official reports, causing delays in response. Early signals from social media and online platforms can help in proactive disease surveillance.",
    expectedSolution: [
      "AI/NLP-based system to analyze online posts.",
      "Sentiment and keyword analysis for disease indicators.",
      "Geographical clustering of cases.",
      "Early warning dashboard for authorities.",
    ],
    expectedOutcome:
      "Faster outbreak detection and improved public health response.",
  },
  {
    id: "6",
    code: "PS-06",
    title: "Universal Health Record Aggregation Platform",
    organization: "GHRCE",
    category: "Software",
    description:
      "Patient records are fragmented across hospitals and clinics, leading to poor continuity of care and duplication of tests.",
    expectedSolution: [
      "Secure interoperable platform.",
      "Integration with hospital information systems.",
      "Data encryption and privacy compliance.",
      "Patient-controlled access permissions.",
    ],
    expectedOutcome:
      "Seamless health record access and improved treatment efficiency.",
  },
  {
    id: "7",
    code: "PS-07",
    title: "AI-Based Telemedicine Queue Optimization System",
    organization: "GHRCE",
    category: "Software",
    description:
      "Telemedicine platforms face long waiting times and inefficient scheduling, especially during peak demand.",
    expectedSolution: [
      "AI triage system based on severity.",
      "Smart appointment scheduling algorithm.",
      "Real-time queue monitoring dashboard.",
    ],
    expectedOutcome:
      "Reduced waiting time and improved healthcare accessibility.",
  },
  {
    id: "8",
    code: "PS-08",
    title: "Tuberculosis Screening via Cough Sound Analysis",
    organization:
      "GHRCE",
    category: "Software",
    description:
      "Tuberculosis remains a major health concern in India. Early screening is limited in rural and low-resource settings.",
    expectedSolution: [
      "AI model trained on cough audio samples.",
      "Smartphone-based recording system.",
      "Risk scoring and referral recommendation.",
    ],
    expectedOutcome:
      "Early TB detection and support for TB elimination efforts.",
  },
  {
    id: "9",
    code: "PS-09",
    title: "AI-Based Predictive Maintenance System for Industrial Machinery",
    organization:
      "GHRCE",
    category: "Hardware + Software",
    description:
      "Unexpected industrial machine failures lead to downtime, productivity loss, and high maintenance costs.",
    expectedSolution: [
      "Sensor-based data collection system.",
      "Machine learning model for failure prediction.",
      "Maintenance scheduling dashboard.",
    ],
    expectedOutcome:
      "Reduced downtime and optimized industrial productivity.",
  },
  {
    id: "10",
    code: "PS-10",
    title: "GPS-Denied Autonomous Inspection Drone using Jetson Nano",
    organization: "GHRCE",
    category: "Hardware + Software",
    description:
      "Inspection of mines, tunnels, and underground pipelines is risky and challenging due to absence of GPS signals.",
    expectedSolution: [
      "AI-powered autonomous drone.",
      "SLAM-based navigation in GPS-denied environments.",
      "Real-time video analytics and hazard detection.",
    ],
    expectedOutcome:
      "Improved worker safety and efficient infrastructure inspection.",
  },
  {
    id: "11",
    code: "PS-11",
    title: "Skill Gap Analysis & Personalized Career Roadmap Platform",
    organization:
      "GHRCE",
    category: "Software",
    description:
      "Students often lack clarity about industry-required skills and career pathways, leading to employability gaps.",
    expectedSolution: [
      "AI-driven skill assessment tool.",
      "Job-role mapping using industry datasets.",
      "Personalized learning roadmap recommendations.",
    ],
    expectedOutcome:
      "Improved employability and alignment between education and industry demands.",
  }, {
    id: "12",
    code: "PS-12",
    title: "Open Innovation – AI Solutions for Real-World Impact",
    organization: "GHRCE",
    category: "Open Innovation",
    description:
      "Participants are invited to design and develop an AI-powered solution that addresses a real-world problem across any domain such as healthcare, agriculture, education, environment, finance, governance, accessibility, or industry. The solution must demonstrate practical applicability, scalability, and measurable impact.",
    expectedSolution: [
      "Identify and clearly define a real-world problem backed by research or data.",
      "Develop an AI/ML-based prototype (e.g., computer vision, NLP, predictive analytics, recommendation systems, generative AI, etc.).",
      "Demonstrate technical feasibility and real-world usability.",
      "Provide a scalability and deployment roadmap.",
      "Include impact metrics and validation strategy.",
    ],
    expectedOutcome:
      "Innovative, scalable AI solutions with tangible real-world impact and potential for real deployment or startup incubation.",
  },
];
const specialProblems: SpecialStatement[] = [
  {
    id: "1",
    code: "PS-01",
    title: "AI-Based Desert Scene Semantic Segmentation Challenge",
    organization: "DEVNOVATES",
    category: "AI / Computer Vision",
    description:
      "Participants are required to develop a semantic segmentation model for desert environment images using synthetic data. Teams must train, validate, and optimize an AI model capable of accurately segmenting various terrain categories under realistic constraints. The challenge emphasizes model accuracy, optimization, and structured reporting.",
    expectedSolution: [
      "Train and fine-tune a semantic segmentation model using the provided synthetic dataset.",
      "Apply data augmentation and filtering strategies to improve generalization.",
      "Evaluate performance on unseen test images.",
      "Optimize model accuracy and reduce inference time.",
      "Document the complete workflow including training process and evaluation metrics.",
      "Prepare a structured technical report and presentation with visualizations such as loss graphs and performance curves."
    ],
    expectedOutcome:
      "A fully trained semantic segmentation model with strong IoU performance, optimized inference efficiency, and a comprehensive evaluation report including failure case analysis and performance visualization.",
  }

];

export default function Page() {
  const [done, setDone] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');

  const openAuthModal = (view: 'login' | 'register') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {/* Preload critical images */}
      <div style={{ display: 'none' }}>
        <img src="https://apex-assets-exl.pages.dev/image/spaceship.svg" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/LOGO.svg" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-player-red.png" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-player-green.png" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-player-purple.png" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-player-yellow.png" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/ABOUT.png" alt="" />
        <img src="https://apex-assets-exl.pages.dev/image/impokill1.webp" alt="" />
      </div>

      {/* Loader Overlay - doesn't block content rendering */}
      {!done && <IntroLoader onFinish={() => setDone(true)} />}

      {/* Main Content - Always rendered for SEO */}
      <div
        className="relative w-full bg-black overflow-x-hidden"
        aria-hidden={!done}
        {...(!done ? { inert: true } : {})}
      >
        {/* Fixed Sparkles Background - Full viewport coverage */}
        <div className="fixed inset-0 w-screen h-screen pointer-events-none z-5">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10">
          {/* Section 1 - Hero */}
          <Navbar onOpenAuthModal={openAuthModal} />
          <section className="pt-10">
            <section id="home">
              <Hero onOpenAuthModal={openAuthModal} />
            </section>
          </section>
          <section id="about">
            <AboutUS />
          </section>
          <section id="tracks">
            <Specialps problems={specialProblems} />
            <ProblemGrid problems={sampleProblems} />
          </section>
          {/* <Time data={timelineData} /> */}
          <section id="schedule">
            <HorizontalTimeline data={timelineData} />
          </section>
          <section id="team">
            <div className="relative min-h-screen">
              <div className="absolute top-[9rem] left-1/2 -translate-x-1/2 z-50">
                <img
                  loading="lazy"
                  src="https://apex-assets-exl.pages.dev/image/impofac.png"
                  className="lg:w-[25vw] w-[25rem] h-auto object-contain opacity-80 scale-150 lg:scale-100"
                  alt="The Faculty Header"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center lg:gap-10 gap-0 lg:pt-[9.5rem] pt-[1rem] px-10 lg:scale-90 scale-[0.7] ">
                {facultyMembers.map((member, index) => (
                  <div key={index} className="w-full lg:w-[30%] max-w-md flex justify-center ">
                    <Imposter data={member} />
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section id="core" className="relative w-full py-10 lg:py-32">
            {/* Team Header Image */}
            <div className="flex justify-center w-full mb-10 lg:mb-20">
              <img
                loading="lazy"
                src="https://apex-assets-exl.pages.dev/image/crewteam.png"
                className="w-[80%] max-w-[20rem] lg:w-[25vw] h-auto object-contain opacity-85"
                alt="The team Header"
              />
            </div>

            {/* Crew Grid */}
            <div className="flex flex-wrap items-center justify-center lg:gap-y-12 gap-y-4 gap-x-4 lg:gap-10 px-4 lg:px-20 ">
              {teamMembers.map((member, index) => (
                <div key={index} className="w-[45%] lg:w-[30%] max-w-[15rem] lg:max-w-none flex justify-center">
                  <Crew data={member} />
                </div>
              ))}
            </div>
          </section>
          <div className="relative min-h-screen grid lg:block h-64 items-center">
            <div className="absolute top-[10rem] lg:top-8 w-full text-center animate-bounce">
              {/* Title with Custom Text Stroke */}
              <h2
                className="font-display text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-2 [text-stroke:1px_black] [-webkit-text-stroke:1px_black]"
              >
                THE ALLIANCE
              </h2>

              {/* Subtitle Badge */}
              <p className="inline-block rounded-full border border-gray-600 bg-black/50 px-4 py-1 text-lg font-bold tracking-wide text-gray-300 backdrop-blur-sm md:text-xl">
                Community Partners
              </p>
            </div>


            <div id="com" className="relative lg:pt-0 pt-20">
              <CommunityPartner />
            </div>
          </div>



          {/* Section 2 - Features */}
          {/* <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            {[1, 2, 3].map((feature) => (
              <div
                key={feature}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 hover:border-gray-500 transition"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Feature {feature}
                </h3>
                <p className="text-gray-400">
                  This is a description of feature {feature}. Watch how the sparkles background stays fixed while you scroll.
                </p>
              </div>
            ))}
          </div>
        </section> */}

          {/* Section 4 - CTA */}
          <CTA onOpenAuthModal={openAuthModal} />

          {/* Section 5 - Footer */}
          <Footer />
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
    </>
  )
}
