import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Building2, Linkedin, Briefcase, Clock, AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
  const { user, isRecruiter } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    jobRole: '',
    yoe: '',
    linkedin: '',
    company: ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect this to your Python backend to update the users table!
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    // We will wire this to a confirmation modal later
    toast.error('Account deletion initiated. (Coming soon)');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0B1A3A] mb-8">Edit Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label>Email (Cannot be changed)</Label>
              <Input value={user?.email || ''} disabled className="bg-gray-50" />
            </div>

            {/* RECRUITER ONLY FIELDS */}
            {isRecruiter && (
              <>
                <div className="space-y-2">
                  <Label>Job Role / Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input className="pl-9" placeholder="e.g. Senior Technical Recruiter" value={formData.jobRole} onChange={(e) => setFormData({...formData, jobRole: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input className="pl-9" placeholder="e.g. Google" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Years of Experience (YOE)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input className="pl-9" type="number" placeholder="e.g. 5" value={formData.yoe} onChange={(e) => setFormData({...formData, yoe: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>LinkedIn Profile URL</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input className="pl-9" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Button type="submit" className="bg-[#F05A44] hover:bg-[#e04d38]" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>

      {/* DANGER ZONE - Req #4 */}
      <div className="bg-red-50 rounded-2xl border border-red-100 p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-full text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-1">Danger Zone</h3>
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete My Account
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}