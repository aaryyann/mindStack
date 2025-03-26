import { useEffect, useState } from 'react';
import { Signup } from './Signup';
import { Signin } from './Signin';
import favicon from "../assets/favicon.ico"
import { ArrowRight, CheckCircle2, Globe2, Zap, Shield , Mail , Twitter , Github , Linkedin } from 'lucide-react';

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [isSignup, setIsSignup] = useState(true); // Default to Signup
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAuthClick = (signup: boolean) => {
    setIsSignup(signup);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {showAuth && (isSignup ? 
        <Signup onClose={() => setShowAuth(false)} toggleMode={() => setIsSignup(false)} /> : 
        <Signin onClose={() => setShowAuth(false)} toggleMode={() => setIsSignup(true)} />
      )}
      
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 relative">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <img src={favicon} alt="" width="100" height="100" />
            <p>MindStack</p>
            </div>
          <button
            onClick={() => handleAuthClick(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Other sections... */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-size-200 animate-gradient-x text-transparent bg-clip-text">
            Capture Organize and Never Forget
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Think faster, work smarter, and never lose an idea again!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleAuthClick(true)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe2 className="w-8 h-8 text-blue-400" />,
              title: "Global Infrastructure",
              description: "Deploy worldwide with our distributed network of high-performance servers."
            },
            {
              icon: <Zap className="w-8 h-8 text-yellow-400" />,
              title: "Lightning Fast",
              description: "Experience blazing fast performance with our optimized platform."
            },
            {
              icon: <Shield className="w-8 h-8 text-green-400" />,
              title: "Enterprise Security",
              description: "Bank-grade security with end-to-end encryption and compliance."
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className={`transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-6 py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
        <h2 className="text-3xl font-bold mb-12 relative">Trusted by Leading Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-50">
          {[
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=128&h=128&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=128&h=128&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=128&h=128&fit=crop&auto=format"
          ].map((src) => (
            <img
              key={src}
              src={src}
              alt="Company logo"
              className="h-16 rounded-xl object-contain mx-auto hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose MindStack?</h2>
          <div className="space-y-6">
            {[
              {
                title: "Seamless Integration",
                description: "Connect with your favorite tools and services without any friction."
              },
              {
                title: "24/7 Support",
                description: "Our expert team is always available to help you succeed."
              },
              {
                title: "Regular Updates",
                description: "Stay ahead with continuous improvements and new features."
              }
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className={`transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
              >
                <BenefitRow {...benefit} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of teams already using MindStack</p>
            <button
              onClick={() => handleAuthClick(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold mb-4">MindStack</div>
              <p className="text-gray-400 mb-4">Empowering teams to capture, organize, and collaborate effortlessly.</p>
              <div className="flex space-x-4">
                <a href="" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://github.com/aaryyann" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/aryan-gupta-2b921632b/" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 MindStack. All rights reserved.</p>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href="mailto:arya000045@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  arya000045@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface featureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: featureProps) {
  return (
    <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 group">
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </div>
  );
}

interface benefitProps {
  title: string;
  description: string;
}

function BenefitRow({ title, description }: benefitProps) {
  return (
    <div className="flex items-start gap-4 group">
      <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1 transform group-hover:scale-110 transition-transform duration-300" />
      <div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
      </div>
    </div>
  );
}

export default Home;