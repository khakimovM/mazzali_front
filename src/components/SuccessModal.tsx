// src/components/SuccessModal.tsx
import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500); // 1.5 sekunddan keyin avto yopiladi
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur fon */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Ариза қабул қилинди!
        </h3>
        <p className="text-gray-600">Тез орада сиз билан боғланамиз</p>
      </div>
    </div>
  );
}
