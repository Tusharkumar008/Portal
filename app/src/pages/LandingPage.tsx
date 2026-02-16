import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const featuredJob = jobs[10]; // Product Designer
  const trendingJobs = jobs.slice(0, 6);
  const featuredCompanies = companies;

  const handleViewCompany = () => {
    navigate('/companies');
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #0B1A3A 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        </div>

        {/* Floating decorative elements - hidden on mobile, using CSS animations for better performance */}
        <div className="hidden sm:block absolute top-32 left-10 w-16 h-16 rounded-full bg-[#F05A44]/10 animate-float will-change-transform" />
        <div className="hidden sm:block absolute bottom-40 right-16 w-24 h-24 rounded-full bg-[#0B1A3A]/5 animate-float will-change-transform" style={{ animationDelay: '2s' }} />
        <div className="hidden sm:block absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-[#F05A44]/20 animate-pulse-soft will-change-transform" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Hero Card */}
          <motion.div
            className="bg-white rounded-[28px] shadow-xl p-6 sm:p-8 lg:p-12"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.96] }}
          >
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
              {/* Left content */}
              <div>
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <span className="inline-flex items-center gap-2 bg-[#F05A44]/10 text-[#F05A44] text-sm font-medium px-4 py-2 rounded-full mb-6">
                    <Sparkles className="w-4 h-4" />
                    #1 Job Platform for Tech Professionals
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0B1A3A] leading-tight mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Find your{' '}
                  <span className="text-[#F05A44]">next</span>{' '}
                  move
                </h1>

                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Remote, hybrid, and on-site roles at teams that move fast. 
                  Join over 1 million professionals who found their dream job here.
                </p>

                {/* Search bar */}
                <form
                  className="flex flex-col sm:flex-row gap-3 animate-fade-in"
                  style={{ animationDelay: '0.5s' }}
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
                  <Button 
                    type="submit"
                    className="h-14 px-8 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Search Jobs
                  </Button>
                </form>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-[#F05A44]" />
                      <span className="font-bold text-[#0B1A3A]">{stat.value}</span>
                      <span className="text-gray-500 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right content - Featured Job Card */}
              <div className="hidden lg:block animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                <JobCard job={featuredJob} variant="featured" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Jobs Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left panel */}
            <div className="lg:col-span-4 animate-fade-in">
              <div className="bg-[#0B1A3A] rounded-3xl p-6 sm:p-8 lg:p-10 h-full">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Trending jobs{' '}
                  <span className="text-[#F05A44]">this week</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  See what companies are hiring for right now—updated daily with the latest opportunities.
                </p>
                <Link to="/jobs" className="inline-flex items-center gap-2 text-white font-medium hover:text-[#F05A44] transition-colors group">
                  View all jobs
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right panel - Job list */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="space-y-4">
                  {trendingJobs.map((job) => (
                    <JobCard key={job.id} job={job} variant="compact" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-3 sm:mb-4">
              Explore by <span className="text-[#F05A44]">category</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Browse opportunities across different fields and find your perfect match.
            </p>
          </div>

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
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left - Company cards */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredCompanies.map((company) => (
                  <CompanyCard 
                    key={company.id} 
                    company={company} 
                    onView={handleViewCompany}
                  />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/companies" className="inline-flex items-center gap-2 text-[#0B1A3A] font-medium hover:text-[#F05A44] transition-colors cursor-pointer group">
                  See more companies
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="bg-[#0B1A3A] rounded-3xl p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Featured{' '}
                  <span className="text-[#F05A44]">companies</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  Teams with open roles, clear process, and competitive pay. Join companies that value their people.
                </p>
                <Link to="/companies" className="inline-flex items-center gap-2 text-white font-medium hover:text-[#F05A44] transition-colors group">
                  Browse companies
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-[#0B1A3A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              How it <span className="text-[#F05A44]">works</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Three simple steps to your next career opportunity. No complicated processes, just results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left - Content */}
            <div className="lg:col-span-4">
              <div className="bg-[#0B1A3A] rounded-3xl p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  What candidates{' '}
                  <span className="text-[#F05A44]">say</span>
                </h2>
                <p className="text-gray-400 mb-8">
                  Real stories from real people who found their dream jobs through our platform.
                </p>
                <div className="flex -space-x-3">
                  {['A', 'D', 'M'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F05A44] to-[#ff7a65] flex items-center justify-center text-white font-bold border-2 border-[#0B1A3A]"
                    >
                      {letter}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-medium border-2 border-[#0B1A3A]">
                    +12k
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Testimonial */}
            <div className="lg:col-span-8">
              <TestimonialCard testimonial={testimonials[0]} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-3 sm:mb-4">
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
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard 
                key={plan.id} 
                plan={plan} 
                isYearly={isYearly}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Employer CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-[#0B1A3A]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden sm:block absolute top-6 right-6 w-16 h-16 rounded-full bg-[#F05A44]/10 animate-spin-slow will-change-transform" />
            <div className="hidden sm:block absolute top-16 right-20 w-8 h-8 rounded-full bg-[#0B1A3A]/5 animate-pulse-soft will-change-transform" />

            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-3 sm:mb-4">
                Hiring? Post a job in{' '}
                <span className="text-[#F05A44]">minutes</span>.
              </h2>
              <p className="text-gray-600 mb-8">
                Reach thousands of qualified candidates with a clear, respectful process. 
                Our platform makes hiring simple and effective.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="h-12 px-8 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Post a job
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 px-8 rounded-xl border-gray-200 text-gray-700 font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Talk to sales
                </Button>
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
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-2">
                Insights & <span className="text-[#F05A44]">advice</span>
              </h2>
              <p className="text-gray-600">
                Career tips and industry insights to help you succeed.
              </p>
            </div>
            <Link to="#" className="inline-flex items-center gap-2 text-[#0B1A3A] font-medium hover:text-[#F05A44] transition-colors group">
              Read more on the blog
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[28px] shadow-lg p-6 sm:p-8 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-3 sm:mb-4">
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
              <Button 
                className="h-14 px-8 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>

  );
}
