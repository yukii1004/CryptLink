"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user data in localStorage (in a real app, this would be handled by your backend)
    localStorage.setItem(
      "cryptlink_user",
      JSON.stringify({
        email: formData.email,
        accountType: formData.accountType,
        isAuthenticated: true,
      }),
    )

    setIsLoading(false)
    router.push("/chat")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between text-center mb-4">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-6 w-6" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-3xl font-extrabold text-gray-900">CryptLink</span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription className="text-lg">Create your secure CryptLink account to start encrypted messaging</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-xl">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full text-xl py-4 px-6"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="password" className="text-xl">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="w-full text-xl py-4 px-6"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="confirmPassword" className="text-xl">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="w-full text-xl py-4 px-6"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="accountType" className="text-xl">Account Type</Label>
                <Select onValueChange={(value) => handleInputChange("accountType", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Customer</SelectItem>
                    <SelectItem value="bank">Bank Representative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-base text-gray-700">
                Already have an account?{" "}
                <Link href={formData.accountType === 'user' ? '/chat' : '/queue'} className="text-blue-700 hover:text-blue-800 font-semibold text-lg">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            <br />
            Your data is protected with bank-grade encryption.
          </p>
        </div>
      </div>
    </div>
  )
}
