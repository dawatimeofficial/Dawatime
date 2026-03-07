const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AUTH_TOKEN_KEY = 'dawatime_token';

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// Auth
export async function register(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    const err = new Error(json.error || 'Registration failed');
    err.errors = json.errors;
    throw err;
  }
  return json;
}

export async function login(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Login failed');
  return json;
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

// Medications
export async function fetchMedications() {
  const res = await fetch(`${API_BASE}/medications`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch medications');
  return res.json();
}

export async function createMedication(data) {
  const res = await fetch(`${API_BASE}/medications`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add medication');
  return res.json();
}

export async function deleteMedication(id) {
  const res = await fetch(`${API_BASE}/medications/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete medication');
  return res.json();
}

export async function updateMedication(id, data) {
  const res = await fetch(`${API_BASE}/medications/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update medication');
  return res.json();
}

// Family
export async function fetchFamily() {
  const res = await fetch(`${API_BASE}/family`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch family members');
  return res.json();
}

export async function createFamilyMember(data) {
  const res = await fetch(`${API_BASE}/family`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add family member');
  return res.json();
}

export async function deleteFamilyMember(id) {
  const res = await fetch(`${API_BASE}/family/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete family member');
  return res.json();
}
