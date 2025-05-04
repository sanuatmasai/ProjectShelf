import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ExternalLink, Facebook, Linkedin, Loader2, Mail, Twitter, } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/user/userSlice';
import useQuery from '@/hooks/useQuery';
import { CASE_STUDIES_ME } from '@/imports/api';
import { useNavigate } from 'react-router-dom';

const sampleData = {
  "firstName": "sudhir",
  "lastName": "shanu",
  "email": "sudhir.yadav@quicktouch.co.in",
  "displayName": "displayfrefwefwe",
  "bio": "ewfewfwfwefefewfw",
  "mobileNumber": "9512232323",
  "profilePicUrl": "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%281%29%20%281%29.png",
  "linkedinUrl": "http://localhost:3000/home",
  "twitterUrl": "http://localhost:3000/home",
  "facebookUrl": "http://localhost:3000/home",
  "designation": null,
  "address": "fwe",
  "uniqueName": "hello",
  "caseStudies": [
      {
          "id": 2,
          "uid": "db4329ce-b400-41c6-bc15-2847b95bc70a",
          "title": "New Titleefefw",
          "overview": "fweofwejf woj fowejf weoif jwefoiwef wefiowef",
          "startTime": "2025-05-07",
          "endTime": "2025-05-07",
          "toolsUsed": [
              "fewkfjwfwef ow fjewo f"
          ],
          "outcomes": [
              "flwejf wefiowe jfw o"
          ],
          "mediaUrls": [
              "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%282%29.png"
          ],
          "youTubeUrl": "fwfwe fjwoif we",
          "themeId": "2",
          "createdUserId": 1
      },
      {
          "id": 3,
          "uid": "db4329ce-b400-41c6-bc15-2847b95bc70b",
          "title": "wofijwe oif jwef",
          "overview": "fwefwjfoi wefoweijf we",
          "startTime": "2025-05-04",
          "endTime": "2025-05-04",
          "toolsUsed": [
              "fweof wj"
          ],
          "outcomes": [
              "fewfiwejf owef"
          ],
          "mediaUrls": [
              "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/image%20%281%29%20%281%29.png",
              "https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/fac57885-1084-4c26-8e3a-a9ff14fed96a.png"
          ],
          "youTubeUrl": "https://www.youtube.com/watch?v=lQpqgBU1Z3s",
          "themeId": "1",
          "createdUserId": 1
      }
  ]
}

