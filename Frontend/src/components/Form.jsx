import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import LoadingIndicator from "./LoadingIndicator";
import { User, Lock, ArrowRight } from "lucide-react";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isLogin = method === "login";
    const name = isLogin ? "Welcome Back" : "Get Started";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, { username, password });
            if (isLogin) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(30,58,138,0.15)] border border-white flex flex-col relative overflow-hidden"
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
                    
                    <div className="text-center mb-10 relative">
                        <div className="inline-flex p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
                            <Lock className="text-white" size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{name}</h1>
                        <p className="text-slate-500 mt-2">Manage your thoughts securely</p>
                    </div>

                    <div className="space-y-4 relative">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input
                                className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 transition-all shadow-sm"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input
                                className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 transition-all shadow-sm"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <LoadingIndicator /> : (
                            <>
                                {isLogin ? "Sign In" : "Register"}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <p className="mt-8 text-center text-sm text-slate-600">
                        {isLogin ? "New here?" : "Already a member?"}
                        <button 
                            type="button"
                            onClick={() => navigate(isLogin ? "/register" : "/login")}
                            className="ml-2 text-blue-600 font-extrabold hover:text-blue-700 underline underline-offset-4"
                        >
                            {isLogin ? "Create Account" : "Log In"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Form;