import { useState, useRef } from 'react';
import { ArrowDown, MapPin, Calendar, BookOpen, Camera, Compass, Users, Menu, X, Send, MessageCircle } from 'lucide-react';
import heroImage from '@/assets/hero-monastery.jpg';
import { RitualCalendarPopup } from './RitualCalendarPopup';
import { ExplorePopup } from './ExplorePopup';
import { Button } from '@/components/ui/button';
import Footer from "@/components/common/Footer";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from "react-router-dom";

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export const HeroSection = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // ✅ Use Groq's OpenAI-compatible endpoint + a Groq model
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const MODEL = "llama-3.1-8b-instant"; // or "llama3-8b-8192"
  const API_KEY = "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";

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };

    // Build the final payload messages explicitly to avoid setState race conditions
    const systemMsg: ChatMessage = {
      role: "system",
      content:
        "You are Heritage Sikkim AI, a friendly local guide for Sikkim. Be concise, accurate, and helpful. " +
        "If asked 'where is Rumtek', note it's near Gangtok in East Sikkim, India; roughly 24 km by road. " +
        "Prefer factual, visitor-friendly answers."
    };
    const messagesToSend: ChatMessage[] = [systemMsg, ...messages, userMsg];

    // Optimistic UI
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: messagesToSend,
          temperature: 0.3,
          top_p: 0.9,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errText = data?.error?.message || `${response.status} ${response.statusText}`;
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: `Hmm, I ran into a problem: ${errText}` }
        ]);
      } else {
        // Groq uses the OpenAI-compatible schema
        const aiText: string =
          data?.choices?.[0]?.message?.content ??
          "Sorry, I couldn't respond.";
        setMessages(prev => [...prev, { role: "assistant", content: aiText }]);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: `Network error: ${String(err?.message || err)}` }
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleScrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Rumtek Monastery at golden hour with prayer flags and Himalayan backdrop"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-background/1" />
      </div>

      {/* Solid Navigation Bar */}
      <nav className="relative z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Monastery360
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setExploreOpen(true)}
                className="font-body hover:bg-primary hover:text-primary-foreground"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Explore
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setCalendarOpen(true)}
                className="font-body hover:bg-primary hover:text-primary-foreground"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Ritual Calendar
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-body hover:bg-primary hover:text-primary-foreground">
                    <Camera className="w-4 h-4 mr-2" />
                    Virtual Tours
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>360° Monastery Tours</DropdownMenuItem>
                  <DropdownMenuItem>Sacred Art Gallery</DropdownMenuItem>
                  <DropdownMenuItem>Architecture Views</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-body hover:bg-primary hover:text-primary-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Archives
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Digital Manuscripts</DropdownMenuItem>
                  <DropdownMenuItem>Historical Documents</DropdownMenuItem>
                  <DropdownMenuItem>Photo Collections</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

        <Button variant="ghost" className="font-body hover:bg-primary hover:text-primary-foreground">
          <Users className="w-4 h-4 mr-2" />
          Plan Visit
        </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
            Monastery360
          </h1>
          
          {/* Subtitle */}
          <div className="text-primary text-lg md:text-xl font-serif font-semibold mb-4">
            Sikkim's Sacred Heritage
          </div>
          
          {/* Tagline */}
          <p className="text-foreground text-xl md:text-2xl font-body font-semibold mb-12 max-w-2xl mx-auto">
            Journey Through 200+ Sacred Sanctuaries
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={handleScrollToContent}
              className="font-body hover:bg-white hover:text-primary transition-transform duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-xl min-w-[200px]"
            >
              Start Exploring
            </Button>
            <Button
              size="lg"
              variant="default"
              onClick={() => setExploreOpen(true)}
              className="font-body hover:bg-white hover:text-primary transition-transform duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-xl min-w-[200px]"
            >
              Browse Monasteries
            </Button>
            <Button
              size="lg"
              variant="default"
              onClick={() => navigate("/journey-planner")}
              className="font-body hover:bg-white hover:text-primary transition-transform duration-200 ease-in-out hover:scale-105 shadow-md hover:shadow-xl min-w-[200px]"
            >
              Highlights
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-gray-200 text-sm font-bold mb-2 font-body">
              Discover Sacred Spaces Below
            </p>
            <ArrowDown className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Chatbot Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition"
        onClick={() => setChatOpen(true)}
        aria-label="Open Heritage Sikkim AI Chatbot"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>

      {/* Chatbot Popup */}
      {chatOpen && (
        <div className="fixed bottom-24 right-8 z-50 bg-card border border-border rounded-xl shadow-2xl w-80 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary rounded-t-xl">
            <span className="font-bold text-lg text-white">Heritage Sikkim AI</span>
            <button onClick={() => setChatOpen(false)} aria-label="Close Chatbot">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex-1 px-4 py-2 overflow-y-auto max-h-72 space-y-2">
            {messages.length === 0 && (
              <div className="text-muted-foreground text-sm mt-4 text-center">
                Ask me anything about Sikkim's monasteries, rituals, or history!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${msg.role === "user" ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 text-sm bg-muted text-foreground animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>
          <form
            className="flex items-center px-4 py-3 border-t border-border bg-background rounded-b-xl"
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
          >
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-2 py-1 rounded bg-card border border-border focus:outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="ml-2 bg-primary rounded-full p-2 hover:bg-primary/80 transition"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>
      )}
      <Footer/>

      {/* Popups */}
      <RitualCalendarPopup isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
      <ExplorePopup isOpen={exploreOpen} onClose={() => setExploreOpen(false)} />
    </div>
  );
};
