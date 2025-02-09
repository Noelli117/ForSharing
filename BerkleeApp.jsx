import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Users, 
  Search, 
  Mic, 
  Clock, 
  TrendingUp, 
  Filter,
  Play,
  Pause,
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus,
  Tag,
  Upload,
  X
} from 'lucide-react';

const BerkleeApp = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [playingTrack, setPlayingTrack] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    programs: [],
    genres: [],
    projectTypes: [],
    collaborationNeeds: [],
    duration: 'all',
    dateRange: 'all'
  });
  
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Alex Morgan",
    email: "amorgan@berklee.edu",
    program: "Music Production & Engineering",
    semester: "6th Semester",
    instruments: ["Guitar", "Piano", "Logic Pro"],
    genres: ["Rock", "Pop", "Electronic"],
    bio: "Music producer and mixing engineer. Always looking to collaborate on interesting projects.",
    skills: ["Music Production", "Mixing", "Sound Design"],
    links: {
      instagram: "alex.morgan.music",
      soundcloud: "alexmorganmusic",
      spotify: "alexmorgan",
      website: "alexmorgan.music"
    },
    availability: "Open to Collaborate",
    preferredRoles: ["Producer", "Mixing Engineer"],
    portfolio: []
  });

  const featuredProjects = [
    {
      id: 1,
      title: "Neo-Soul Fusion",
      artist: "Maria Chen",
      collaborators: ["James Smith (Guitar)", "Alex Lee (Keys)"],
      program: "Contemporary Writing & Production",
      type: "Hit Factory",
      duration: "5:23",
      genre: "Neo-Soul",
      tags: ["soul", "jazz", "seeking-vocalist"],
      artwork: "/api/placeholder/400/400",
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      title: "Beat Battle Winner - Week 12",
      artist: "Marcus Rodriguez",
      program: "Electronic Production",
      type: "Beat Battle",
      duration: "2:15",
      genre: "Hip Hop",
      tags: ["beats", "trap", "looking-for-rapper"],
      artwork: "/api/placeholder/400/400",
      likes: 189,
      comments: 32
    }
  ];

  const filterOptions = {
  programs: [
    'Contemporary Writing & Production',
    'Electronic Production & Design',
    'Film Scoring',
    'Jazz Composition',
    'Music Production & Engineering',
    'Performance',
    'Professional Music',
    'Songwriting'
  ],
  collaborationNeeds: [
    'Seeking Vocalist',
    'Need Producer',
    'Looking for Band Members',
    'Need Mixing Engineer',
    'Seeking Co-writer',
    'Looking for Session Musicians',
    'Need Master Engineer'
  ],
  projectTypes: [
    'Original Song',
    'Hit Factory',
    'Beat Battle',
    'Remix',
    'Cover',
    'Film Score',
    'Sound Design'
  ],
  duration: [
    { id: 'all', label: 'Any Length' },
    { id: 'short', label: 'Under 3 minutes' },
    { id: 'medium', label: '3-5 minutes' },
    { id: 'long', label: 'Over 5 minutes' }
  ],
  dateRange: [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ]
};

