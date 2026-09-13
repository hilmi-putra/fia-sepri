'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-aside">
          <div className="login-brand-mark"><ShieldCheck size={22} strokeWidth={2.2} /></div>
          <p className="login-eyebrow">Fia &amp; Sepri</p>
          <h1>Wedding administration, kept simple.</h1>
          <p className="login-aside-copy">A private space to review guest responses, wishes, and wedding gift activity.</p>
          <div className="login-aside-note"><LockKeyhole size={15} /> Secure access for invited administrators</div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <p className="login-kicker">Welcome back</p>
            <h2>Sign in to continue</h2>
            <p className="login-subtitle">Use your Supabase administrator account.</p>
          </div>

          <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Email</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="form-message error">{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary login-submit"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Signing in...' : 'Sign in securely'}</span>
            {!isLoading && <ArrowRight size={17} />}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
