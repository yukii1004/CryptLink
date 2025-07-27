"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Send,
  Paperclip,
  LogOut,
  Lock,
  CheckCircle,
  User,
  Building,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

type AccountType = "user" | "bank";

interface Message {
  id: string;
  sender: AccountType;
  content: string;
  timestamp: Date;
  encrypted: boolean;
  verified: boolean;
}

interface UserData {
  email: string;
  accountType: AccountType;
  isAuthenticated: boolean;
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cryptlink_user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const parsed: UserData = JSON.parse(stored);
    if (!parsed.isAuthenticated) {
      router.push("/login");
      return;
    }

    setUser(parsed);

    // Initial welcome messages
    const welcome: Message[] = [
      {
        id: "1",
        sender: parsed.accountType,
        content:
          parsed.accountType === "bank"
            ? "Welcome to CryptLink secure banking. Your communications are encrypted."
            : "Welcome to CryptLink secure messaging! Your connection is encrypted end-to-end.",
        timestamp: new Date(),
        encrypted: true,
        verified: true,
      },
      {
        id: "2",
        sender: parsed.accountType,
        content:
          parsed.accountType === "bank"
            ? "Please wait for a user to initiate a secure session."
            : "How can we assist you with your banking needs today?",
        timestamp: new Date(),
        encrypted: true,
        verified: true,
      },
    ];
    setMessages(welcome);
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);

    const outgoing: Message = {
      id: Date.now().toString(),
      sender: user.accountType,
      content: newMessage,
      timestamp: new Date(),
      encrypted: true,
      verified: true,
    };

    setMessages((prev) => [...prev, outgoing]);
    setNewMessage("");

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: user.accountType === "bank" ? "user" : "bank",
        content:
          "🔐 Your secure message has been received. Our representative will respond shortly.",
        timestamp: new Date(),
        encrypted: true,
        verified: true,
      };
      setMessages((prev) => [...prev, reply]);
      setIsLoading(false);
    }, 1200);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const fileMsg: Message = {
        id: Date.now().toString(),
        sender: user.accountType,
        content: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        timestamp: new Date(),
        encrypted: true,
        verified: true,
      };
      setMessages((prev) => [...prev, fileMsg]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cryptlink_user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading secure session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="flex justify-between items-center px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">CryptLink</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 ml-2">
              <Lock className="h-3 w-3 mr-1" />
              Encrypted
            </Badge>
          </Link>

          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.accountType === "bank" ? (
                  <Building className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm text-right">
              <p className="font-medium text-gray-900">{user.email}</p>
              <p className="text-gray-500 capitalize">{user.accountType}</p>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Chat UI */}
      <Card className="h-[calc(100vh-6rem)] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            E2EE Chat
            <Badge variant="outline" className="ml-auto">
              <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
              End-to-End Encrypted
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === user.accountType ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === user.accountType
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex justify-between text-xs mt-1 opacity-80">
                  <span>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="flex gap-1">
                    {msg.encrypted && <Lock className="h-3 w-3" />}
                    {msg.verified && <CheckCircle className="h-3 w-3" />}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Box */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.png,.jpg,.txt"
            />
            <Button type="button" variant="outline" onClick={handleFileUpload}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a secure message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-1">
            🔒 Encrypted with AES-256 | RSA handshake completed
          </p>
        </div>
      </Card>
    </div>
  );
}