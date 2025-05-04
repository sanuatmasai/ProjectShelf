import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Link2, CheckCircle2, PenTool, SkipBackIcon, ArrowLeft, ChevronRight, ExternalLink, Play, ChevronDown } from 'lucide-react';

// Sample data for preview
const sampleData = {
  title: 'E-commerce Platform Redesign',
  overview: 'A complete overhaul of an existing e-commerce platform, focusing on user experience, performance, and conversion optimization.',
  startTime: '2024-01-01',
  endTime: '2024-03-31',
  toolsUsed: ['React', 'Node.js', 'MongoDB', 'Figma', 'AWS'],
  "youTubeUrl": "https://www.youtube.com/watch?v=lQpqgBU1Z3s",
  "mediaUrls": [
    "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%281%29%20%281%29.png",
    "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/fac57885-1084-4c26-8e3a-a9ff14fed96a.png"
],
  outcomes: [
    '40% increase in conversion rate',
    'Reduced page load time by 60%',
    'Improved user satisfaction score by 45%',
  ],
};

export function ModernTemplate({ data = sampleData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    if (!videoId) return '';
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="max-w-6xl mx-auto bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 md:px-8">
      {/* Lightbox for image viewing */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg" 
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="py-12 space-y-16">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="aspect-video">
              <img
                src={data.mediaUrls[0]}
                alt={data.title}
                className="w-full h-full object-cover"
                onClick={() => setSelectedImage(data.mediaUrls[0])}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
              <div className="text-white space-y-3 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{data.title}</h1>
                <p className="text-base md:text-xl font-light text-gray-200 leading-relaxed">{data.overview}</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Timeline Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Calendar className="w-5 h-5" /> Project Timeline
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Start</div>
                  <div className="font-medium">{formatDate(data.startTime)}</div>
                </div>
                <div className="flex-1 relative h-0.5 bg-slate-200 dark:bg-slate-700">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400">End</div>
                  <div className="font-medium">{formatDate(data.endTime)}</div>
                </div>
              </div>
            </div>

            {/* Tools Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <PenTool className="w-5 h-5" /> Tools & Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.toolsUsed.map((tool) => (
                  <span 
                    key={tool} 
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.mediaUrls.map((image, index) => (
                <div 
                  key={index}
                  className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-xl"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-video">
                    <img
                      src={image}
                      alt={`Project view ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-6 h-6 text-green-500" /> Key Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.outcomes.map((outcome, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-lg font-medium">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Video */}
          {data.youTubeUrl && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                <Link2 className="w-6 h-6 text-red-500" /> Project Demo
              </h2>
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYoutubeEmbedUrl(data.youTubeUrl)}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export  function MinimalTemplate({ data = sampleData }) {
  const [activeImage, setActiveImage] = useState(0);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    if (!videoId) return '';
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="mb-24 space-y-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">{data.title}</h1>
        <p className="text-lg font-light text-slate-600 dark:text-slate-300 max-w-2xl">
          {data.overview}
        </p>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-b border-slate-200 dark:border-slate-700 py-16 mb-24">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 font-medium">Timeline</h2>
          <p className="text-lg font-light">
            {formatDate(data.startTime)} — {formatDate(data.endTime)}
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 font-medium">Tools</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {data.toolsUsed.map((tool, index) => (
              <span key={tool} className="text-lg font-light">
                {tool}{index < data.toolsUsed.length - 1 && <span className="text-slate-400 ml-4">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Media Gallery */}
      <div className="mb-24">
        {/* Main Image Display */}
        <div className="mb-4">
          <img
            src={data.mediaUrls[activeImage]}
            alt={`Project view ${activeImage + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Thumbnails */}
        {data.mediaUrls.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {data.mediaUrls.map((image, index) => (
              <div 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`cursor-pointer transition-opacity ${activeImage === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-24 w-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Outcomes */}
      <div className="mb-24">
        <h2 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8 font-medium">Outcomes</h2>
        <div className="space-y-8">
          {data.outcomes.map((outcome, index) => (
            <div key={index} className="border-l-2 border-slate-200 dark:border-slate-700 pl-6 py-1">
              <p className="text-lg font-light">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Video */}
      {data.youTubeUrl && (
        <div>
          <h2 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8 font-medium">Project Video</h2>
          <div className="aspect-video bg-slate-100 dark:bg-slate-800">
            <iframe
              width="100%"
              height="100%"
              src={getYoutubeEmbedUrl(data.youTubeUrl)}
              title="Project Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export function CreativeTemplate({ data = sampleData }) {
  const [activeSection, setActiveSection] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sidebarOpacity = Math.max(0, Math.min(1, 1 - scrollPosition / 500));
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    if (!videoId) return '';
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* Sticky Sidebar with parallax effect */}
      <div 
        className="fixed left-0 top-0 h-full w-72 md:w-80 bg-white dark:bg-slate-900 shadow-lg z-10 flex flex-col"
        style={{ opacity: sidebarOpacity }}
      >
        <div className="px-8 py-12 flex-1 overflow-auto">
          <div className="mb-12 space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {data.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {data.overview}
            </p>
          </div>

          {/* Collapsible sections */}
          <div className="space-y-6">
            {/* Timeline section */}
            <div>
              <button 
                onClick={() => toggleSection('timeline')} 
                className="flex items-center justify-between w-full text-left py-2 border-b border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-sm uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400">Timeline</h2>
                {activeSection === 'timeline' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {activeSection === 'timeline' && (
                <div className="mt-4 pl-4 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <span className="text-xs font-medium">START</span>
                    </div>
                    <p className="font-medium">{formatDate(data.startTime)}</p>
                  </div>
                  
                  <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-700 ml-6"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <span className="text-xs font-medium">END</span>
                    </div>
                    <p className="font-medium">{formatDate(data.endTime)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tools section */}
            <div>
              <button 
                onClick={() => toggleSection('tools')} 
                className="flex items-center justify-between w-full text-left py-2 border-b border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-sm uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400">Tools</h2>
                {activeSection === 'tools' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {activeSection === 'tools' && (
                <div className="mt-4 pl-4 animate-fadeIn">
                  <div className="flex flex-wrap gap-2">
                    {data.toolsUsed.map((tool) => (
                      <span 
                        key={tool} 
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-purple-800/30 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Outcomes section */}
            <div>
              <button 
                onClick={() => toggleSection('outcomes')} 
                className="flex items-center justify-between w-full text-left py-2 border-b border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-sm uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400">Outcomes</h2>
                {activeSection === 'outcomes' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {activeSection === 'outcomes' && (
                <div className="mt-4 pl-4 space-y-3 animate-fadeIn">
                  {data.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm">{outcome}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 md:ml-80">
        <div className="max-w-4xl mx-auto px-8 py-12 space-y-32">
          {/* Diagonal Scroll Gallery */}
          <div className="space-y-32 pt-16">
            {data.mediaUrls.map((image, index) => (
              <div 
                key={index} 
                className={`group transform ${index % 2 === 0 ? 'translate-x-12' : '-translate-x-12'}`}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl transition-all transform group-hover:scale-[1.02] duration-500">
                  <img
                    src={image}
                    alt={`Project view ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {index === 0 && data.outcomes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                    {data.outcomes.map((outcome, i) => (
                      <div 
                        key={i} 
                        className={`p-6 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                          i === 0 ? 'bg-blue-50 dark:bg-blue-900/20 shadow-blue-200 dark:shadow-blue-900/10' :
                          i === 1 ? 'bg-purple-50 dark:bg-purple-900/20 shadow-purple-200 dark:shadow-purple-900/10' :
                          'bg-green-50 dark:bg-green-900/20 shadow-green-200 dark:shadow-green-900/10'
                        } shadow-lg`}
                      >
                        <p className="font-medium">{outcome}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* YouTube Video Section */}
          {data.youTubeUrl && (
            <div className="mb-24">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                {!videoPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center group cursor-pointer" onClick={() => setVideoPlaying(true)}>
                    <img
                      src={data.mediaUrls[0]} 
                      alt="Video preview"
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>
                    <div className="relative z-10 h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 border border-white/40">
                      <Play size={36} className="text-white ml-1" />
                    </div>
                  </div>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${getYoutubeEmbedUrl(data.youTubeUrl)}?autoplay=1`}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="ml-72 md:ml-80 border-t border-slate-200 dark:border-slate-700 py-8 px-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {data.title} • {formatDate(data.startTime)} - {formatDate(data.endTime)}
          </div>
          <button onClick={()=>navigate(-1)} className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all projects <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
function TemplatePreview({preivewId,caseStudy,button}) {
  const { templateId } = useParams();
  const {state}=useLocation();
  const navigate=useNavigate();
  const id=preivewId??templateId

  // Choose template based on ID
   const TemplateComponent = {
     '1': MinimalTemplate,
     '2': ModernTemplate,
    '3': CreativeTemplate,
  }
  [id] || ModernTemplate;

  return (
    <div className="min-h-screen bg-background py-12">
      {!button && <Button className="w-1/4 bg-slate-600" onClick={()=>navigate(-1)}><ArrowLeft className="w-6 h-6 pr-2" /> Back</Button>}
      <div className="container mx-auto">
        <TemplateComponent data={caseStudy??state?? sampleData} />
      </div>
    </div>
  );
}

export default TemplatePreview;