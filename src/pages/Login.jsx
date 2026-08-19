import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, LogIn } from 'lucide-react';
import { useApp } from '../store/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-md rounded-3xl border border-brand-border bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest text-brand-gold shadow-md shadow-brand-forest/10">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-brand-forest tracking-tight">Welcome Back</h2>
          <p className="mt-1.5 text-xs text-brand-secondary font-bold">Access your ExpenseAI dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-xl bg-brand-danger/10 p-3.5 text-xs font-semibold text-brand-danger border border-brand-danger/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Email Address</label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-secondary">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-brand-border py-3 pl-10 pr-4 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Password</label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-secondary">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-brand-border py-3 pl-10 pr-4 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-brand-forest py-3.5 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 disabled:opacity-50 transition active:scale-98"
          >
            <LogIn className="h-4 w-4 text-brand-gold" />
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-semibold text-brand-secondary">
          New to ExpenseAI?{' '}
          <Link to="/register" className="text-brand-gold hover:underline font-bold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
