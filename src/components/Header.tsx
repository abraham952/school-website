import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language, UserRole } from '../types';
import { School, Globe, Menu, X, ShieldAlert, GraduationCap, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUserRole: UserRole;
  onPortalOpen: () => void;
  onQuickSearch: (query: string) => void;
}

export default function Header({
  currentLang,
  onLangChange,
  activeTab,
  onTabChange,
  currentUserRole,
  onPortalOpen,
  onQuickSearch
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const t = (key: string) => {
    return TRANSLATIONS[currentLang][key] || key;
  };

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'academics', label: t('academics') },
    { id: 'admissions', label: t('admissions') },
    { id: 'studentLife', label: t('studentLife') },
    { id: 'faculty', label: t('faculty') },
    { id: 'newsEvents', label: t('newsEvents') },
    { id: 'gallery', label: t('gallery') },
    { id: 'contact', label: t('contact') }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onQuickSearch(e.target.value);
  };

  const selectLanguageDisplay = (lang: Language) => {
    switch (lang) {
      case 'en': return 'EN';
      case 'am': return 'አማ';
      case 'om': return 'ORM';
      default: return 'EN';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-xl" id="main-header">
      {/* Top Banner with micro info */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs font-medium text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-slate-300">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Admissions Cohort 2026-27 Open
            </span>
            <span className="hidden text-slate-400 md:inline">|</span>
            <span className="hidden text-slate-300 md:inline">Cambridge ID: ET209-WA</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-amber-400">
              <GraduationCap className="h-3.5 w-3.5" />
              <span className="font-semibold text-[10px] tracking-wider uppercase font-mono">Governed Elite Academy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            className="flex cursor-pointer items-center space-x-2.5" 
            onClick={() => onTabChange('home')}
            id="brand-logo"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md shadow-amber-500/10 transition-transform hover:scale-105">
              <School className="h-6 w-6" />
              <div className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <Sparkles className="h-1.5 w-1.5 text-white" />
              </div>
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 block" style={{ wordSpacing: '-1px' }}>
                WISDOM
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold block font-sans -mt-1.5">
                Academy
              </span>
            </div>
          </div>

          {/* Desktop Search Engine */}
          <div className="hidden max-w-xs flex-1 px-4 lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search')}
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className={`w-full rounded-lg border py-1.5 pl-3 pr-8 text-xs transition-all outline-none duration-150 ${
                  isSearchFocused 
                  ? 'border-amber-500 bg-white ring-2 ring-amber-500/10' 
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              />
              <span className="absolute right-2.5 top-2.5 text-slate-400">
                <kbd className="rounded bg-slate-200 px-1 py-0.5 text-[9px] font-mono select-none">Ctrl K</kbd>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden xl:flex items-center space-x-1" id="nav-item-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`rounded-lg px-3 py-2 text-xs font-medium tracking-wide transition-colors ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5" id="language-switcher">
              {(['en', 'am', 'om'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLangChange(lang)}
                  aria-label={`Switch to ${lang}`}
                  className={`rounded-md px-2 py-1 text-[11px] font-bold uppercase transition-all ${
                    currentLang === lang
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {selectLanguageDisplay(lang)}
                </button>
              ))}
            </div>

            {/* Portal Login Direct Link */}
            <button
              onClick={onPortalOpen}
              className={`inline-flex items-center space-x-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                currentUserRole !== 'public'
                  ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500/20'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
              id="portal-toggle-btn"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>
                {currentUserRole !== 'public' 
                  ? `${currentUserRole.toUpperCase()} Portal`
                  : t('portalLogin')
                }
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 xl:hidden"
              aria-label="Toggle Mobile Controls"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white/95 px-4 py-4 shadow-inner space-y-3" id="mobile-navigation">
          {/* Quick Search */}
          <div className="block lg:hidden">
            <input
              type="text"
              placeholder={t('search')}
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`rounded-lg px-2 py-2 text-left text-xs font-semibold ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-amber-50 p-3 flex items-start space-x-2">
            <ShieldAlert className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-amber-900">Virtual Verification Powered</p>
              <p className="text-[10px] text-amber-700 leading-relaxed mt-0.5">
                The portal supports active digital QR checks, role-based workflows and multi-language dictionary switches instantly.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
