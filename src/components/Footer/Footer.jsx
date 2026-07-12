import logo from "../../assets/logo.png";

function Footer({ darkMode }) {
  return (
    <footer className="border-t border-slate-200 bg-[#f8f9fb] py-16 transition-colors duration-300 dark:border-slate-700 dark:bg-[#030817]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        {/* Cột 1: Logo và Đoạn văn */}
        <div className="flex flex-col gap-6">
          <img src={logo} alt="QuickBlog" className="h-12 w-auto self-start" />
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        {/* Cột 2: Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Quick Links
          </h3>
          <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
            <a href="#" className="transition hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Best Sellers
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Offers & Deals
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Contact Us
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              FAQs
            </a>
          </div>
        </div>

        {/* Cột 3: Need Help? */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Need Help?
          </h3>
          <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
            <a href="#" className="transition hover:text-indigo-600">
              Delivery Information
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Return & Refund Policy
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Payment Methods
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Track your Order
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Contact Us
            </a>
          </div>
        </div>

        {/* Cột 4: Follow Us */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Follow Us
          </h3>
          <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
            <a href="#" className="transition hover:text-indigo-600">
              Instagram
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Twitter
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              Facebook
            </a>
            <a href="#" className="transition hover:text-indigo-600">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
