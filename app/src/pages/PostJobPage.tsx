import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface FormErrors {
  [key: string]: string;
}

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    location: '',
    employment_type: '',
    experience_required: '',
    salary_min: '',
    salary_max: '',
    salary_disclosed: true,
    skills_required: [] as string[],
    job_description: '',
    responsibilities: '',
    qualifications: '',
    number_of_openings: '1',
    application_deadline: '',
  });

  // Validation functions
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (formData.title.length < 3) {
      newErrors.title = 'Job title must be at least 3 characters';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }

    if (!formData.location) {
      newErrors.location = 'Job location is required';
    }

    if (!formData.employment_type) {
      newErrors.employment_type = 'Employment type is required';
    }

    if (formData.experience_required === '') {
      newErrors.experience_required = 'Experience required is required';
    } else if (parseInt(formData.experience_required) < 0 || parseInt(formData.experience_required) > 70) {
      newErrors.experience_required = 'Experience must be between 0 and 70 years';
    }

    if (formData.salary_disclosed) {
      if (formData.salary_min === '' && formData.salary_max === '') {
        newErrors.salary = 'Please enter min or max salary, or select "Not Disclosed"';
      }
      if (formData.salary_min && parseInt(formData.salary_min) < 0) {
        newErrors.salary_min = 'Salary cannot be negative';
      }
      if (formData.salary_max && parseInt(formData.salary_max) < 0) {
        newErrors.salary_max = 'Salary cannot be negative';
      }
      if (formData.salary_min && formData.salary_max && parseInt(formData.salary_min) > parseInt(formData.salary_max)) {
        newErrors.salary = 'Minimum salary cannot be greater than maximum salary';
      }
    }

    if (skills.length === 0) {
      newErrors.skills_required = 'At least one skill is required';
    }

    if (!formData.job_description.trim() || formData.job_description.length < 50) {
      newErrors.job_description = 'Job description must be at least 50 characters';
    }

    if (!formData.responsibilities.trim() || formData.responsibilities.length < 50) {
      newErrors.responsibilities = 'Responsibilities must be at least 50 characters';
    }

    if (!formData.qualifications.trim() || formData.qualifications.length < 50) {
      newErrors.qualifications = 'Qualifications must be at least 50 characters';
    }

    if (parseInt(formData.number_of_openings) < 1) {
      newErrors.number_of_openings = 'Number of openings must be at least 1';
    }

    if (!formData.application_deadline) {
      newErrors.application_deadline = 'Application deadline is required';
    } else {
      const deadline = new Date(formData.application_deadline);
      if (deadline <= new Date()) {
        newErrors.application_deadline = 'Application deadline must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addSkill = () => {
    const skill = skillInput.trim().toLowerCase();
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      setFormData(prev => ({ ...prev, skills_required: newSkills }));
      setSkillInput('');
      if (errors.skills_required) {
        setErrors(prev => ({ ...prev, skills_required: '' }));
      }
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill);
    setSkills(newSkills);
    setFormData(prev => ({ ...prev, skills_required: newSkills }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        experience_required: parseInt(formData.experience_required),
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        number_of_openings: parseInt(formData.number_of_openings),
        skills_required: skills,
        application_deadline: new Date(formData.application_deadline).toISOString(),
      };

      await jobService.createJob(submitData, token!);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/recruit/jobs');
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create job';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-lg text-gray-600 mt-2">Fill in the job details below. Your job will be reviewed by our admin team before going live.</p>
        </div>

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 ml-2">
              Job submitted successfully! Awaiting admin approval. Redirecting to dashboard...
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 ml-2">{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Provide comprehensive information about the job position</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="e.g., Senior React Developer"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="company_name"
                  placeholder="e.g., Acme Corporation"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className={errors.company_name ? 'border-red-500' : ''}
                />
                {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
              </div>

              {/* Location and Employment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Location <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                    <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.employment_type} onValueChange={(value) => handleSelectChange('employment_type', value)}>
                    <SelectTrigger className={errors.employment_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employment_type && <p className="text-red-500 text-sm mt-1">{errors.employment_type}</p>}
                </div>
              </div>

              {/* Experience Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience Required <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="experience_required"
                  placeholder="e.g., 5"
                  min="0"
                  max="70"
                  value={formData.experience_required}
                  onChange={handleInputChange}
                  className={errors.experience_required ? 'border-red-500' : ''}
                />
                {errors.experience_required && <p className="text-red-500 text-sm mt-1">{errors.experience_required}</p>}
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <div className="flex items-center gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.salary_disclosed}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, salary_disclosed: e.target.checked }));
                        if (e.target.checked) {
                          if (errors.salary_min) setErrors(prev => ({ ...prev, salary_min: '' }));
                          if (errors.salary_max) setErrors(prev => ({ ...prev, salary_max: '' }));
                        }
                      }}
                    />
                    <span className="text-sm text-gray-600">Disclose salary</span>
                  </label>
                </div>

                {formData.salary_disclosed && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Minimum Salary</label>
                      <Input
                        type="number"
                        name="salary_min"
                        placeholder="Min salary"
                        min="0"
                        value={formData.salary_min}
                        onChange={handleInputChange}
                        className={errors.salary_min ? 'border-red-500' : ''}
                      />
                      {errors.salary_min && <p className="text-red-500 text-sm mt-1">{errors.salary_min}</p>}
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Maximum Salary</label>
                      <Input
                        type="number"
                        name="salary_max"
                        placeholder="Max salary"
                        min="0"
                        value={formData.salary_max}
                        onChange={handleInputChange}
                        className={errors.salary_max ? 'border-red-500' : ''}
                      />
                      {errors.salary_max && <p className="text-red-500 text-sm mt-1">{errors.salary_max}</p>}
                    </div>
                  </div>
                )}
                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
              </div>

              {/* Skills Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="e.g., React, JavaScript..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill} className="bg-blue-100 text-blue-800">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                {errors.skills_required && <p className="text-red-500 text-sm mt-1">{errors.skills_required}</p>}
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="job_description"
                  placeholder="Describe the job position in detail..."
                  rows={5}
                  value={formData.job_description}
                  onChange={handleInputChange}
                  className={errors.job_description ? 'border-red-500' : ''}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.job_description.length} / 5000 characters
                </div>
                {errors.job_description && <p className="text-red-500 text-sm mt-1">{errors.job_description}</p>}
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="responsibilities"
                  placeholder="List main responsibilities..."
                  rows={5}
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  className={errors.responsibilities ? 'border-red-500' : ''}
                />
                {errors.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>}
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Qualifications <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="qualifications"
                  placeholder="Describe required qualifications..."
                  rows={5}
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  className={errors.qualifications ? 'border-red-500' : ''}
                />
                {errors.qualifications && <p className="text-red-500 text-sm mt-1">{errors.qualifications}</p>}
              </div>

              {/* Number of Openings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Openings <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="number_of_openings"
                  placeholder="Number of positions available"
                  min="1"
                  value={formData.number_of_openings}
                  onChange={handleInputChange}
                  className={errors.number_of_openings ? 'border-red-500' : ''}
                />
                {errors.number_of_openings && <p className="text-red-500 text-sm mt-1">{errors.number_of_openings}</p>}
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <Input
                  type="datetime-local"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleInputChange}
                  className={errors.application_deadline ? 'border-red-500' : ''}
                />
                {errors.application_deadline && <p className="text-red-500 text-sm mt-1">{errors.application_deadline}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Post Job'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/recruit/jobs')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
