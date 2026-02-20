<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduTrack OJT | University Internship Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .glass-panel { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
        .sidebar-item-active { background: #eff6ff; color: #1d4ed8; border-right: 4px solid #1d4ed8; }
        .animate-progress { transition: width 1s ease-in-out; }
        .modal-overlay { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen">

    <!-- APP CONTAINER -->
    <div id="app">
                <!-- Register Page -->
        <div id="register-page" class="flex flex-col items-center justify-center min-h-screen p-6">
            <div class="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md space-y-6">
                <h2 class="text-2xl font-bold text-slate-800 text-center">Create Account</h2>

                <input id="reg-name" type="text" placeholder="Full Name"
                    class="w-full bg-slate-50 rounded-xl px-4 py-3">

                <input id="reg-email" type="email" placeholder="Email"
                    class="w-full bg-slate-50 rounded-xl px-4 py-3">

                <input id="reg-password" type="password" placeholder="Password"
                    class="w-full bg-slate-50 rounded-xl px-4 py-3">

                <button onclick="handleRegister()"
                    class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">
                    Register
                </button>

                <p class="text-center text-sm text-slate-500">
                    Already have an account?
                    <button onclick="showLogin()" class="text-blue-600 font-bold hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
        
        <!-- Login Page (Default) -->
        <div id="login-page" class="hidden min-h-screen flex items-center justify-center bg-slate-100">
            <div class="w-full max-w-md">
                <div class="text-center mb-10">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-xl mb-4">
                        <i data-lucide="school" class="w-8 h-8"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-slate-900">EduTrack OJT</h1>
                    <p class="text-slate-500 mt-2 font-medium">University Internship Portal</p>
                </div>

                <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <div class="space-y-5">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2">Institutional Email</label>
                            <input type="email" value="alex.j@university.edu" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="name@university.edu">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                            <input type="password" value="password123" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="••••••••">
                        </div>
                        <button onclick="handleLogin()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group">
                            Sign In
                            <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                    
                    <div class="mt-8 pt-6 border-t border-slate-100">
                        <p class="text-xs text-center text-slate-400">
                            By signing in, you agree to the University Code of Conduct.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dashboard Layout (Hidden by default) -->
        <div id="dashboard-layout" class="hidden flex h-screen overflow-hidden">
            <!-- Sidebar -->
            <aside class="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div class="p-6 flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <i data-lucide="shield-check" class="w-5 h-5"></i>
                    </div>
                    <span class="font-bold text-lg tracking-tight">EduTrack</span>
                </div>

                <nav class="flex-1 mt-4 space-y-1">
                    <div id="nav-student" class="hidden">
                        <a href="#" onclick="switchTab('dashboard')" class="flex items-center gap-3 px-6 py-3.5 text-slate-600 hover:bg-slate-50 transition-colors sidebar-item-active" data-tab="dashboard">
                            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                            <span class="font-medium text-sm">Dashboard</span>
                        </a>
                        <a href="#" onclick="switchTab('logs')" class="flex items-center gap-3 px-6 py-3.5 text-slate-600 hover:bg-slate-50 transition-colors" data-tab="logs">
                            <i data-lucide="clipboard-list" class="w-5 h-5"></i>
                            <span class="font-medium text-sm">Activity Logs</span>
                        </a>
                    </div>

                    <div id="nav-supervisor" class="hidden">
                        <a href="#" onclick="switchTab('supervision')" class="flex items-center gap-3 px-6 py-3.5 text-slate-600 hover:bg-slate-50 transition-colors sidebar-item-active" data-tab="supervision">
                            <i data-lucide="users" class="w-5 h-5"></i>
                            <span class="font-medium text-sm">My Students</span>
                        </a>
                        <a href="#" onclick="switchTab('approvals')" class="flex items-center gap-3 px-6 py-3.5 text-slate-600 hover:bg-slate-50 transition-colors" data-tab="approvals">
                            <i data-lucide="check-square" class="w-5 h-5"></i>
                            <span class="font-medium text-sm">Pending Approvals</span>
                        </a>
                    </div>

                    <div id="nav-admin" class="hidden">
                        <a href="#" onclick="switchTab('admin-overview')" class="flex items-center gap-3 px-6 py-3.5 text-slate-600 hover:bg-slate-50 transition-colors sidebar-item-active" data-tab="admin-overview">
                            <i data-lucide="pie-chart" class="w-5 h-5"></i>
                            <span class="font-medium text-sm">Global Insights</span>
                        </a>
                        <a href="#" onclick="switchTab('admin-users')" class="flex items-center gap-3 px-6 py-3.5 text-slate-600 hover:bg-slate-50 transition-colors" data-tab="admin-users">
                            <i data-lucide="settings" class="w-5 h-5"></i>
                            <span class="font-medium text-sm">User Management</span>
                        </a>
                    </div>
                </nav>

                <div class="p-4 border-t border-slate-100">
                    <button onclick="handleLogout()" class="w-full flex items-center gap-3 px-4 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                        <i data-lucide="log-out" class="w-4 h-4"></i>
                        <span class="font-semibold text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
                <!-- Top Navbar -->
                <header class="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-4">
                        <div id="role-badge" class="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            STUDENT
                        </div>
                    </div>

                    <div class="flex items-center gap-6">
                        <!-- Role Switcher for Mock UI -->
                        <div class="flex items-center bg-slate-100 p-1 rounded-lg">
                            <select id="role-select" onchange="updateRole(this.value)" class="bg-transparent text-xs font-semibold px-2 py-1 focus:outline-none cursor-pointer">
                                <option value="student">Student View</option>
                                <option value="supervisor">Supervisor View</option>
                                <option value="admin">Admin View</option>
                            </select>
                        </div>
                        
                        <div class="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                            <i data-lucide="user" class="w-5 h-5 text-slate-500"></i>
                        </div>
                    </div>
                </header>

                <!-- Scrollable Content -->
                <div id="content-area" class="flex-1 overflow-y-auto p-8">
                    <!-- CONTENT INJECTED VIA JS -->
                </div>
            </main>
        </div>
    </div>

    <!-- MODAL CONTAINER -->
    <div id="modal-container" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="modal-overlay absolute inset-0"></div>
        <div id="modal-content" class="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <!-- Modal Head -->
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 id="modal-title" class="text-xl font-bold">Log New Activity</h3>
                <button onclick="closeModal()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <i data-lucide="x" class="w-5 h-5 text-slate-400"></i>
                </button>
            </div>
            <!-- Modal Body -->
            <div id="modal-body" class="p-8">
                <!-- Form injected here -->
            </div>
        </div>
    </div>

    <!-- TOAST NOTIFICATION -->
    <div id="toast" class="fixed bottom-8 right-8 z-[100] transform translate-y-24 transition-all duration-300 pointer-events-none">
        <div class="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
            <span id="toast-message" class="font-medium text-sm">Success!</span>
        </div>
    </div>

    <!-- APP SCRIPT -->
    <script src="javascript/script.js"></script>
</body>
</html>