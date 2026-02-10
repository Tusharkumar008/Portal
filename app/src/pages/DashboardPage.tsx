import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Bookmark, 
  FileText, 
  MapPin, 
  Link as LinkIcon, 
  Mail, 
  Edit3, 
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentUser } from '@/data';
import type { JobApplication } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Pending' },
  reviewing: { color: 'bg-blue-100 text-blue-700', icon: Eye, label: 'Under Review' },
  interview: { color: 'bg-purple-100 text-purple-700', icon: CheckCircle2, label: 'Interview' },
  offered: { color: 'bg-green-100 text-green-700', icon: CheckCircle2, label: 'Offered' },
  rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Not Selected' },
  withdrawn: { color: 'bg-gray-100 text-gray-700', icon: AlertCircle, label: 'Withdrawn' },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const user = currentUser;

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0B1A3A] mb-2">
            Welcome back, <span className="text-[#F05A44]">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your job search
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F05A44]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#F05A44]" />
              </div>
              <span className="text-sm text-gray-500">Applications</span>
            </div>
            <p className="text-3xl font-bold text-[#0B1A3A]">{user.applications.length}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Saved Jobs</span>
            </div>
            <p className="text-3xl font-bold text-[#0B1A3A]">{user.savedJobs.length}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Interviews</span>
            </div>
            <p className="text-3xl font-bold text-[#0B1A3A]">
              {user.applications.filter(a => a.status === 'interview').length}
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border border-gray-100 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-[#F05A44] data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="applications" className="rounded-lg data-[state=active]:bg-[#F05A44] data-[state=active]:text-white">
                Applications
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-[#F05A44] data-[state=active]:text-white">
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-gray-500">{user.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p className="text-gray-500">Profile editing coming soon!</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <p className="text-gray-600 mb-6">{user.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {user.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills.length > 6 && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                        +{user.skills.length - 6} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                    {user.linkedinUrl && (
                      <a
                        href={user.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#F05A44] transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                    {user.portfolioUrl && (
                      <a
                        href={user.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#F05A44] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Portfolio
                      </a>
                    )}
                    <a
                      href={`mailto:${user.email}`}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#F05A44] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </a>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/jobs">
                      <motion.div
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#F05A44]/10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-[#F05A44]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Browse Jobs</p>
                          <p className="text-sm text-gray-500">Find new opportunities</p>
                        </div>
                      </motion.div>
                    </Link>

                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Update Resume</p>
                        <p className="text-sm text-gray-500">Keep your profile current</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Download className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Download CV</p>
                        <p className="text-sm text-gray-500">Export your profile</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-sm text-[#F05A44] hover:underline"
                  >
                    View all
                  </button>
                </div>

                {user.applications.length > 0 ? (
                  <div className="space-y-4">
                    {user.applications.slice(0, 3).map((application, index) => (
                      <ApplicationRow key={application.id} application={application} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No applications yet</p>
                    <Link to="/jobs">
                      <Button className="mt-4 bg-[#F05A44] hover:bg-[#e04d38]">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">All Applications</h3>
                
                {user.applications.length > 0 ? (
                  <div className="space-y-4">
                    {user.applications.map((application, index) => (
                      <ApplicationRow key={application.id} application={application} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h4>
                    <p className="text-gray-500 mb-6">Start applying to jobs to track your progress</p>
                    <Link to="/jobs">
                      <Button className="bg-[#F05A44] hover:bg-[#e04d38]">
                        Find Jobs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              {/* Experience */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                <div className="space-y-6">
                  {user.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {exp.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                          {exp.current 
                            ? 'Present' 
                            : exp.endDate 
                              ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                              : 'Present'
                          }
                          {' · '}{exp.location}
                        </p>
                        <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                <div className="space-y-6">
                  {user.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric' })} - {' '}
                          {edu.current 
                            ? 'Present' 
                            : edu.endDate 
                              ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric' })
                              : 'Present'
                          }
                          {' · '}{edu.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

function ApplicationRow({ application, index }: { application: JobApplication; index: number }) {
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white font-bold flex-shrink-0">
        {application.company.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">{application.jobTitle}</h4>
        <p className="text-gray-500 text-sm">{application.company}</p>
      </div>
      <div className="hidden sm:block text-sm text-gray-400">
        Applied {formatDate(application.appliedAt)}
      </div>
      <Badge className={`${status.color} flex items-center gap-1`}>
        <StatusIcon className="w-3 h-3" />
        {status.label}
      </Badge>
    </motion.div>
  );
}
