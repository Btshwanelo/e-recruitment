'use client';

import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import FormInput from './FormInput';
import PasswordRequirement from './PasswordRequirement';

const SignupForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('thandiwe.nkosi@gmail.com');
  const [phone, setPhone] = useState('083 786 0932');
  const [password, setPassword] = useState('********');
  const [confirmPassword, setConfirmPassword] = useState('*********');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <main className="flex justify-center items-center px-8 pt-24 pb-12 min-h-screen bg-white max-sm:px-4 max-sm:py-12">
        <div className="flex flex-col gap-8 items-center w-full max-w-[360px] max-sm:gap-6">
          <header className="flex items-center h-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c553d01dba5312a825f6f3a6160918da98b5d1dd"
              alt="RHS Services Logo"
              className="h-full"
            />
          </header>

          <section className="text-center">
            <h1 className="mb-3 text-3xl font-semibold leading-10 text-gray-900">Create an account</h1>
            <p className="text-base leading-6 text-slate-600">
              Don't worry if you're missing details! Use this profile to save your application and complete it when you're ready
            </p>
          </section>

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <FormInput label="Cellphone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex flex-col gap-3">
              <PasswordRequirement text="Must be at least 8 characters" isValid={true} />
              <PasswordRequirement text="Must contain one special character" isValid={true} />
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 w-full text-base font-semibold text-white bg-sky-600 rounded-lg cursor-pointer border-[none] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
            >
              Get started
            </button>
          </form>

          <p className="text-sm text-center text-slate-600">
            Already have an account?{' '}
            <a
              href="#"
              className="font-semibold text-sky-800 no-underline"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('login');
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignupForm;
