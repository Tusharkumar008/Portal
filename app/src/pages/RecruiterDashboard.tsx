import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Spinner } from '../components/ui/spinner';
import { AlertCircle, Clock, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  employment_type: string;
  experience_required: number;
  status: string;
  created_at: string;
}

const RecruiterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { token, isRecruiter } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token || !isRecruiter) {
        navigate('/login');
        return;
      }

      try {
        const data = await jobService.getMyJobs(token);
        setJobs(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch jobs';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, isRecruiter, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your job postings</p>
          </div>
          <Button
            onClick={() => navigate('/post-job')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 ml-2">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {jobs.filter(j => j.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Pending Approval</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {jobs.filter(j => j.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Active Jobs</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {jobs.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Posted</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Job Postings</CardTitle>
            <CardDescription>All jobs you've posted and their approval status</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No jobs posted yet</p>
                <Button
                  onClick={() => navigate('/post-job')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Post Your First Job
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div
                    key={job.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(job.status)}
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </Badge>
                      </div>

                      <div className="text-gray-600 mt-2">
                        <p className="text-sm">{job.company_name}</p>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.employment_type}</span>
                        <span>📚 {job.experience_required} years exp</span>
                      </div>

                      <div className="text-xs text-gray-500 mt-3">
                        Posted: {new Date(job.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        {jobs.filter(j => j.status === 'pending').length > 0 && (
          <Alert className="mt-8 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700 ml-2">
              Your pending jobs are being reviewed by our admin team. You'll receive an email notification once they're approved.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
