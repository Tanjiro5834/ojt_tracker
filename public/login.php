<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduTrack OJT - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="style.css"> </head>
<body class="bg-slate-50">
    <div id="login-page" class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md px-6">
            <div class="text-center mb-10">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-3xl shadow-2xl mb-6 transform rotate-3">
                    <i data-lucide="graduation-cap" class="w-10 h-10"></i>
                </div>
                <h1 class="text-4xl font-black text-slate-900 tracking-tighter">EduTrack OJT</h1>
            </div>

            <div class="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                <div class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Institutional Email</label>
                        <input id="login-email" type="email" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="name@university.edu">
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <input id="login-password" type="password" class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="••••••••">
                    </div>
                    <button onclick="handleLogin()" class="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group">
                        Sign In
                        <i data-lucide="chevron-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
                <p class="text-center mt-6 text-sm text-slate-500">
                    New here? <a href="register.php" class="text-blue-600 font-bold">Create Account</a>
                </p>
            </div>
        </div>
    </div>

    <script src="./javascript/script.js"></script>
    <script>lucide.createIcons();</script>
</body>
</html>