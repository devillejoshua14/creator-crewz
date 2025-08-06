import Link from 'next/link'
import { ArrowRight, Users, Briefcase, Shield, Star, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Creator Crewz</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your Dream
              <span className="block text-yellow-300">Content Team</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Connect with talented professionals for your content creation needs. 
              From video editors to graphic designers, find the perfect match for your projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup?role=creator" 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center"
              >
                Hire Talent
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/auth/signup?role=talent" 
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold border border-white/30"
              >
                Join as Talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Creator Crewz?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamlined hiring process with secure payments and quality assurance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Talent Pool</h3>
              <p className="text-gray-600">
                Access pre-vetted professionals with proven track records in content creation
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Escrow</h3>
              <p className="text-gray-600">
                Safe payment processing with funds held in escrow until project completion
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Hiring</h3>
              <p className="text-gray-600">
                One-off projects or long-term partnerships - choose what works for you
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Review system ensures you only work with the best talent
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Matching</h3>
              <p className="text-gray-600">
                Advanced filtering to find the perfect match for your project needs
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Management</h3>
              <p className="text-gray-600">
                Built-in tools to manage your creative team and track project progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of content creators who trust Creator Crewz for their hiring needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup?role=creator" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Start Hiring Today
            </Link>
            <Link 
              href="/auth/signup?role=talent" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Join as Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Creator Crewz</h3>
            <p className="text-gray-400 mb-6">
              Connecting content creators with talented professionals
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
