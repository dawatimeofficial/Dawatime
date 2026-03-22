const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

async function parseJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Auth (Email/Password)
export async function login(email, password) {
  const res = await fetch(`${API_ROOT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Login failed');
  return json; // { token, user }
}

export async function register({ name, email, phone, password }) {
  const res = await fetch(`${API_ROOT}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, password }),
  });
  const json = await parseJson(res);
  if (!res.ok) {
    const err = new Error(json?.error || 'Registration failed');
    err.errors = json?.errors;
    throw err;
  }
  return json;
}

export async function saveFcmToken(fcmToken) {
  const res = await fetch(`${API_ROOT}/api/users/save-token`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ fcmToken }),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to save token');
  return json;
}

export async function fetchMe() {
  const res = await fetch(`${API_ROOT}/auth/me`, {
    headers: authHeaders(),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Not authenticated');
  return json;
}

// Medications
export async function fetchMedications() {
  const res = await fetch(`${API_ROOT}/api/medications`, {
    headers: authHeaders(),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to fetch medications');
  return json;
}

export async function createMedication(data) {
  const res = await fetch(`${API_ROOT}/api/medications`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to add medication');
  return json;
}

export async function deleteMedication(id) {
  const res = await fetch(`${API_ROOT}/api/medications/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to delete medication');
  return json;
}

export async function markMedicationTaken(id) {
  const res = await fetch(`${API_ROOT}/api/medications/${id}/taken`, {
    method: 'POST',
    headers: authHeaders(),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to mark medication taken');
  return json;
}

// Family
export async function fetchFamily() {
  const res = await fetch(`${API_ROOT}/api/family`, {
    headers: authHeaders(),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to fetch family members');
  return json;
}

export async function createFamilyMember(data) {
  const res = await fetch(`${API_ROOT}/api/family`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to add family member');
  return json;
}

// Backwards compatible (your backend currently supports delete)
export async function deleteFamilyMember(id) {
  const res = await fetch(`${API_ROOT}/api/family/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const json = await parseJson(res);
  if (!res.ok) throw new Error(json?.error || 'Failed to delete family member');
  return json;
}

