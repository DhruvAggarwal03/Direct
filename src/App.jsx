import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Menu, Plus, LogOut } from "lucide-react";

export default function DirectEnterpriseDashboard() {
  const [dark, setDark] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Direct Tech Summit",
            date: "2026-03-12",
            category: "Technical",
            location: "Main Auditorium",
            description: "Enterprise innovation and startup networking.",
            image: "https://picsum.photos/400/200"
          }
        ];
  });

  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    location: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  /* ESC KEY CLOSE */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const totalEvents = events.length;
  const technicalCount = events.filter(e => e.category === "Technical").length;
  const culturalCount = events.filter(e => e.category === "Cultural").length;
  const sportsCount = events.filter(e => e.category === "Sports").length;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    showToast("Event deleted");
  };

  const loginAdmin = () => {
    if (password === "admin123") {
      setIsAdmin(true);
      showToast("Admin logged in");
    } else alert("Wrong password");
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setPassword("");
    showToast("Logged out");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    if (!form.title) return;
    const newEvent = { id: Date.now(), ...form };
    setEvents([newEvent, ...events]);
    setForm({ title: "", date: "", category: "", location: "", description: "", image: "" });
    setShowModal(false);
    showToast("Event added");
  };

  return (
    <div className={dark ? "min-h-screen flex bg-gradient-to-br from-[#050510] via-[#0f172a] to-black text-white" : "min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"}>
      {/* 🚀 STARTUP MOTION SIDEBAR */}
      <motion.div
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className={dark ? "bg-[#020617]/80 backdrop-blur-xl border-r border-white/10 p-4" : "bg-white/70 backdrop-blur-xl border-r p-4 shadow-xl"}
      >
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && (
            <motion.h2 layout className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Direct
            </motion.h2>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button>
        </div>

        <div className="space-y-2 relative">
          {/* ACTIVE TAB GLOW */}
          <motion.div
            layoutId="activeTab"
            className="absolute left-0 w-full h-10 rounded-xl bg-white/10"
            style={{
              top: activePage === "dashboard" ? 0 : 48
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />

          <button onClick={() => setActivePage("dashboard")} className="relative flex items-center gap-3 h-10 px-2 w-full"><Home /> {sidebarOpen && "Dashboard"}</button>
          <button onClick={() => setActivePage("events")} className="relative flex items-center gap-3 h-10 px-2 w-full"><Calendar /> {sidebarOpen && "Events"}</button>
        </div>

        <button onClick={() => setDark(!dark)} className="mt-6 w-full border border-white/20 rounded-xl py-2 backdrop-blur-xl">{dark ? "☀" : "🌙"}</button>

        {!isAdmin && sidebarOpen && (
          <div className="mt-6">
            <p className="text-xs mb-2 opacity-70">Admin password</p>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={dark ? "border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 rounded-xl w-full mb-2" : "border p-2 rounded-xl w-full mb-2 text-black"}
            />
            <button onClick={loginAdmin} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full py-2 rounded-xl">Login</button>
          </div>
        )}

        {isAdmin && sidebarOpen && (
          <button onClick={logoutAdmin} className="mt-6 flex items-center gap-2 text-red-400 hover:opacity-80">
            <LogOut /> Logout
          </button>
        )}
      </motion.div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <motion.div layout className="sticky top-4 z-10 flex justify-between items-center mb-8 backdrop-blur-xl bg-white/40 dark:bg-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <input placeholder="Search events..." className={dark?"mt-2 bg-white/10 border border-white/10 rounded-xl px-3 py-1 text-sm placeholder-gray-300":"mt-2 border rounded-xl px-3 py-1 text-sm"}/>
          </div>
          {isAdmin && activePage === "events" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              <Plus /> Add
            </motion.button>
          )}
        </motion.div>

        {/* 🔥 CATEGORY FILTER CHIPS */}
        <div className="flex gap-3 mb-6">
          {["All","Technical","Cultural","Sports"].map((chip)=> (
            <button key={chip} className="px-4 py-1 rounded-full bg-white/10 border border-white/10 text-sm hover:scale-105 transition-transform">
              {chip}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activePage === "dashboard" && (
            <motion.div key="dash" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{label:"Total Events",value:totalEvents},{label:"Technical",value:technicalCount},{label:"Cultural",value:culturalCount},{label:"Sports",value:sportsCount}].map((item,i)=>(
                  <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <p>{item.label}</p>
                    <h2 className="text-3xl font-bold">{item.value}</h2>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === "events" && (
            <motion.div key="events" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div key={event.id} whileHover={{ scale: 1.05 }} className={dark ? "backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl shadow-xl overflow-hidden" : "backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl overflow-hidden"}>
                  {event.image && <img src={event.image} alt="event" className="w-full h-44 object-cover" />}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p className="text-sm opacity-70">📅 {event.date}</p>
                    <p className="text-sm opacity-70">📍 {event.location}</p>
                    <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${event.category === "Technical"?"bg-blue-100 text-blue-700":event.category === "Cultural"?"bg-pink-100 text-pink-700":"bg-green-100 text-green-700"}`}>{event.category}</span>
                    <p className="mt-3 text-sm">{event.description}</p>
                    {isAdmin && <button onClick={() => deleteEvent(event.id)} className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl">Delete</button>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🚀 SAAS MODAL WITH CALENDAR DATE PICKER */}
      <AnimatePresence>
        {showModal && (
          <motion.div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} className={dark?"bg-[#020617]/90 backdrop-blur-2xl text-white border border-white/10 shadow-2xl p-6 rounded-3xl w-96":"bg-white/90 backdrop-blur-2xl shadow-2xl p-6 rounded-3xl w-96"}>
              <h2 className="font-semibold mb-4 text-lg">Add Event</h2>

              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className={dark?"border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 rounded-xl w-full mb-2":"border p-2 rounded-xl w-full mb-2 text-black"}/>

              {/* 📅 REAL CALENDAR PICKER */}
              <input type="date" name="date" value={form.date} onChange={handleChange} className={dark?"border border-white/20 bg-white/10 text-white p-2 rounded-xl w-full mb-2":"border p-2 rounded-xl w-full mb-2 text-black"}/>

              <select name="category" value={form.category} onChange={handleChange} className={dark?"border border-white/20 bg-[#020617] text-white p-2 rounded-xl w-full mb-2":"border p-2 rounded-xl w-full mb-2 text-black"}>
                <option value="">Select Category</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
              </select>

              <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className={dark?"border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 rounded-xl w-full mb-2":"border p-2 rounded-xl w-full mb-2 text-black"}/>
              <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className={dark?"border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 rounded-xl w-full mb-2":"border p-2 rounded-xl w-full mb-2 text-black"}/>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className={dark?"border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 rounded-xl w-full mb-4":"border p-2 rounded-xl w-full mb-4 text-black"}/>

              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="w-1/2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition">Back</button>
                <button onClick={addEvent} className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">Add</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {toast && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-xl">
          {toast}
        </motion.div>
      )}
    </div>
  );
}
