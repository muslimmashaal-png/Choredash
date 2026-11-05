import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChoreDashLogo } from '../common/ChoreDashLogo';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  CheckCircle2,
  X,
  Fingerprint,
  UserCheck,
  GraduationCap
} from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { 
    loginWithGoogle, 
    loginWithApple, 
    loginWithEmail 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<'parent' | 'teacher'>('parent');
  
  // Form credentials state
  const [username, setUsername] = useState('alex.miller@choredash.internal');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Interactive Sign In Box Modal (opens when user presses "sign in with anything")
  const [signInBoxOpen, setSignInBoxOpen] = useState(false);
  const [boxProvider, setBoxProvider] = useState<'google' | 'apple' | 'fingerprint' | 'general'>('general');
  const [modalUsername, setModalUsername] = useState('alex.miller@gmail.com');
  const [modalPassword, setModalPassword] = useState('password123');
  const [modalRole, setModalRole] = useState<'parent' | 'teacher'>('parent');
  const [modalShowPassword, setModalShowPassword] = useState(false);
  const [modalError, setModalError] = useState('');

  // Forgot password modal
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmailInput, setResetEmailInput] = useState('');

  // Handler to open the dedicated Sign-In Box modal for any sign-in option
  const openSignInBox = (provider: 'google' | 'apple' | 'fingerprint' | 'general') => {
    setBoxProvider(provider);
    setModalError('');
    if (provider === 'google') {
      setModalUsername('alex.miller@gmail.com');
      setModalPassword('password123');
    } else if (provider === 'apple') {
      setModalUsername('alex.carer@privaterelay.appleid.com');
      setModalPassword('password123');
    } else if (provider === 'fingerprint') {
      setModalUsername('alex.fingerprint@choredash.internal');
      setModalPassword('biometric-secure-key');
    } else {
      setModalUsername(username || 'alex.miller@choredash.internal');
      setModalPassword(password === '••••••••' ? 'password123' : password);
    }
    setModalRole(selectedRole);
    setSignInBoxOpen(true);
  };

  // Submit inside the Sign In Box modal
  const handleModalSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    const cleanUser = modalUsername.trim();
    if (!cleanUser) {
      setModalError('Please enter a username or email.');
      return;
    }

    if (!modalPassword || modalPassword.length < 3) {
      setModalError('Please enter your password.');
      return;
    }

    const displayName = cleanUser.includes('@') 
      ? cleanUser.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase())
      : (modalRole === 'teacher' ? 'Ms. Sarah Connor' : 'Alex Miller');

    if (boxProvider === 'google') {
      loginWithGoogle(cleanUser, displayName, modalRole);
    } else if (boxProvider === 'apple') {
      loginWithApple(cleanUser, displayName, modalRole);
    } else {
      loginWithEmail(cleanUser, modalPassword, displayName, modalRole);
    }

    setSignInBoxOpen(false);
  };

  // Main page submit handler
  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter a username or email address.');
      return;
    }

    if (!password || password.length < 3) {
      setErrorMessage('Password must be provided.');
      return;
    }

    // Direct login using the entered credentials and selected Parent/Teacher role
    const cleanUser = username.trim();
    const displayName = activeTab === 'signup' && name.trim() 
      ? name.trim() 
      : (modalRole === 'teacher' ? 'Ms. Sarah Connor' : 'Alex Miller');

    loginWithEmail(
      cleanUser,
      password === '••••••••' ? 'defaultPassword123' : password,
      displayName,
      selectedRole,
      activeTab === 'signup'
    );
  };

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-[#020816] via-[#05132B] to-[#020713] text-slate-100 p-3 sm:p-4 flex flex-col justify-start relative overflow-y-auto">
      {/* Ambient neon background glow matching logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-44 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-44 right-2 w-48 h-48 bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1 pb-2">
        <div className="mb-1 relative">
          <div className="absolute -inset-1 bg-[#00F0FF]/30 rounded-xl blur-xs pointer-events-none" />
          <div className="relative">
            <ChoreDashLogo variant="icon" size="sm" theme="dark" />
          </div>
        </div>
        
        <h1 className="text-xl font-black tracking-tight text-white font-display flex items-center gap-2">
          <span>ChoreDash</span>
          <span className="text-[9px] font-black uppercase tracking-wider bg-cyan-500/25 text-[#00F0FF] border border-cyan-400/60 px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.4)]">
            Family App
          </span>
        </h1>
        <p className="text-[11px] text-cyan-100/70 max-w-[260px] mt-0.5 leading-tight">
          Calm routines, smart homework tracking & family rewards
        </p>

        {/* Security / Safe Badge */}
        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[9px] text-cyan-200 shadow-[0_0_6px_rgba(0,240,255,0.15)]">
          <ShieldCheck className="w-3 h-3 text-[#00F0FF]" />
          <span>COPPA Family-Safe · Encrypted Sync</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-sm mx-auto bg-[#020816]/90 border border-cyan-400/40 rounded-2xl p-3 sm:p-3.5 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md space-y-2.5">
        
        {/* Error message alert */}
        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 animate-ping" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Primary Sign-In Option Buttons (press on the sign in with anything to open the sign in box) */}
        <div className="space-y-2.5">
          {/* Google / Gmail Sign In Button */}
          <button
            type="button"
            onClick={() => openSignInBox('google')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer group border border-slate-200"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <div className="text-left">
                <span className="block leading-tight font-bold text-slate-900">Continue with Google / Gmail</span>
                <span className="block text-[10px] text-slate-500 font-normal">Use your Gmail or Google Account</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
          </button>

          {/* Apple ID Sign In Button */}
          <button
            type="button"
            onClick={() => openSignInBox('apple')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-black hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer group border border-zinc-800"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.73-7.98-12.1-14.71-5.65-8.74-10.15-18.73-13.51-29.98-3.36-11.24-5.04-21.94-5.04-32.08 0-14.41 3.52-26.4 10.57-35.97 7.05-9.57 16-14.44 26.85-14.62 5.04 0 10.42 1.35 16.14 4.05 5.72 2.7 9.4 4.09 11.04 4.17 1.88 0 5.8-1.47 11.77-4.41 5.97-2.94 11.19-4.24 15.66-3.9 11.63.76 21.05 4.97 28.27 12.63-10.17 6.16-15.17 14.78-15 25.86.17 8.62 3.42 15.86 9.75 21.72 6.33 5.86 13.79 9.17 22.38 9.94-2.19 6.58-4.75 13.1-7.68 19.57zM119.22 31.85c0-7.37 2.68-14.19 8.04-20.46 5.36-6.27 12.01-10.23 19.95-11.89.87 7.23-1.63 14.13-7.5 20.7-5.87 6.57-12.7 10.46-20.49 11.65z" />
              </svg>
              <div className="text-left">
                <span className="block leading-tight font-bold text-white">Continue with Apple</span>
                <span className="block text-[10px] text-zinc-400 font-normal">Sign in with Apple ID</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Or with Username & Password
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Tab switch: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 bg-slate-950/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setErrorMessage('');
            }}
            className={`py-1.5 rounded-lg transition cursor-pointer text-center ${
              activeTab === 'signin'
                ? 'bg-gradient-to-r from-[#00F0FF] to-[#0080FF] text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)] font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`py-1.5 rounded-lg transition cursor-pointer text-center ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-[#00F0FF] to-[#0080FF] text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)] font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Main Username & Password Form */}
        <form onSubmit={handleMainFormSubmit} className="space-y-3">
          {/* If Sign Up: Full Name */}
          {activeTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Miller"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>
            </div>
          )}

          {/* Username Input */}
          <div>
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username or email"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-slate-300">
                Password
              </label>
              {activeTab === 'signin' && (
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Fingerprint */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-700 text-cyan-600 focus:ring-cyan-500 bg-slate-900"
              />
              <span>Remember me</span>
            </label>

            {/* Fingerprint sign-in button (triggers the sign in box) */}
            <button
              type="button"
              onClick={() => openSignInBox('fingerprint')}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00F0FF] hover:text-[#66F7FF] transition cursor-pointer drop-shadow-[0_0_6px_rgba(0,240,255,0.45)]"
              title="Sign in with Fingerprint"
            >
              <Fingerprint className="w-4 h-4 text-[#00F0FF]" />
              <span>Fingerprint</span>
            </button>
          </div>

          {/* TWO BOXES AT THE BOTTOM: PARENT & TEACHER */}
          <div className="pt-2">
            <label className="block text-[10px] font-black uppercase tracking-wider text-cyan-300 mb-1.5">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Box 1: Parent */}
              <button
                type="button"
                onClick={() => setSelectedRole('parent')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 relative ${
                  selectedRole === 'parent'
                    ? 'bg-[#03132e] border-[#00F0FF] text-white ring-2 ring-[#00F0FF]/60 shadow-[0_0_18px_rgba(0,240,255,0.4)] scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  selectedRole === 'parent' ? 'bg-[#00F0FF] text-slate-950 font-black shadow-[0_0_8px_#00F0FF]' : 'bg-slate-800 text-slate-400'
                }`}>
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-black tracking-tight text-white">Parent</div>
                <div className="text-[9px] text-cyan-200/80 font-medium">Home & chores</div>
              </button>

              {/* Box 2: Teacher */}
              <button
                type="button"
                onClick={() => setSelectedRole('teacher')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 relative ${
                  selectedRole === 'teacher'
                    ? 'bg-[#03132e] border-[#00F0FF] text-white ring-2 ring-[#00F0FF]/60 shadow-[0_0_18px_rgba(0,240,255,0.4)] scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  selectedRole === 'teacher' ? 'bg-[#00F0FF] text-slate-950 font-black shadow-[0_0_8px_#00F0FF]' : 'bg-slate-800 text-slate-400'
                }`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-xs font-black tracking-tight text-white">Teacher</div>
                <div className="text-[9px] text-cyan-200/80 font-medium">School & assignments</div>
              </button>
            </div>
          </div>

          {/* Submit Sign In Button */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#00A8FF] to-[#0055EE] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_16px_rgba(0,240,255,0.5)] ring-1 ring-cyan-200 transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Sign In as {selectedRole === 'parent' ? 'Parent' : 'Teacher'}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center py-3 text-[10px] text-slate-500">
        <span>Protected by family privacy standards · Encrypted end-to-end</span>
      </div>

      {/* ========================================================= */}
      {/* THE SIGN-IN BOX (MODAL) */}
      {/* Appears when clicking on ANY sign in option ("sign in with anything") */}
      {/* Has Username input, Password input, and two bottom boxes for Parent and Teacher */}
      {/* ========================================================= */}
      {signInBoxOpen && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150 overflow-y-auto">
          <div className="w-full max-w-[340px] bg-[#020816] rounded-2xl p-4 shadow-[0_0_35px_rgba(0,240,255,0.3)] border border-cyan-400/50 text-white space-y-3 relative my-auto">
            
            {/* Header with Provider Badge and Close button */}
            <div className="flex items-center justify-between border-b border-cyan-500/25 pb-3">
              <div className="flex items-center gap-2.5">
                {boxProvider === 'google' ? (
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                ) : boxProvider === 'apple' ? (
                  <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.73-7.98-12.1-14.71-5.65-8.74-10.15-18.73-13.51-29.98-3.36-11.24-5.04-21.94-5.04-32.08 0-14.41 3.52-26.4 10.57-35.97 7.05-9.57 16-14.44 26.85-14.62 5.04 0 10.42 1.35 16.14 4.05 5.72 2.7 9.4 4.09 11.04 4.17 1.88 0 5.8-1.47 11.77-4.41 5.97-2.94 11.19-4.24 15.66-3.9 11.63.76 21.05 4.97 28.27 12.63-10.17 6.16-15.17 14.78-15 25.86.17 8.62 3.42 15.86 9.75 21.72 6.33 5.86 13.79 9.17 22.38 9.94-2.19 6.58-4.75 13.1-7.68 19.57zM119.22 31.85c0-7.37 2.68-14.19 8.04-20.46 5.36-6.27 12.01-10.23 19.95-11.89.87 7.23-1.63 14.13-7.5 20.7-5.87 6.57-12.7 10.46-20.49 11.65z" />
                  </svg>
                ) : boxProvider === 'fingerprint' ? (
                  <Fingerprint className="w-5 h-5 text-[#00F0FF] animate-pulse" />
                ) : (
                  <Sparkles className="w-5 h-5 text-[#00F0FF]" />
                )}
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {boxProvider === 'google' ? 'Sign in with Google' :
                     boxProvider === 'apple' ? 'Sign in with Apple' :
                     boxProvider === 'fingerprint' ? 'Sign in with Fingerprint' : 'Sign in to ChoreDash'}
                  </h3>
                  <span className="text-[10px] text-cyan-200/70">Enter username & password</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSignInBoxOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Message */}
            {modalError && (
              <div className="p-2 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs">
                {modalError}
              </div>
            )}

            {/* The Form with Username & Password */}
            <form onSubmit={handleModalSignInSubmit} className="space-y-3.5">
              {/* Field 1: Username */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={modalUsername}
                    onChange={(e) => setModalUsername(e.target.value)}
                    placeholder="Enter your username or email"
                    className="w-full bg-slate-950/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={modalShowPassword ? 'text' : 'password'}
                    value={modalPassword}
                    onChange={(e) => setModalPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-950/90 border border-slate-700 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setModalShowPassword(!modalShowPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {modalShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* AT THE BOTTOM: TWO BOXES WHICH SAY PARENT TEACHER */}
              <div className="pt-1">
                <label className="block text-[10px] font-black uppercase tracking-wider text-cyan-300 mb-2">
                  Account Role
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Bottom Box 1: Parent */}
                  <button
                    type="button"
                    onClick={() => setModalRole('parent')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      modalRole === 'parent'
                        ? 'bg-[#03132e] border-[#00F0FF] text-white ring-2 ring-[#00F0FF]/60 shadow-[0_0_18px_rgba(0,240,255,0.4)] scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      modalRole === 'parent' ? 'bg-[#00F0FF] text-slate-950 font-black shadow-[0_0_8px_#00F0FF]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-black tracking-tight text-white">Parent</div>
                    <div className="text-[9px] text-cyan-200/80 font-medium">Home & chores</div>
                  </button>

                  {/* Bottom Box 2: Teacher */}
                  <button
                    type="button"
                    onClick={() => setModalRole('teacher')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      modalRole === 'teacher'
                        ? 'bg-[#03132e] border-[#00F0FF] text-white ring-2 ring-[#00F0FF]/60 shadow-[0_0_18px_rgba(0,240,255,0.4)] scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      modalRole === 'teacher' ? 'bg-[#00F0FF] text-slate-950 font-black shadow-[0_0_8px_#00F0FF]' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-black tracking-tight text-white">Teacher</div>
                    <div className="text-[9px] text-cyan-200/80 font-medium">School & assignments</div>
                  </button>
                </div>
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#00A8FF] to-[#0055EE] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_16px_rgba(0,240,255,0.5)] ring-1 ring-cyan-200 transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Sign In as {modalRole === 'parent' ? 'Parent' : 'Teacher'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* Forgot Password Helper Modal */}
      {/* ========================================================= */}
      {forgotPasswordOpen && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
          <div className="w-full max-w-[340px] bg-slate-900 rounded-2xl p-4 shadow-2xl text-white space-y-3 border border-slate-800 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm">Reset Password</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setResetEmailSent(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {resetEmailSent ? (
              <div className="p-4 rounded-2xl bg-cyan-950/70 border border-cyan-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#00F0FF] mx-auto" />
                <h4 className="font-bold text-xs text-white">Reset Link Sent</h4>
                <p className="text-[11px] text-slate-300">
                  We've dispatched a secure verification link to <strong>{resetEmailInput || username}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordOpen(false);
                    setResetEmailSent(false);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Enter your registered username or email to receive an instant password recovery link:
                </p>
                <input
                  type="text"
                  value={resetEmailInput}
                  onChange={(e) => setResetEmailInput(e.target.value)}
                  placeholder="name@email.com or username"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (resetEmailInput.trim()) {
                      setResetEmailSent(true);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#0080FF] hover:brightness-110 text-slate-950 font-bold text-xs transition cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
