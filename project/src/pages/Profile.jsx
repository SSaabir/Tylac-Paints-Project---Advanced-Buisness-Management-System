import React, { useState } from 'react';
import { Button, TextInput, Textarea } from 'flowbite-react';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about technology, design, and outdoor adventures. Always learning and exploring new things!',
    skills: ['React', 'Tailwind CSS', 'Node.js', 'UI/UX Design'],
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formFormData.socialLinks,
        [name]: value,
      },
    });
  };

  const handleSave = () => {
    setUser(formData); // Update the user data
    setIsEditing(false); // Exit edit mode
    console.log('Updated User Data:', formData); // Log the updated data (replace with API call)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            {/* Profile Image */}
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
            />
            {/* Profile Details */}
            <div className="text-center md:text-left">
              {isEditing ? (
                <>
                  <TextInput
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mb-4"
                    placeholder="Name"
                  />
                  <TextInput
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mb-4"
                    placeholder="Email"
                  />
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="mb-4"
                    placeholder="Bio"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-600 mt-2">{user.email}</p>
                  <p className="text-gray-700 mt-4">{user.bio}</p>
                </>
              )}
              {/* Edit/Save Button */}
              <div className="mt-6">
                {isEditing ? (
                  <Button gradientDuoTone="cyanToBlue" pill onClick={handleSave}>
                    Save Changes
                  </Button>
                ) : (
                  <Button gradientDuoTone="cyanToBlue" pill onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
          {isEditing ? (
            <TextInput
              name="skills"
              value={formData.skills.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(',').map((skill) => skill.trim()),
                })
              }
              placeholder="Enter skills separated by commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Social Links Section */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Links</h2>
          {isEditing ? (
            <>
              <TextInput
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialLinkChange}
                className="mb-4"
                placeholder="Twitter URL"
              />
              <TextInput
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialLinkChange}
                className="mb-4"
                placeholder="LinkedIn URL"
              />
              <TextInput
                name="github"
                value={formData.socialLinks.github}
                onChange={handleSocialLinkChange}
                className="mb-4"
                placeholder="GitHub URL"
              />
            </>
          ) : (
            <div className="flex space-x-4">
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Twitter
              </a>
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                LinkedIn
              </a>
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}