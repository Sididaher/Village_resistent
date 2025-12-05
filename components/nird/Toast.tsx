"use client";

import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "info" | "warning" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const toastStyles = {
    success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
    info: "bg-gradient-to-r from-blue-500 to-purple-600 text-white", 
    warning: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
    error: "bg-gradient-to-r from-red-500 to-pink-600 text-white"
  };

  const iconMap = {
    success: "🎉",
    info: "🎮", 
    warning: "⚠️",
    error: "❌"
  };

  return (
    <div className="fixed top-20 right-4 z-[9999] animate-slide-in-right">
      <div className={`
        ${toastStyles[type]}
        px-6 py-4 rounded-xl shadow-2xl border border-white/20
        backdrop-blur-sm transform transition-all duration-300
        hover:scale-105 hover:shadow-3xl
        max-w-sm w-full
      `}>
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-bounce">
            {iconMap[type]}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm leading-tight">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl font-bold 
                     hover:bg-white/10 rounded-full w-6 h-6 flex items-center justify-center
                     transition-colors duration-200"
          >
            ×
          </button>
        </div>
        
        {/* Barre de progression */}
        <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full animate-shrink"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
