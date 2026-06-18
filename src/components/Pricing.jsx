import React from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      desc: "For content creators and hobbyists.",
      features: [
        "10,000 words per month",
        "20+ AI writing templates",
        "1 user seat",
        "Standard support",
        "Access to web editor"
      ],
      cta: "Get Started",
      highlighted: false,
      badge: ""
    },
    {
      name: "Professional",
      price: "$49",
      desc: "For marketers, startups, and growing teams.",
      features: [
        "Unlimited words per month",
        "All 50+ AI templates",
        "5 user seats included",
        "Priority email support",
        "Advanced SEO optimizer",
        "Chrome extension access"
      ],
      cta: "Try Professional Free",
      highlighted: true,
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "$149",
      desc: "For agencies and large scale businesses.",
      features: [
        "Unlimited words & seats",
        "Custom template creation",
        "Dedicated account manager",
        "API access & webhooks",
        "SSO & advanced security",
        "Custom contract & billing"
      ],
      cta: "Contact Sales",
      highlighted: false,
      badge: ""
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-extrabold uppercase text-teal-brand tracking-wider mb-3 block">
            Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Plans built for every size
          </h2>
          <p className="text-gray-600">
            Start for free and scale as your content requirements grow. Cancel or change plans at any time.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-teal-brand text-white shadow-xl shadow-teal-brand/25 md:-translate-y-4 scale-100 md:scale-105 z-10'
                  : 'bg-white text-gray-800 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <span className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-gray-900 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                {/* Plan Info */}
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-950'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${plan.highlighted ? 'text-teal-50' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>

                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span className={`text-5xl font-black tracking-tight ${plan.highlighted ? 'text-white' : 'text-gray-950'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm font-semibold ml-2 ${plan.highlighted ? 'text-teal-100' : 'text-gray-500'}`}>
                    / month
                  </span>
                </div>

                <hr className={`my-6 border-t ${plan.highlighted ? 'border-white/10' : 'border-gray-100'}`} />

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm">
                      <div className={`p-0.5 rounded-full shrink-0 ${
                        plan.highlighted ? 'bg-white/10 text-white' : 'bg-teal-50/80 text-teal-brand'
                      }`}>
                        <Check size={14} className="stroke-[2.5]" />
                      </div>
                      <span className={plan.highlighted ? 'text-teal-50' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                plan.highlighted
                  ? 'bg-white text-teal-brand hover:bg-[#F4F5F6] shadow-md shadow-black/10'
                  : 'bg-teal-brand text-white hover:bg-teal-light'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
