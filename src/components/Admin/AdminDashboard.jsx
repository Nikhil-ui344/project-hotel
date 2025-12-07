import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../../config/api';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, ProgressBar, Dropdown, Alert, ButtonGroup, Offcanvas, ListGroup } from 'react-bootstrap';
import { 
  FaChartLine, FaImage, FaBed, FaCog, FaBars, FaSignOutAlt, FaPlus, FaUpload, 
  FaTimes, FaCheck, FaEdit, FaTrash, FaShieldAlt, FaChartBar, FaWifi, FaCoffee, 
  FaTv, FaWind, FaDollarSign, FaUsers, FaCalendar, FaEye, FaStar, FaHeart,
  FaFilter, FaSearch, FaDownload, FaBell, FaUserCircle, FaSortAmountDown,
  FaExpand, FaMapMarkerAlt, FaConciergeBell, FaClipboardList, FaCloudUploadAlt
} from 'react-icons/fa';
import {
  LayoutDashboard,
  Image as ImageIcon,
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
  { id: 'overview', label: 'Dashboard', icon: FaChartLine, color: 'primary' },
  { id: 'gallery', label: 'Gallery', icon: FaImage, color: 'success' },
  { id: 'rooms', label: 'Rooms', icon: FaBed, color: 'warning' },
  { id: 'reviews', label: 'Testimonials', icon: FaStar, color: 'info' },
  { id: 'settings', label: 'Settings', icon: FaCog, color: 'secondary' }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('Enhanced AdminDashboard loaded');
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-1000" style={{ zIndex: 1000 }}>
        <Container fluid className="py-3">
          <Row className="align-items-center">
            <Col xs={6} md={4} className="d-flex align-items-center gap-3">
              <Button 
                variant="outline-primary" 
                className="d-lg-none"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <FaBars />
              </Button>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 p-2" style={{ 
                  background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)',
                  boxShadow: '0 4px 15px rgba(139, 111, 71, 0.4)'
                }}>
                  <FaShieldAlt size={28} className="text-white" />
                </div>
                <div className="d-none d-md-block">
                  <h5 className="mb-0 fw-bold" style={{ color: '#2a1a12' }}>Komal Garden</h5>
                  <small className="text-muted">Admin Dashboard</small>
                </div>
              </div>
            </Col>
            
            <Col xs={6} md={8} className="d-flex align-items-center justify-content-end gap-2">
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-dark" size="sm">
                  <FaUserCircle size={18} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item><FaUserCircle className="me-2" />Profile</Dropdown.Item>
                  <Dropdown.Item><FaCog className="me-2" />Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger"><FaSignOutAlt className="me-2" />Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </nav>

      {/* Sidebar Offcanvas for Mobile */}
      <Offcanvas show={isSidebarOpen} onHide={() => setIsSidebarOpen(false)} className="d-lg-none" style={{ background: 'linear-gradient(180deg, #2a1a12 0%, #1a0f0a 100%)' }}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="text-white fw-bold">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush" className="bg-transparent">
            {NAV_ITEMS.map(({ id, label, icon: Icon, color }) => (
              <ListGroup.Item
                key={id}
                action
                active={activeTab === id}
                onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
                className={`border-0 bg-transparent text-white mb-2 rounded-3 ${activeTab === id ? 'bg-gradient-primary' : ''}`}
                style={{
                  background: activeTab === id ? 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)' : 'transparent'
                }}
              >
                <Icon className="me-3" />
                {label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Layout */}
      <Container fluid>
        <Row>
          {/* Sidebar for Desktop */}
          <Col lg={2} className="d-none d-lg-block p-0">
            <div className="sticky-top" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>
              <div className="p-3" style={{ 
                background: 'linear-gradient(180deg, #2a1a12 0%, #1a0f0a 100%)',
                height: '100%',
                borderRadius: '0 20px 20px 0',
                boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
              }}>
                <div className="mb-3">
                  <small className="text-white-50 text-uppercase fw-bold d-block mb-3 ps-3">Navigation</small>
                </div>
                <ListGroup variant="flush" className="bg-transparent">
                  {NAV_ITEMS.map(({ id, label, icon: Icon, color }) => (
                    <ListGroup.Item
                      key={id}
                      action
                      active={activeTab === id}
                      onClick={() => setActiveTab(id)}
                      className={`border-0 bg-transparent text-white mb-2 rounded-3 d-flex align-items-center gap-3 py-3 px-3`}
                      style={{
                        background: activeTab === id ? 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)' : 'rgba(255,255,255,0.05)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        transform: activeTab === id ? 'translateX(8px)' : 'translateX(0)',
                        boxShadow: activeTab === id ? '0 4px 15px rgba(139, 111, 71, 0.4)' : 'none'
                      }}
                    >
                      <Icon size={18} />
                      <span className="fw-semibold">{label}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>

          {/* Main Content Area */}
          <Col lg={10} className="py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && <DashboardOverview />}
                {activeTab === 'gallery' && <GalleryManager />}
                {activeTab === 'rooms' && <RoomManager />}
                {activeTab === 'reviews' && <ReviewsManager />}
                {activeTab === 'settings' && <SettingsPanel />}
              </motion.div>
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
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
      const response = await fetch(`${API_URL}/api/gallery`);
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

      const response = await fetch(`${API_URL}/api/gallery`, {
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
      const response = await fetch(`${API_URL}/api/gallery/${photoId}`, {
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
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Header Section */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          <h3 className="fw-bold mb-2">Gallery Management</h3>
          <p className="text-muted mb-0">Upload and organize photos that represent your hotel's beauty</p>
        </Card.Body>
      </Card>

      {/* Upload Card */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          {previewUrl && (
            <div className="mb-3 text-center">
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '400px', height: '200px', objectFit: 'cover', borderRadius: '12px' }} className="img-fluid border" />
            </div>
          )}
          
          <div
            className={`border border-2 border-dashed rounded-4 p-5 text-center ${isDragging ? 'border-warning bg-warning bg-opacity-10' : 'border-secondary'}`}
            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="d-none"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <FaCloudUploadAlt size={48} className={isDragging ? 'text-warning' : 'text-secondary'} />
            <h5 className="mt-3 mb-2">Drag and drop to upload</h5>
            <p className="text-muted small mb-0">Supported formats: JPG, PNG, and GIF. Max size 10MB</p>
          </div>

          <Row className="g-3 mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Bedrooms</option>
                  <option>Exterior</option>
                  <option>Dining</option>
                  <option>Pool</option>
                  <option>Lobby</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Deluxe suite with ocean view"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4 pt-3 border-top">
            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              variant="primary"
              className="d-flex align-items-center gap-2"
              style={{
                background: uploading || !selectedFile ? undefined : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              {uploading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <FaUpload />
                  <span>Upload Photo</span>
                </>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Photos Grid */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold mb-0">Your Gallery</h5>
            <Badge bg="secondary" pill>{photos.length} {photos.length === 1 ? 'photo' : 'photos'}</Badge>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-5">
              <div className="rounded-4 p-4 d-inline-block" style={{ background: 'linear-gradient(135deg, #f093fb20 0%, #f5576c20 100%)' }}>
                <FaImage size={48} className="text-muted mb-3" />
              </div>
              <h5 className="fw-bold mt-3">No photos yet</h5>
              <p className="text-muted">Start building your gallery by uploading your first image</p>
            </div>
          ) : (
            <Row className="g-3">
              {photos.map((photo) => (
                <Col key={photo._id} xs={12} sm={6} lg={4} xl={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="h-100 border" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                      <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                        <img
                          src={photo.imageUrl.startsWith('http') ? photo.imageUrl : `${window.location.origin}${photo.imageUrl}`}
                          alt={photo.description || photo.category}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                      <Card.Body className="p-3">
                        <Badge bg="warning" text="dark" className="mb-2">{photo.category}</Badge>
                        <p className="small text-muted mb-2" style={{ minHeight: '40px' }}>{photo.description || 'No description'}</p>
                        <small className="text-muted d-block mb-2">
                          {new Date(photo.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </small>
                        <ButtonGroup size="sm" className="w-100">
                          <Button variant="outline-primary" onClick={() => handleEdit(photo)}>
                            <FaEdit /> Edit
                          </Button>
                          <Button variant="outline-danger" onClick={() => handleDelete(photo._id)}>
                            <FaTrash /> Delete
                          </Button>
                        </ButtonGroup>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
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
      const response = await fetch(`${API_URL}/api/rooms`);
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
        const response = await fetch(`${API_URL}/api/rooms/${editingRoom._id}`, {
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

        const response = await fetch(`${API_URL}/api/rooms`, {
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
      const response = await fetch(`${API_URL}/api/rooms/${roomId}`, {
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

  const handleToggleAvailability = async (roomId, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isAvailable: !currentStatus
        })
      });

      if (response.ok) {
        const updatedRoom = await response.json();
        setRooms(rooms.map(room => room._id === roomId ? updatedRoom : room));
      } else {
        alert('Failed to update room status');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Failed to update room status');
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
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Header Section */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="fw-bold mb-2">Room Management</h3>
              <p className="text-muted mb-0">Manage your hotel rooms and accommodations</p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button
                onClick={() => setShowForm(!showForm)}
                variant="primary"
                className="d-flex align-items-center gap-2 ms-auto"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
              >
                <FaPlus />
                <span>{showForm ? 'Cancel' : 'Add New Room'}</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {showForm && (
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-3">{editingRoom ? 'Edit Room' : 'Add New Room'}</h5>
            <Form onSubmit={handleSubmit}>
              <div
                className={`border border-2 border-dashed rounded-4 p-4 text-center mb-3 ${
                  editingRoom ? 'opacity-50' : ''
                } ${isDragging ? 'border-warning bg-warning bg-opacity-10' : 'border-secondary'}`}
                style={{ cursor: editingRoom ? 'not-allowed' : 'pointer' }}
                onDragOver={(e) => { if (!editingRoom) { e.preventDefault(); setIsDragging(true); } }}
                onDragLeave={(e) => { if (!editingRoom) { e.preventDefault(); setIsDragging(false); } }}
                onDrop={editingRoom ? undefined : handleDrop}
                onClick={() => { if (!editingRoom) fileInputRef.current?.click(); }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="d-none"
                  disabled={editingRoom}
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '400px', height: '200px', objectFit: 'cover', borderRadius: '12px' }} className="img-fluid border" />
                ) : (
                  <div>
                    <FaCloudUploadAlt size={40} className={isDragging ? 'text-warning' : 'text-secondary'} />
                    <p className="mt-2 mb-0">Click to upload or drag and drop</p>
                    {editingRoom && (
                      <small className="text-warning">Note: Image cannot be changed when editing</small>
                    )}
                  </div>
                )}
              </div>

              <Row className="g-3 mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="$350/night"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Size</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="45m²"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">View</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.view}
                      onChange={(e) => setFormData({ ...formData, view: e.target.value })}
                      placeholder="City View"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Check
                type="checkbox"
                label="Available"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="mb-3"
              />

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploading}
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                  style={{
                    background: uploading ? undefined : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  {uploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      <span>{editingRoom ? 'Update Room' : 'Create Room'}</span>
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Rooms Grid */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold mb-0">Your Rooms</h5>
            <Badge bg="secondary" pill>{rooms.length} {rooms.length === 1 ? 'room' : 'rooms'}</Badge>
          </div>

          <Row className="g-3">
            {rooms.map((room) => (
              <Col key={room._id} xs={12} sm={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="h-100 border" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <img
                        src={room.imageUrl.startsWith('http') ? room.imageUrl : `${window.location.origin}${room.imageUrl}`}
                        alt={room.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {!room.isAvailable && (
                        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                          Booked
                        </Badge>
                      )}
                      <Badge bg="light" text="dark" className="position-absolute top-0 start-0 m-2">
                        {room.size || 'Standard'}
                      </Badge>
                    </div>
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold mb-0">{room.title}</h6>
                        <Badge bg="warning" text="dark">{room.price}</Badge>
                      </div>
                      {room.view && (
                        <small className="text-muted d-block mb-2">📍 {room.view}</small>
                      )}
                      <p className="small text-muted mb-2" style={{ minHeight: '40px' }}>
                        {room.description}
                      </p>
                      {room.amenities && room.amenities.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {room.amenities.slice(0, 3).map((amenity, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="small">
                              {amenity}
                            </Badge>
                          ))}
                          {room.amenities.length > 3 && (
                            <Badge bg="secondary" className="small">
                              +{room.amenities.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Availability Toggle */}
                      <div className="d-flex align-items-center gap-2 mb-2 p-2 rounded" style={{ background: '#f8f9fa' }}>
                        <small className="fw-semibold" style={{ fontSize: '0.85rem' }}>Status:</small>
                        <Button
                          size="sm"
                          variant={room.isAvailable ? 'success' : 'danger'}
                          onClick={() => handleToggleAvailability(room._id, room.isAvailable)}
                          className="d-flex align-items-center gap-1 flex-grow-1"
                          style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                        >
                          {room.isAvailable ? (
                            <>
                              <FaCheck size={12} />
                              <span>Available</span>
                            </>
                          ) : (
                            <>
                              <FaTimes size={12} />
                              <span>Booked</span>
                            </>
                          )}
                        </Button>
                      </div>

                      <ButtonGroup size="sm" className="w-100 mt-2">
                        <Button variant="outline-primary" onClick={() => handleEdit(room)}>
                          <FaEdit /> Edit
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleDelete(room._id)}>
                          <FaTrash /> Delete
                        </Button>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

// ==================== DASHBOARD OVERVIEW ====================
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalPhotos: 0,
    totalReviews: 0,
    approvedReviews: 0,
    occupancyRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [roomsRes, photosRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/api/rooms`),
        fetch(`${API_URL}/api/gallery`),
        fetch(`${API_URL}/api/reviews`)
      ]);

      if (roomsRes.ok && photosRes.ok && reviewsRes.ok) {
        const rooms = await roomsRes.json();
        const photos = await photosRes.json();
        const reviews = await reviewsRes.json();
        const bookedRooms = rooms.filter(r => !r.isAvailable).length;
        const occupancyRate = rooms.length > 0 ? (bookedRooms / rooms.length) * 100 : 0;
        
        setStats({
          totalRooms: rooms.length,
          availableRooms: rooms.filter(r => r.isAvailable).length,
          totalPhotos: photos.length,
          totalReviews: reviews.length,
          approvedReviews: reviews.filter(r => r.isApproved).length,
          occupancyRate: occupancyRate
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Rooms', 
      value: stats.totalRooms, 
      icon: FaBed, 
      gradient: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)'
    },
    { 
      label: 'Available Rooms', 
      value: stats.availableRooms, 
      icon: FaCheck, 
      gradient: 'linear-gradient(135deg, #C8A882 0%, #E6C9A8 100%)'
    },
    { 
      label: 'Gallery Photos', 
      value: stats.totalPhotos, 
      icon: FaImage, 
      gradient: 'linear-gradient(135deg, #A0826D 0%, #C09A6F 100%)'
    },
    { 
      label: 'Total Reviews', 
      value: stats.totalReviews, 
      icon: FaStar, 
      gradient: 'linear-gradient(135deg, #D4A846 0%, #F4C96B 100%)'
    },
    { 
      label: 'Approved Reviews', 
      value: stats.approvedReviews, 
      icon: FaCheck, 
      gradient: 'linear-gradient(135deg, #B8956A 0%, #D4B896 100%)'
    },
    { 
      label: 'Occupancy Rate', 
      value: `${stats.occupancyRate.toFixed(0)}%`, 
      icon: FaChartLine, 
      gradient: 'linear-gradient(135deg, #8B7355 0%, #A68A6D 100%)'
    }
  ];

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Welcome Header */}
      <Card className="mb-4 border-0 shadow-sm" style={{ 
        background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)',
        borderRadius: '20px'
      }}>
        <Card.Body className="py-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="text-white fw-bold mb-2">Welcome back, Admin! 👋</h2>
              <p className="text-white-50 mb-0">Here's what's happening with your hotel today.</p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="light" className="me-2">
                <FaDownload className="me-2" />
                Export Report
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Col key={index} xs={12} sm={6} lg={4} xl={2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <Card.Body className="p-3">
                    <div className="mb-3">
                      <div 
                        className="rounded-3 p-2 d-flex align-items-center justify-content-center" 
                        style={{ 
                          background: stat.gradient,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                          width: '42px',
                          height: '42px'
                        }}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                    <h3 className="fw-bold mb-1" style={{ fontSize: '1.75rem', color: '#2a1a12' }}>
                      {stat.value}
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>{stat.label}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      <Row className="g-4">
        {/* Occupancy Chart */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">Occupancy Overview</h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Occupied Rooms</span>
                  <span className="fw-bold">{stats.totalRooms - stats.availableRooms}/{stats.totalRooms}</span>
                </div>
                <ProgressBar 
                  now={stats.occupancyRate} 
                  variant="success"
                  style={{ height: '12px', borderRadius: '10px' }}
                />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Gallery Images</span>
                  <span className="fw-bold">{stats.totalPhotos}</span>
                </div>
                <ProgressBar 
                  now={(stats.totalPhotos / Math.max(stats.totalPhotos, 1)) * 100} 
                  variant="info"
                  style={{ height: '12px', borderRadius: '10px' }}
                />
              </div>
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Approved Reviews</span>
                  <span className="fw-bold">{stats.approvedReviews}/{stats.totalReviews}</span>
                </div>
                <ProgressBar 
                  now={stats.totalReviews > 0 ? (stats.approvedReviews / stats.totalReviews) * 100 : 0} 
                  variant="warning"
                  style={{ height: '12px', borderRadius: '10px' }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Review Stats */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">Testimonials Overview</h5>
              <div className="mb-3 p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #D4A846 0%, #F4C96B 100%)'
                    }}
                  >
                    <FaStar className="text-white" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Total Reviews</p>
                    <h3 className="mb-0 fw-bold">{stats.totalReviews}</h3>
                  </div>
                </div>
              </div>
              <div className="mb-3 p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)'
                    }}
                  >
                    <FaCheck className="text-white" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Approved</p>
                    <h3 className="mb-0 fw-bold">{stats.approvedReviews}</h3>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #C8A882 0%, #E6C9A8 100%)'
                    }}
                  >
                    <FaBell className="text-white" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Pending Approval</p>
                    <h3 className="mb-0 fw-bold">{stats.totalReviews - stats.approvedReviews}</h3>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// ==================== REVIEWS MANAGER ====================
const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    isApproved: false
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingReview ? `${API_URL}/api/reviews/${editingReview._id}` : `${API_URL}/api/reviews`;
      const method = editingReview ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const savedReview = await response.json();
        if (editingReview) {
          setReviews(reviews.map(r => r._id === savedReview._id ? savedReview : r));
        } else {
          setReviews([savedReview, ...reviews]);
        }
        handleCloseModal();
        alert(editingReview ? 'Review updated successfully!' : 'Review added successfully!');
      } else {
        alert('Failed to save review');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save review');
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setReviews(reviews.filter(r => r._id !== reviewId));
        alert('Review deleted successfully!');
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete review');
    }
  };

  const handleApprove = async (reviewId, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !currentStatus })
      });

      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(reviews.map(r => r._id === updatedReview._id ? updatedReview : r));
      }
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      email: review.email,
      rating: review.rating,
      comment: review.comment,
      isApproved: review.isApproved
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReview(null);
    setFormData({
      name: '',
      email: '',
      rating: 5,
      comment: '',
      isApproved: false
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-warning' : 'text-muted'} 
        size={16}
      />
    ));
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          <Row className="align-items-center mb-3">
            <Col md={6}>
              <h3 className="fw-bold mb-2">Manage Testimonials</h3>
              <p className="text-muted mb-0">Review and approve customer testimonials</p>
            </Col>
            <Col md={6} className="text-md-end">
              <Button 
                variant="primary" 
                onClick={() => setShowModal(true)}
              >
                <FaPlus className="me-2" />
                Add Review
              </Button>
            </Col>
          </Row>

          {/* Stats Summary */}
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="border-0" style={{ background: 'linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)', borderRadius: '12px' }}>
                <Card.Body className="p-3 text-center">
                  <h4 className="text-white fw-bold mb-1">{reviews.length}</h4>
                  <small className="text-white-50">Total Reviews</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0" style={{ background: 'linear-gradient(135deg, #D4A846 0%, #F4C96B 100%)', borderRadius: '12px' }}>
                <Card.Body className="p-3 text-center">
                  <h4 className="text-white fw-bold mb-1">{reviews.filter(r => r.isApproved).length}</h4>
                  <small className="text-white-50">Approved</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0" style={{ background: 'linear-gradient(135deg, #C8A882 0%, #E6C9A8 100%)', borderRadius: '12px' }}>
                <Card.Body className="p-3 text-center">
                  <h4 className="text-white fw-bold mb-1">{reviews.filter(r => !r.isApproved).length}</h4>
                  <small className="text-white-50">Pending</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Reviews Grid */}
          <Row className="g-4">
            {reviews.map((review) => (
              <Col key={review._id} lg={6}>
                <Card 
                  className="border h-100" 
                  style={{ 
                    borderRadius: '16px',
                    borderLeft: review.isApproved ? '4px solid #43e97b' : '4px solid #fa709a'
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className="fw-bold mb-0">{review.name}</h5>
                          <Badge bg={review.isApproved ? 'success' : 'warning'}>
                            {review.isApproved ? 'Approved' : 'Pending'}
                          </Badge>
                        </div>
                        <small className="text-muted">{review.email}</small>
                        <div className="mt-2">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                      {review.comment}
                    </p>
                    
                    <div className="d-flex align-items-center justify-content-between">
                      <small className="text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                      <ButtonGroup size="sm">
                        <Button 
                          variant={review.isApproved ? 'outline-warning' : 'outline-success'}
                          onClick={() => handleApprove(review._id, review.isApproved)}
                        >
                          {review.isApproved ? 'Unapprove' : 'Approve'}
                        </Button>
                        <Button 
                          variant="outline-primary"
                          onClick={() => handleEdit(review)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger"
                          onClick={() => handleDelete(review._id)}
                        >
                          <FaTrash />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {reviews.length === 0 && (
            <div className="text-center py-5">
              <FaStar size={60} className="text-muted mb-3" />
              <h5 className="text-muted">No reviews yet</h5>
              <p className="text-muted">Add your first testimonial to get started</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Review Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingReview ? 'Edit Review' : 'Add New Review'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Good</option>
                <option value={2}>2 Stars - Fair</option>
                <option value={1}>1 Star - Poor</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Check 
              type="checkbox"
              label="Approve this review"
              checked={formData.isApproved}
              onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
              className="mb-3"
            />

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={handleCloseModal} className="flex-grow-1">
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-grow-1">
                {editingReview ? 'Update' : 'Add'} Review
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

// ==================== SETTINGS PANEL ====================
const SettingsPanel = () => {
  return (
    <Container fluid>
      <Card className="border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        <Card.Body className="p-4">
          <h3 className="fw-bold mb-4">Settings & Configuration</h3>
          
          <Row className="g-4">
            <Col lg={6}>
              <Card className="border h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="rounded-3 p-3 bg-primary bg-opacity-10">
                      <FaCog size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">General Settings</h5>
                      <small className="text-muted">Basic hotel configuration</small>
                    </div>
                  </div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Hotel Name</Form.Label>
                      <Form.Control type="text" defaultValue="Komal Garden Hotel" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Email</Form.Label>
                      <Form.Control type="email" defaultValue="info@komalgarden.com" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" defaultValue="+1 234 567 8900" />
                    </Form.Group>
                    <Button variant="primary" className="w-100">Save Changes</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="border h-100" style={{ borderRadius: '16px' }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="rounded-3 p-3 bg-success bg-opacity-10">
                      <FaBell size={24} className="text-success" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Notifications</h5>
                      <small className="text-muted">Manage alert preferences</small>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <Form.Check 
                      type="switch"
                      id="notif-bookings"
                      label="New booking notifications"
                      defaultChecked
                    />
                    <Form.Check 
                      type="switch"
                      id="notif-reviews"
                      label="Review notifications"
                      defaultChecked
                    />
                    <Form.Check 
                      type="switch"
                      id="notif-checkout"
                      label="Check-out reminders"
                      defaultChecked
                    />
                    <Form.Check 
                      type="switch"
                      id="notif-maintenance"
                      label="Maintenance alerts"
                    />
                  </div>
                  <Button variant="success" className="w-100 mt-4">Update Preferences</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={12}>
              <Card className="border" style={{ borderRadius: '16px' }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="rounded-3 p-3 bg-warning bg-opacity-10">
                      <FaMapMarkerAlt size={24} className="text-warning" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Location & Address</h5>
                      <small className="text-muted">Update hotel location details</small>
                    </div>
                  </div>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control type="text" placeholder="123 Luxury Avenue" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="New York" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State/Province</Form.Label>
                        <Form.Control type="text" placeholder="NY" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="10001" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="warning" className="px-4">Update Location</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;