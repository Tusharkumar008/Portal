import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid3X3, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JobList } from '@/components/job/JobList';
import { FilterBar } from '@/components/job/FilterBar';
import { jobs } from '@/data';
// Job type is used in filteredJobs memo
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FilterState {
  query: string;
  location: string;
  type: string;
  workMode: string;
  salaryRange: string;
  categories: string[];
}

const workModes = ['Remote', 'Hybrid', 'On-site'];
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
const categories = ['Engineering', 'Design', 'Product', 'Marketing', 'Data', 'Operations'];
const salaryRanges = [
  { label: '$0 - $50k', min: 0, max: 50000 },
  { label: '$50k - $100k', min: 50000, max: 100000 },
  { label: '$100k - $150k', min: 100000, max: 150000 },
  { label: '$150k+', min: 150000, max: Infinity },
];

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    query: searchParams.get('search') || '',
    location: '',
    type: '',
    workMode: searchParams.get('mode') || '',
    salaryRange: '',
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery = 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Location
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Job type
      if (filters.type && job.type !== filters.type) {
        return false;
      }

      // Work mode
      if (filters.workMode && job.workMode !== filters.workMode) {
        return false;
      }

      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(job.category)) {
        return false;
      }

      // Salary range
      if (filters.salaryRange) {
        const range = salaryRanges.find(r => r.label === filters.salaryRange);
        if (range) {
          const jobAvgSalary = (job.salary.min + job.salary.max) / 2;
          if (jobAvgSalary < range.min || jobAvgSalary > range.max) {
            return false;
          }
        }
      }

      return true;
    });
  }, [filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
    if (query) {
      searchParams.set('search', query);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({ ...prev, location }));
  };

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleWorkModeChange = (mode: string) => {
    setFilters(prev => ({ ...prev, workMode: mode }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      location: '',
      type: '',
      workMode: '',
      salaryRange: '',
      categories: [],
    });
    setSearchParams(new URLSearchParams());
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const hasActiveFilters = 
    filters.query || 
    filters.location || 
    filters.type || 
    filters.workMode || 
    filters.salaryRange || 
    filters.categories.length > 0;

  const activeFilterCount = [
    filters.query,
    filters.location,
    filters.type,
    filters.workMode,
    filters.salaryRange,
    ...filters.categories,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-2">
            Find your <span className="text-[#F05A44]">perfect</span> job
          </h1>
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} waiting for you
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FilterBar
            onSearch={handleSearch}
            onLocationChange={handleLocationChange}
            onTypeChange={handleTypeChange}
            onClearFilters={handleClearFilters}
            filters={filters}
          />
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters - Desktop */}
          <motion.aside
            className="hidden lg:block w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-[#F05A44] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Work Mode */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Work Mode</h4>
                <div className="space-y-2">
                  {workModes.map((mode) => (
                    <div key={mode} className="flex items-center">
                      <Checkbox
                        id={`mode-${mode}`}
                        checked={filters.workMode === mode}
                        onCheckedChange={() => handleWorkModeChange(filters.workMode === mode ? '' : mode)}
                      />
                      <Label
                        htmlFor={`mode-${mode}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {mode}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.type === type}
                        onCheckedChange={() => handleTypeChange(filters.type === type ? '' : type)}
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label
                        htmlFor={`cat-${category}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Salary Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Salary Range</h4>
                <div className="space-y-2">
                  {salaryRanges.map((range) => (
                    <div key={range.label} className="flex items-center">
                      <Checkbox
                        id={`salary-${range.label}`}
                        checked={filters.salaryRange === range.label}
                        onCheckedChange={() => setFilters(prev => ({ 
                          ...prev, 
                          salaryRange: prev.salaryRange === range.label ? '' : range.label 
                        }))}
                      />
                      <Label
                        htmlFor={`salary-${range.label}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {range.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Mobile filter button */}
          <div className="lg:hidden flex items-center justify-between gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 bg-[#F05A44] text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Work Mode */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Work Mode</h4>
                    <div className="space-y-2">
                      {workModes.map((mode) => (
                        <div key={mode} className="flex items-center">
                          <Checkbox
                            id={`mobile-mode-${mode}`}
                            checked={filters.workMode === mode}
                            onCheckedChange={() => handleWorkModeChange(filters.workMode === mode ? '' : mode)}
                          />
                          <Label
                            htmlFor={`mobile-mode-${mode}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Job Type</h4>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center">
                          <Checkbox
                            id={`mobile-type-${type}`}
                            checked={filters.type === type}
                            onCheckedChange={() => handleTypeChange(filters.type === type ? '' : type)}
                          />
                          <Label
                            htmlFor={`mobile-type-${type}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`mobile-cat-${category}`}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <Label
                            htmlFor={`mobile-cat-${category}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleClearFilters}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear all filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* View mode toggle */}
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Job list */}
          <motion.main
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Desktop view mode toggle */}
            <div className="hidden lg:flex items-center justify-end mb-4">
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <JobList
              jobs={filteredJobs}
              isLoading={isLoading}
              onSaveJob={handleSaveJob}
              savedJobs={savedJobs}
            />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
