'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Zap, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-black dark:text-white" />
              <span className="text-xl font-bold text-black dark:text-white">
                EmployeeTrack
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={() => window.location.href = '/login'}
              >
                Login
              </Button>
              <Button
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                onClick={() => window.location.href = '/signup'}
              >
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 tracking-tight">
            Manage Your Team
            <br />
            <span className="text-gray-600 dark:text-gray-400">Effortlessly</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A modern, streamlined employee management system designed for efficiency.
            Add, edit, search, and organize your workforce in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => window.location.href = '/signup'}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful features to help you manage your employees efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-black dark:hover:border-white transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white dark:text-black" />
              </div>
              <CardTitle className="text-black dark:text-white">
                Employee Management
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Add, edit, and delete employee records with ease. Keep all information organized.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 2 */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-black dark:hover:border-white transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white dark:text-black" />
              </div>
              <CardTitle className="text-black dark:text-white">
                Lightning Fast
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Real-time search and instant updates. No waiting, no delays.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 3 */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-black dark:hover:border-white transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white dark:text-black" />
              </div>
              <CardTitle className="text-black dark:text-white">
                Secure Storage
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Your data is safely stored with MongoDB. Reliable and scalable.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 4 */}
          <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-black dark:hover:border-white transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white dark:text-black" />
              </div>
              <CardTitle className="text-black dark:text-white">
                Simple & Clean
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Intuitive interface that anyone can use. No training required.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12">
            Why Choose EmployeeTrack?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-black dark:text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  No Learning Curve
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start managing employees immediately with our intuitive interface
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-black dark:text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  Built for Speed
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimized performance ensures your data loads instantly
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-black dark:text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  Modern Technology
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Built with Next.js, TypeScript, and MongoDB for reliability
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-black dark:text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  Fully Responsive
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access your employee data from any device, anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-black dark:bg-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 dark:text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Join organizations using EmployeeTrack to manage their workforce efficiently
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
            onClick={() => window.location.href = '/signup'}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Users className="h-6 w-6 text-black dark:text-white" />
              <span className="font-semibold text-black dark:text-white">
                EmployeeTrack
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 EmployeeTrack. Built with Next.js & MongoDB.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}