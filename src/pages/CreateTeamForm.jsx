import React, { useEffect, useState } from 'react'

function CreateTeamForm() {
    const [formData, setFormData] = useState({
        teamName: '',
        userName: '',
        email: '',
        teamCode: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user')
            if (!raw) return
            const user = JSON.parse(raw)
            setFormData(prev => ({
                ...prev,
                userName: user?.fullname || user?.name || prev.userName,
                email: user?.email || prev.email,
            }))
        } catch (_error) {
            console.log("error ", error)
            throw new error;
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await fetch('http://localhost:3000/api/teams/create-team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('team', JSON.stringify(data.team))
                
                setSuccess('Team created successfully! You are now the admin.')
                
                setFormData({
                    teamName: '',
                    userName: '',
                    email: '',
                    teamCode: '',
                    description: ''
                })
                
                setTimeout(() => {
                    window.location.href = `/team/${encodeURIComponent(team.name)}`
                }, 1000)
            } else {
                setError(data.error || 'Failed to create team')
            }
        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 00 to-gray-900 flex items-center justify-center p-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white">
                        Create a new team
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        You will become the admin of this team
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="teamName" className="px-2 block text-sm font-medium text-gray-300">
                                Team Name
                            </label>
                            <input
                                id="teamName"
                                name="teamName"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                                placeholder="Enter team name"
                                value={formData.teamName}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="userName" className="px-2 block text-sm font-medium text-gray-300">
                                Your Name
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                                placeholder="Enter your name"
                                value={formData.userName}
                                onChange={handleChange}
                                readOnly
                                aria-readonly="true"
                                title="Filled from your account"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="px-2 block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly
                                aria-readonly="true"
                                title="Filled from your account"
                            />
                        </div>

                        <div>
                            <label htmlFor="teamCode" className="px-2 block text-sm font-medium text-gray-300">
                            team code
                            </label>
                            <input
                                id="teamCode"
                                name="teamCode"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                                placeholder="Create your team code"
                                value={formData.teamCode}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className=" px-2 block text-sm font-medium text-gray-300">
                                Team Description (Optional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                className="mt-1 appearance-none relative block resize-none w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-900/60"
                                placeholder="Describe your team"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-400 text-sm text-center">
                            {success}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full cursor-pointer capitalize bg-gray-900 hover:bg--700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-95 shadow-lg disabled:opacity-50"
                        >
                            {loading ? 'Creating Team...' : 'Create Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTeamForm