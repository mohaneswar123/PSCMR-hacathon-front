import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { register, loading, error } = useApp();
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:''});
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const update = (k, v) => setForm(p => ({...p, [k]: v}))

  const handleSubmit = async (e) => {
    e.preventDefault(); setLocalError('');
    if (!form.name || !form.email || !form.password) {
      return setLocalError('Name, email and password are required');
    }
    try {
      await register(form);
      navigate('/dashboard');
    } catch {}
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-pulse { animation: pulse 2s infinite; }
      `}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-tr from-accent/10 via-primary/5 to-cta/15">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-primary to-accent rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-3/4 right-0 w-96 h-96 bg-gradient-to-l from-cta to-accent rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-b from-accent to-primary rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '6s'}}></div>
        </div>

        {/* Main Container */}
        <div className="relative min-h-screen flex items-center">
          {/* Left Section - Hero Content */}
          <div className="w-full lg:w-1/2 px-8 lg:px-16">
            <div className="animate-slideInLeft">
              <div className="mb-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-textPrimary mb-6 leading-tight">
                  Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sharing</span> Community
                </h1>
                <p className="text-xl text-textSecondary mb-8 leading-relaxed">
                  Connect with people in your area. Share resources, split costs, and build meaningful relationships.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="animate-slideInLeft" style={{animationDelay: '0.2s'}}>
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Food sharing" 
                    className="w-full h-32 object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-sm text-textSecondary mt-2 font-medium">Share Meals</p>
                </div>
                <div className="animate-slideInLeft" style={{animationDelay: '0.4s'}}>
                  <img 
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Vehicle sharing" 
                    className="w-full h-32 object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-sm text-textSecondary mt-2 font-medium">Share Rides</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-slideInLeft" style={{animationDelay: '0.6s'}}>
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-md" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 1" />
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-md" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 2" />
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-md" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 3" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-md">+50</div>
                </div>
                <p className="text-textSecondary font-medium">Join 500+ active sharers</p>
              </div>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="w-full lg:w-1/2 px-8 lg:px-16">
            <div className="max-w-md mx-auto animate-slideInRight">
              <form className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl" onSubmit={handleSubmit}>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary via-accent to-cta rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-textPrimary mb-2">Create Account</h2>
                  <p className="text-textSecondary">Start your sharing journey today</p>
                </div>

                {!!localError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 animate-slideInRight">
                    <p className="text-sm text-red-600 text-center">{localError}</p>
                  </div>
                )}
                {!!error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 animate-slideInRight">
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-textSecondary mb-2">Full Name</label>
                    <div className="relative">
                      <input 
                        value={form.name} 
                        onChange={e=>update('name', e.target.value)} 
                        placeholder="Jane Doe" 
                        className="w-full px-4 py-3 pl-12 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:bg-white/80"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-textSecondary mb-2">Email Address</label>
                    <div className="relative">
                      <input 
                        value={form.email} 
                        onChange={e=>update('email', e.target.value)} 
                        type="email" 
                        placeholder="you@example.com" 
                        className="w-full px-4 py-3 pl-12 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:bg-white/80"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-textSecondary mb-2">Password</label>
                    <div className="relative">
                      <input 
                        value={form.password} 
                        onChange={e=>update('password', e.target.value)} 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 pl-12 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:bg-white/80"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-textSecondary mb-2">Phone Number</label>
                    <div className="relative">
                      <input 
                        value={form.phone} 
                        onChange={e=>update('phone', e.target.value)} 
                        placeholder="+1 (555) 123-4567" 
                        className="w-full px-4 py-3 pl-12 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:bg-white/80"
                      />
                      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>

                  <button 
                    className="w-full py-3 px-6 bg-gradient-to-r from-primary via-accent to-cta text-white rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                    disabled={loading}
                  >
                    <span className={loading ? 'opacity-0' : ''}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </span>
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-textSecondary">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-accent font-semibold transition-colors duration-200">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
