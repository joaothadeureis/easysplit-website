import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Evergreen Timer Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 1. Check for existing target date in localStorage
    const storedTarget = localStorage.getItem('easysplit_timer_target');
    let targetDate: number;

    if (storedTarget) {
      targetDate = parseInt(storedTarget, 10);
    } else {
      // 2. Generate random days between 6 and 7
      const minDays = 6;
      const msPerDay = 24 * 60 * 60 * 1000;
      const randomExtra = Math.random() * msPerDay; // 0 to 24h extra
      const duration = (minDays * msPerDay) + randomExtra;
      
      targetDate = Date.now() + duration;
      localStorage.setItem('easysplit_timer_target', targetDate.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        // Timer expired
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-purple-dark via-indigo-900 to-black border-b border-white/5 text-white text-xs py-2 px-4 fixed top-0 left-0 right-0 z-[60] h-10 flex items-center justify-between shadow-lg">
        <div className="hidden sm:flex items-center gap-4 font-mono text-brand-yellow font-bold">
           {!isExpired && (
             <>
               <span className="bg-brand-yellow/20 px-2 py-0.5 rounded text-brand-yellow border border-brand-yellow/30">Apenas R$45,99</span>
               <div className="flex gap-2 text-white items-center">
                  <span>{String(timeLeft.days).padStart(2, '0')} <span className="text-[10px] text-indigo-200 font-sans">DIAS</span></span>
                  <span>{String(timeLeft.hours).padStart(2, '0')} <span className="text-[10px] text-indigo-200 font-sans">HORAS</span></span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')} <span className="text-[10px] text-indigo-200 font-sans">MIN</span></span>
                  <span>{String(timeLeft.seconds).padStart(2, '0')} <span className="text-[10px] text-indigo-200 font-sans">SEG</span></span>
               </div>
             </>
           )}
        </div>
        <div className="flex items-center gap-2 mx-auto sm:mx-0 w-full sm:w-auto justify-between sm:justify-end">
           <a href="https://agenciamaximum.com/" target="_blank" rel="noopener noreferrer" className="opacity-80 font-semibold tracking-wide text-indigo-100 hover:text-brand-yellow transition-colors">Agência Maximum</a>
           <span className="hidden sm:inline text-indigo-500">|</span>
           <Link to="/pricing" className="text-brand-yellow font-bold hover:text-white transition-colors">
             Quero o EasySplit Agora
           </Link>
        </div>
      </div>

      <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-white/5 py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-yellow blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-2 bg-gradient-to-br from-brand-yellow to-yellow-500 rounded-lg">
                  <Zap className="w-5 h-5 text-brand-dark" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">
                Easy<span className="text-brand-yellow">Split</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-brand-yellow bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/pricing">
                <Button size="sm">
                  Começar Agora
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-brand-dark/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-brand-yellow bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/pricing" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};