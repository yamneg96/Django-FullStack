import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import { PlusCircle, BookOpen, Layout } from "lucide-react"; // Install lucide-react

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => { getNotes(); }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => setNotes(res.data))
            .catch((err) => console.error(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then(() => getNotes());
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title }).then(() => {
            getNotes();
            setTitle("");
            setContent("");
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans text-slate-900">
            {/* Navbar / Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-blue-100">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Layout className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            NoteVault
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Create Note Section */}
                <section className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 border border-blue-50 sticky top-28">
                        <div className="flex items-center gap-2 mb-6 text-blue-600">
                            <PlusCircle size={20} />
                            <h2 className="text-xl font-bold">New Note</h2>
                        </div>
                        <form onSubmit={createNote} className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-600 ml-1">Title</label>
                                <input
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                    type="text"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder="Meeting notes..."
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-600 ml-1">Content</label>
                                <textarea
                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none min-h-[150px]"
                                    required
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-transform active:scale-95">
                                Save Note
                            </button>
                        </form>
                    </div>
                </section>

                {/* Notes List Section */}
                <section className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <BookOpen size={24} className="text-slate-400" />
                        <h2 className="text-2xl font-bold text-slate-800">Your Notes</h2>
                        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full ml-2">
                            {notes.length}
                        </span>
                    </div>
                    
                    {notes.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400">No notes yet. Start by creating one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {notes.map((note) => (
                                <Note note={note} onDelete={deleteNote} key={note.id} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Home;