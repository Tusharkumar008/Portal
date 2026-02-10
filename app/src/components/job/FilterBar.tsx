import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onLocationChange?: (location: string) => void;
  onTypeChange?: (type: string) => void;

  onClearFilters?: () => void;
  filters?: {
    query?: string;
    location?: string;
    type?: string;
    workMode?: string;
  };
}

const locations = ['All Locations', 'Remote', 'San Francisco', 'New York', 'Austin', 'Seattle', 'Los Angeles', 'Boston'];
const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

export function FilterBar({ 
  onSearch, 
  onLocationChange, 
  onTypeChange, 
  onClearFilters,
  filters = {}
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter) && filter !== 'All' && !filter.startsWith('All ')) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    setSearchQuery('');
    onClearFilters?.();
  };

  const hasActiveFilters = activeFilters.length > 0 || searchQuery;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Job title, keyword, or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-xl border-gray-200 bg-white text-base focus-visible:ring-[#F05A44] focus-visible:ring-2"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-14 px-4 rounded-xl border-gray-200 bg-white hover:bg-gray-50"
              >
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="hidden sm:inline">Location</span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {locations.map((location) => (
                <DropdownMenuItem 
                  key={location}
                  onClick={() => {
                    onLocationChange?.(location === 'All Locations' ? '' : location);
                    addFilter(location);
                  }}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-14 px-4 rounded-xl border-gray-200 bg-white hover:bg-gray-50"
              >
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span className="hidden sm:inline">Type</span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {jobTypes.map((type) => (
                <DropdownMenuItem 
                  key={type}
                  onClick={() => {
                    onTypeChange?.(type === 'All Types' ? '' : type);
                    addFilter(type);
                  }}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit"
              className="h-14 px-6 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white font-medium"
            >
              Search
            </Button>
          </motion.div>
        </div>
      </form>

      {hasActiveFilters && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          {searchQuery && (
            <Badge variant="secondary" className="bg-[#F05A44]/10 text-[#F05A44] hover:bg-[#F05A44]/20 px-3 py-1.5">
              Search: {searchQuery}
              <button 
                onClick={() => {
                  setSearchQuery('');
                  onSearch?.('');
                }}
                className="ml-2 hover:text-[#0B1A3A]"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="secondary" 
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5"
            >
              {filter}
              <button 
                onClick={() => removeFilter(filter)}
                className="ml-2 hover:text-[#F05A44]"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <button 
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-[#F05A44] ml-2"
          >
            Clear all
          </button>
        </motion.div>
      )}
    </div>
  );
}
