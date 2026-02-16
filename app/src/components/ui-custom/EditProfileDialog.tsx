import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  X,
  Upload,
  Camera,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  Briefcase,
  User as UserIcon,
  AlertCircle,
  Check,
  Trash2
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { User } from '@/types';

const profileSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Name is too long'),
  title: z.string().min(2, 'Job title is required').max(100, 'Title is too long'),
  location: z.string().min(2, 'Location is required').max(100, 'Location is too long'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  email: z.string().email('Please enter a valid email address'),
  portfolioUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  skills: z.array(z.string()).max(20, 'Maximum 20 skills allowed'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileFormData & { avatar?: string }) => void;
}

export function EditProfileDialog({ user, isOpen, onClose, onSave }: EditProfileDialogProps) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar || null);
  const [skillInput, setSkillInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      title: user.title || '',
      location: user.location || '',
      bio: user.bio || '',
      email: user.email || '',
      portfolioUrl: user.portfolioUrl || '',
      linkedinUrl: user.linkedinUrl || '',
      skills: user.skills || [],
    },
  });

  const watchedValues = form.watch();
  const currentSkills = form.watch('skills');

  useEffect(() => {
    const isDirty = JSON.stringify(watchedValues) !== JSON.stringify({
      name: user.name || '',
      title: user.title || '',
      location: user.location || '',
      bio: user.bio || '',
      email: user.email || '',
      portfolioUrl: user.portfolioUrl || '',
      linkedinUrl: user.linkedinUrl || '',
      skills: user.skills || [],
    }) || avatarPreview !== user.avatar;
    
    setHasUnsavedChanges(isDirty);
  }, [watchedValues, avatarPreview, user]);

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: user.name || '',
        title: user.title || '',
        location: user.location || '',
        bio: user.bio || '',
        email: user.email || '',
        portfolioUrl: user.portfolioUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        skills: user.skills || [],
      });
      setAvatarPreview(user.avatar || null);
      setHasUnsavedChanges(false);
      setShowUnsavedWarning(false);
    }
  }, [isOpen, user, form]);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowUnsavedWarning(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowUnsavedWarning(false);
  };

  const onSubmit = (data: ProfileFormData) => {
    onSave({
      ...data,
      avatar: avatarPreview || undefined,
    });
    setHasUnsavedChanges(false);
    onClose();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !currentSkills.includes(trimmedSkill)) {
      if (currentSkills.length >= 20) {
        alert('Maximum 20 skills allowed');
        return;
      }
      form.setValue('skills', [...currentSkills, trimmedSkill]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    form.setValue(
      'skills',
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
    if (e.key === 'Backspace' && !skillInput && currentSkills.length > 0) {
      handleRemoveSkill(currentSkills[currentSkills.length - 1]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-[#0B1A3A]">
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Update your personal information and professional details
              </DialogDescription>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </DialogHeader>

        <AnimatePresence>
          {showUnsavedWarning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6"
            >
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>You have unsaved changes. Are you sure you want to leave?</span>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelClose}
                    >
                      Keep Editing
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleConfirmClose}
                    >
                      Discard
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            {/* Profile Picture Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] flex items-center justify-center text-white text-3xl font-bold overflow-hidden cursor-pointer group"
                    onClick={handleAvatarClick}
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload profile picture"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAvatarClick}
                    className="rounded-lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  {avatarPreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveAvatar}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Square image, at least 400x400px, max 5MB
              </p>
            </div>

            {/* Form Grid - Two columns on desktop */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      Full Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="e.g., Alex Morgan"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Job Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Senior Product Designer"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., San Francisco, CA"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g., alex.morgan@email.com"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Portfolio URL */}
              <FormField
                control={form.control}
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      Portfolio Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="e.g., https://alexmorgan.design"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* LinkedIn URL */}
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-gray-400" />
                      LinkedIn Profile
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="e.g., https://linkedin.com/in/alexmorgan"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Bio - Full Width */}
            <div className="mt-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Bio / About
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself, your experience, and what you're looking for..."
                        className="min-h-[120px] rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between mt-1">
                      <FormMessage className="text-xs" />
                      <span className="text-xs text-gray-400">
                        {field.value?.length || 0}/500
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Skills - Full Width */}
            <div className="mt-6">
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Skills
                    </FormLabel>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <AnimatePresence mode="popLayout">
                        {currentSkills.map((skill) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            layout
                          >
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-700 px-3 py-1.5 text-sm cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors group"
                              onClick={() => handleRemoveSkill(skill)}
                            >
                              {skill}
                              <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill (e.g., React, Design, Python) and press Enter"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKeyDown}
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-[#F05A44] focus-visible:ring-offset-0"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddSkill}
                        className="h-12 px-4 rounded-xl"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Press Enter or click the checkmark to add. Click on a skill to remove it. Maximum 20 skills.
                    </p>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-12 px-6 rounded-xl bg-[#F05A44] hover:bg-[#e04d38] text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
