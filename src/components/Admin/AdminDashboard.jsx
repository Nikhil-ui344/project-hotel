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
  Eye,
  DollarSign,
  Maximize2,
  Tag,
  FileText,
  Trash2,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'rooms', label: 'Rooms', icon: Home },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const activeTabTitle = (tab) => {
  const titles = {
    overview: 'Dashboard Overview',
    gallery: 'Gallery Management',
    rooms: 'Room Management',
    settings: 'Settings & Configuration'
  };
  return titles[tab] || 'Dashboard';
};

const activeTabSubtitle = (tab) => {
  const subtitles = {
    overview: 'Real-time insights and performance metrics',
    gallery: 'Curate and manage visual assets',
    rooms: 'Configure room tiers and availability',
    settings: 'System preferences and integrations'
  };
  return subtitles[tab] || 'Manage your hotel';
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f4ede1] text-[#4a2e22] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(90,59,46,0.35) 1px, transparent 1px)',
        backgroundSize: '26px 26px'
      }} />

      <motion.aside
        initial={{ width: 260, x: -260 }}
        animate={{ width: isSidebarOpen ? 260 : 88, x: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="fixed inset-y-0 z-20 flex flex-col bg-gradient-to-b from-[#4a2e22] to-[#2f1a13] text-white shadow-[20px_0_60px_rgba(74,46,34,0.25)]"
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center w-full'}`}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d4a846] to-[#c1812e] flex items-center justify-center shadow-lg shadow-[#d4a846]/40">
              <ShieldCheck size={22} className="text-[#2f1a13]" />
            </div>
            {isSidebarOpen && (
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Komal</p>
                <p className="text-lg font-semibold text-white">Gallery Suite</p>
              </div>
            )}
          </motion.div>

          {isSidebarOpen && (
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
            >
              <Menu size={18} />
            </motion.button>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <SidebarItem
              key={id}
              icon={<Icon size={18} />}
              label={label}
              isActive={activeTab === id}
              isOpen={isSidebarOpen}
              onClick={() => setActiveTab(id)}
            />
          ))}
        </nav>

        <div className="px-4 pb-6 pt-4 border-t border-white/5">
          <motion.button
            whileHover={{ x: isSidebarOpen ? 6 : 0, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 transition-all ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            <LogOut size={18} className="text-white" />
            {isSidebarOpen && <span>Sign out</span>}
          </motion.button>
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="block mx-auto mt-4 text-[10px] tracking-[0.3em] text-white/60"
            >
              EXPAND
            </button>
          )}
        </div>
      </motion.aside>

      <div className={`relative min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-[260px]' : 'ml-[88px]'}`}>
        <header className="sticky top-0 z-10 bg-[#f9f3e8]/80 backdrop-blur-xl border-b border-[#e5dacb]">
          <div className="px-10 py-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#b79a79] mb-2">
                admin / {activeTab}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <motion.h1
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl lg:text-4xl font-semibold text-[#3a2218]"
                >
                  {activeTabTitle(activeTab)}
                </motion.h1>
              </div>
              <p className="text-sm text-[#7a5e4b] mt-2">
                {activeTabSubtitle(activeTab)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#eadfce] text-sm text-[#4a2e22]"
              >
                <BarChart3 size={16} />
                Analytics
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#d4a846] to-[#c1812e] text-white text-sm font-semibold shadow-lg"
              >
                Deploy Changes
              </motion.button>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-8"
            >
              {activeTab === 'overview' && <DashboardOverview />}
              {activeTab === 'gallery' && <GalleryManager />}
              {activeTab === 'rooms' && <RoomManager />}
              {activeTab === 'settings' && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-16 text-center">
                  <Settings size={56} className="mx-auto text-slate-500 mb-4" />
                  <p className="text-xl text-slate-300 font-medium">Settings are being redesigned.</p>
                  <p className="text-sm text-slate-500">We will notify you once they are ready.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive, onClick, isOpen }) => (
  <motion.button
    whileHover={{ x: isOpen ? 8 : 0, scale: 1.01 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`relative flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-[#f6e7d5] text-[#4a2e22] shadow-lg border border-white/30'
        : 'text-white/70 hover:text-white hover:bg-white/10'
    } ${!isOpen && 'justify-center px-0'}`}
  >
    <span className="relative z-10 shrink-0">{icon}</span>
    {isOpen && <span className="relative z-10">{label}</span>}
    {isActive && (
      <motion.span
        layoutId="sidebarPulse"
        className="absolute inset-0 rounded-2xl border border-[#d4a846]/40"
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    )}
  </motion.button>
);

const DashboardOverview = () => {
  const [stats, setStats] = useState({ photos: 0, rooms: 0, availableRooms: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [photosRes, roomsRes] = await Promise.all([
          fetch('/api/gallery'),
          fetch('/api/rooms')
        ]);
        const photos = await photosRes.json();
        const rooms = await roomsRes.json();
        
        setStats({
          photos: Array.isArray(photos) ? photos.length : 0,
          rooms: Array.isArray(rooms) ? rooms.length : 0,
          availableRooms: Array.isArray(rooms) ? rooms.filter(r => r.isAvailable).length : 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Published Photos',
      value: stats.photos,
      change: '+12% MoM',
      icon: Image,
      accent: 'from-[#fcedd5] to-transparent'
    },
    {
      title: 'Active Rooms',
      value: stats.rooms,
      change: '+4 new',
      icon: Home,
      accent: 'from-[#f7e3d4] to-transparent'
    },
    {
      title: 'Rooms Available',
      value: stats.availableRooms,
      change: `${stats.rooms - stats.availableRooms} booked`,
      icon: Check,
      accent: 'from-[#e5f2e6] to-transparent'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map(({ title, value, change, icon: Icon, accent }, idx) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#b79a79] mb-3">{title}</p>
                <h3 className="text-4xl font-semibold text-[#3a2218]">{value}</h3>
                <p className="mt-2 text-sm text-[#7a5e4b]">{change}</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#f8efe1] border border-[#f2e6d7] text-[#c1812e]">
                <Icon size={24} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <h4 className="text-sm tracking-[0.3em] uppercase text-[#b79a79] mb-4">Live occupancy</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Suites','Premium','Deluxe','Garden'].map((tier, idx) => (
              <div key={tier} className="rounded-2xl border border-[#f1e5d8] bg-[#fffaf4] p-4">
                <p className="text-sm text-[#7a5e4b]">{tier}</p>
                <p className="text-2xl font-semibold text-[#4a2e22] mt-1">{Math.max(stats.rooms - idx * 2, 0)}</p>
                <p className="text-xs text-[#b79a79] mt-1">active rooms</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 flex flex-col justify-between shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b79a79]">Sync status</p>
            <h4 className="text-lg font-semibold text-[#3a2218] mt-2">All systems nominal</h4>
            <p className="text-sm text-[#7a5e4b] mt-1">Last sync 2m ago</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-[#b79a79] mb-1">
              <span>Bandwidth</span>
              <span>72%</span>
            </div>
            <div className="h-2 rounded-full bg-[#f5e9d8] overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-[#d4a846] to-[#c1812e]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryManager = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('Exterior');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setPhotos((prev) => prev.filter((photo) => photo._id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('category', category);
    formData.append('description', description);

    try {
      await fetch('/api/gallery', { method: 'POST', body: formData });
      setSelectedFile(null);
      setPreviewUrl(null);
      setDescription('');
      setCategory('Exterior');
      setShowForm(false);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b79a79]">Gallery Management</p>
          <h3 className="text-2xl font-semibold text-[#3a2218]">Upload and organize hotel visuals</h3>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="px-5 py-3 rounded-2xl border border-[#e6d7c3] bg-white text-sm text-[#7a5e4b]">
            <span className="text-xs uppercase text-[#b79a79]">Total</span>
            <p className="text-2xl font-semibold text-[#4a2e22]">{photos.length}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d4a846] to-[#c1812e] text-white font-semibold shadow-md"
          >
            <motion.span animate={{ rotate: showForm ? 45 : 0 }}>
              {showForm ? <X size={18} /> : <Plus size={18} />}
            </motion.span>
            {showForm ? 'Close Upload' : 'Add New Photo'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-xl"
          >
            <div className="flex flex-col gap-3 border-b border-[#f0e6d8] pb-6 mb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a846] to-[#c1812e] flex items-center justify-center text-white shadow-lg">
                  <Upload size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#3a2218]">Drag & drop your imagery</h4>
                  <p className="text-sm text-[#7a5e4b]">High resolution JPG / PNG / WEBP (10MB max)</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#b79a79]">step 1 of 2</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                animate={{ borderColor: isDragging ? '#d4a846' : '#e7d9c7' }}
                className={`rounded-3xl border-2 border-dashed p-10 text-center transition-all cursor-pointer ${
                  isDragging ? 'bg-[#fff4e1]' : 'bg-[#fffaf4]'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file?.type.startsWith('image/')) handleFile(file);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />

                {previewUrl ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative inline-block">
                    <img src={previewUrl} alt="preview" className="max-h-64 rounded-3xl border border-[#eadfce] shadow-lg" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFile(null);
                      }}
                      className="absolute -top-2 -right-2 bg-[#4a2e22] text-white w-8 h-8 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-[#e0d1bd] bg-white">
                      <Upload size={32} className="text-[#c1812e]" />
                    </div>
                    <h5 className="text-lg font-semibold text-[#4a2e22]">Drag files or click to browse</h5>
                    <p className="text-sm text-[#7a5e4b]">Supports JPG, PNG, WEBP • 10MB max</p>
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="space-y-2 text-sm">
                  <span className="flex items-center gap-2 text-[#7a5e4b]">
                    <Tag size={16} /> Category
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-[#e6d7c3] bg-white px-4 py-3 text-sm outline-none focus:border-[#d4a846]"
                  >
                    {['Exterior','Rooms','Dining','Lobby','Pool','Garden','Amenities'].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="flex items-center gap-2 text-[#7a5e4b]">
                    <FileText size={16} /> Description
                  </span>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the scene"
                    className="w-full rounded-2xl border border-[#e6d7c3] bg-white px-4 py-3 text-sm outline-none focus:border-[#d4a846]"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-[#f0e6d8]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-2xl border border-[#e6d7c3] text-sm text-[#7a5e4b] bg-white"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: selectedFile ? 1.02 : 1 }}
                  disabled={!selectedFile}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold shadow-md ${
                    selectedFile
                      ? 'bg-gradient-to-r from-[#d4a846] to-[#c1812e] text-white'
                      : 'bg-[#f5e9d8] text-[#c0ad95] cursor-not-allowed'
                  }`}
                  type="submit"
                >
                  Publish Asset
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-24">
            <div className="h-14 w-14 rounded-full border-4 border-[#eadfce] border-t-[#c1812e] animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-[#e6d7c3] bg-white p-16 text-center text-[#7a5e4b]">
            <p className="text-lg">No photos yet. Start curating your gallery.</p>
          </div>
        ) : (
          photos.map((photo, idx) => (
            <motion.article
              key={photo._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="group overflow-hidden rounded-3xl border border-[#e6d7c3] bg-white shadow-sm hover:shadow-lg transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={photo.imageUrl} alt={photo.category} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#4a2e22]">
                  {photo.category}
                </span>
              </div>
              <div className="p-4 space-y-2 bg-white">
                <p className="text-sm text-[#4a2e22] line-clamp-2">
                  {photo.description || 'No description'}
                </p>
                <p className="text-xs text-[#7a5e4b]">
                  {new Date(photo.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
};

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [view, setView] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();
        setRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const refreshRooms = async () => {
    const res = await fetch('/api/rooms');
    const data = await res.json();
    setRooms(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this room listing?')) return;
    try {
      await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
      refreshRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      refreshRooms();
    } catch (error) {
      console.error('Error updating room status:', error);
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
    formData.append('amenities', JSON.stringify(['Wifi', 'Coffee', 'TV', 'Workspace']));

    try {
      const response = await fetch('/api/rooms', { method: 'POST', body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add room');
      }
      setShowForm(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle('');
      setPrice('');
      setSize('');
      setView('');
      setDescription('');
      refreshRooms();
    } catch (error) {
      console.error('Error adding room:', error);
      alert(error.message);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#b79a79]">Inventory</p>
          <h3 className="text-2xl font-semibold text-[#3a2218] mt-2">Room & suite orchestration</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-3 text-sm text-[#7a5e4b]">
            Total · <span className="text-[#4a2e22] font-semibold">{rooms.length}</span>
          </div>
          <div className="rounded-2xl border border-[#d8eadb] bg-[#f0f7f2] px-5 py-3 text-sm text-[#3b6b4f]">
            Available · {rooms.filter((r) => r.isAvailable).length}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4a846] to-[#c1812e] px-5 py-3 text-sm font-semibold text-white shadow-md"
          >
            <motion.span animate={{ rotate: showForm ? 45 : 0 }}>
              {showForm ? <X size={16} /> : <Plus size={16} />}
            </motion.span>
            {showForm ? 'Close Builder' : 'Add New Room'}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-xl"
          >
            <div className="flex flex-col gap-3 border-b border-[#f0e6d8] pb-6 mb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a846] to-[#c1812e] flex items-center justify-center text-white">
                  <Home size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#3a2218]">New room blueprint</h4>
                  <p className="text-sm text-[#7a5e4b]">Upload imagery, enter specs, define availability</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#b79a79]">room meta</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className="rounded-3xl border border-dashed border-[#e6d7c3] bg-[#fffaf4] p-10 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewUrl ? (
                  <div className="relative mx-auto max-w-2xl">
                    <img src={previewUrl} alt="preview" className="rounded-2xl border border-[#eadfce] shadow-lg" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute -top-3 -right-3 rounded-full bg-[#4a2e22] text-white p-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 text-[#7a5e4b]">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-[#e0d1bd] bg-white">
                      <Upload size={30} className="text-[#c1812e]" />
                    </div>
                    <p className="text-base font-semibold text-[#4a2e22]">Drag files or click to browse</p>
                    <p className="text-sm">5MB max • JPG / PNG / WEBP</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Room title', value: title, setter: setTitle, placeholder: 'Executive skyline suite', icon: Home },
                  { label: 'Nightly rate', value: price, setter: setPrice, placeholder: '$420', icon: DollarSign },
                  { label: 'Floor area', value: size, setter: setSize, placeholder: '54m²', icon: Maximize2 },
                  { label: 'Primary view', value: view, setter: setView, placeholder: 'Ocean horizon', icon: Eye }
                ].map(({ label, value, setter, placeholder, icon: Icon }) => (
                  <label key={label} className="text-sm space-y-2">
                    <span className="flex items-center gap-2 text-[#7a5e4b]">
                      <Icon size={16} /> {label}
                    </span>
                    <input
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      className="w-full rounded-2xl border border-[#e6d7c3] bg-white px-4 py-3 text-sm outline-none focus:border-[#d4a846]"
                      required={label !== 'Primary view' && label !== 'Floor area'}
                    />
                  </label>
                ))}
              </div>

              <label className="block text-sm space-y-2">
                <span className="flex items-center gap-2 text-[#7a5e4b]">
                  <Edit2 size={16} /> Description
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-[#e6d7c3] bg-white px-4 py-3 text-sm outline-none focus:border-[#d4a846]"
                  placeholder="Describe the mood, amenities, and signature touches"
                  required
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-[#f0e6d8] pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-2xl border border-[#e6d7c3] px-5 py-3 text-sm text-[#7a5e4b] bg-white"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedFile}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold shadow-md ${
                    selectedFile
                      ? 'bg-gradient-to-r from-[#d4a846] to-[#c1812e] text-white'
                      : 'bg-[#f5e9d8] text-[#c0ad95] cursor-not-allowed'
                  }`}
                  type="submit"
                >
                  Save room tier
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-24">
            <div className="h-14 w-14 rounded-full border-4 border-[#eadfce] border-t-[#c1812e] animate-spin" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-[#e6d7c3] bg-white p-16 text-center text-[#7a5e4b]">
            No rooms configured yet.
          </div>
        ) : (
          rooms.map((room, idx) => (
            <motion.article
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-3xl border border-[#eadfce] bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={room.imageUrl} alt={room.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    room.isAvailable ? 'bg-[#e3f5eb] text-[#2f6b41]' : 'bg-[#fde4e4] text-[#8c2b2b]'
                  }`}
                >
                  {room.isAvailable ? 'Available' : 'Booked'}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between border-b border-[#f0e6d8] pb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-[#3a2218]">{room.title}</h4>
                    <p className="text-sm text-[#7a5e4b]">{room.size || 'Specification pending'}</p>
                  </div>
                  <p className="text-xl font-semibold text-[#c1812e]">{room.price || '$—'}</p>
                </div>

                <p className="text-sm text-[#7a5e4b] line-clamp-3 min-h-[60px]">
                  {room.description || 'Awaiting editorial description.'}
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-[#7a5e4b]">
                  <span className="rounded-2xl border border-[#eadfce] px-3 py-1">
                    View · {room.view || '—'}
                  </span>
                  <span className="rounded-2xl border border-[#eadfce] px-3 py-1">
                    Ref #{room._id.slice(-4)}
                  </span>
                  {(room.amenities || []).slice(0, 2).map((amenity) => (
                    <span key={amenity} className="rounded-2xl border border-[#eadfce] px-3 py-1">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => handleStatusUpdate(room._id, room.isAvailable)}
                    className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${
                      room.isAvailable
                        ? 'bg-[#fde7e1] text-[#a73d3d] hover:bg-[#fbdad0]'
                        : 'bg-[#e5f5ed] text-[#2f6b41] hover:bg-[#d7efe3]'
                    }`}
                  >
                    {room.isAvailable ? 'Mark as booked' : 'Mark available'}
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="rounded-2xl border border-[#f3d5d5] px-4 py-2 text-sm text-[#a73d3d] hover:bg-[#fef4f4]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
