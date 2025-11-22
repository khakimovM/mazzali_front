import { useState } from "react";

export default function Modal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-500 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-red-600 transition"
      >
        Оставить заявку
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Logo */}
            <img
              src="/img/modalLogo.svg"
              alt="Modal Logo"
              className="mx-auto mb-6 w-20"
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
              Оставьте заявку <br /> и мы с вами свяжемся
            </h2>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                placeholder="Номер телефона"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-500 text-white font-bold py-3 rounded-full shadow-md hover:bg-red-600 transition"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
