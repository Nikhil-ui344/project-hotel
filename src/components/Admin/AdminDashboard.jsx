import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Image,
  Home,
  Settings,
  Menu,
  LogOut,
  Plus,
  Upload,
  X,
  Check,
  Edit2,
  Trash2,
  ShieldCheck,
  BarChart3,
  Wifi,
  Coffee,
  Tv,
  Wind,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'rooms', label: 'Rooms', icon: Home },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Debug: Log to confirm component is loading
  useEffect(() => {
    console.log('AdminDashboard component loaded - Updated Version');
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-[#2a1a12] transition-all duration-300 flex flex-col shadow-2xl`}>
        {/* Header Section */}
        <div className="p-6 border-b border-white/10 bg-[#1f140f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                <ShieldCheck size={24} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="text-white">
                <p className="text-xs opacity-70 font-medium uppercase tracking-wider">Komal Garden</p>
                <p className="font-bold text-base mt-0.5">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 lg:hidden transition-colors"
            >
              <Menu size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="mb-2">
            <p className="text-xs font-semibold text-amber-200/40 uppercase tracking-wider px-4 mb-3">Menu</p>
          </div>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                activeTab === id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/40 transform scale-[1.02]'
                  : 'text-amber-200/80 hover:text-white hover:bg-white/10 hover:translate-x-1'
              }`}
            >
              <div className={`${activeTab === id ? 'bg-white/20' : 'bg-white/5'} p-2 rounded-lg`}>
                <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 2} />
              </div>
              <span className="text-sm font-semibold">{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-white/10 bg-[#1f140f]">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-amber-200/80 hover:text-white hover:bg-red-600/20 transition-all duration-200 font-medium group">
            <div className="bg-white/5 group-hover:bg-red-600/30 p-2 rounded-lg transition-colors">
              <LogOut size={20} strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 overflow-y-auto">
        <main className="p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'rooms' && <RoomManager />}
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
              <Settings size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-[#2a1a12] mb-2">Settings</h3>
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ==================== GALLERY MANAGER ====================
const GalleryManager = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('Bedrooms');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch photos from API
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('category', category);
      formData.append('description', description);

      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const newPhoto = await response.json();
        setPhotos([newPhoto, ...photos]);
        // Reset form
        setSelectedFile(null);
        setPreviewUrl(null);
        setDescription('');
        setCategory('Bedrooms');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        alert('Photo uploaded successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to upload photo');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${photoId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPhotos(photos.filter(photo => photo._id !== photoId));
        alert('Photo deleted successfully!');
      } else {
        alert('Failed to delete photo');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete photo');
    }
  };

  const handleEdit = (photo) => {
    // Note: Backend doesn't support PUT for gallery, so we'll just pre-fill the form
    setCategory(photo.category);
    setDescription(photo.description || '');
    setPreviewUrl(photo.imageUrl.startsWith('http') ? photo.imageUrl : `/api${photo.imageUrl}`);
    alert('To update, delete and re-upload with new details. Backend update endpoint not available.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a1a12]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#2a1a12] mb-3 tracking-tight">Gallery Management</h1>
        <p className="text-lg text-gray-600 font-light">Upload and organize photos that represent your hotel's beauty.</p>
      </div>

      {/* Upload Card - Always Visible */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
        {previewUrl && (
          <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 max-w-md mx-auto">
            <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
          </div>
        )}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 lg:p-16 text-center transition-all cursor-pointer group ${
            isDragging 
              ? 'border-amber-500 bg-amber-50/50 shadow-inner' 
              : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50/30'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-col items-center">
            <div className={`mb-5 transition-transform group-hover:scale-110 ${
              isDragging ? 'scale-110' : ''
            }`}>
              <Upload size={56} className={`mx-auto ${
                isDragging ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-500'
              } transition-colors`} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Drag and drop to upload</h2>
            <p className="text-sm text-gray-500">Supported formats: JPG, PNG, and GIF. Max size 10MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400"
            >
              <option>Bedrooms</option>
              <option>Exterior</option>
              <option>Dining</option>
              <option>Pool</option>
              <option>Lobby</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Deluxe suite with ocean view"
              className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className={`px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center gap-2 ${
              uploading || !selectedFile
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm'
                : 'bg-gradient-to-r from-[#2a1a12] to-[#3a2a20] text-white hover:from-[#3a2a20] hover:to-[#4a3a30] hover:shadow-lg active:scale-95'
            }`}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={18} strokeWidth={2.5} />
                <span>Upload Photo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Photos Grid Section */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2a1a12]">Your Gallery</h2>
          <span className="text-sm text-gray-500 font-medium">{photos.length} {photos.length === 1 ? 'photo' : 'photos'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Image size={36} className="text-amber-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No photos yet.</h3>
              <p className="text-sm text-gray-500">Start building your gallery by uploading your first image.</p>
            </div>
          ) : (
            photos.map((photo) => (
              <motion.div
                key={photo._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden group hover:shadow-xl hover:border-amber-300 transition-all flex flex-col max-w-full"
              >
                {/* Image Container - Compact Fixed Height */}
                <div className="relative w-full h-40 overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={photo.imageUrl.startsWith('http') ? photo.imageUrl : `/api${photo.imageUrl}`}
                    alt={photo.description || photo.category}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/95 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 size={12} className="text-red-600" strokeWidth={2.5} />
                  </button>
                </div>
                {/* Card Content - Compact */}
                <div className="p-3 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded mb-1.5">
                      {photo.category}
                    </span>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">{photo.description || 'No description'}</p>
                  </div>
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(photo.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleEdit(photo)}
                        className="flex-1 py-1.5 px-2 text-xs font-semibold text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-md flex items-center justify-center gap-1 transition-all border border-gray-200 hover:border-amber-300"
                      >
                        <Edit2 size={11} strokeWidth={2.5} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(photo._id)}
                        className="flex-1 py-1.5 px-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-md transition-all border border-red-200 hover:border-red-300"
                      >
                        <Trash2 size={11} strokeWidth={2.5} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== ROOM MANAGER ====================
const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    size: '',
    view: '',
    imageUrl: '',
    isAvailable: true,
    amenities: []
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rooms');
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (file) => {
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For new rooms, require an image
    if (!editingRoom && !selectedFile && !formData.imageUrl) {
      alert('Please select an image');
      return;
    }

    try {
      setUploading(true);
      
      if (editingRoom) {
        // Update existing room (PUT - no file upload support in backend)
        const response = await fetch(`/api/rooms/${editingRoom._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: formData.title,
            price: formData.price,
            description: formData.description,
            size: formData.size,
            view: formData.view,
            isAvailable: formData.isAvailable,
            amenities: formData.amenities
          })
        });

        if (response.ok) {
          await fetchRooms();
          resetForm();
          alert('Room updated successfully!');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to update room');
        }
      } else {
        // Create new room (POST - with file upload)
        const submitData = new FormData();
        if (selectedFile) {
          submitData.append('image', selectedFile);
        } else if (formData.imageUrl) {
          submitData.append('imageUrl', formData.imageUrl);
        }
        submitData.append('title', formData.title);
        submitData.append('price', formData.price);
        submitData.append('description', formData.description);
        submitData.append('size', formData.size);
        submitData.append('view', formData.view);
        submitData.append('isAvailable', formData.isAvailable);
        submitData.append('amenities', JSON.stringify(formData.amenities));

        const response = await fetch('/api/rooms', {
          method: 'POST',
          body: submitData
        });

        if (response.ok) {
          await fetchRooms();
          resetForm();
          alert('Room created successfully!');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to create room');
        }
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save room');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setRooms(rooms.filter(room => room._id !== roomId));
        alert('Room deleted successfully!');
      } else {
        alert('Failed to delete room');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete room');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      title: room.title,
      price: room.price,
      description: room.description,
      size: room.size || '',
      view: room.view || '',
      imageUrl: room.imageUrl,
      isAvailable: room.isAvailable,
      amenities: room.amenities || []
    });
    setPreviewUrl(room.imageUrl.startsWith('http') ? room.imageUrl : `/api${room.imageUrl}`);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      description: '',
      size: '',
      view: '',
      imageUrl: '',
      isAvailable: true,
      amenities: []
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditingRoom(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a1a12]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2a1a12] mb-3 tracking-tight">Room Management</h1>
          <p className="text-lg text-gray-600 font-light">Manage your hotel rooms and accommodations.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3.5 bg-gradient-to-r from-[#2a1a12] to-[#3a2a20] text-white font-semibold rounded-xl hover:from-[#3a2a20] hover:to-[#4a3a30] transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm active:scale-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>{showForm ? 'Cancel' : 'Add New Room'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-[#2a1a12] mb-6">
            {editingRoom ? 'Edit Room' : 'Add New Room'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all group ${
                editingRoom ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } ${
                isDragging 
                  ? 'border-amber-500 bg-amber-50/50 shadow-inner' 
                  : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50/30'
              }`}
              onDragOver={(e) => { if (!editingRoom) { e.preventDefault(); setIsDragging(true); } }}
              onDragLeave={(e) => { if (!editingRoom) { e.preventDefault(); setIsDragging(false); } }}
              onDrop={editingRoom ? undefined : handleDrop}
              onClick={() => { if (!editingRoom) fileInputRef.current?.click(); }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={editingRoom}
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {previewUrl ? (
                <div className="rounded-xl overflow-hidden border border-gray-200 max-w-md mx-auto">
                  <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={40} className={`mx-auto mb-3 ${
                    isDragging ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-500'
                  } transition-colors`} strokeWidth={1.5} />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  {editingRoom && (
                    <p className="text-xs text-amber-600 mt-2">Note: Image cannot be changed when editing.</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$350/night"
                  required
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="45m²"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">View</label>
                <input
                  type="text"
                  value={formData.view}
                  onChange={(e) => setFormData({ ...formData, view: e.target.value })}
                  placeholder="City View"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all shadow-sm hover:border-gray-400 resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
                />
                <span className="text-gray-700 font-medium text-sm">Available</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className={`px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center gap-2 ${
                  uploading
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm'
                    : 'bg-gradient-to-r from-[#2a1a12] to-[#3a2a20] text-white hover:from-[#3a2a20] hover:to-[#4a3a30] hover:shadow-lg active:scale-95'
                }`}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={18} strokeWidth={2.5} />
                    <span>{editingRoom ? 'Update Room' : 'Create Room'}</span>
                  </>
                )}
                </button>
            </div>
          </form>
        </div>
      )}

      {/* Rooms Grid Section */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2a1a12]">Your Rooms</h2>
          <span className="text-sm text-gray-500 font-medium">{rooms.length} {rooms.length === 1 ? 'room' : 'rooms'}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden group hover:shadow-xl hover:border-amber-300 transition-all flex flex-col max-w-full"
            >
              {/* Image Container - Compact Fixed Height */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={room.imageUrl.startsWith('http') ? room.imageUrl : `/api${room.imageUrl}`}
                  alt={room.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {!room.isAvailable && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-lg z-10">
                    Booked
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="bg-white/95 backdrop-blur-sm text-[#2a1a12] px-2 py-0.5 rounded-md text-xs font-semibold shadow-sm">
                    {room.size || 'Standard'}
                  </span>
                </div>
              </div>
              {/* Card Content - Compact */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-base font-bold text-[#2a1a12] line-clamp-1 flex-1">{room.title}</h3>
                    <span className="text-amber-600 font-bold text-sm ml-2 flex-shrink-0">{room.price}</span>
                  </div>
                  {room.view && (
                    <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {room.view}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">{room.description}</p>
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleEdit(room)}
                      className="flex-1 py-2 px-2 text-xs font-semibold text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-md flex items-center justify-center gap-1 transition-all border border-gray-200 hover:border-amber-300"
                    >
                      <Edit2 size={12} strokeWidth={2.5} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="flex-1 py-2 px-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-md transition-all border border-red-200 hover:border-red-300"
                    >
                      <Trash2 size={12} strokeWidth={2.5} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== DASHBOARD OVERVIEW ====================
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalPhotos: 0,
    bookings: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [roomsRes, photosRes] = await Promise.all([
        fetch('/api/rooms'),
        fetch('/api/gallery')
      ]);

      if (roomsRes.ok && photosRes.ok) {
        const rooms = await roomsRes.json();
        const photos = await photosRes.json();
        setStats({
          totalRooms: rooms.length,
          availableRooms: rooms.filter(r => r.isAvailable).length,
          totalPhotos: photos.length,
          bookings: rooms.filter(r => !r.isAvailable).length
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statCards = [
    { label: 'Total Rooms', value: stats.totalRooms, icon: Home, color: 'bg-blue-500' },
    { label: 'Available Rooms', value: stats.availableRooms, icon: Check, color: 'bg-green-500' },
    { label: 'Gallery Photos', value: stats.totalPhotos, icon: Image, color: 'bg-purple-500' },
    { label: 'Bookings', value: stats.bookings, icon: Calendar, color: 'bg-amber-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#2a1a12] mb-3 tracking-tight">Dashboard Overview</h1>
        <p className="text-lg text-gray-600 font-light">Monitor your hotel's key metrics and performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl shadow-sm`}>
                  <Icon size={22} className="text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#2a1a12] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-[#2a1a12] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <button className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl hover:from-amber-100 hover:to-amber-150 transition-all text-left border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg group">
            <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-amber-600" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-lg text-[#2a1a12] mb-2">Add New Room</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Create a new room listing with all details</p>
          </button>
          <button className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl hover:from-blue-100 hover:to-blue-150 transition-all text-left border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg group">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload size={24} className="text-blue-600" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-lg text-[#2a1a12] mb-2">Upload Photo</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Add photos to your gallery collection</p>
          </button>
          <button className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl hover:from-purple-100 hover:to-purple-150 transition-all text-left border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg group">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 size={24} className="text-purple-600" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-lg text-[#2a1a12] mb-2">View Reports</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Check analytics and insights</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;