import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, LineChart, Home, Info, Wrench, BarChart4, FileSpreadsheet, 
  Lock, Users, Sparkles, PlayCircle, ChevronRight, Download, Upload, 
  Share2, Settings, Zap, Globe, Shield, PieChart
} from 'lucide-react';

// Enhanced CSS animation classes with Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isVisible];
};

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const SlideIn = ({ children, direction = 'left', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  const transformClass = direction === 'left' 
    ? (isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0')
    : (isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0');

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${transformClass}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

function Button({ as: As = 'button', className = '', children, ...props }) {
  return (
    <As
      className={
        'inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ' +
        'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 ' +
        className
      }
      {...props}
    >
      {children}
    </As>
  );
}

function GhostButton({ as: As = 'button', className = '', children, ...props }) {
  return (
    <As
      className={
        'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300 border border-zinc-300/60 dark:border-zinc-700/60 transform hover:-translate-y-1 hover:scale-105 ' +
        'bg-white/70 dark:bg-zinc-900/40 backdrop-blur hover:bg-white dark:hover:bg-zinc-900 hover:shadow-lg ' +
        className
      }
      {...props}
    >
      {children}
    </As>
  );
}

function ServiceCard({ icon, title, desc }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`group rounded-3xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-2xl dark:border-zinc-800/60 dark:bg-zinc-900 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">{desc}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`group flex items-start p-5 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="mr-4 mt-1 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 relative z-10">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{desc}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Ensure body doesn't scroll horizontally
    document.body.style.overflowX = 'hidden';
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Enhanced background container to clip overflow */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* Left planet - positioned at bottom left but clipped */}
        <div className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-[400px] animate-pulse">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={`${import.meta.env.BASE_URL}planet1.png`}
              className="relative z-10 w-full transition-transform duration-1000 hover:scale-105" 
              alt="Decorative planet" 
              style={{ 
                transform: 'translateX(-30%)',
                animation: 'float 6s ease-in-out infinite'
              }}
            />
          </div>
        </div>
        
        {/* Right planet - positioned at top right but clipped */}
        <div className="absolute top-0 right-0 w-48 md:w-72 lg:w-[300px] animate-pulse">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={`${import.meta.env.BASE_URL}planet2.png`}
              className="relative z-10 w-full transition-transform duration-1000 hover:scale-105" 
              alt="Decorative planet" 
              style={{ 
                transform: 'translateX(30%)',
                animation: 'float 8s ease-in-out infinite reverse'
              }}
            />
          </div>
        </div>

        {/* Enhanced glowing stars */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse transition-opacity duration-1000 hover:opacity-100"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}

        {/* Interactive cursor gradient */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl transition-all duration-1000 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Enhanced Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full relative z-50">
        <Link 
          to="/" 
          className="text-white font-bold text-3xl relative group"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
            Excel Analytics
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-500 group-hover:w-full"></span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-pink-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </Link>
        
        <ul className="hidden md:flex items-center gap-6 text-white">
          {['home', 'about','features', 'services'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="relative py-1 px-3 group transition-all duration-300 hover:text-indigo-300"
              >
                <span className="relative z-10 capitalize">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
                <span className="absolute inset-0 bg-gray-800/80 rounded-lg scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-0 backdrop-blur-sm"></span>
                <span className="absolute inset-0 rounded-lg bg-blue-500 blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </a>
            </li>
          ))}
          
          <li>
            <Link 
              to="/login" 
              className="relative inline-block px-4 py-2 font-medium overflow-hidden rounded-lg group"
            >
              <span className="relative z-10 text-white">Sign In</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-1/2 w-0 h-full bg-white/20 transition-all duration-700 group-hover:w-3/4 group-hover:left-0 transform -skew-x-12"></span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Enhanced Hero Section - Fixed centering */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]"/>
        
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <FadeIn delay={0.2}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-200 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <LineChart className="h-4 w-4"/> Excel → Insight, Instantly
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 hover:scale-105 transition-transform duration-500">
                Transform <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Excel</span> into <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Beautiful Presentations</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Turn complex spreadsheets into stunning visual stories with AI-powered analytics and presentation tools.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button as={Link} to="/upload" className='px-8 py-4 text-lg'>
                  Start Creating <ArrowRight className="h-5 w-5"/>
                </Button>
                <GhostButton as={Link} to="/register" className='px-8 py-4 text-lg bg-white/90 dark:bg-zinc-800/70'>
                  Get Started Free
                </GhostButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
{/* About Section - Integrated with Landing.jsx Style */}
<section
  id="about"
  aria-labelledby="about-heading"
  className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
>
  {/* Background elements matching Landing.jsx */}
  <div className="absolute top-0 left-0 w-full h-full opacity-30">
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-pulse-slow"></div>
    <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-pulse-slow delay-1000"></div>
    <div className="absolute bottom-10 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-pulse-slow delay-2000"></div>
  </div>

  <div className="container mx-auto px-6 lg:px-8 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <FadeIn delay={0.2}>
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-indigo-900/30 text-indigo-300 mb-6 border border-indigo-700/50">
          <Sparkles className="w-4 h-4 mr-2" />
          Data Storytelling Revolutionized
        </div>
        <h2
          id="about-heading"
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
        >
          Transforming Data into Stories
        </h2>
      </FadeIn>

      <FadeIn delay={0.4}>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-12 max-w-3xl mx-auto">
          Excel Analytics helps you transform raw spreadsheets into engaging visual presentations with{" "}
          <span className="font-semibold text-purple-400">AI-powered insights</span>. 
          Our mission is to make data storytelling simple, powerful, and collaborative.
        </p>
      </FadeIn>

      {/* Stats section - matching Landing.jsx style */}
      <FadeIn delay={0.6}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/60 hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="text-3xl font-bold text-blue-400 mb-2">87%</div>
            <div className="text-gray-400">Faster insights generation</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/60 hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="text-3xl font-bold text-purple-400 mb-2">5x</div>
            <div className="text-gray-400">More engaging presentations</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/60 hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="text-3xl font-bold text-pink-400 mb-2">10k+</div>
            <div className="text-gray-400">Data stories created</div>
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
</section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Powerful Features</h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl text-zinc-600 dark:text-zinc-300">
                Everything you need to transform raw data into compelling stories
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={0.3}>
              <FeatureCard 
                icon={<FileSpreadsheet className="h-6 w-6" />}
                title="Excel Import"
                desc="Upload any Excel file and automatically detect data patterns and structures."
              />
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <FeatureCard 
                icon={<BarChart4 className="h-6 w-6" />}
                title="Smart Visualizations"
                desc="AI-powered chart suggestions that best represent your data insights."
              />
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <FeatureCard 
                icon={<Lock className="h-6 w-6" />}
                title="Role-Based Access"
                desc="Control access with user, admin, and super admin roles for team collaboration."
              />
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <FeatureCard 
                icon={<Users className="h-6 w-6" />}
                title="Team Collaboration"
                desc="Share presentations and dashboards with your team in real-time."
              />
            </FadeIn>
            
            <FadeIn delay={0.7}>
              <FeatureCard 
                icon={<LineChart className="h-6 w-6" />}
                title="Advanced Analytics"
                desc="Predictive analytics and trend detection for deeper insights."
              />
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <FeatureCard 
                icon={<Wrench className="h-6 w-6" />}
                title="Custom Templates"
                desc="Create and save custom presentation templates for consistent branding."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">How It Works</h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl text-zinc-600 dark:text-zinc-300">
                Transform your data in just three simple steps
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <SlideIn direction="left" delay={0.3}>
              <div className="text-center p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors duration-300">Upload Your Excel</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Drag and drop your spreadsheet or browse files from your device
                </p>
              </div>
            </SlideIn>
            
            <SlideIn direction="left" delay={0.5}>
              <div className="text-center p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors duration-300">Customize Presentation</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Choose from beautiful templates and customize charts
                </p>
              </div>
            </SlideIn>
            
            <SlideIn direction="left" delay={0.7}>
              <div className="text-center p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors duration-300">Share & Present</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Download, present, or share your stunning data story
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Our Services</h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl text-zinc-600 dark:text-zinc-300">
                Powerful tools for all your data visualization needs
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FadeIn delay={0.3}>
              <ServiceCard 
                icon={<Home className="h-6 w-6" />} 
                title="Interactive Dashboards" 
                desc="Create real-time dashboards that update with your data changes." 
              />
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <ServiceCard 
                icon={<Info className="h-6 w-6" />} 
                title="Data Analytics" 
                desc="Uncover insights with advanced statistical analysis tools." 
              />
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <ServiceCard 
                icon={<Wrench className="h-6 w-6" />} 
                title="Automated Reporting" 
                desc="Schedule and automate report generation for your team." 
              />
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <ServiceCard 
                icon={<Users className="h-6 w-6" />} 
                title="Team Collaboration" 
                desc="Work together on data projects with role-based permissions." 
              />
            </FadeIn>
            
            <FadeIn delay={0.7}>
              <ServiceCard 
                icon={<Lock className="h-6 w-6" />} 
                title="Secure Data Storage" 
                desc="Enterprise-grade security for all your sensitive data." 
              />
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <ServiceCard 
                icon={<BarChart4 className="h-6 w-6" />} 
                title="Custom Visualizations" 
                desc="Tailor-made charts and graphs for your specific needs." 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <FadeIn delay={0.3}>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                <div className="text-indigo-200">Active Users</div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-indigo-200">Customer Satisfaction</div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-indigo-200">Files Processed</div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-indigo-200">Support Available</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">Ready to Transform Your Data?</h2>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-10 max-w-2xl mx-auto">
                Join thousands of professionals who use Excel Analytics to create stunning data presentations
              </p>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button as={Link} to="/register" className='px-8 py-4 text-lg'>
                  Get Started Free
                </Button>
                <GhostButton as={Link} to="/login" className='px-8 py-4 text-lg bg-white/90 dark:bg-zinc-800/70'>
                  Sign In
                </GhostButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}