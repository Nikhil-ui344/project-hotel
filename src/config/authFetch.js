import API_URL from './api';

// Wrapper for authenticated fetch requests
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('adminToken');
  
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If there's a FormData body, don't set Content-Type (browser will set it with boundary)
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Use the URL as-is (it already includes API_URL)
  const response = await fetch(url, {
    ...options,
    headers
  });

  // If unauthorized, redirect to login
  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  }

  return response;
};
