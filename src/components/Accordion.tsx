import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="glass rounded-xl overflow-hidden backdrop-blur-md bg-dark-950/80 border border-dark-800/50">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-dark-800/50 transition-colors cursor-pointer"
        type="button"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'visibility 0.2s, opacity 0.2s'
        }}
      >
        <div className="p-4 border-t border-dark-800/50">
          {children}
        </div>
      </div>
    </div>
  );
};