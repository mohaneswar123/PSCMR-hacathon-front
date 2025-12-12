import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login, loading, error } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) return setLocalError('Email and password required');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (e) {
      setLocalError('Invalid email or password');
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-cta/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cta rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Hero Image Section */}
        <div className="absolute inset-0 flex items-center justify-start pl-8 lg:pl-16">
          <div className="hidden lg:block w-1/2 pr-8">
            <div className="animate-slideInUp">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Community sharing" 
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-6 text-center animate-slideInUp" style={{animationDelay: '0.2s'}}>
              <h1 className="text-4xl font-bold text-textPrimary mb-4">Welcome Back to ShareGo</h1>
              <p className="text-lg text-textSecondary">Join our community of sharers and discover amazing opportunities around you.</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="relative min-h-screen flex items-center justify-end pr-8 lg:pr-16">
          <div className="w-full max-w-md lg:w-96 animate-slideInUp" style={{animationDelay: '0.4s'}}>
            <form className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:shadow-3xl transition-all duration-300" onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center animate-shimmer">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-textPrimary mb-2">Welcome Back</h2>
                <p className="text-textSecondary">Sign in to your account</p>
              </div>

              {!!localError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 animate-slideInUp">
                  <p className="text-sm text-red-600 text-center">{localError}</p>
                </div>
              )}
              {!!error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 animate-slideInUp">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-textSecondary mb-2">Email Address</label>
                  <div className="relative">
                    <input 
                      value={email} 
                      onChange={e=>setEmail(e.target.value)} 
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
                      value={password} 
                      onChange={e=>setPassword(e.target.value)} 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full px-4 py-3 pl-12 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:bg-white/80"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                <button 
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                  disabled={loading}
                >
                  <span className={loading ? 'opacity-0' : ''}>
                    {loading ? 'Signing in...' : 'Sign In'}
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
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:text-accent font-semibold transition-colors duration-200">
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
