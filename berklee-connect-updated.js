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
  X,
  User,
  Bell,
  Home
} from 'lucide-react';

const BerkleeConnectApp = () => {
  // State management
  const [activeTab, setActiveTab] = useState('discover');
  const [playingTrack, setPlayingTrack] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  
  const [activeFilters, setActiveFilters] = useState({
    programs: [],
    genres: [],
    projectTypes: [],
    collaborationNeeds: [],
    duration: 'all',
    dateRange: 'all'
  });
  
  const [filteredProjects, setFilteredProjects] = useState([]);
  
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

  // Sample data for the app
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
    },
    {
      id: 3,
      title: "Midnight Dreams",
      artist: "Elena Rivera",
      collaborators: ["Jordan Smith", "Mia Chen"],
      program: "Songwriting",
      type: "Original Song",
      duration: "4:15",
      genre: "R&B",
      tags: ["mellow", "atmospheric", "late night"],
      artwork: "/api/placeholder/400/400",
      likes: 167,
      comments: 28
    },
    {
      id: 4,
      title: "Jazz Fusion Experiment",
      artist: "Marcus Johnson",
      collaborators: ["Aisha Williams", "Leo Park"],
      program: "Jazz Composition",
      type: "Club Project",
      duration: "6:42",
      genre: "Jazz",
      tags: ["fusion", "instrumental", "experimental"],
      artwork: "/api/placeholder/400/400",
      likes: 121,
      comments: 19
    }
  ];

  // Filter options
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
    { id: 'electronic', name: 'Electronic', icon: Music },
    { id: 'rnb', name: 'R&B', icon: Music }
  ];

  const projectTypes = [
    { id: 'hit-factory', name: 'Hit Factory', icon: Clock, description: 'Songs made in 5 hours' },
    { id: 'beat-battle', name: 'Beat Battle', icon: Music, description: 'Beats made in 45 minutes' },
    { id: 'collaborations', name: 'Open Collabs', icon: Users, description: 'Looking for collaborators' }
  ];

  // Track Card Component
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

  // Weekly Playlists Section
  const WeeklyPlaylists = () => (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Weekly Playlists</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {['Trending Demos', 'Berklee Hit Factory', 'Beat Battle Winners', 'New Collaborations'].map((playlist, index) => (
          <div key={index} className="flex-shrink-0 w-48">
            <div className="h-48 bg-gray-200 rounded-lg mb-2">
              <img src={`/api/placeholder/192/192`} alt={playlist} className="w-full h-full object-cover rounded-lg" />
            </div>
            <p className="font-medium">{playlist}</p>
            <p className="text-sm text-gray-500">Updated weekly</p>
          </div>
        ))}
      </div>
    </section>
  );

  // Upload Tab Content
  const UploadContent = () => (
    <div className="max-w-2xl mx-auto py-6">
      <h2 className="text-xl font-semibold mb-6">Upload Your Music</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center mb-6">
          <Music size={48} className="text-red-500 mb-4" />
          <p className="text-center text-gray-600 mb-4">Drag and drop your audio file here</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Select File
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Track Title
            </label>
            <input
              type="text"
              placeholder="Give your track a name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Select Genre</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type
              </label>
              <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Select Type</option>
                {filterOptions.projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collaborators (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., John Smith (Guitar), Jane Doe (Vocals)"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {['soul', 'jazz', 'electronic', 'beats', 'vocals', 'instrumental'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600"
                >
                  {tag}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add custom tags (separate with commas)"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Looking For
            </label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Not looking for collaborators</option>
              {filterOptions.collaborationNeeds.map(need => (
                <option key={need} value={need}>{need}</option>
              ))}
            </select>
          </div>
          
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium mt-4">
            Upload Track
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Tab Content
  const ProfileContent = () => (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-400 h-32"></div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-12 left-6 bg-white p-1 rounded-full">
            <img 
              src="/api/placeholder/96/96" 
              alt="Profile" 
              className="w-24 h-24 rounded-full"
            />
          </div>
          
          <div className="flex justify-end pt-2 mb-8">
            <button 
              onClick={() => setShowProfileEdit(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <span>Edit Profile</span>
            </button>
          </div>
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <p className="text-gray-600">{userProfile.program} • {userProfile.semester}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Bio</h3>
              <p className="text-gray-700">{userProfile.bio}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Instruments & Software</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.instruments.map((instrument, index) => (
                    <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Preferred Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.genres.map((genre, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {genre}
                    </span>
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
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Collaboration Status</h3>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-700">{userProfile.availability}</span>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preferred Roles:</p>
                <div className="flex flex-wrap gap-1">
                  {userProfile.preferredRoles.map((role, index) => (
                    <span key={index} className="text-sm text-red-600">{role}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-lg mb-4">My Uploads</h3>
              
              {userProfile.portfolio.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Music size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-4">You haven't uploaded any tracks yet</p>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Upload Your First Track
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Portfolio items would go here */}
                </div>
              )}
            </div>
          </div>
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
              <button 
                onClick={() => setActiveTab('upload')}
                className={`hover:text-gray-200 ${activeTab === 'upload' ? 'text-white' : 'text-gray-200'}`}
              >
                <Upload className="w-6 h-6" />
              </button>
              <button className="hover:text-gray-200">
                <Bell className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className="relative group"
              >
                <img 
                  src="/api/placeholder/40/40" 
                  alt="Profile" 
                  className={`w-8 h-8 rounded-full ring-2 ${
                    activeTab === 'profile' ? 'ring-white' : 'ring-gray-200'
                  } hover:ring-white`}
                />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search and Filters */}
      {activeTab === 'discover' && (
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
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4">
        {activeTab === 'discover' && (
          <>
            {/* Project Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
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

            {/* Weekly Playlists */}
            <WeeklyPlaylists />

            {/* Featured Projects */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map(project => (
                  <TrackCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'upload' && <UploadContent />}
        
        {activeTab === 'profile' && <ProfileContent />}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'discover' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Discover</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'upload' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <Upload className="w-6 h-6" />
            <span className="text-xs mt-1">Upload</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'profile' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

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
                            collaborationNeeds: e.target.checked
                              ? [...prev.collaborationNeeds, need]
                              : prev.collaborationNeeds.filter(n => n !== need)
                          }));
                        }} => {
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
                        onChange={(e)