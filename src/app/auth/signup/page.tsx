'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, User, Briefcase } from 'lucide-react'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') as 'creator' | 'talent' | null
  const [selectedRole, setSelectedRole] = useState<'creator' | 'talent' | null>(defaultRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    setIsLoading(true)
    // TODO: Implement signup logic with Supabase
    console.log('Signup:', { email, password, role: selectedRole })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Create Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!selectedRole ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Choose your role
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Select how you'll be using Creator Crewz
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setSelectedRole('creator')}
                  className="relative p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Content Creator</h3>
                      <p className="text-sm text-gray-600">
                        I want to hire talent for my content creation projects
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedRole('talent')}
                  className="relative p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Talent</h3>
                      <p className="text-sm text-gray-600">
                        I want to offer my services to content creators
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        *Invite only for MVP
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  selectedRole === 'creator' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {selectedRole === 'creator' ? (
                    <User className="h-6 w-6 text-blue-600" />
                  ) : (
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Sign up as {selectedRole === 'creator' ? 'Content Creator' : 'Talent'}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-blue-600 hover:text-blue-500 mt-2"
                >
                  Change role
                </button>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {selectedRole === 'talent' && (
                <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-orange-800">
                        Invite Only
                      </h3>
                      <div className="mt-2 text-sm text-orange-700">
                        <p>
                          Talent registration is currently invite-only for our MVP. 
                          Please contact us to get an invitation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading || selectedRole === 'talent'}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    selectedRole === 'talent' 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
} 