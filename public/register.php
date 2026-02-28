<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduTrack - Register</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50">
    <div id="register-page" class="flex flex-col items-center justify-center min-h-screen p-6">
        <div class="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h2>
                <p class="text-slate-500 mt-2">Join the future of OJT tracking</p>
            </div>

            <div class="space-y-4">
                <input id="reg-name" type="text" placeholder="Full Name" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20">
                <input id="reg-email" type="email" placeholder="Email" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20">
                <input id="reg-password" type="password" placeholder="Password" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20">
            </div>

            <button onclick="handleRegister()" class="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
                Get Started
            </button>

            <p class="text-center text-sm text-gray-600">
                Already have an account? <a href="login.php" class="text-blue-600 font-semibold">Login</a>
            </p>
        </div>
    </div>
    <script src="./javascript/script.js"></script>
</body>
</html>