import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../store/store';
import { getErrorMessage } from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err, 'Registration failed'));
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
          <h2 className="mt-4 text-2xl font-extrabold text-brand-forest tracking-tight">Create Account</h2>
          <p className="mt-1.5 text-xs text-brand-secondary font-bold">Join ExpenseAI today</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-xl bg-brand-danger/10 p-3.5 text-xs font-semibold text-brand-danger border border-brand-danger/20">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Full Name</label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-secondary">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-2xl border border-brand-border py-3 pl-10 pr-4 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                required
              />
            </div>
          </div>

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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full rounded-2xl border border-brand-border py-3 pl-10 pr-10 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-secondary hover:text-brand-forest transition"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-brand-forest py-3.5 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 disabled:opacity-50 transition active:scale-98"
          >
            <UserPlus className="h-4 w-4 text-brand-gold" />
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-semibold text-brand-secondary">
          Already registered?{' '}
          <Link to="/login" className="text-brand-gold hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
