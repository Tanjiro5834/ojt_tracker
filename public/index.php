<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduTrack OJT | University Internship Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --primary: #2563eb;
            --primary-glow: rgba(37, 99, 235, 0.4);
        }

        body { 
            font-family: 'Outfit', sans-serif; 
            overflow-x: hidden;
        }

        /* Animated Font & Text Effects */
        .text-glow {
            text-shadow: 0 0 15px var(--primary-glow);
            animation: pulse-glow 3s infinite ease-in-out;
        }

        @keyframes pulse-glow {
            0%, 100% { opacity: 1; text-shadow: 0 0 15px var(--primary-glow); }
            50% { opacity: 0.8; text-shadow: 0 0 5px var(--primary-glow); }
        }

        .float-anim {
            animation: float 4s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        /* Entry Animations */
        .fade-slide-up {
            animation: fadeSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0;
        }

        @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }

        /* Smooth UI Elements */
        .glass-panel { 
            background: rgba(255, 255, 255, 0.7); 
            backdrop-filter: blur(16px); 
            border: 1px solid rgba(255, 255, 255, 0.4); 
        }

        .sidebar-item-active { 
            background: linear-gradient(to right, #eff6ff, transparent); 
            color: #1d4ed8; 
            border-left: 4px solid #1d4ed8; 
        }

        .btn-animate {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .btn-animate:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 10px 20px -5px var(--primary-glow);
        }

        .btn-animate:active {
            transform: translateY(0) scale(0.98);
        }

        .modal-overlay { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen">

    <div id="app">
        <!-- Register Page -->
        <div id="register-page" class="flex flex-col items-center justify-center min-h-screen p-6">
            <div class="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-8 fade-slide-up">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h2>
                    <p class="text-slate-500 mt-2">Join the future of OJT tracking</p>
                </div>

                <div class="space-y-4">
                    <input id="reg-name" type="text" placeholder="Full Name" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none">
                    <input id="reg-email" type="email" placeholder="Email" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none">
                    <input id="reg-password" type="password" placeholder="Password" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none">
                </div>

                <button onclick="handleRegister()" class="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl btn-animate shadow-lg shadow-blue-500/30">
                    Get Started
                </button>

                <p class="text-center text-sm text-slate-500">
                    Already have an account?
                    <button onclick="showLogin()" class="text-blue-600 font-bold hover:underline ml-1">Login</button>
                </p>
            </div>
        </div>
        
        <!-- Login Page -->
        <div id="login-page" class="hidden min-h-screen flex items-center justify-center bg-slate-50">
            <div class="w-full max-w-md px-6">
                <div class="text-center mb-10 float-anim">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-3xl shadow-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <i data-lucide="graduation-cap" class="w-10 h-10"></i>
                    </div>
                    <h1 class="text-4xl font-black text-slate-900 tracking-tighter text-glow">EduTrack OJT</h1>
                    <p class="text-slate-400 mt-2 font-medium tracking-widest uppercase text-xs">University Portal</p>
                </div>

                <div class="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 fade-slide-up stagger-1">
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Institutional Email</label>
                            <input id="login-email" type="email" value="alex.j@university.edu" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" placeholder="name@university.edu">
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <input id="login-pass" type="password" value="password123" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" placeholder="••••••••">
                        </div>
                        <button onclick="handleLogin()" class="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group btn-animate">
                            Sign In
                            <i data-lucide="chevron-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dashboard Layout -->
        <div id="dashboard-layout" class="hidden flex h-screen overflow-hidden">
            <aside class="w-72 bg-white border-r border-slate-100 flex flex-col shrink-0">
                <div class="p-8 flex items-center gap-4">
                    <div class="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <i data-lucide="activity" class="w-6 h-6"></i>
                    </div>
                    <span class="font-black text-xl tracking-tighter">EduTrack</span>
                </div>

                <nav class="flex-1 px-4 space-y-2" id="sidebar-nav">
                    <!-- Nav items injected via logic -->
                </nav>

                <div class="p-6">
                    <button onclick="handleLogout()" class="w-full flex items-center justify-center gap-3 px-4 py-4 text-rose-500 bg-rose-50/50 hover:bg-rose-50 rounded-2xl transition-all font-bold text-sm">
                        <i data-lucide="log-out" class="w-4 h-4"></i>
                        Logout
                    </button>
                </div>
            </aside>

            <main class="flex-1 flex flex-col bg-white overflow-hidden">
                <header class="h-20 border-b border-slate-100 px-10 flex items-center justify-between shrink-0">
                    <div>
                        <span id="role-display" class="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                            STUDENT MODE
                        </span>
                    </div>

                    <div class="flex items-center gap-4">
                        <select onchange="updateRole(this.value)" class="bg-slate-50 border-none text-xs font-bold px-4 py-2 rounded-xl focus:ring-0 cursor-pointer hover:bg-slate-100 transition-colors">
                            <option value="student">Student View</option>
                            <option value="supervisor">Supervisor View</option>
                            <option value="admin">Admin View</option>
                        </select>
                        <div class="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                            <i data-lucide="user" class="w-5 h-5"></i>
                        </div>
                    </div>
                </header>

                <div id="content-area" class="flex-1 overflow-y-auto p-10">
                    <!-- Content dynamic -->
                </div>
            </main>
        </div>
    </div>

    <!-- Notification Toast -->
    <div id="toast" class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] opacity-0 translate-y-10 transition-all duration-500 pointer-events-none">
        <div class="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
            <div class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
            <span id="toast-message" class="font-bold text-sm tracking-tight"></span>
        </div>
    </div>

    <script src="javascript/script.js"></script>
</body>
</html>