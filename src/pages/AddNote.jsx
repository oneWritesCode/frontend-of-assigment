import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AddNote() {
  const [formData, setFormData] = useState({
    headline: '',
    userName: '',
    email: '',
    noteText: '',
    teamName: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const teamData = JSON.parse(localStorage.getItem('team')) || {};

    setFormData(prevData => ({
      ...prevData,
      userName: userData.fullname || userData.name || '',
      email: userData.email || '',
      teamName: teamData.name || userData.team || ''
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const response = await fetch('http://localhost:3000/api/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          heading: formData.headline,
          text: formData.noteText,
          teamName: formData.teamName,
          memberName: formData.userName,
          memberEmail: formData.email
        })
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create note');
      }

      console.log('Note created successfully:', data);
      navigate('/');
    } catch (err) {
      console.error('Error creating note:', err);
      setError(err.message || 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };



  return (

    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-900 p-8">
      <div className="rounded-2xl p-8 w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Add New Note</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-200 text-md tracking-wide font-bold mb-2" htmlFor="headline">
                Headline
              </label>
              <input
                className="mt-4 appearance-none relative block w-md px-3 py-4 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60" id="headline"
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Note headline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-200 text-md tracking-wide font-bold mb-2" htmlFor="noteText">
                Note Content
              </label>
              <textarea
                className="mt-4 appearance-none relative block w-md px-3 py-4 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60 resize-none"
                id="noteText"
                name="noteText"
                value={formData.noteText}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your note here..."
                required
              ></textarea>
            </div>
            {/* readonly sec niche */}
            <div className="flex  gap-6 ">
              <div className="mb-4">
                <label className="block text-gray-200 text-md tracking-wide font-bold mb-2" htmlFor="teamName">
                  Team
                </label>
                <input
                  className="mt-4 appearance-none relative block w-xs px-3 py-4 border border-gray-700 placeholder-gray-400 text-white rounded-md bg-white/10"
                  id="teamName"
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-200 text-md tracking-wide font-bold mb-2" htmlFor="userName">
                  Your Name
                </label>
                <input
                  className="mt-4 appearance-none relative block w-xs px-3 py-4 border border-gray-700 placeholder-gray-400 text-white rounded-md bg-white/10"

                  id="userName"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-200 text-md tracking-wide font-bold mb-2" htmlFor="email">
                  Your Email
                </label>
                <input
                  className="mt-4 appearance-none relative block w-xs px-3 py-4 border border-gray-700 placeholder-gray-400 text-white rounded-md bg-white/10"
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>
            </div>

            {/* readonly h upar */}

            <div className="mt-10 flex gap-20 items-center">
              <button
                className="appearance-none relative block  px-2 py-2  text-black text-xl rounded-md bg-white"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Note'}
              </button>
              <button
                className="appearance-none relative block  px-2 py-2  text-black text-xl rounded-md bg-gray-300"
                type="button"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