const genres = [
    { id: 'all', name: 'All Genres', icon: Music },
    { id: 'jazz', name: 'Jazz', icon: Music },
    { id: 'pop', name: 'Pop', icon: Music },
    { id: 'hiphop', name: 'Hip Hop', icon: Music },
    { id: 'electronic', name: 'Electronic', icon: Music }
  ];

  const projectTypes = [
    { id: 'hit-factory', name: 'Hit Factory', icon: Clock, description: 'Songs made in 5 hours' },
    { id: 'beat-battle', name: 'Beat Battle', icon: Music, description: 'Beats made in 45 minutes' },
    { id: 'collaborations', name: 'Open Collabs', icon: Users, description: 'Looking for collaborators' }
  ];

  const TrackCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative group">
        <img 
          src={project.artwork} 
          alt={project.title} 
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => setPlayingTrack(playingTrack === project.id ? null : project.id)}
            className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full text-white"
          >
            {playingTrack === project.id ? <Pause /> : <Play />}
          </button>
        </div>
        {project.type && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
            {project.type}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p className="text-gray-600">{project.artist}</p>
            <p className="text-sm text-gray-500">{project.program}</p>
          </div>
          <span className="text-sm text-gray-500">{project.duration}</span>
        </div>

        {project.collaborators && (
          <div className="mb-2">
            <p className="text-sm text-gray-600">Collaborators:</p>
            <div className="flex flex-wrap gap-1">
              {project.collaborators.map((collaborator, index) => (
                <span key={index} className="text-sm text-red-600">{collaborator}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-red-600">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-red-600">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-red-600">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button className="text-gray-600 hover:text-red-600">
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-red-600 text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Berklee Connect</h1>
            <div className="flex items-center space-x-6">
              <button className="hover:text-gray-200">
                <Upload className="w-6 h-6" />
              </button>
              <button className="hover:text-gray-200">
                <Users className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setShowProfileEdit(true)}
                className="relative group"
              >
                <img 
                  src="/api/placeholder/40/40" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full ring-2 ring-white hover:ring-gray-200"
                />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search and Filters */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, artists, or tags..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <Filter className="w-6 h-6" />
              {Object.values(activeFilters).some(filter => 
                Array.isArray(filter) ? filter.length > 0 : filter !== 'all'
              ) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              )}
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {genres.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedGenre(id)}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap
                  ${selectedGenre === id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Project Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {projectTypes.map(({ id, name, icon: Icon, description }) => (
            <button
              key={id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <TrackCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-96 bg-white h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => {
                    setActiveFilters({
                      programs: [],
                      genres: [],
                      projectTypes: [],
                      collaborationNeeds: [],
                      duration: 'all',
                      dateRange: 'all'
                    });
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Reset All
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Programs Filter */}
              <div>
                <h3 className="font-medium mb-3">Program</h3>
                <div className="space-y-2">
                  {filterOptions.programs.map((program) => (
                    <label key={program} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.programs.includes(program)}
                        onChange={(e) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            programs: e.target.checked
                              ? [...prev.programs, program]
                              : prev.programs.filter(p => p !== program)
                          }));
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm">{program}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Types Filter */}
              <div>
                <h3 className="font-medium mb-3">Project Type</h3>
                <div className="space-y-2">
                  {filterOptions.projectTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.projectTypes.includes(type)}
                        onChange={(e) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            projectTypes: e.target.checked
                              ? [...prev.projectTypes, type]
                              : prev.projectTypes.filter(t => t !== type)
                          }));
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Collaboration Needs Filter */}
              <div>
                <h3 className="font-medium mb-3">Looking For</h3>
                <div className="space-y-2">
                  {filterOptions.collaborationNeeds.map((need) => (
                    <label key={need} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.collaborationNeeds.includes(need)}
                        onChange={(e) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            collaborationNeeds: e.target.checked
                              ? [...prev.collaborationNeeds, need]
                              : prev.collaborationNeeds.filter(n => n !== need)
                          }));
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <h3 className="font-medium mb-3">Duration</h3>
                <div className="space-y-2">
                  {filterOptions.duration.map(({ id, label }) => (
                    <label key={id} className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value={id}
                        checked={activeFilters.duration === id}
                        onChange={(e) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            duration: e.target.value
                          }));
                        }}
                        className="rounded-full border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Date Range</h3>
                <div className="space-y-2">
                  {filterOptions.dateRange.map(({ id, label }) => (
                    <label key={id} className="flex items-center">
                      <input
                        type="radio"
                        name="dateRange"
                        value={id}
                        checked={activeFilters.dateRange === id}
                        onChange={(e) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            dateRange: e.target.value
                          }));
                        }}
                        className="rounded-full border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto p-4"
          onClick={(e) => {
            // Close modal when clicking the backdrop
            if (e.target === e.currentTarget) {
              setShowProfileEdit(false);
            }
          }}
        >
          <div className="bg-white rounded-lg w-full max-w-2xl my-8">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button 
                onClick={() => setShowProfileEdit(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="/api/placeholder/96/96" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium">{userProfile.name}</h3>
                  <p className="text-sm text-gray-500">{userProfile.email}</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({...prev, name: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program
                  </label>
                  <select
                    value={userProfile.program}
                    onChange={(e) => setUserProfile(prev => ({...prev, program: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {filterOptions.programs.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={userProfile.semester}
                    onChange={(e) => setUserProfile(prev => ({...prev, semester: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(sem => (
                      <option key={sem} value={`${sem} Semester`}>{sem} Semester</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile(prev => ({...prev, bio: e.target.value}))}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Tell others about yourself..."
                  />
                </div>
              </div>

              {/* Skills & Interests */}
              <div className="space-y-4">
                <h4 className="font-medium">Skills & Interests</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instruments & Software
                  </label>
                  <input
                    type="text"
                    value={userProfile.instruments.join(", ")}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev, 
                      instruments: e.target.value.split(",").map(item => item.trim())
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Guitar, Piano, Logic Pro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Genres
                  </label>
                  <input
                    type="text"
                    value={userProfile.genres.join(", ")}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev, 
                      genres: e.target.value.split(",").map(item => item.trim())
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Rock, Pop, Electronic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={userProfile.skills.join(", ")}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev, 
                      skills: e.target.value.split(",").map(item => item.trim())
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Music Production, Mixing, Sound Design"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-medium">Social Links</h4>
                
                {Object.entries(userProfile.links).map(([platform, username]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {platform}
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev, 
                        links: {...prev.links, [platform]: e.target.value}
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder={`Your ${platform} username`}
                    />
                  </div>
                ))}
              </div>

              {/* Collaboration Preferences */}
              <div className="space-y-4">
                <h4 className="font-medium">Collaboration Preferences</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability Status
                  </label>
                  <select
                    value={userProfile.availability}
                    onChange={(e) => setUserProfile(prev => ({...prev, availability: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Open to Collaborate">Open to Collaborate</option>
                    <option value="Busy">Busy</option>
                    <option value="By Request">By Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Roles
                  </label>
                  <input
                    type="text"
                    value={userProfile.preferredRoles.join(", ")}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev, 
                      preferredRoles: e.target.value.split(",").map(item => item.trim())
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Producer, Mixing Engineer"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowProfileEdit(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would typically save the profile changes
                  setShowProfileEdit(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BerkleeApp;