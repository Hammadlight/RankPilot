import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "SEO Director",
      company: "GrowthFlow Co.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      rating: 5,
      text: "RankPilot Tools has completely changed our content workflow. We generate optimized outlines and blog drafts in a third of the time. The SEO keyword clusters have increased our monthly organic search traffic by 42% in just two months."
    },
    {
      name: "Marcus Vance",
      role: "Founder & CEO",
      company: "ScaleDigital",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      text: "The AI Editor is fantastic. Unlike other platforms that output generic paragraphs, RankPilot outputs copy that feels professional, structured, and customized to our audience. It handles newsletters, cold emails, and landing page copy effortlessly."
    },
    {
      name: "Elena Rostova",
      role: "E-Commerce Manager",
      company: "VogueStyle",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      rating: 5,
      text: "Creating product descriptions for hundreds of listings used to take weeks. With RankPilot's Product Description Generator, we write compelling, SEO-friendly descriptions in seconds. The templates catalog is extremely comprehensive."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gray-50/30">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-extrabold uppercase text-teal-brand tracking-wider mb-3 block">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Trusted by active creators
          </h2>
          <p className="text-gray-600">
            Hear from marketing teams, entrepreneurs, and professional copywriters who scale their content with RankPilot.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, rIdx) => (
                    <Star key={rIdx} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-gray-600 italic leading-relaxed mb-8 text-sm sm:text-base">
                  "{review.text}"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-950 text-sm sm:text-base">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {review.role} • <span className="text-teal-brand font-semibold">{review.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
