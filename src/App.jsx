import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, BarChart3, Menu, Bell, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
            date: "12 March 2026",
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

  const analyticsData = [
    { name: "Jan", value: events.length + 1 },
    { name: "Feb", value: events.length + 2 },
    { name: "Mar", value: events.length + 3 },
    { name: "Apr", value: events.length + 4 }
  ];

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
    <div className={dark ? "min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-black text-white" : "min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"}>
      {/* Sidebar */}
      <motion.div animate={{ width: sidebarOpen ? 260 : 80 }} className={dark ? "bg-black/60 backdrop-blur-xl border-r border-white/10 p-4" : "bg-white/70 backdrop-blur-xl border-r p-4 shadow-xl"}>
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Direct</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button>
        </div>

        <div className="space-y-4">
          <button onClick={() => setActivePage("dashboard")} className="flex items-center gap-3"><Home /> {sidebarOpen && "Dashboard"}</button>
          <button onClick={() => setActivePage("events")} className="flex items-center gap-3"><Calendar /> {sidebarOpen && "Events"}</button>
          <button onClick={() => setActivePage("analytics")} className="flex items-center gap-3"><BarChart3 /> {sidebarOpen && "Analytics"}</button>
        </div>

        <button onClick={() => setDark(!dark)} className="mt-6 w-full border rounded-xl py-2">{dark ? "☀" : "🌙"}</button>

        {!isAdmin && sidebarOpen && (
          <div className="mt-6">
            <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-xl w-full mb-2 text-black" />
            <button onClick={loginAdmin} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full py-2 rounded-xl">Login</button>
          </div>
        )}
      </motion.div>

      {/* Main */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 backdrop-blur-xl bg-white/40 dark:bg-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <h1 className="text-2xl font-bold">Direct Elite Suite</h1>
          <div className="flex items-center gap-4">
            {isAdmin && activePage === "events" && (
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Plus /> Add
              </button>
            )}
            <Bell />
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activePage === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {["Total Events", "Users", "Growth"].map((item, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <p>{item}</p>
                    <h2 className="text-3xl font-bold">{events.length}</h2>
                  </motion.div>
                ))}
              </div>

              {/* Elite Chart */}
              <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-xl">
                <h2 className="mb-4 font-semibold">Growth Analytics</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analyticsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {activePage === "events" && (
            <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div key={event.id} whileHover={{ scale: 1.05 }} className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl overflow-hidden">
                  {event.image && <img src={event.image} alt="event" className="w-full h-44 object-cover" />}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p className="text-sm opacity-70">📅 {event.date}</p>
                    <p className="text-sm opacity-70">📍 {event.location}</p>
                    <p className="mt-3 text-sm">{event.description}</p>
                    {isAdmin && <button onClick={() => deleteEvent(event.id)} className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl">Delete</button>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activePage === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-xl">
              <p className="text-lg">📈 Enterprise Analytics Module</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white p-6 rounded-2xl w-96">
              <h2 className="font-semibold mb-4">Add Event</h2>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded-xl w-full mb-2" />
              <input name="date" value={form.date} onChange={handleChange} placeholder="Date" className="border p-2 rounded-xl w-full mb-2" />
              <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded-xl w-full mb-2" />
              <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded-xl w-full mb-2" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded-xl w-full mb-2" />
              <button onClick={addEvent} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl">Add</button>
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
