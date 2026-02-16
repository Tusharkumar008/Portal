import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { companies } from '@/data';
import { CompanyCard } from '@/components/ui-custom/CompanyCard';

export function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setIsLoading] = useState(false);
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);

  const handleToggleExpand = (companyId: string) => {
    setExpandedCompanyId(prev => prev === companyId ? null : companyId);
  };

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    const query = searchQuery.toLowerCase();
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query) ||
        company.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const stats = [
    { label: 'Companies', value: companies.length.toString() },
    { label: 'Open Roles', value: companies.reduce((acc, c) => acc + c.openRoles, 0).toString() },
    { label: 'Industries', value: '15+' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #0B1A3A 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0B1A3A] mb-4">
              Discover great{' '}
              <span className="text-[#F05A44]">companies</span>
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore teams with open roles, clear processes, and competitive pay. 
              Find your next workplace.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 lg:gap-16 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-[#F05A44]">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search companies by name, industry, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-xl border-gray-200 bg-white text-base focus-visible:ring-[#F05A44] focus-visible:ring-2 shadow-sm"
              />
            </div>
          </motion.form>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'Company' : 'Companies'}
            </h2>
          </motion.div>

          {filteredCompanies.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  layout
                >
                  <CompanyCard 
                    company={company} 
                    isExpanded={expandedCompanyId === company.id}
                    onToggleExpand={handleToggleExpand}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
