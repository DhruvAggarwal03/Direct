import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, LayoutDashboard } from "lucide-react";

/* 🚀 PUBLIC NAVBAR */
function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
      <h2 className="font-bold text-lg">Direct Event Portal</h2>
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/admin" className="px-3 py-1 rounded-xl bg-black text-white">Admin</Link>
      </div>
    </div>
  );
}

/* 🏠 PUBLIC HOME PAGE */
function HomePage({ events }) {
  return (
    <div>
      {/* HERO */}
      <div className="h-[70vh] flex flex-col justify-center px-10 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold">
          Campus Events, Simplified
        </motion.h1>
        <p className="mt-4 opacity-80 max-w-xl">Your one‑stop hub for everything happening on campus.</p>
        <div className="flex gap-4 mt-6">
          <Link to="/events" className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold">Explore Events</Link>
          <Link to="/calendar" className="px-6 py-3 rounded-xl border border-white">View Calendar</Link>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="px-10 py-14">
        <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Academic", "Cultural", "Sports", "Technical"].map((c) => (
            <motion.div key={c} whileHover={{ scale: 1.05 }} className="h-40 rounded-2xl bg-gray-200 flex items-center justify-center font-semibold">
              {c}
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED EVENTS */}
      <div className="px-10 pb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((e) => (
            <motion.div key={e.id} whileHover={{ y: -5 }} className="rounded-2xl shadow-lg overflow-hidden bg-white">
              {e.image && <img src={e.image} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-sm opacity-70">{e.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 📅 EVENTS PAGE */
function EventsPage({ events }) {
  return (
    <div className="px-10 py-12">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((e) => (
          <motion.div key={e.id} whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {e.image && <img src={e.image} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <h2 className="font-semibold">{e.title}</h2>
              <p className="text-sm opacity-70">{e.date}</p>
              <p className="text-sm opacity-70">{e.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 🗓️ CALENDAR PAGE */
function CalendarPage() {
  return (
    <div className="px-10 py-12">
      <h1 className="text-3xl font-bold">Calendar View</h1>
      <div className="mt-6 h-96 rounded-2xl bg-gray-200 flex items-center justify-center">
        Calendar Coming Soon 🚀
      </div>
    </div>
  );
}

/* 🛠️ EXISTING ADMIN DASHBOARD (SIMPLIFIED PLACEHOLDER) */
function AdminDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="opacity-70 mt-2">Your existing Direct dashboard continues here.</p>
    </div>
  );
}

/* 🚀 MAIN APP WITH ROUTER */
export default function DirectApp() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <Router>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage events={events} />} />
          <Route path="/events" element={<EventsPage events={events} />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
