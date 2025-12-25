
import React, { useState } from 'react';
import { CREDIT_DATA } from '../constants';
import { CreditItem } from '../types';

const DefaultAvatar = ({ darkMode }: { darkMode: boolean }) => (
  <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-gray-100 text-gray-400'}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  </div>
);

const CreditCard: React.FC<{ 
  item: CreditItem; 
  isHovered: boolean; 
  onHover: (id: string | null) => void; 
  darkMode: boolean;
  anyHovered: boolean;
}> = ({ item, isHovered, onHover, darkMode, anyHovered }) => {
  return (
    <div
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative p-6 rounded-2xl border transition-all duration-500 cursor-default
        ${isHovered ? 'z-50 scale-110 shadow-2xl' : 'z-0'}
        ${anyHovered && !isHovered ? 'blur-md opacity-20 grayscale scale-95' : 'opacity-100'}
        ${darkMode ? 'navy-card border-blue-800' : 'bg-white border-gray-100'}
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="mb-2">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
              item.category === 'Supervisor' ? 'bg-purple-100 text-purple-700' :
              item.category === 'Creator' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {item.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1">
            {item.link ? (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 hover:underline transition-colors decoration-2 underline-offset-4"
                title={`Visit ${item.name}'s profile`}
              >
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </h3>
          <p className="text-sm opacity-60">{item.role}</p>
        </div>
        
        {/* Profile Image / Placeholder */}
        <div className={`w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 ${darkMode ? 'border-blue-700' : 'border-gray-200'}`}>
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <DefaultAvatar darkMode={darkMode} />
          )}
        </div>
      </div>
      
      <div className={`space-y-2 transition-all duration-300 origin-top ${isHovered ? 'opacity-100 max-h-60 mt-4' : 'opacity-40 max-h-0 overflow-hidden mt-0'}`}>
        <div className={`h-px w-full mb-4 ${darkMode ? 'bg-blue-800' : 'bg-gray-100'}`}></div>
        {item.details.map((detail, idx) => (
          <div key={idx} className="flex gap-2 items-start text-sm">
            <span className="text-blue-500 font-bold">•</span>
            <p className="leading-relaxed">{detail}</p>
          </div>
        ))}
        {item.link && (
          <div className="mt-4 pt-2">
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View Profile
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const Info: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sections = [
    { title: 'Supervisors', category: 'Supervisor' },
    { title: 'Creators', category: 'Creator' },
    { title: 'Organizations', category: 'Organization' },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative min-h-[80vh] pb-20">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Project Credits</h1>
        <p className="text-xl opacity-60 max-w-2xl mx-auto leading-relaxed">
          This project was made real thanks to the dedicated efforts of our supervisors, 
          creators, and partner organizations. Explore their roles below.
        </p>
      </header>

      <div className="space-y-24">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm uppercase tracking-[0.3em] font-black mb-10 flex items-center gap-6 opacity-40">
              <span className="h-[2px] bg-blue-500 flex-grow"></span>
              {section.title}
              <span className="h-[2px] bg-blue-500 flex-grow"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CREDIT_DATA.filter(item => item.category === section.category).map((item) => (
                <CreditCard
                  key={item.id}
                  item={item}
                  darkMode={darkMode}
                  isHovered={hoveredId === item.id}
                  anyHovered={hoveredId !== null}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Info;
