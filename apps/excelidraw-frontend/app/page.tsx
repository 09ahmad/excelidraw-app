"use client"

import { Pencil, Share2, Download, Users, Shapes, Palette, Router, } from 'lucide-react';
import { useState } from 'react';
import Link  from 'next/link';


function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
      <div className="h-12 w-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 py-8 sm:py-16 md:py-20 lg:py-28 lg:max-w-2xl lg:w-full">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Your ideas deserve</span>
                  <span className="block text-indigo-400">beautiful diagrams</span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create, collaborate, and share beautiful diagrams with our intuitive drawing tool. Perfect for wireframes, mind maps, and technical illustrations.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start drawing
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    {isAuthenticated ? <Link
                      href="dashboad"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-200 bg-indigo-900 hover:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </Link> : <Link href="signin"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-200 bg-indigo-900 hover:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </Link>  }
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-80"
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
            alt="Person drawing on tablet"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Everything you need to visualize your ideas
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Powerful features that make diagram creation a breeze
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Pencil}
              title="Intuitive Drawing"
              description="Freehand drawing tools with smart shape recognition for quick sketches and diagrams."
            />
            <FeatureCard
              icon={Share2}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, see changes as they happen."
            />
            <FeatureCard
              icon={Download}
              title="Export Options"
              description="Export your diagrams in multiple formats including PNG, SVG, and PDF."
            />
            <FeatureCard
              icon={Users}
              title="Team Workspace"
              description="Organize and manage your diagrams with team workspaces and permissions."
            />
            <FeatureCard
              icon={Shapes}
              title="Shape Library"
              description="Extensive library of shapes and components for any type of diagram."
            />
            <FeatureCard
              icon={Palette}
              title="Custom Styling"
              description="Customize colors, fonts, and styles to match your brand identity."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-900">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start creating?</span>
            <span className="block">Try it free today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            No credit card required. Start creating beautiful diagrams in seconds.
          </p>
          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
          >
            Get started for free
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;