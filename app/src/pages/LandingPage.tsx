import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Search, ArrowRight, TrendingUp, Building2, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobCard } from '@/components/job/JobCard';
import { CategoryCard } from '@/components/ui-custom/CategoryCard';
import { CompanyCard } from '@/components/ui-custom/CompanyCard';
import { PricingCard } from '@/components/ui-custom/PricingCard';
import { BlogCard } from '@/components/ui-custom/BlogCard';
import { TestimonialCard } from '@/components/ui-custom/TestimonialCard';
import { StepCard } from '@/components/ui-custom/StepCard';
import { jobs, categories, companies, pricingPlans, blogPosts, testimonials } from '@/data';
import { useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Create a profile',
    description: 'Add your resume, skills, and preferences in minutes. Our AI helps highlight your best qualifications.',
    icon: 'UserPlus',
  },
  {
    number: 2,
    title: 'Apply with one click',
    description: 'No cover letter required. Get seen by hiring managers who are actively looking for talent like you.',
    icon: 'Send',
  },
  {
    number: 3,
    title: 'Get feedback fast',
    description: 'Track your applications and hear back within days, not weeks. Transparent process every step.',
    icon: 'MessageSquare',
  },
];

const stats = [
  { value: '10K+', label: 'Active Jobs', icon: TrendingUp },
  { value: '5K+', label: 'Companies', icon: Building2 },
  { value: '1M+', label: 'Candidates', icon: Users },
];

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isYearly, setIsYearly] = useState(false);

  const featuredJob = jobs[10]; // Product Designer
  const trendingJobs = jobs.slice(0, 6);
  const featuredCompanies = companies.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #0B1A3A 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-32 left-10 w-16 h-16 rounded-full bg-[#F05A44]/10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-16 w-24 h-24 rounded-full bg-[#0B1A3A]/5"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-[#F05A44]/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Hero Card */}
          <motion.div
            className="bg-white rounded-[28px] shadow-xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.96] }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 bg-[#F05A44]/10 text-[#F05A44] text-sm font-medium px-4 py-2 rounded-full mb-6">
                    <Sparkles className="w-4 h-4" />
                    #1 Job Platform for Tech Professionals
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0B1A3A] leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Find your{' '}
                  <span className="text-[#F05A44]">next</span>{' '}
                  move
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Remote, hybrid, and on-site roles at teams that move fast. 
                  Join over 1 million professionals who found their dream job here.
                </motion.p>

                {/* Search bar */}
                <motion.form
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
                  }}
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Job title, keyword, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 rounded-xl border-gray-200 bg-gray-50 text-base focus-visible:ring-[#F05A44] focus-visible:ring-2"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit"
                      className="h-14 px-8 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium"
                    >
                      Search Jobs
                    </Button>
                  </motion.div>
                </motion.form>

                {/* Stats */}
                <motion.div
                  className="flex flex-wrap gap-6 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-[#F05A44]" />
                      <span className="font-bold text-[#0B1A3A]">{stat.value}</span>
                      <span className="text-gray-500 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right content - Featured Job Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="hidden lg:block"
              >
                <JobCard job={featuredJob} variant="featured" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Jobs Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left panel */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#0B1A3A] rounded-3xl p-8 lg:p-10 h-full">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Trending jobs{' '}
                  <span className="text-[#F05A44]">this week</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  See what companies are hiring for right now—updated daily with the latest opportunities.
                </p>
                <Link to="/jobs">
                  <motion.div
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-[#F05A44] transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    View all jobs
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Right panel - Job list */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="space-y-4">
                  {trendingJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <JobCard job={job} variant="compact" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-4">
              Explore by <span className="text-[#F05A44]">category</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Browse opportunities across different fields and find your perfect match.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                index={index}
                onClick={(cat) => window.location.href = `/jobs?category=${cat.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left - Company cards */}
            <motion.div
              className="lg:col-span-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {featuredCompanies.map((company, index) => (
                  <CompanyCard 
                    key={company.id} 
                    company={company} 
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              className="lg:col-span-4 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#0B1A3A] rounded-3xl p-8 lg:p-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Featured{' '}
                  <span className="text-[#F05A44]">companies</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  Teams with open roles, clear process, and competitive pay. Join companies that value their people.
                </p>
                <Link to="/companies">
                  <motion.div
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-[#F05A44] transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    Browse companies
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#0B1A3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              How it <span className="text-[#F05A44]">works</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Three simple steps to your next career opportunity. No complicated processes, just results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left - Content */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#0B1A3A] rounded-3xl p-8 lg:p-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  What candidates{' '}
                  <span className="text-[#F05A44]">say</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  Real stories from real people who found their dream jobs through our platform.
                </p>
                <div className="flex -space-x-3">
                  {['A', 'D', 'M'].map((letter, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F05A44] to-[#ff7a65] flex items-center justify-center text-white font-bold border-2 border-[#0B1A3A]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    >
                      {letter}
                    </motion.div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-medium border-2 border-[#0B1A3A]">
                    +12k
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Testimonial */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TestimonialCard testimonial={testimonials[0]} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-4">
              Simple <span className="text-[#F05A44]">pricing</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Choose the plan that works best for you. No hidden fees, cancel anytime.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? 'bg-[#F05A44] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isYearly ? 'bg-[#F05A44] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1.5 text-xs opacity-80">Save 30%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard 
                key={plan.id} 
                plan={plan} 
                isYearly={isYearly}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Employer CTA Section */}
      <section className="py-20 px-4 bg-[#0B1A3A]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-[28px] p-8 lg:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[#F05A44]/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-16 right-20 w-8 h-8 rounded-full bg-[#0B1A3A]/5"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-4">
                Hiring? Post a job in{' '}
                <span className="text-[#F05A44]">minutes</span>.
              </h2>
              <p className="text-gray-600 mb-8">
                Reach thousands of qualified candidates with a clear, respectful process. 
                Our platform makes hiring simple and effective.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="h-12 px-8 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium"
                  >
                    Post a job
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline"
                    className="h-12 px-8 rounded-xl border-gray-200 text-gray-700 font-medium"
                  >
                    Talk to sales
                  </Button>
                </motion.div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-4">
                  {[
                    'Free job posting',
                    'AI-powered matching',
                    'Applicant tracking',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#F05A44]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-2">
                Insights & <span className="text-[#F05A44]">advice</span>
              </h2>
              <p className="text-gray-600">
                Career tips and industry insights to help you succeed.
              </p>
            </div>
            <Link to="#">
              <motion.div
                className="inline-flex items-center gap-2 text-[#0B1A3A] font-medium hover:text-[#F05A44] transition-colors"
                whileHover={{ x: 4 }}
              >
                Read more on the blog
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-[28px] shadow-lg p-8 lg:p-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-4">
              Stay in the <span className="text-[#F05A44]">loop</span>.
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              Get weekly job picks and career tips—no spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-14 rounded-xl border-gray-200 bg-gray-50 text-base focus-visible:ring-[#F05A44] focus-visible:ring-2"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="h-14 px-8 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium"
                >
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
