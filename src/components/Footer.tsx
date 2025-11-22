export default function Footer() {
  return (
    <footer data-aos="fade-up" className="bg-gray-100 py-12">
      <div className="max-w-8xl mx-auto px-[100px] flex flex-col md:flex-row justify-between gap-10">
        {/* Left */}
        <div className="flex flex-col items-center gap-4">
          <img src="/img/footer-logo.svg" alt="Footer Logo" className="h-12" />
          <span className="text-sm text-gray-600">Powered by Petricore</span>
        </div>

        {/* Middle */}
        <div className="flex flex-col md:flex-row gap-12 text-[20px]">
          <div>
            <p className="font-bold mb-2">Контакты</p>
            <p>
              <a href="tel:+998001234567">+998 (00) 123-45-67</a>
            </p>
            <p>
              <a href="mailto:Example@mail.com">Example@mail.com</a>
            </p>
            <p>
              <a href="#!" className="text-gray-500">
                Instagram
              </a>
            </p>
            <p>
              <a href="#!" className="text-gray-500">
                Facebook
              </a>
            </p>
          </div>
          <div>
            <p className="font-bold mb-2">Информация</p>
            <p>
              <a href="#!">Что вы получите?</a>
            </p>
            <p>
              <a href="#!">Как это работает?</a>
            </p>
            <p>
              <a href="#!">Тарифы</a>
            </p>
            <p>
              <a href="#!">Партнеры</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
