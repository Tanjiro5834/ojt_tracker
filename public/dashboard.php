<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduTrack OJT Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-slate-50">

    <div id="dashboard-layout" class="flex h-screen overflow-hidden">
        <aside class="w-72 bg-white border-r border-slate-100 flex flex-col shrink-0">
            <div class="p-8 flex items-center gap-4">
                <div class="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                    <i data-lucide="activity" class="w-6 h-6"></i>
                </div>
                <span class="font-black text-xl tracking-tighter">EduTrack</span>
            </div>

            <nav class="flex-1 px-4 space-y-2" id="sidebar-nav">
                </nav>

            <div class="p-6">
                <button onclick="handleLogout()" class="w-full flex items-center justify-center gap-3 px-4 py-4 text-rose-500 bg-rose-50/50 rounded-2xl font-bold text-sm">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                    Logout
                </button>
            </div>
        </aside>

        <main class="flex-1 flex flex-col bg-white overflow-hidden">
            <header class="h-20 border-b border-slate-100 px-10 flex items-center justify-between">
                <span id="role-display" class="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    STUDENT MODE
                </span>
                <div class="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                    <i data-lucide="user" class="w-5 h-5"></i>
                </div>
            </header>

            <div id="content-area" class="flex-1 overflow-y-auto p-10">
            </div>
        </main>
    </div>

    <div id="modal-container" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center hidden">
        <div class="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onclick="closeModal()" class="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <h2 id="modal-title" class="text-2xl font-bold text-slate-800 mb-6">Modal Title</h2>
            <div id="modal-body"></div>
        </div>
    </div>

    <div id="toast" class="fixed bottom-10 left-1/2 -translate-x-1/2 translate-y-24 transition-transform duration-500 z-[100]">
        <div class="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <i data-lucide="check" class="w-4 h-4 text-white"></i>
            </div>
            <span id="toast-message" class="font-bold text-sm">Action successful!</span>
        </div>
    </div>

    <script src="./javascript/script.js"></script>
    <script>
        async function initDashboard() {
            try {
                const res = await fetch("http://localhost:3000/api/user", {
                credentials: "include"
                });

                if (res.status === 401) {
                window.location.href = "login.php";
                return;
                }

                const student = await res.json();

                const logsRes = await fetch("http://localhost:3000/api/logs", {
                credentials: "include"
                });

                const logs = await logsRes.json();

                // Attach to global vars used by script.js
                currentStudent = student;
                currentLogs = logs;

                renderDashboard();
                renderSidebar();
                lucide.createIcons();
            } catch (err) {
                console.error(err);
                window.location.href = "login.php";
            }
        }
        initDashboard();
    </script>
</body>
</html>