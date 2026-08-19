import React from 'react';
import { useApp } from '../store/store';
import { LogOut, User, Mail, Shield, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useApp();

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h3 className="text-md font-bold text-brand-forest tracking-tight">Account Profile</h3>
        <p className="text-xs text-brand-secondary mt-0.5 font-semibold">Manage your account information and preferences.</p>
      </div>

      {/* User profile card */}
      <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-sm flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-forest text-white font-bold text-3xl ring-4 ring-brand-gold/15">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h4 className="mt-4 text-md font-bold text-brand-forest">{user.name}</h4>
        <p className="text-xs text-brand-secondary font-medium mt-0.5">{user.email}</p>
      </div>

      {/* Settings list */}
      <div className="rounded-3xl border border-brand-border bg-white divide-y divide-brand-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 hover:bg-brand-cream/20 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cream/50 text-brand-forest">
              <User className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-forest">Account Details</p>
              <p className="text-[10px] text-brand-muted font-semibold mt-0.5">Manage username and notifications</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-brand-muted" />
        </div>

        <div className="flex items-center justify-between p-4 hover:bg-brand-cream/20 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cream/50 text-brand-forest">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-forest">Email Preferences</p>
              <p className="text-[10px] text-brand-muted font-semibold mt-0.5">Manage newsletters and weekly reports</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-brand-muted" />
        </div>

        <div className="flex items-center justify-between p-4 hover:bg-brand-cream/20 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cream/50 text-brand-forest">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-forest">Security & Privacy</p>
              <p className="text-[10px] text-brand-muted font-semibold mt-0.5">Change password and auth key settings</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-brand-muted" />
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-danger/10 hover:bg-brand-danger/15 border border-brand-danger/20 py-3.5 text-xs font-bold text-brand-danger transition active:scale-98"
      >
        <LogOut className="h-4.5 w-4.5" />
        Logout Session
      </button>
    </div>
  );
};

export default Profile;
