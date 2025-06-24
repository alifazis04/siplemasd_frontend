export async function loginAdmin(email, password) {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, message: error.message || 'Login gagal' };
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    return { success: true };
  } catch (err) {
    return { success: false, message: 'Server error' };
  }
}
