import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useEffect, useState, useRef } from 'react';

export default function Dashboard() {
  const { user } = useApp();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-bgMain">
      
      {/* 1. FULLSCREEN HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Modern community sharing background"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/15"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-cta/10"></div>
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/5"></div>
        </div>
        

        
        {/* Hero Content */}
        <div 
          className="relative z-10 text-center space-y-6"
        >
          {/* Hero Title with Glass Background */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent drop-shadow-2xl">
                Welcome{user ? `, ${user.name}` : ''}
              </span>
            </h1>
            
            <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mt-4">
              Share what you have. Find what you need.
            </p>
            
            <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mt-6">
              <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-md">
                Your community, shared smarter 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textPrimary hover:text-primary transition-all duration-300 group"
        >
          <span className="text-sm font-semibold uppercase tracking-wider">Scroll Down</span>
          <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>


      </section>

      {/* 2. FEATURE HIGHLIGHTS SECTION */}
      <section
        id="features"
        ref={el => sectionsRef.current['features'] = el}
        className="relative py-32 px-6 bg-gradient-to-b from-bgMain to-gray-50"
      >
        <div className="max-w-8xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-cta bg-clip-text text-transparent">
                How ShareGo Works
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
              Discover the power of community sharing through our innovative platform
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-8 rounded-full"></div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: '🏞️', 
                title: 'Field Sharing', 
                desc: 'Transform unused spaces into productive community assets. Share your land for gardens, events, or storage.',
                color: 'primary',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                stats: '500+ Fields Shared'
              },
              { 
                icon: '🚗', 
                title: 'Vehicle Sharing', 
                desc: 'Monetize your idle vehicles while helping neighbors get around. Cars, bikes, and more.',
                color: 'accent',
                image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                stats: '1.2K+ Vehicles Available'
              },
              { 
                icon: '🛒', 
                title: 'Food Offers', 
                desc: 'Reduce waste and save money. Get amazing deals on quality food items from local businesses.',
                color: 'success',
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                stats: '₹50K+ Saved This Month'
              },
              { 
                icon: '🎟️', 
                title: 'Ticket Exchange', 
                desc: 'Never miss an event again. Buy and sell tickets safely within your community network.',
                color: 'cta',
                image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                stats: '2K+ Tickets Exchanged'
              },
              { 
                icon: '🛏️', 
                title: 'Room Sharing', 
                desc: 'Provide comfortable accommodation for travelers while earning extra income from your space.',
                color: 'highlight',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                stats: '800+ Nights Hosted'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-4 ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1 mx-auto max-w-md lg:max-w-none' : ''
                } ${isVisible.features ? 'animate-fadeUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Card */}
                <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 group-hover:shadow-3xl group-hover:border-gray-200 transition-all duration-500 overflow-hidden">
                  
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden rounded-t-3xl">
                    <img 
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-gray-100/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/50 shadow-md">
                      <p className="text-sm font-bold text-gray-800">{feature.stats}</p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-10">
                    {/* Title */}
                    <h3 className="text-3xl font-black mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.desc}
                    </p>                    
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-cta opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-${feature.color} to-transparent transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
                </div>

                {/* Floating Background Decoration */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-cta/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 shadow-lg">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 1" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 2" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 3" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">+5K</div>
              </div>
              <p className="text-textSecondary font-medium">Join 5,000+ active community members</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTION BUTTONS SECTION */}
      <section
        id="actions"
        ref={el => sectionsRef.current['actions'] = el}
        className="relative py-24 px-6 bg-gradient-to-b from-transparent to-[#F8FAFC]/50"
      >
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* ADD OPTIONS */}
          <div className={`${isVisible.actions ? 'animate-fadeUp' : 'opacity-0'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-cta bg-clip-text text-transparent">
                  Share Your Resources
                </span>
              </h2>
              <p className="text-xl text-textSecondary max-w-2xl mx-auto">
                Turn your unused assets into opportunities. Start sharing and earning today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  to: '/add/field', 
                  icon: '🏞️', 
                  label: 'Add Field',
                  desc: 'Share your land',
                  image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  gradient: 'from-green-500 to-emerald-600'
                },
                { 
                  to: '/add/vehicle', 
                  icon: '🚗', 
                  label: 'Add Vehicle',
                  desc: 'Rent your car',
                  image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  gradient: 'from-blue-500 to-cyan-600'
                },
                { 
                  to: '/add/foodoffer', 
                  icon: '🛒', 
                  label: 'Add Food Offer',
                  desc: 'List food items',
                  image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  gradient: 'from-orange-500 to-red-600'
                }
              ].map((btn, index) => (
                <Link
                  key={index}
                  to={btn.to}
                  className="group relative rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={btn.image}
                      alt={btn.label}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${btn.gradient} opacity-90 group-hover:opacity-95 transition-opacity duration-300`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 h-56 flex flex-col justify-between">
                    {/* Icon */}
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                        <span className="text-3xl">{btn.icon}</span>
                      </div>
                      
                      {/* Arrow Icon */}
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className="text-white font-black text-2xl mb-2">
                        {btn.label}
                      </h3>
                      <p className="text-white/90 text-sm font-medium">
                        {btn.desc}
                      </p>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                  
                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300"></div>
                </Link>
              ))}
              
              {/* Second Row - Centered */}
              {[
                { 
                  to: '/add/ticket', 
                  icon: '🎟️', 
                  label: 'Add Ticket',
                  desc: 'Sell event tickets',
                  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  gradient: 'from-purple-500 to-pink-600'
                },
                { 
                  to: '/add/bedshare', 
                  icon: '🛏️', 
                  label: 'Add Room Share',
                  desc: 'Offer accommodation',
                  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  gradient: 'from-indigo-500 to-purple-600'
                }
              ].map((btn, index) => (
                <div key={index} className="flex justify-center md:col-span-1 lg:col-span-1">
                  <Link
                    to={btn.to}
                    className="group relative rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden w-full"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={btn.image}
                        alt={btn.label}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${btn.gradient} opacity-90 group-hover:opacity-95 transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-8 h-56 flex flex-col justify-between">
                      {/* Icon */}
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                          <span className="text-3xl">{btn.icon}</span>
                        </div>
                        
                        {/* Arrow Icon */}
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                          <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div>
                        <h3 className="text-white font-black text-2xl mb-2">
                          {btn.label}
                        </h3>
                        <p className="text-white/90 text-sm font-medium">
                          {btn.desc}
                        </p>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    
                    {/* Border Glow */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* VIEW OPTIONS - Browse Listings */}
          <div className={`${isVisible.actions ? 'animate-fadeUp animation-delay-300' : 'opacity-0'}`}>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Browse Listings
                </span>
              </h2>
              <p className="text-xl text-textSecondary max-w-2xl mx-auto">
                Explore what your community has to offer. Find exactly what you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  to: '/fields', 
                  icon: '🏞️', 
                  label: 'View Fields',
                  desc: 'Discover available spaces',
                  count: '500+',
                  color: 'from-emerald-400 to-teal-500',
                  bgPattern: 'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'
                },
                { 
                  to: '/vehicles', 
                  icon: '🚗', 
                  label: 'View Vehicles',
                  desc: 'Browse transportation',
                  count: '1.2K+',
                  color: 'from-blue-400 to-cyan-500',
                  bgPattern: 'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%233b82f6" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E'
                },
                { 
                  to: '/foodoffers', 
                  icon: '🛒', 
                  label: 'View Food Offers',
                  desc: 'Find great deals',
                  count: '₹50K',
                  color: 'from-orange-400 to-red-500',
                  bgPattern: 'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23f97316" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E'
                },
                { 
                  to: '/tickets', 
                  icon: '🎟️', 
                  label: 'View Tickets',
                  desc: 'Get event access',
                  count: '2K+',
                  color: 'from-purple-400 to-pink-500',
                  bgPattern: 'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23a855f7" fill-opacity="0.1"%3E%3Cpath d="M30 30l-15-15v30l15-15zm0 0l15 15V15L30 30z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'
                },
                { 
                  to: '/bedshares', 
                  icon: '🛏️', 
                  label: 'View Room Shares',
                  desc: 'Find accommodation',
                  count: '800+',
                  color: 'from-indigo-400 to-violet-500',
                  bgPattern: 'data:image/svg+xml,%3Csvg width="52" height="26" viewBox="0 0 52 26" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.1"%3E%3Cpath d="M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'
                }
              ].map((btn, index) => (
                <div
                  key={index}
                  className={`${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <Link
                    to={btn.to}
                    className="group relative block h-full"
                  >
                    {/* Card Container */}
                    <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
                      
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-100"
                        style={{ backgroundImage: `url("${btn.bgPattern}")` }}
                      ></div>
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${btn.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-8 flex flex-col h-full min-h-[240px]">
                        {/* Top Section */}
                        <div className="flex items-start justify-between mb-6">
                          {/* Icon Container */}
                          <div className={`w-20 h-20 bg-gradient-to-br ${btn.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <span className="text-4xl">{btn.icon}</span>
                          </div>
                          
                          {/* Count Badge */}
                          <div className="bg-gray-100 px-4 py-2 rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
                            <p className="text-sm font-bold text-gray-700">{btn.count}</p>
                          </div>
                        </div>
                        
                        {/* Text Content */}
                        <div className="mt-auto">
                          <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                            {btn.label}
                          </h3>
                          <p className="text-gray-600 text-base font-medium mb-4">
                            {btn.desc}
                          </p>
                          
                          {/* Arrow Button */}
                          <div className="flex items-center gap-2 text-gray-900 group-hover:gap-4 transition-all duration-300">
                            <span className="font-bold text-sm">Explore Now</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Border Effect */}
                      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${btn.color} opacity-20 blur-xl`}></div>
                      </div>
                      
                      {/* Bottom Accent Line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${btn.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                    </div>
                    
                    {/* External Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${btn.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
            
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Community collaboration"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-purple-600/90 to-pink-600/95"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

            {/* Content Container */}
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-12 md:p-16 lg:p-20">
              
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 font-semibold text-sm">5,000+ Active Members</span>
                </div>

                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  Ready to Start
                  <span className="block bg-gradient-to-r from-yellow-300 via-orange-200 to-pink-200 bg-clip-text text-transparent">
                    Sharing?
                  </span>
                </h3>

                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
                  Join thousands of community members who are already sharing resources, saving money, and building stronger connections.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-white mb-1">₹2M+</div>
                    <div className="text-white/70 text-sm font-medium">Saved Together</div>
                  </div>
                  <div className="text-center border-x border-white/20">
                    <div className="text-3xl md:text-4xl font-black text-white mb-1">10K+</div>
                    <div className="text-white/70 text-sm font-medium">Resources Shared</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-white mb-1">4.9★</div>
                    <div className="text-white/70 text-sm font-medium">User Rating</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/requests"
                    className="group relative px-8 py-4 bg-white text-primary font-bold text-lg rounded-2xl hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      View My Requests
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>

                  <Link
                    to="/add/field"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
                  >
                    Start Sharing Now
                  </Link>
                </div>
              </div>

              {/* Right Content - Feature Cards */}
              <div className="hidden lg:grid grid-cols-2 gap-6">
                {[
                  { icon: '⚡', title: 'Instant Connect', desc: 'Quick responses from community' },
                  { icon: '🔒', title: 'Secure & Safe', desc: 'Verified users and transactions' },
                  { icon: '💰', title: 'Save Money', desc: 'Share costs, earn extra income' },
                  { icon: '🌍', title: 'Eco-Friendly', desc: 'Reduce waste, reuse resources' }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-3xl">
                      {feature.icon}
                    </div>
                    <h4 className="text-white font-black text-xl mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Accent Shapes */}
            <div className="absolute top-10 right-10 w-20 h-20 border-4 border-white/20 rounded-2xl rotate-12 animate-float" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 border-4 border-yellow-300/30 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          </div>
        </div>
      </section>

      {/* Custom Animations Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes shine {
          to { transform: translateX(100%) skewX(-12deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeUp { animation: fadeUp 0.8s ease-out forwards; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-shine { animation: shine 1.5s; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .bg-300% { background-size: 300%; }
      `}</style>
    </div>
  );
}
