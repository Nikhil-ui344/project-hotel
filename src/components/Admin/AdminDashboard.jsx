import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Home, LogOut, Trash2, Plus, Upload, X, Check, LayoutDashboard, Settings, Menu } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-primary-brown text-white shadow-xl flex flex-col fixed h-full z-20"
        style={{ backgroundColor: '#5A3B2E' }}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen ? (
            <h1 className="text-xl font-serif font-bold tracking-wide">Komal Garden</h1>
          ) : (
            <span className="text-xl font-serif font-bold">KG</span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<Image size={20} />} 
            label="Gallery" 
            isActive={activeTab === 'gallery'} 
            onClick={() => setActiveTab('gallery')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Rooms" 
            isActive={activeTab === 'rooms'} 
            onClick={() => setActiveTab('rooms')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            isOpen={isSidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className={`flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 w-full p-3 rounded-lg transition-all ${!isSidebarOpen && 'justify-center'}`}>
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        <header className="bg-white shadow-sm p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-primary-brown font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'rooms' && <RoomManager />}
          {activeTab === 'settings' && <div className="text-center text-gray-500 mt-20">Settings coming soon...</div>}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
      isActive 
        ? 'bg-white text-primary-brown font-medium shadow-md' 
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    } ${!isOpen && 'justify-center'}`}
  >
    {icon}
    {isOpen && <span>{label}</span>}
  </button>
);

const DashboardOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-medium">Total Photos</h3>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Image size={24} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800">12</p>
      <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
        <span className="bg-green-100 px-1.5 py-0.5 rounded text-xs">+2</span> new this week
      </p>
    </div>
    
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-medium">Total Rooms</h3>
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
          <Home size={24} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800">8</p>
      <p className="text-sm text-gray-400 mt-2">All rooms active</p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-medium">System Status</h3>
        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
          <Check size={24} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800">Online</p>
      <p className="text-sm text-gray-400 mt-2">Database connected</p>
    </div>
  </div>
);

const GalleryManager = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [category, setCategory] = useState('Exterior');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
        fetchPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('category', category);
    formData.append('description', description);

    try {
      await fetch('/api/gallery', {
        method: 'POST',
        body: formData
      });
      
      // Reset form
      setShowForm(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setDescription('');
      setCategory('Exterior');
      fetchPhotos();
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Photo Library</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and organize your hotel's gallery images</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-brown text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-opacity-90 transition-all flex items-center gap-2 text-sm font-medium"
          style={{ backgroundColor: '#5A3B2E' }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Close Upload' : 'Add Photo'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10 bg-white p-8 rounded-xl shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-medium mb-6 text-gray-800 border-b pb-4">Upload New Photo</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Drag and Drop Area */}
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  isDragging ? 'border-golden-yellow bg-yellow-50' : 'border-gray-300 hover:border-primary-brown hover:bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                
                {previewUrl ? (
                  <div className="relative inline-block">
                    <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg shadow-md" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={32} className="text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-700">Click or drag image here to upload</p>
                    <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option>Exterior</option>
                      <option>Rooms</option>
                      <option>Dining</option>
                      <option>Lobby</option>
                      <option>Pool</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent outline-none"
                    placeholder="e.g. Luxury Suite View"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!selectedFile}
                  className={`px-6 py-2.5 text-white rounded-lg font-medium shadow-md flex items-center gap-2 transition-all ${
                    selectedFile 
                      ? 'bg-primary-brown hover:bg-opacity-90' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: selectedFile ? '#5A3B2E' : undefined }}
                >
                  <Check size={18} /> Save Photo
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
          </div>
        ) : photos.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
            <Image size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-medium text-gray-500">No photos yet</p>
            <p className="text-gray-400 mt-2">Upload your first photo to get started</p>
          </div>
        ) : (
          photos.map(photo => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={photo._id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-gray-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.category} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={() => handleDelete(photo._id)}
                    className="bg-white text-red-500 p-3 rounded-full shadow-lg hover:bg-red-50 transform hover:scale-110 transition-all"
                    title="Delete Photo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {photo.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 truncate">
                  {photo.description || <span className="italic text-gray-400">No description</span>}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Added {new Date(photo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [view, setView] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      fetchRooms();
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('view', view);
    formData.append('description', description);
    formData.append('isAvailable', true);
    formData.append('amenities', JSON.stringify(['Wifi', 'Coffee', 'Tv', 'Wind'])); // Default amenities for now

    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        body: formData
      });
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend server is not reachable or returned an error. Please ensure the backend is running.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add room');
      }

      // Reset form
      setShowForm(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle('');
      setPrice('');
      setSize('');
      setView('');
      setDescription('');
      fetchRooms();
      alert('Room added successfully!');
    } catch (error) {
      console.error('Error adding room:', error);
      alert(`Error adding room: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Room Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage room availability and details</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-brown text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-opacity-90 transition-all flex items-center gap-2 text-sm font-medium"
          style={{ backgroundColor: '#5A3B2E' }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Close Form' : 'Add New Room'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10 bg-white p-8 rounded-xl shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-medium mb-6 text-gray-800 border-b pb-4">Add New Room</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Image Upload */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-md" />
                ) : (
                  <div className="py-4">
                    <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Click to upload room image</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Room Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown outline-none"
                    placeholder="e.g. Deluxe King"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (per night)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown outline-none"
                    placeholder="e.g. $350/night"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown outline-none"
                    placeholder="e.g. 45m²"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">View</label>
                  <input
                    type="text"
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown outline-none"
                    placeholder="e.g. City View"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brown outline-none h-32"
                  placeholder="Room description..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!selectedFile}
                  className={`px-6 py-2.5 text-white rounded-lg font-medium shadow-md flex items-center gap-2 transition-all ${
                    selectedFile 
                      ? 'bg-primary-brown hover:bg-opacity-90' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: selectedFile ? '#5A3B2E' : undefined }}
                >
                  <Check size={18} /> Save Room
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-gray-500 bg-gray-50">
            <p>No rooms found.</p>
          </div>
        ) : (
          rooms.map(room => (
            <motion.div 
              layout
              key={room._id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-6 items-center"
            >
              <img src={room.imageUrl} alt={room.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
              
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{room.title}</h3>
                    <p className="text-primary-brown font-medium">{room.price}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {room.isAvailable ? 'Available' : 'Booked'}
                  </div>
                </div>
                
                <div className="flex gap-4 text-sm text-gray-500 mb-3">
                  <span>{room.size}</span>
                  <span>•</span>
                  <span>{room.view}</span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
              </div>

              <div className="flex gap-3 w-full md:w-auto justify-end">
                <button 
                  onClick={() => handleStatusUpdate(room._id, room.isAvailable)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    room.isAvailable 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {room.isAvailable ? 'Mark Booked' : 'Mark Available'}
                </button>
                <button 
                  onClick={() => handleDelete(room._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Room"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
