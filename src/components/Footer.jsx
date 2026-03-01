import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#f3f3f3] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-200 pb-12">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 outline-none mb-4"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                <IoSparkles className="text-sm" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-700 tracking-tight">
                AI Interview
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Master your technical interviews with hyper-realistic AI mock
              sessions, real-time feedback, and granular analytics.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/interview"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Performance Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Interview Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  System Design Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/questions"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Top 100 Questions
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Company specific prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2">
            © {new Date().getFullYear()} AI Interview. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Designed with <span className="text-emerald-600">❤</span> for
            engineers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
