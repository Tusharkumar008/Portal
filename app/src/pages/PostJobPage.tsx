import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const steps = [
  { number: 1, title: 'Job Details', description: 'Basic information about the role' },
  { number: 2, title: 'Requirements', description: 'Skills and qualifications needed' },
  { number: 3, title: 'Company Info', description: 'About your organization' },
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const workModes = ['Remote', 'Hybrid', 'On-site'];
const categories = ['Engineering', 'Design', 'Product', 'Marketing', 'Data', 'Operations', 'Sales', 'HR'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];

export function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your job listing has been submitted for review. You'll receive an email confirmation shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              className="bg-[#F05A44] hover:bg-[#e04d38] text-white"
              onClick={() => window.location.href = '/jobs'}
            >
              View All Jobs
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
            >
              Post Another Job
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-[#F05A44]/10 text-[#F05A44] text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            For Employers
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-3">
            Post a <span className="text-[#F05A44]">job</span> in minutes
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Reach thousands of qualified candidates. Our AI-powered matching helps you find the perfect fit faster.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                      currentStep >= step.number
                        ? 'bg-[#F05A44] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    animate={{
                      scale: currentStep === step.number ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.number}
                  </motion.div>
                  <span className={`text-xs mt-2 ${currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 ${currentStep > step.number ? 'bg-[#F05A44]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Frontend Engineer"
                    className="mt-1.5 h-12"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Level *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Job Type *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="workMode">Work Mode *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {workModes.map((mode) => (
                          <SelectItem key={mode} value={mode.toLowerCase()}>{mode}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA or Remote"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salaryMin">Salary Range (Min) *</Label>
                    <div className="relative mt-1.5">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="salaryMin"
                        type="number"
                        placeholder="80000"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="salaryMax">Salary Range (Max) *</Label>
                    <div className="relative mt-1.5">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="salaryMax"
                        type="number"
                        placeholder="120000"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="mt-1.5 min-h-[150px]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Requirements & Benefits</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the key requirements for this role (one per line)..."
                    className="mt-1.5 min-h-[120px]"
                  />
                  <p className="text-sm text-gray-500 mt-1.5">Press Enter to add multiple requirements</p>
                </div>

                <div>
                  <Label htmlFor="skills">Required Skills *</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., React, TypeScript, Node.js (comma separated)"
                    className="mt-1.5 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea
                    id="benefits"
                    placeholder="List the benefits you offer (one per line)..."
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label>Popular Benefits</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Health Insurance', 'Remote Work', 'Flexible Hours', '401(k)', 'Unlimited PTO', 'Home Office Stipend'].map((benefit) => (
                      <Badge
                        key={benefit}
                        variant="secondary"
                        className="cursor-pointer hover:bg-[#F05A44]/10 hover:text-[#F05A44] transition-colors"
                      >
                        + {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <div className="relative mt-1.5">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="companyName"
                      placeholder="Your company name"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    placeholder="https://yourcompany.com"
                    className="mt-1.5 h-12"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501+">501+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 h-12">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyDescription">Company Description *</Label>
                  <Textarea
                    id="companyDescription"
                    placeholder="Tell candidates about your company, mission, and culture..."
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="recruiterEmail">Your Email *</Label>
                  <div className="relative mt-1.5">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="recruiterEmail"
                      type="email"
                      placeholder="you@company.com"
                      className="pl-10 h-12"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1.5">We'll send application notifications to this email</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="h-12 px-6"
            >
              Back
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleNext}
                className="h-12 px-8 bg-[#F05A44] hover:bg-[#e04d38] text-white"
              >
                {currentStep === 3 ? 'Post Job' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-500 mb-4">Trusted by leading companies</p>
          <div className="flex justify-center gap-8 opacity-50">
            {['TechFlow', 'Northwind', 'Pixelwise', 'Cloudcast'].map((company) => (
              <span key={company} className="text-gray-400 font-semibold">{company}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
