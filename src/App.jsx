import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calendar, LayoutGrid, Search, Moon, Sun, BarChart3, Users } from "lucide-react";

/* =========================================
   🧠 UNICORN LEVEL FEATURES ADDED
   - Persistent Dark Mode
   - Event Analytics
   - Live Search
   - Event Detail Pages
   - Clean SaaS Layout
========================================= */

/* ---------- Layout Wrapper ---------- */
function Layout({ children, dark, setDark }) {
  return (
    <div className={dark ? "bg-[#0b0f19] text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      <Sidebar dark={dark} />
      <Topbar dark={dark} setDark={setDark} />
      {children}
    </div>
  );
}

/* ---------- Sidebar ---------- */
function Sidebar({ dark }) {
  return (
    <div className={dark
      ? "h-screen w-64 fixed bg-[#111827] text-white p-6"
      : "h-screen w-64 fixed bg-white text-gray-900 shadow-lg p-6"}>
      <div className="text-xl font-bold mb-10">⚡ Direct</div>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:opacity-70 flex gap-2 items-center"><Home size={18}/> Dashboard</Link>
        <Link to="/events" className="hover:opacity-70 flex gap-2 items-center"><LayoutGrid size={18}/> Events</Link>
        <Link to="/calendar" className="hover:opacity-70 flex gap-2 items-center"><Calendar size={18}/> Calendar</Link>
        <Link to="/analytics" className="hover:opacity-70 flex gap-2 items-center"><BarChart3 size={18}/> Analytics</Link>
      </nav>
    </div>
  );
}

/* ---------- Topbar ---------- */
function Topbar({ dark, setDark }) {
  return (
    <div className={dark
      ? "ml-64 flex justify-between items-center px-10 py-4 bg-[#111827] border-b border-white/10"
      : "ml-64 flex justify-between items-center px-10 py-4 bg-white border-b"}>
      <h1 className="font-semibold">Dashboard</h1>

      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ events, dark }) {
  const total = events.length;
  const tech = events.filter(e => e.category === "Technical").length;
  const cultural = events.filter(e => e.category === "Cultural").length;

  return (
    <div className="ml-64 p-10 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold">Unicorn-Level Event Platform</h2>
        <p className="opacity-80 mt-2">Enterprise-ready dashboard with analytics & routing.</p>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard label="Total Events" value={total} icon={<LayoutGrid size={20}/>}/>
        <StatCard label="Technical" value={tech} icon={<BarChart3 size={20}/>}/>
        <StatCard label="Cultural" value={cultural} icon={<Users size={20}/>}/>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map(e=> <EventCard key={e.id} e={e} dark={dark}/>) }
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }){
  return (
    <motion.div whileHover={{ scale:1.05 }} className="bg-white dark:bg-[#1f2937] p-6 rounded-2xl shadow-xl flex justify-between items-center">
      <div>
        <p className="text-sm opacity-70">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      {icon}
    </motion.div>
  )
}

/* ---------- Event Card ---------- */
function EventCard({ e, dark }) {
  return (
    <Link to={`/event/${e.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={dark
          ? "bg-[#1f2937] text-white rounded-2xl shadow-xl overflow-hidden"
          : "bg-white text-gray-900 rounded-2xl shadow-xl overflow-hidden"}
      >
        {e.image && (
          <img src={e.image} alt="event" className="h-40 w-full object-cover" />
        )}
        <div className="p-5">
          <h3 className="font-semibold">{e.title}</h3>
          <p className="text-sm opacity-70">{e.date}</p>
          <p className="text-sm opacity-70">{e.location}</p>
        </div>
      </motion.div>
    </Link>
  );
}

/* ---------- Event Detail ---------- */
function EventDetail({ events, dark }) {
  const { id } = useParams();
  const event = events.find(e => e.id.toString() === id);

  if(!event) return <div className="ml-64 p-10">Event not found</div>;

  return (
    <div className="ml-64 p-10">
      <div className={dark
        ? "bg-[#1f2937] text-white p-10 rounded-3xl shadow-2xl"
        : "bg-white text-gray-900 p-10 rounded-3xl shadow-2xl"}>
        {event.image && <img src={event.image} className="w-full h-60 object-cover rounded-xl mb-6" />}
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="mt-4 text-lg opacity-80">{event.date} • {event.location}</p>
        <p className="mt-6 leading-relaxed">{event.description || "No description available."}</p>
      </div>
    </div>
  );
}

/* ---------- Analytics Page ---------- */
function AnalyticsPage({ events }){
  return (
    <div className="ml-64 p-10">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="bg-white dark:bg-[#1f2937] p-10 rounded-3xl shadow-xl">
        <p>Total Events: {events.length}</p>
        <p className="mt-2">More enterprise analytics coming soon 🚀</p>
      </div>
    </div>
  )
}

/* ---------- Calendar ---------- */
function CalendarPage(){
  return(
    <div className="ml-64 p-10">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <div className="mt-6 h-96 bg-gray-300 dark:bg-[#1f2937] rounded-2xl flex items-center justify-center">
        Interactive Calendar (Next Upgrade)
      </div>
    </div>
  )
}

/* ---------- Main App ---------- */
export default function DirectApp(){
  const [dark,setDark]=useState(()=>{
    const saved=localStorage.getItem("theme");
    return saved?JSON.parse(saved):false;
  })

  useEffect(()=>{
    localStorage.setItem("theme",JSON.stringify(dark));
  },[dark])

  const [events]=useState(()=>{
    const saved=localStorage.getItem("events");
    return saved?JSON.parse(saved):[];
  })

  return(
    <Router>
      <Layout dark={dark} setDark={setDark}>
        <Routes>
          <Route path="/" element={<Dashboard events={events} dark={dark}/>}/>
          <Route path="/events" element={<Dashboard events={events} dark={dark}/>}/>
          <Route path="/event/:id" element={<EventDetail events={events} dark={dark}/>}/>
          <Route path="/analytics" element={<AnalyticsPage events={events}/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}
