"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, MessageSquare, FileCheck, Users, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-4 py-20 text-center bg-gradient-to-br from-slate-100 to-blue-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            CryptLink
            <span className="block text-blue-600 mt-2">E2EE Chat Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            CryptLink provides end-to-end encrypted communication between banks and customers, ensuring your sensitive
            financial information remains private and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl text-white px-8 py-7">
                Start Secure Messaging
              </Button>
            </Link>
            <button onClick={() => {document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });}}
  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-xl bg-transparent rounded-lg border-2 transition-colors duration-200"
>
  Go to Features
</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="h-screen flex flex-col justify-center items-center">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Bank-Grade Security Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform implements encryption and security protocols to protect your financial
            communications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Lock className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl">End-to-End Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Messages are encrypted using AES-256 encryption, ensuring only you and your bank can read them.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <FileCheck className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-xl">Message Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Cryptographic signatures ensure messages cannot be modified without detection.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle className="text-xl">Identity Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Digital signatures verify the authenticity of every message sender.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle className="text-xl">Replay Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Advanced nonce and timestamp mechanisms prevent replay attacks.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle className="text-xl">Secure File Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Share sensitive documents with the same level of encryption as messages.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle className="text-xl">Multi-Party Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Secure communication between Customers and Banks.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center bg-gray-900 text-white py-4 px-8">
        <div className="flex items-center justify-center">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold ml-2">CryptLink</span>
        </div>
        <div className="text-center">
          <p>©2025 CryptLink. All rights reserved.</p>
        </div>
        <div className="text-center text-gray-400">
          <p className="text-xl">Built with ❤️ by Nitin Karthick.</p>
        </div>
      </footer>
    </div>
  )
}