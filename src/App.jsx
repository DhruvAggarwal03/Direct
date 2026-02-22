import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calendar, LayoutGrid, Search, Sparkles } from "lucide-react";

/* =========================================
   🚀 YC SERIES‑A SIDEBAR LAYOUT
========================================= */
function Sidebar(){
  return(
    <div className="h-screen w-64 fixed left-0 top-0 bg-gradient-to-b from-[#020617] to-[#0f172a] text-white flex flex-col p-6 gap-6 shadow-2xl">
      <div className="text-xl font-bold flex items-center gap-2">
        ⚡ Direct
      </div>

      <nav className="flex flex-col gap-3 mt-6">
        <Link to="/" className="flex gap-3 items-center hover:bg-white/10 p-3 rounded-xl transition"><Home size={18}/> Dashboard</Link>
        <Link to="/events" className="flex gap-3 items-center hover:bg-white/10 p-3 rounded-xl transition"><LayoutGrid size={18}/> Events</Link>
        <Link to="/calendar" className="flex gap-3 items-center hover:bg-white/10 p-3 rounded-xl transition"><Calendar size={18}/> Calendar</Link>
        <Link to="/admin" className="flex gap-3 items-center hover:bg-white/10 p-3 rounded-xl transition"><Sparkles size={18}/> Admin</Link>
      </nav>
    </div>
  )
}

/* =========================================
   🧊 TOP GLASS BAR (SERIES‑A STYLE)
========================================= */
function Topbar(){
  return(
    <div className="ml-64 sticky top-0 z-40 backdrop-blur-xl bg-white/60 dark:bg-black/40 border-b px-10 py-4 flex justify-between items-center">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 dark:bg-neutral-900 shadow-inner">
        <Search size={16}/>
        <input placeholder="Search Direct..." className="bg-transparent outline-none text-sm"/>
      </div>
    </div>
  )
}

/* =========================================
   🌌 SERIES‑A HERO PANEL
========================================= */
function HeroPanel(){
  return(
    <motion.div
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      className="rounded-3xl p-10 text-white bg-gradient-to-br from-[#1e3a8a] via-[#4338ca] to-[#020617] shadow-2xl relative overflow-hidden"
    >
      <h2 className="text-4xl font-bold">Campus Events, Simplified</h2>
      <p className="opacity-80 mt-4 max-w-xl">A YC Series‑A level dashboard for managing and discovering events.</p>
      <motion.div
        animate={{opacity:[0.3,0.7,0.3]}}
        transition={{repeat:Infinity,duration:5}}
        className="absolute w-72 h-72 bg-purple-500/30 blur-[100px] -top-20 -right-20 rounded-full"
      />
    </motion.div>
  )
}

/* =========================================
   ⭐ SERIES‑A EVENT CARD
========================================= */
function EventCard({e}){
  return(
    <motion.div
      whileHover={{y:-6,scale:1.02}}
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden"
    >
      {e.image && <img src={e.image} className="h-40 w-full object-cover"/>}
      <div className="p-5">
        <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-500 rounded-full">{e.category}</span>
        <h3 className="font-semibold mt-2">{e.title}</h3>
        <p className="text-sm opacity-70">{e.date}</p>
        <p className="text-sm opacity-70">{e.location}</p>
      </div>
    </motion.div>
  )
}

/* =========================================
   🏠 DASHBOARD PAGE
========================================= */
function Dashboard({events}){
  return(
    <div className="ml-64 p-10 space-y-10">
      <HeroPanel/>

      <div>
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map(e=> <EventCard key={e.id} e={e}/>) }
        </div>
      </div>
    </div>
  )
}

/* =========================================
   📅 EVENTS PAGE
========================================= */
function EventsPage({events}){
  return(
    <div className="ml-64 p-10">
      <h1 className="text-4xl font-bold mb-8">All Events</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {events.map(e=> <EventCard key={e.id} e={e}/>) }
      </div>
    </div>
  )
}

/* =========================================
   🗓️ CALENDAR PAGE
========================================= */
function CalendarPage(){
  return(
    <div className="ml-64 p-10">
      <h1 className="text-4xl font-bold">Calendar</h1>
      <div className="mt-10 h-96 rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
        Series‑A Interactive Calendar Coming 🚀
      </div>
    </div>
  )
}

/* =========================================
   ADMIN PAGE
========================================= */
function AdminDashboard(){
  return(
    <div className="ml-64 p-10">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <p className="opacity-70 mt-4">Manage Direct like a real startup tool.</p>
    </div>
  )
}

/* =========================================
   🚀 MAIN APP — SERIES A ARCHITECTURE
========================================= */
export default function DirectApp(){
  const [events,setEvents]=useState(()=>{
    const saved=localStorage.getItem("events");
    return saved?JSON.parse(saved):[];
  })

  useEffect(()=>{
    localStorage.setItem("events",JSON.stringify(events));
  },[events])

  return(
    <Router>
      <Sidebar/>
      <Topbar/>
      <Routes>
        <Route path="/" element={<Dashboard events={events}/>}/>
        <Route path="/events" element={<EventsPage events={events}/>}/>
        <Route path="/calendar" element={<CalendarPage/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  )
}
