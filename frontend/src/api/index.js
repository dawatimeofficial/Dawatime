const API_ROOT = "https://dawatime-backend.onrender.com/api";
const AUTH_TOKEN_KEY = 'dawatime_token';

// ================= TOKEN =================
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

// ================= HELPERS =================
async function parseJson(res) {
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

async function handleResponse(res) {
  const json = await parseJson(res);

  if (!res.ok) {
    const message =
      json?.error ||
      json?.message ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return json;
}

// ================= AUTH =================
export async function login(email, password) {
  try {
    const res = await fetch(`${API_ROOT}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return await handleResponse(res);
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    throw err;
  }
}

export async function register({ name, email, phone, password }) {
  const res = await fetch(`${API_ROOT}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, password }),
  });

  return await handleResponse(res);
}

export async function fetchMe() {
  const res = await fetch(`${API_ROOT}/auth/me`, {
    headers: authHeaders(),
  });

  return await handleResponse(res);
}

// ================= FCM =================
export async function saveFcmToken(fcmToken) {
  const res = await fetch(`${API_ROOT}/users/save-token`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ fcmToken }),
  });

  return await handleResponse(res);
}

// ================= MEDICATION =================
export async function fetchMedications() {
  const res = await fetch(`${API_ROOT}/medications`, {
    headers: authHeaders(),
  });

  return await handleResponse(res);
}

export async function createMedication(data) {
  const res = await fetch(`${API_ROOT}/medications`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return await handleResponse(res);
}

export async function deleteMedication(id) {
  const res = await fetch(`${API_ROOT}/medications/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  return await handleResponse(res);
}

export async function markMedicationTaken(id) {
  const res = await fetch(`${API_ROOT}/medications/${id}/taken`, {
    method: 'POST',
    headers: authHeaders(),
  });

  return await handleResponse(res);
}

// ================= FAMILY =================
export async function fetchFamily() {
  const res = await fetch(`${API_ROOT}/family`, {
    headers: authHeaders(),
  });

  return await handleResponse(res);
}

export async function createFamilyMember(data) {
  const res = await fetch(`${API_ROOT}/family`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return await handleResponse(res);
}

export async function deleteFamilyMember(id) {
  const res = await fetch(`${API_ROOT}/family/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  return await handleResponse(res);
}