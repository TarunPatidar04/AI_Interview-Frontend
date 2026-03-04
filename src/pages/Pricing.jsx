import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheck, FiStar, FiZap, FiShield } from "react-icons/fi";
import Footer from "../components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description:
        "Perfect for exploring the platform and trying one interview.",
      features: [
        "1 AI Mock Interview",
        "Basic Role Selection",
        "Simple Feedback Score",
        "7-day History Retention",
      ],
      cta: "Get Started Free",
      highlight: false,
      icon: <FiStar className="text-gray-400" />,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Ideal for active job seekers needing comprehensive prep.",
      features: [
        "Unlimited AI Mock Interviews",
        "Resume-Based Question Generation",
        "Granular Analytics & Feedback",
        "Video Analysis & Expression",
        "Lifetime History Retention",
        "Priority Support",
      ],
      cta: "Upgrade to Pro",
      highlight: true,
      icon: <FiZap className="text-emerald-500" />,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and bootcamps tracking multiple candidates.",
      features: [
        "Everything in Pro",
        "Custom Interview Modes",
        "Candidate Performance Dashboard",
        "Dedicated Account Manager",
        "API Access",
      ],
      cta: "Contact Sales",
      highlight: false,
      icon: <FiShield className="text-indigo-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-900 overflow-hidden font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-100/50 rounded-full blur-[150px]" />
      </div>

      {/* Adding pt-32 so it clears the global Navbar */}
      <main className="relative z-10 grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-medium text-sm mb-6">
              <FiStar />
              <span>Simple, transparent pricing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
              Invest in your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                career
              </span>
              .
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Choose the plan that fits your prep needs. Unlimited practice
              means unlimited confidence.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] ${
                plan.highlight
                  ? "bg-gray-900 text-white shadow-2xl scale-100 md:scale-105 z-10 border border-gray-800"
                  : "bg-white text-gray-900 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                    plan.highlight
                      ? "bg-gray-800"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </div>

              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-medium ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}
                >
                  /{plan.period}
                </span>
              </div>

              <p
                className={`mb-8 ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}
              >
                {plan.description}
              </p>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheck
                        className={`mt-1 shrink-0 text-lg ${
                          plan.highlight
                            ? "text-emerald-400"
                            : "text-emerald-500"
                        }`}
                      />
                      <span
                        className={
                          plan.highlight ? "text-gray-200" : "text-gray-700"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={plan.name === "Free" ? "/auth" : "#"}
                className={`w-full text-center py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 block ${
                  plan.highlight
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ or Extra Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions? We're here to help.
          </h2>
          <p className="text-gray-600">
            Reach out to our support team any time at
            <a
              href="mailto:support@ai-interview.com"
              className="ml-1 text-emerald-600 hover:underline font-medium"
            >
              support@ai-interview.com
            </a>
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
