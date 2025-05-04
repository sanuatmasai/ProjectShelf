import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Palette, Layout, FileEdit, Image, Clock, Target, Menu, X } from 'lucide-react';

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-background/80 backdrop-blur-sm border-b' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">Portfolio Builder</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/auth/login')}>Sign In</Button>
            <Button onClick={() => navigate('/auth/register')}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Button variant="ghost" onClick={() => navigate('/auth/login')}>Sign In</Button>
              <Button onClick={() => navigate('/auth/register')}>Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Briefcase,
      title: 'Case Study Builder',
      description: 'Create detailed case studies with project overviews, media galleries, and development timelines.',
    },
    {
      icon: Image,
      title: 'Rich Media Support',
      description: 'Upload images and embed videos to showcase your work in the best possible way.',
    },
    {
      icon: Clock,
      title: 'Timeline Tracking',
      description: 'Document your development process with detailed timelines and milestones.',
    },
    {
      icon: Clock,
      title: 'Tools & Technologies',
      description: 'Highlight the tech stack and tools used in your projects.',
    },
    {
      icon: Target,
      title: 'Outcome Metrics',
      description: 'Display project outcomes, metrics, and client testimonials.',
    },
    {
      icon: Palette,
      title: 'Theme Engine',
      description: 'Choose from beautiful pre-built themes with real-time preview support.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Build Your Professional
              <span className="text-primary"> Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create stunning case studies, showcase your work, and highlight your professional journey with our powerful portfolio builder.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth/register')}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to create professional case studies and showcase your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join now and start creating professional case studies that showcase your best work.
            </p>
            <Button size="lg" onClick={() => navigate('/auth/register')}>
              Create Your Portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            {new Date().getFullYear()} Portfolio Builder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;