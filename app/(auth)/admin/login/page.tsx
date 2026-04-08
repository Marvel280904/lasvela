"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import apiClient from "@/lib/axiosClient"
import { toast } from "sonner"
import Cookies from "js-cookie"

export default function LoginPage() {
  const router = useRouter()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      })

      if (response.status === 200 && response.data?.success) {
        
        // AMBIL ACCESS TOKEN & REFRESH TOKEN
        const accessToken = response.data.data.accessToken || response.data.data.token;
        const refreshToken = response.data.data.refreshToken;

        if (accessToken) {
            // SIMPAN KEDUA TOKEN KE COOKIE
            Cookies.set("admin_token", accessToken, { expires: 1, secure: true, sameSite: 'strict' });
            
            // Refresh Token
            if (refreshToken) {
                Cookies.set("admin_refresh_token", refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
            }
            
            toast.success("Login successful")
            
            window.location.href = "/admin";
        } else {
            setError("Token not found in response")
        }

      } else {
        setError(response.data?.message || "Invalid credentials")
      }
    } catch (err: any) {
      console.error("Login failed:", err)
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl text-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold font-jakarta text-white">ESSEN Admin</CardTitle>
          <CardDescription className="font-jakarta text-gray-200">
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-jakarta text-white">Email</Label>
              <Input 
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50"
                placeholder="admin@lasvela.sg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-jakarta">Password</Label>
              <Input
                id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 font-bold tracking-wide" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}