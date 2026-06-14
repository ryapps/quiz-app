import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Username tidak boleh kosong');
      return;
    }
    // Simpan username ke localStorage
    localStorage.setItem('username', username);
    return <Navigate to="/quiz" />;
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          placeholder="Masukkan username"
          id="username"
          name="username"
          value={username}
          className='border-4 border-gray-300 rounded-md p-2 w-full'
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