export function MinimalTemplate({ res=sampleData, template }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const data={...res,...(res?.user??{})}

  
  // Function to handle navigation (simplified for demo)
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header with clean typography */}
      <header className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src={data?.profilePicUrl} 
                alt={data?.displayName} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight">{data?.displayName}</h1>
              <p className="text-lg text-slate-500 mt-2 max-w-2xl">
                {data?.bio}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                {data?.linkedinUrl && (
                  <a href={data.linkedinUrl} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {data?.twitterUrl && (
                  <a href={data.twitterUrl} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.122 1.192 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
                {data?.facebookUrl && (
                  <a href={data.facebookUrl} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Portfolio Section */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Case Studies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.caseStudies?.map((study, index) => (
              <div 
                key={study.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                onMouseEnter={() => setHoveredCard(study.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Image with proper aspect ratio */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={study.mediaUrls?.[0]} 
                    alt={study.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    style={{
                      transform: hoveredCard === study.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">{study.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{study.overview}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">
                      {new Date(study.startTime).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short'
                      })}
                    </span>
                    
                    <button 
                      onClick={() => navigate(template ? study.uid : "case", {state: study})}
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="py-8 px-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {data?.displayName}</p>
      </footer>
    </div>
  );
}

export function ModernTemplate({ res=sampleData, template }) {
  const [activeStudy, setActiveStudy] = useState(null);
  
  const data={...res,...(res?.user??{})}
  console.log(data,'PPPPP')
  // Function to handle navigation (simplified for demo)
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Hero Section with Bold Typography */}
      <header className="relative overflow-hidden">
        {/* Background Design Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Profile Info - Takes 3 columns */}
            <div className="md:col-span-3 space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {data?.displayName}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  {data?.bio}
                </p>
              </div>
              
              {/* Contact & Social Links */}
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${data?.email}`} className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
                {data?.linkedinUrl && (
                  <a href={data.linkedinUrl} className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {data?.twitterUrl && (
                  <a href={data.twitterUrl} className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                )}
                {data?.facebookUrl && (
                  <a href={data.facebookUrl} className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* Profile Image - Takes 2 columns */}
            <div className="md:col-span-2 relative">
              <div className="aspect-square w-full max-w-md mx-auto relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border-4 border-purple-500/30 rounded-full animate-pulse animation-delay-500"></div>
                
                {/* Image Container */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/10">
                  <img 
                    src={data?.profilePicUrl} 
                    alt={data?.displayName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Case Studies Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 inline-block pb-2 border-b-2 border-blue-500">
            Featured Work
          </h2>
          
          <div className="space-y-32">
            {data?.caseStudies?.map((study, index) => (
              <div 
                key={study.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                onMouseEnter={() => setActiveStudy(study.id)}
                onMouseLeave={() => setActiveStudy(null)}
              >
                {/* Image Section */}
                <div className="flex-1 group relative">
                  {/* Image Container with hover effects */}
                  <div className="relative rounded-lg overflow-hidden shadow-2xl">
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Main Image with Zoom Effect */}
                    <img 
                      src={study.mediaUrls?.[0]} 
                      alt={study.title} 
                      className="w-full aspect-video object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Small Image Gallery (if there are multiple images) */}
                    {study.mediaUrls?.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {study.mediaUrls.slice(0, 3).map((url, imgIndex) => (
                          <div key={imgIndex} className="w-12 h-12 rounded border-2 border-white/50 overflow-hidden">
                            <img 
                              src={url} 
                              alt={`${study.title} thumbnail ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {study.mediaUrls.length > 3 && (
                          <div className="w-12 h-12 rounded bg-black/50 border-2 border-white/50 flex items-center justify-center text-xs font-bold">
                            +{study.mediaUrls.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* YouTube indicator if available */}
                  {study.youTubeUrl && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Video</span>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="flex-1 space-y-6">
                  {/* Date */}
                  <div className="text-sm text-blue-400 font-medium">
                    {new Date(study.startTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                    {study.endTime && study.endTime !== study.startTime && ` - ${new Date(study.endTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}`}
                  </div>
                  
                  {/* Title & Description */}
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                      {study.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {study.overview}
                    </p>
                  </div>
                  
                  {/* Tools Used */}
                  {study.toolsUsed?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm uppercase tracking-wider text-slate-400">Tools & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.toolsUsed.map((tool, toolIndex) => (
                          <span 
                            key={toolIndex} 
                            className="px-3 py-1 bg-white/10 text-blue-300 rounded-full text-sm backdrop-blur-sm"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Outcomes */}
                  {study.outcomes?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm uppercase tracking-wider text-slate-400">Key Outcomes</h4>
                      <ul className="space-y-2">
                        {study.outcomes.slice(0, 2).map((outcome, outIndex) => (
                          <li key={outIndex} className="flex items-start">
                            <span className="mr-2 mt-1 text-blue-400">•</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                        {study.outcomes.length > 2 && (
                          <li className="text-blue-400">+ {study.outcomes.length - 2} more outcomes</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {/* View Button */}
                  <button 
                    onClick={() => navigate(template ? study.uid : "case", {state: study})}
                    className="group flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold">{data?.displayName}</h3>
            <p className="text-slate-400">{data?.designation || 'Professional Portfolio'}</p>
          </div>
          
          <div className="flex gap-6">
            {data?.linkedinUrl && (
              <a href={data.linkedinUrl} className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data?.twitterUrl && (
              <a href={data.twitterUrl} className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data?.facebookUrl && (
              <a href={data.facebookUrl} className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            )}
          </div>
          
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export function MinimalistTemplate({ res=sampleData, template }) {
  const navigate=useNavigate()
  const data={...res,...(res?.user??{})}

  // Format date to display Month Year
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Create timeline string from start and end dates
  const getTimeline = (study) => {
    if (!study.startTime || !study.endTime) return "";
    return `${formatDate(study.startTime)} - ${formatDate(study.endTime)}`;
  };

  // Determine whether to use data directly or data.user
  const profileData = data?.displayName ? data : data?.user;
  
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-16">
      {/* Profile */}
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-light tracking-tight">{profileData?.displayName??profileData?.user?.displayName}</h1>
        <div className="w-16 h-1 bg-gray-800 mx-auto" />
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{profileData?.bio??profileData?.user?.bio}</p>
        
        {/* Social Links */}
        {(profileData?.linkedinUrl || profileData?.twitterUrl || profileData?.facebookUrl) && (
          <div className="flex justify-center space-x-4 pt-2">
            {profileData?.linkedinUrl && (
              <a href={profileData?.linkedinUrl} target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900">
                LinkedIn
              </a>
            )}
            {profileData?.twitterUrl && (
              <a href={profileData?.twitterUrl} target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
            )}
            {profileData?.facebookUrl && (
              <a href={profileData?.facebookUrl} target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
            )}
          </div>
        )}
      </div>

      {/* Case Studies */}
      <div className="space-y-24">
        {data?.caseStudies?.map((study) => (
          <div key={study.id} className="space-y-8">
            {/* Show first image if available */}
            {study.mediaUrls && study.mediaUrls.length > 0 && (
              <img 
                src={study.mediaUrls[0]} 
                alt={study.title} 
                className="w-full h-[400px] object-cover rounded-lg shadow-md" 
              />
            )}
            
            <div className="space-y-4">
              <h2 className="text-3xl font-light">{study.title}</h2>
              <p className="text-gray-600">{study.overview}</p>
              
              <div className="flex justify-between items-center pt-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Timeline</p>
                  <p className="text-gray-600">{getTimeline(study)}</p>
                </div>
                
                <button 
                  onClick={() => navigate(template ? study.uid : "case", {state: study})} 
                  className="group flex items-center px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-2">View Project</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewTemplate() {
  const currentUser=useSelector(selectUser)

  
  const [activeTab, setActiveTab] = useState(currentUser?.templateId);
      const { data, loading } = useQuery(CASE_STUDIES_ME);
     

      if(loading){
        return <Loader2 className="animate-spin" />
      }

      const caseStudies={
        user:currentUser,
        caseStudies:data?.data?.data
      }
  


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="1">Minimal</TabsTrigger>
              <TabsTrigger value="2">Modern</TabsTrigger>
              <TabsTrigger value="3">Minimalist</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="1">
            <MinimalTemplate data={caseStudies} />
          </TabsContent>

          <TabsContent value="2">
            <ModernTemplate data={caseStudies} />
          </TabsContent>

          <TabsContent value="3">
            <MinimalistTemplate data={caseStudies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default PreviewTemplate;