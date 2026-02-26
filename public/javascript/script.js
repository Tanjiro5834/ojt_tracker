let currentStudent = null
let currentLogs = []

async function init() {
  await loadStudent();
  lucide.createIcons();
  renderDashboard();
}

function handleLogin() {
  document.getElementById("login-page").classList.add("hidden");
  document.getElementById("dashboard-layout").classList.remove("hidden");
  renderDashboard()
}

function handleLogout() {
  document.getElementById("login-page").classList.remove("hidden");
  document.getElementById("dashboard-layout").classList.add("hidden");
}

function renderDashboard() {
  const container = document.getElementById("content-area");

  if (!currentStudent) {
    container.innerHTML = `
      <div class="p-8 text-slate-500 font-medium">
        Loading student data...
      </div>
    `;
    return;
  }

  container.innerHTML = renderStudentDashboard();
  lucide.createIcons();
}

// --- RENDERERS ---

function renderStudentDashboard() {
  const student = currentStudent;
  const logs = currentLogs;  
  const approvedLogs = logs.filter(
    l => l.studentId === student.id && l.status === "approved"
    );

  const totalHours = approvedLogs.reduce(
    (sum, log) => sum + log.hours,
    0
    );

  const percent = student.requiredHours > 0
    ? ((totalHours / student.requiredHours) * 100).toFixed(1)
    : 0;

  const approvedCount = approvedLogs.length;

  const pendingCount = logs.filter(
    l => l.studentId === student.id && l.status === "pending"
  ).length;

  return `
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800">Welcome back, ${student.name}!</h2>
                            <p class="text-slate-500">Track your progress and log your daily internship activities.</p>
                        </div>
                        <button onclick="openLogModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-95">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                            Log Activity
                        </button>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                            <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <i data-lucide="clock" class="w-7 h-7"></i>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-slate-400">Total Hours</p>
                                <p class="text-2xl font-extrabold text-slate-800">${totalHours} / ${student.requiredHours}</p>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                            <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                <i data-lucide="check-circle" class="w-7 h-7"></i>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-slate-400">Approved Logs</p>
                                <p class="text-2xl font-extrabold text-slate-800">${approvedCount} Entries</p>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                            <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                                <i data-lucide="alert-circle" class="w-7 h-7"></i>
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-slate-400">Pending</p>
                                <p class="text-2xl font-extrabold text-slate-800">${pendingCount} Entries</p>
                            </div>
                        </div>
                    </div>

                    <!-- Progress Section -->
                    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lg">Overall Progress</h3>
                            <span class="text-blue-600 font-bold">${percent}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                            <div class="bg-blue-600 h-full animate-progress" style="width: ${percent}%"></div>
                        </div>
                        <div class="flex justify-between mt-4 text-sm text-slate-400 font-medium">
                            <span>0 hrs</span>
                            <span class="flex items-center gap-2">
                                Target: ${student.requiredHours} hrs
                                <button onclick="openTargetModal()" 
                                    class="text-xs text-blue-600 font-bold hover:underline">
                                    Edit
                                </button>
                            </span>
                        </div>
                    </div>

                    <!-- Recent Table -->
                    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 class="font-bold text-lg">Recent Activities</h3>
                            <button onclick="switchTab('logs')" class="text-blue-600 font-semibold text-sm hover:underline">View All</button>
                        </div>
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                                <tr>
                                    <th class="px-8 py-4">Date</th>
                                    <th class="px-8 py-4">Description</th>
                                    <th class="px-8 py-4">Hours</th>
                                    <th class="px-8 py-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                            ${
                                logs.filter(l => l.studentId === student.id).length === 0
                                ? `
                                    <tr>
                                    <td colspan="4" class="px-8 py-10 text-center text-slate-400 font-medium">
                                        No activities logged yet.
                                    </td>
                                    </tr>
                                `
                                : logs
                                    .filter(l => l.studentId === student.id)
                                    .map(log => `
                                        <tr class="hover:bg-slate-50/50 transition-colors">
                                        <td class="px-8 py-4 text-sm font-semibold text-slate-600">${log.date}</td>
                                        <td class="px-8 py-4 text-sm text-slate-500">${log.description}</td>
                                        <td class="px-8 py-4 text-sm font-bold text-slate-700">${log.hours}h</td>
                                        <td class="px-8 py-4 text-right">
                                            <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                            log.status === "approved"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : log.status === "pending"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-rose-100 text-rose-700"
                                            }">
                                            ${log.status}
                                            </span>
                                        </td>
                                        </tr>
                                    `).join("")
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
}

function renderSupervisorDashboard() {
  return `
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800">Supervision Dashboard</h2>
                            <p class="text-slate-500">Review student performance and approve daily logs.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6">
                        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div class="px-8 py-5 bg-slate-50/50 border-b border-slate-100">
                                <h3 class="font-bold text-lg">Assigned Students</h3>
                            </div>
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                                ${currentStudent.students
                                  .map(
                                    (student) => `
                                    <div class="p-8 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                        <div class="flex items-center gap-4">
                                            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
                                                ${student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-slate-800 leading-tight">${student.name}</h4>
                                                <p class="text-xs text-slate-400 font-medium">${student.email}</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm font-extrabold text-slate-700">${student.currentHours} / ${student.requiredHours} hrs</p>
                                            <div class="w-32 bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                                <div class="bg-emerald-500 h-full" style="width: ${(student.currentHours / 300) * 100}%"></div>
                                            </div>
                                        </div>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 class="font-bold text-lg">Waiting for Approval</h3>
                            <span class="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded font-bold">2 PENDING</span>
                        </div>
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 text-slate-400 text-xs uppercase font-bold">
                                <tr>
                                    <th class="px-8 py-4">Student</th>
                                    <th class="px-8 py-4">Task Description</th>
                                    <th class="px-8 py-4">Time</th>
                                    <th class="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${logs
                                  .filter((l) => l.status === "pending")
                                  .map((log) => {
                                    const student = currentStudent.students.find(
                                      (s) => s.id === log.studentId,
                                    );
                                    return `
                                    <tr class="border-b border-slate-50">
                                        <td class="px-8 py-4">
                                            <span class="font-bold text-sm text-slate-700">${student.name}</span>
                                        </td>
                                        <td class="px-8 py-4">
                                            <p class="text-sm text-slate-500 truncate max-w-xs">${log.description}</p>
                                            <p class="text-[10px] text-slate-300 font-bold uppercase">${log.date}</p>
                                        </td>
                                        <td class="px-8 py-4 font-bold text-slate-700">${log.hours}h</td>
                                        <td class="px-8 py-4 text-right">
                                            <div class="flex justify-end gap-2">
                                                <button onclick="approveLog(${log.id})" class="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all">
                                                    <i data-lucide="check" class="w-4 h-4"></i>
                                                </button>
                                                <button onclick="rejectLog(${log.id})" class="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all">
                                                    <i data-lucide="x" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    `;
                                  })
                                  .join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
}

function renderAdminDashboard() {
  return `
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800">Global Overview</h2>
                            <p class="text-slate-500">Institutional metrics and student compliance tracking.</p>
                        </div>
                        <div class="flex gap-3">
                            <button class="bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
                                <i data-lucide="download" class="w-4 h-4"></i>
                                Export Report
                            </button>
                        </div>
                    </div>

                    <!-- Metrics -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Interns</p>
                            <div class="flex items-end justify-between">
                                <h3 class="text-3xl font-extrabold text-slate-800">428</h3>
                                <span class="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <i data-lucide="arrow-up-right" class="w-3 h-3"></i>
                                    12%
                                </span>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Orgs</p>
                            <h3 class="text-3xl font-extrabold text-slate-800">84</h3>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weekly Hours</p>
                            <h3 class="text-3xl font-extrabold text-slate-800">12.4k</h3>
                        </div>
                        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Delayed</p>
                            <h3 class="text-3xl font-extrabold text-rose-600">14</h3>
                        </div>
                    </div>

                    <!-- Charts Simulation -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-80 flex flex-col">
                            <h4 class="font-bold text-slate-700 mb-6 flex items-center gap-2">
                                <i data-lucide="trending-up" class="w-4 h-4 text-blue-500"></i>
                                Log Submission Frequency
                            </h4>
                            <div class="flex-1 flex items-end justify-between gap-4">
                                ${[40, 70, 45, 90, 65, 80, 50]
                                  .map(
                                    (h) => `
                                    <div class="flex-1 bg-blue-100 hover:bg-blue-600 transition-all rounded-t-lg group relative cursor-pointer" style="height: ${h}%">
                                        <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${h} logs</div>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                            <div class="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>

                        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-80 flex flex-col">
                            <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h4 class="font-bold text-slate-700">Student Watchlist</h4>
                                <span class="text-xs font-bold text-rose-500">REQUIRES ACTION</span>
                            </div>
                            <div class="overflow-y-auto flex-1">
                                <table class="w-full text-left">
                                    <tbody class="divide-y divide-slate-50">
                                        ${students
                                          .map(
                                            (s) => `
                                            <tr class="hover:bg-slate-50 transition-colors">
                                                <td class="px-8 py-4 font-bold text-sm text-slate-700">${s.name}</td>
                                                <td class="px-8 py-4 text-sm text-slate-400">${s.supervisor}</td>
                                                <td class="px-8 py-4 text-right">
                                                    <span class="text-xs font-bold text-blue-600">${s.currentHours} / 300h</span>
                                                </td>
                                            </tr>
                                        `,
                                          )
                                          .join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
}

// --- INTERACTION LOGIC ---

function openLogModal() {
  const container = document.getElementById("modal-container");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");

  title.innerText = "Log New Activity";
  body.innerHTML = `
                <div class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</label>
                            <input id="log-date" type="date" value="${new Date().toISOString().split("T")[0]}" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hours Rendered</label>
                            <input id="log-hours" type="number" placeholder="8" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Detailed Description</label>
                        <textarea id="log-desc" rows="4" placeholder="Describe the tasks you completed today..." class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"></textarea>
                    </div>
                    <button onclick="submitLog()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                        Submit Daily Log
                    </button>
                </div>
            `;

  container.classList.remove("hidden");
  lucide.createIcons();
}

function openTargetModal() {
  const student = currentStudent;

  const container = document.getElementById("modal-container");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");

  title.innerText = "Update Target Hours";
  body.innerHTML = `
    <div class="space-y-6">
        <div>
            <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Required Internship Hours
            </label>
            <input id="target-hours" 
                   type="number" 
                   value="${student.requiredHours}"
                   class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 
                   focus:ring-2 focus:ring-blue-500/20 font-medium">
        </div>
        <button onclick="saveTargetHours()" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold 
            py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all">
            Save Changes
        </button>
    </div>
  `;

  container.classList.remove("hidden");
}

async function saveTargetHours() {
  const newHours = parseInt(document.getElementById("target-hours").value);

  if (!newHours || newHours <= 0) {
    alert("Invalid number.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/update-target-hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: currentStudent.id,
        requiredHours: newHours
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Server error:", data);
      alert(data.message);
      return;
    }

    await loadStudent();  // re-fetch from DB
    closeModal();
    renderDashboard();
    showToast("Target hours updated.");

  } catch (err) {
    console.error(err);
    alert("Server failed.");
  }
}

async function loadStudent() {
  try {
    const studentId = 7; // 🔥 TEMP — replace later with auth-based ID

    // Fetch student info
    const studentRes = await fetch(`http://localhost:3000/api/user/${studentId}`);
    if (!studentRes.ok) {
      throw new Error("Failed to load student");
    }

    currentStudent = await studentRes.json();

    // Fetch logs
    const logsRes = await fetch(`http://localhost:3000/api/logs/${studentId}`);
    if (!logsRes.ok) {
      throw new Error("Failed to load logs");
    }

    currentLogs = await logsRes.json();

    console.log("Student loaded:", currentStudent);
    console.log("Logs loaded:", currentLogs);

  } catch (error) {
    console.error("Load student error:", error);
    alert("Failed to load student data.");
  }
}

function showRegister() {
  document.getElementById("login-page").classList.add("hidden");
  document.getElementById("register-page").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("register-page").classList.add("hidden");
  document.getElementById("login-page").classList.remove("hidden");
}

async function handleRegister() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  currentStudent = {
    name,
    email,
    currentHours: 0,
    requiredHours: 300,
    id: Date.now().toString()
  };

  alert("Registered successfully!");
  showLogin();
}

function closeModal() {
  document.getElementById("modal-container").classList.add("hidden");
}

async function submitLog() {
  const date = document.getElementById("log-date").value;
  const hours = parseInt(document.getElementById("log-hours").value);
  const desc = document.getElementById("log-desc").value;

  if (!hours || !desc) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: currentStudent.id,
        date,
        hours,
        description: desc
      })
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.message);
      return;
    }

    await loadStudent(); // 🔥 pull fresh data
    closeModal();
    renderDashboard();
    showToast("Activity log submitted!");

  } catch (err) {
    console.error(err);
    alert("Server error.");
  }
}

function approveLog(id) {
  const log = currentLogs.find((l) => l.id === id);
  if (log) log.status = "approved";
  showToast("Log entry approved successfully.");
  renderDashboard();
}

function rejectLog(id) {
  const reason = prompt("Enter rejection reason:");
  if (reason) {
    const log = currentLogs.find((l) => l.id === id);
    if (log) log.status = "rejected";
    showToast("Log entry has been rejected.");
    renderDashboard();
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-message");
  msg.innerText = message;

  toast.classList.remove("translate-y-24");
  setTimeout(() => {
    toast.classList.add("translate-y-24");
  }, 3000);
}

// Initialize App
window.onload = init;
