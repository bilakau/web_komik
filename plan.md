## ( Tujuan Utama) ###
1. Ganti Api Dari code html saya yang lama karena yang lama sudah mati gantikan dengan yang baru! 
2. Pastikan tidak eror dan semua nya berjalan normal! 
3. upgrade ui ux website agar bagus setara tingkat web besar , dan dikerjakan oleh ahlinya 
4. jangan ada kesalahan atau eror! , patikan semuanya berjalan normal


# All file : 
stuktur File saya 
Folder/
public/
       assets/icon.png
         index.html
         style.css
         script.js          
api/
          index.js
package.json
vercel.json      

All file : 

public/index.html :
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>FmcComic - Free Comic Tanpa Iklan</title>

  <link rel="icon" href="assets/icon.png" type="image/jpeg" />

  <!-- Tailwind & Icons -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="style.css" />
</head>

<body class="overflow-x-hidden bg-[#0b0b0f] text-gray-200">

  <!-- Progress Bar Reading -->
  <div id="progress-bar" style="width: 0%"></div>

  <!-- Navbar Desktop -->
  <nav id="main-nav" class="fixed top-0 w-full z-50 glass border-b border-white/5 transition-transform duration-300">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3 cursor-pointer group" onclick="showHome()">
          <img src="assets/icon.png" onerror="this.src='https://via.placeholder.com/40'"
            class="w-9 h-9 rounded-xl object-cover border border-amber-500/50 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition" />
          <h1 class="text-2xl font-extrabold text-amber-500 tracking-tight">
            Fmc<span class="text-white">Comic</span>
          </h1>
        </div>

        <div class="hidden md:flex gap-6 text-sm font-medium">
          <button onclick="showHome()" class="hover:text-amber-500 transition">Beranda</button>
          <button onclick="showOngoing()" class="hover:text-amber-500 transition">Ongoing</button>
          <button onclick="showCompleted()" class="hover:text-amber-500 transition font-bold text-green-400">Selesai</button>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="toggleFilter()" class="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition">
          <i class="fa fa-search"></i>
        </button>
        <button onclick="showBookmarks()" class="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition">
          <i class="fa fa-bookmark"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Filter Panel -->
  <div id="filter-panel" class="fixed top-16 left-0 w-full glass z-[45] hidden border-b border-amber-500/20 p-4 shadow-2xl">
    <div class="container mx-auto">
      <div class="flex flex-col gap-4 max-w-4xl mx-auto">
        <div class="relative w-full">
          <i class="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" id="search-input" onkeyup="handleSearch(event)" placeholder="Cari judul komik..."
            class="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500 transition text-white placeholder-gray-500" />
        </div>

        <div class="flex flex-wrap gap-2 justify-between items-center">
          <div class="flex flex-wrap gap-2 flex-1">
            <select id="filter-genre" class="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 text-xs text-gray-300">
              <option value="">Pilih Genre</option>
            </select>
            <select id="filter-type" class="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 text-xs text-gray-300">
              <option value="">Semua Tipe</option>
              <option value="manga">Manga</option>
              <option value="manhwa">Manhwa</option>
              <option value="manhua">Manhua</option>
            </select>
            <select id="filter-status" class="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 text-xs text-gray-300">
              <option value="">Semua Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button onclick="applyAdvancedFilter()"
            class="amber-gradient px-6 py-2 rounded-lg font-bold text-black text-xs hover:opacity-90 transition w-full md:w-auto mt-2 md:mt-0 shadow-lg shadow-amber-500/20">
            Cari Komik
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="container mx-auto mt-24 px-4 pb-32 min-h-screen">
    <div id="content-area"></div>
  </main>

  <!-- Mobile Nav -->
  <div id="mobile-nav" class="fixed bottom-0 w-full glass border-t border-white/5 flex justify-around p-3 md:hidden z-50 transition-transform duration-300 pb-safe">
    <button onclick="showHome()" class="flex flex-col items-center gap-1 text-gray-400 active:text-amber-500 w-16">
      <i class="fa fa-home text-lg"></i><span class="text-[10px]">Home</span>
    </button>
    <button onclick="showOngoing()" class="flex flex-col items-center gap-1 text-gray-400 active:text-amber-500 w-16">
      <i class="fa fa-fire text-lg text-orange-500"></i><span class="text-[10px]">Hot</span>
    </button>
    <button onclick="showCompleted()" class="flex flex-col items-center gap-1 text-gray-400 active:text-amber-500 w-16">
      <i class="fa fa-check-circle text-lg text-green-500"></i><span class="text-[10px]">Tamat</span>
    </button>
    <button onclick="showHistory()" class="flex flex-col items-center gap-1 text-gray-400 active:text-amber-500 w-16">
      <i class="fa fa-history text-lg"></i><span class="text-[10px]">Riwayat</span>
    </button>
  </div>

  <script src="script.js"></script>
</body>
</html>

public/style.css : 
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

:root{
  --bg: #0b0b0f;
  --panel: rgba(18, 18, 24, 0.95);
  --line: rgba(255,255,255,0.08);
  --amber: #f59e0b;
  --amber2:#d97706;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--bg);
  color: #e5e7eb;
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: transparent;
}

/* Safe area bawah (iPhone) */
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }

/* --- Utilities --- */
.amber-gradient {
  background: linear-gradient(135deg, var(--amber) 0%, var(--amber2) 100%);
}

.glass {
  background: var(--panel);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--line);
}

/* Custom Scrollbar Global */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0b0b0f; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--amber); }
.hide-scroll::-webkit-scrollbar { display: none; }

/* --- Components --- */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.card-hover:hover {
  transform: translateY(-6px);
  border-color: rgba(245, 158, 11, 0.5) !important;
  box-shadow: 0 10px 30px -10px rgba(245, 158, 11, 0.2);
}

/* Badge tipe komik */
.type-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 20;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.12);
  text-transform: uppercase;
  letter-spacing: .08em;
  backdrop-filter: blur(10px);
}

.type-default { color: #e5e7eb; }
.type-manga   { color: #60a5fa; border-color: rgba(96,165,250,0.35); }
.type-manhwa  { color: #34d399; border-color: rgba(52,211,153,0.35); }
.type-manhua  { color: #f472b6; border-color: rgba(244,114,182,0.35); }

/* Progress Bar (atas) */
#progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  z-index: 100;
  background: linear-gradient(90deg, var(--amber), #ffce58);
  transition: width 0.15s ease;
}

/* Reader UI Hide (tap gambar untuk hide/show) */
.ui-hidden-top {
  transform: translateY(-120%);
  opacity: 0;
}
.ui-hidden-bottom {
  transform: translateY(120%);
  opacity: 0;
}

/* Gambar komik */
.comic-page {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

/* Skeleton shimmer loader untuk halaman komik */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.06) 25%,
    rgba(255,255,255,0.12) 37%,
    rgba(255,255,255,0.06) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

/* Scroll behavior chapter list */
.chapter-list-scroll {
  scroll-behavior: smooth;
}

/* Backdrop banner anim halus */
.backdrop-banner { filter: blur(30px); }
.animate-pulse-slow { animation: pulseSlow 2.4s ease-in-out infinite; }

@keyframes pulseSlow {
  0%, 100% { opacity: .18; }
  50%      { opacity: .28; }
}

/* Fade in */
.animate-fade-in { animation: fadeIn .25s ease-out both; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Line clamp fallback (kalau tailwind line-clamp tidak aktif) */
.line-clamp-2{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-4{
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
public/script.js : 
const API_PROXY = "https://api.nekolabs.web.id/px?url=";
const API_BASE = "https://www.sankavollerei.com/comic/komikcast";
const BACKEND_URL = window.location.origin;

const contentArea = document.getElementById('content-area');
const filterPanel = document.getElementById('filter-panel');
const mainNav = document.getElementById('main-nav');
const mobileNav = document.getElementById('mobile-nav');
const progressBar = document.getElementById('progress-bar');

let currentChapterList = [];
let currentComicContext = { slug: null, title: null, image: null };
let isNavigating = false;

/* ---------------- Helpers ---------------- */

async function getUuidFromSlug(slug, type) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/get-id`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type })
    });
    const data = await res.json();
    return data.uuid;
  } catch (e) {
    return slug;
  }
}

async function getSlugFromUuid(uuid) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/get-slug/${uuid}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

function updateURL(path) {
  if (window.location.pathname !== path) history.pushState(null, null, path);
}

function getTypeClass(type) {
  if (!type) return 'type-default';
  const t = String(type).toLowerCase();
  if (t.includes('manga')) return 'type-manga';
  if (t.includes('manhwa')) return 'type-manhwa';
  if (t.includes('manhua')) return 'type-manhua';
  return 'type-default';
}

function redirectTo404() {
  contentArea.innerHTML = `<div class="text-center py-40 text-red-500">Error 404: Halaman tidak ditemukan.</div>`;
}

async function fetchAPI(url) {
  try {
    const response = await fetch(API_PROXY + encodeURIComponent(url));
    const data = await response.json();
    if (data.success) return data.result?.content || data.result || data;
    return null;
  } catch (e) {
    return null;
  }
}

function toggleFilter() {
  filterPanel.classList.toggle('hidden');
  const genreSelect = document.getElementById('filter-genre');
  if (genreSelect && genreSelect.options.length <= 1) loadGenres();
}

function resetNavs() {
  mainNav.classList.remove('-translate-y-full');
  mobileNav.classList.remove('translate-y-full');
  filterPanel.classList.add('hidden');
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

function setLoading() {
  contentArea.innerHTML = `
    <div class="flex justify-center py-40">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
    </div>`;
}

function lockNav() {
  isNavigating = true;
  setProgress(0);
}

function unlockNav() {
  isNavigating = false;
}

function setProgress(percent) {
  if (!progressBar) return;
  const p = Math.max(0, Math.min(100, percent));
  progressBar.style.width = `${p}%`;
}

/* progress reader: berdasarkan scroll */
function bindReaderProgress() {
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) return setProgress(0);
    const percent = (scrollTop / scrollHeight) * 100;
    setProgress(percent);
  };
  window.removeEventListener('scroll', onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- Data Functions ---------------- */

async function loadGenres() {
  const data = await fetchAPI(`${API_BASE}/genres`);
  if (data && data.data) {
    const select = document.getElementById('filter-genre');
    const sorted = data.data.sort((a, b) => a.title.localeCompare(b.title));
    select.innerHTML = '<option value="">Pilih Genre</option>';
    sorted.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g.slug;
      opt.text = g.title;
      select.appendChild(opt);
    });
  }
}

async function showHome(push = true) {
  if (push) updateURL('/');
  resetNavs();
  setLoading();

  const data = await fetchAPI(`${API_BASE}/home`);
  if (!data || !data.data) { redirectTo404(); return; }

  contentArea.innerHTML = `
    <section class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold flex items-center gap-2">
          <i class="fa fa-fire text-amber-500"></i> Populer Hari Ini
        </h2>
      </div>
      <div class="flex overflow-x-auto gap-4 hide-scroll pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        ${data.data.hotUpdates.map(item => `
          <div class="min-w-[150px] md:min-w-[200px] cursor-pointer card-hover relative rounded-2xl overflow-hidden group"
              onclick="showDetail('${item.slug}')">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
            <span class="type-badge ${getTypeClass(item.type)}">${item.type || 'Hot'}</span>
            <img src="${item.image}" class="h-64 md:h-80 w-full object-cover transform group-hover:scale-110 transition duration-500">
            <div class="absolute bottom-0 left-0 p-3 z-20 w-full">
              <h3 class="text-sm font-bold truncate text-white drop-shadow-md">${item.title}</h3>
              <p class="text-amber-400 text-xs font-semibold mt-1">${item.chapter || item.latestChapter}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2">
        <h2 class="text-xl font-bold mb-6 border-l-4 border-amber-500 pl-4">Rilis Terbaru</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          ${data.data.latestReleases.slice(0, 15).map(item => `
            <div class="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition group"
                onclick="showDetail('${item.slug}')">
              <div class="relative h-48 overflow-hidden">
                <span class="type-badge ${getTypeClass(item.type)} bottom-2 left-2 top-auto">${item.type || 'UP'}</span>
                <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              </div>
              <div class="p-3">
                <h3 class="text-xs font-bold line-clamp-2 h-8 leading-relaxed">${item.title}</h3>
                <div class="flex justify-between items-center mt-3">
                  <span class="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">${item.chapters?.[0]?.title || 'Ch.?'}</span>
                  <span class="text-[10px] text-gray-500">${item.chapters?.[0]?.time || ''}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold mb-6 border-l-4 border-amber-500 pl-4">Proyek Kami</h2>
        <div class="space-y-4">
          ${data.data.projectUpdates.map(item => `
            <div class="flex gap-4 bg-zinc-900/30 p-2 rounded-xl cursor-pointer hover:bg-white/5 transition border border-transparent hover:border-white/10"
                onclick="showDetail('${item.slug}')">
              <img src="${item.image}" class="w-16 h-20 rounded-lg object-cover shadow-lg">
              <div class="flex-1 flex flex-col justify-center overflow-hidden">
                <h3 class="font-bold text-xs truncate mb-1">${item.title}</h3>
                <div class="flex items-center gap-2">
                  <span class="text-amber-500 text-[10px] font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                    ${item.chapters?.[0]?.title || ''}
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

async function showOngoing(page = 1) {
  updateURL('/ongoing'); resetNavs();
  setLoading();
  const data = await fetchAPI(`${API_BASE}/list?status=Ongoing&orderby=popular&page=${page}`);
  renderGrid(data, "Komik Ongoing Terpopuler", "showOngoing");
}

async function showCompleted(page = 1) {
  updateURL('/completed'); resetNavs();
  setLoading();
  const data = await fetchAPI(`${API_BASE}/list?status=Completed&orderby=popular&page=${page}`);
  renderGrid(data, "Komik Tamat (Selesai)", "showCompleted");
}

async function showGenre(slug, page = 1) {
  resetNavs();
  setLoading();
  const data = await fetchAPI(`${API_BASE}/genre/${slug}/${page}`);
  if (!data || !data.data || data.data.length === 0) { redirectTo404(); return; }
  renderGrid(data, `Genre: ${slug.toUpperCase()}`, "showGenre", slug);
}

async function applyAdvancedFilter() {
  const query = document.getElementById('search-input').value;
  const genre = document.getElementById('filter-genre').value;
  const type = document.getElementById('filter-type').value;
  const status = document.getElementById('filter-status').value;

  filterPanel.classList.add('hidden');
  setLoading();

  if (query) {
    const data = await fetchAPI(`${API_BASE}/search/${encodeURIComponent(query)}/1`);
    renderGrid(data, `Hasil Pencarian: "${query}"`, null);
    return;
  }
  if (genre) { showGenre(genre, 1); return; }

  let url = `${API_BASE}/list?page=1`;
  if (type) url += `&type=${type}`;
  if (status) url += `&status=${status}`;
  const data = await fetchAPI(url + `&orderby=popular`);
  renderGrid(data, "Hasil Filter", null);
}

function renderGrid(data, title, funcName, extraArg = null) {
  const list = data?.data || [];
  if (list.length === 0) {
    contentArea.innerHTML = `
      <div class="text-center py-40 text-gray-500 flex flex-col items-center gap-4">
        <i class="fa fa-folder-open text-4xl opacity-50"></i>
        <p>Tidak ada komik ditemukan.</p>
      </div>`;
    return;
  }

  let paginationHTML = '';
  if (data.pagination && funcName) {
    const current = data.pagination.currentPage;
    const argStr = extraArg ? `'${extraArg}', ` : '';
    paginationHTML = `
      <div class="mt-14 flex justify-center items-center gap-4">
        ${current > 1 ? `<button onclick="${funcName}(${argStr}${current - 1})" class="glass px-5 py-2 rounded-lg text-xs font-bold hover:bg-amber-500 hover:text-black transition"><i class="fa fa-chevron-left"></i> Prev</button>` : ''}
        <span class="bg-amber-500 text-black px-4 py-2 rounded-lg text-xs font-extrabold shadow-lg shadow-amber-500/20">${current}</span>
        ${data.pagination.hasNextPage ? `<button onclick="${funcName}(${argStr}${current + 1})" class="glass px-5 py-2 rounded-lg text-xs font-bold hover:bg-amber-500 hover:text-black transition">Next <i class="fa fa-chevron-right"></i></button>` : ''}
      </div>
    `;
  }

  contentArea.innerHTML = `
    <h2 class="text-2xl font-bold mb-8 border-l-4 border-amber-500 pl-4">${title}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      ${list.map(item => `
        <div class="bg-zinc-900/40 rounded-xl overflow-hidden border border-white/5 card-hover cursor-pointer relative group"
            onclick="showDetail('${item.slug}')">
          <span class="type-badge ${getTypeClass(item.type)}">${item.type || 'Comic'}</span>
          <div class="relative overflow-hidden aspect-[3/4]">
            <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </div>
          <div class="p-3 text-center">
            <h3 class="text-xs font-bold truncate group-hover:text-amber-500 transition">${item.title}</h3>
            <p class="text-[10px] text-amber-500 mt-1 font-medium">${item.latestChapter || item.chapter || 'Baca Sekarang'}</p>
          </div>
        </div>
      `).join('')}
    </div>
    ${paginationHTML}
  `;
  window.scrollTo(0, 0);
}

/* ---------------- Detail Page Logic ---------------- */

async function showDetail(idOrSlug, push = true) {
  let slug = idOrSlug;
  setLoading();

  if (idOrSlug.length === 36) {
    const mapping = await getSlugFromUuid(idOrSlug);
    if (mapping) slug = mapping.slug;
  }

  if (push) {
    const uuid = await getUuidFromSlug(slug, 'series');
    updateURL(`/series/${uuid}`);
  }

  resetNavs();
  const data = await fetchAPI(`${API_BASE}/detail/${slug}`);
  if (!data || !data.data) { redirectTo404(); return; }

  const res = data.data;
  currentChapterList = res.chapters || [];

  currentComicContext = { slug, title: res.title, image: res.image };

  const history = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  const savedItem = history.find(h => h.slug === slug);
  const lastCh = savedItem ? savedItem.lastChapterSlug : null;
  const firstCh = res.chapters?.length > 0 ? res.chapters[res.chapters.length - 1].slug : null;

  const startBtnText = lastCh ? "Lanjut Baca" : "Mulai Baca";
  const startBtnAction = lastCh
    ? `readChapter('${lastCh}', '${slug}')`
    : (firstCh ? `readChapter('${firstCh}', '${slug}')` : "alert('Chapter belum tersedia')");

  const backdropHTML = `
    <div class="fixed top-0 left-0 w-full h-[60vh] -z-10 pointer-events-none overflow-hidden">
      <img src="${res.image}" class="w-full h-full object-cover blur-2xl opacity-20 backdrop-banner animate-pulse-slow">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0b0b0f]/40 via-[#0b0b0f]/80 to-[#0b0b0f]"></div>
    </div>
  `;

  const synopsisText = res.synopsis || "Sinopsis tidak tersedia.";
  const isLongSynopsis = synopsisText.length > 250;

  contentArea.innerHTML = `
    ${backdropHTML}

    <div class="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 mt-4 animate-fade-in">

      <div class="md:w-[280px] flex-shrink-0 mx-auto md:mx-0 w-full max-w-[280px]">
        <div class="relative group">
          <span class="type-badge ${getTypeClass(res.type)} scale-110 top-4 left-4 shadow-lg">${res.type || 'Comic'}</span>
          <img src="${res.image}" class="w-full rounded-2xl shadow-2xl border border-white/10 group-hover:border-amber-500/30 transition duration-500">
        </div>

        <div class="flex flex-col gap-3 mt-6">
          <button onclick="${startBtnAction}" class="amber-gradient w-full py-3.5 rounded-xl font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition shadow-lg shadow-amber-500/20">
            <i class="fa fa-book-open"></i> ${startBtnText}
          </button>
          <button onclick="toggleBookmark('${slug}', '${String(res.title).replace(/'/g, "")}', '${res.image}')" id="btn-bookmark"
            class="w-full py-3.5 rounded-xl glass font-semibold border-white/10 hover:bg-white/10 transition flex items-center justify-center gap-2">
            <i class="fa fa-bookmark"></i> Simpan
          </button>
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">${res.title}</h1>

        <div class="flex flex-wrap gap-3 mb-6">
          <div class="glass px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-amber-400 border border-amber-500/20">
            <i class="fa fa-star"></i> ${res.rating}
          </div>
          <div class="glass px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-green-400 border border-green-500/20">
            <i class="fa fa-circle text-[6px]"></i> ${res.status}
          </div>
          <div class="glass px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-blue-400 border border-blue-500/20">
            ${res.type}
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          ${res.genres ? res.genres.map(g => `
            <span onclick="showGenre('${g.slug}')" class="cursor-pointer hover:text-amber-500 transition text-gray-400 text-xs px-3 py-1 rounded-full border border-white/10 hover:border-amber-500/50 bg-white/5">
              ${g.title}
            </span>`).join('') : ''}
        </div>

        <div class="bg-white/5 rounded-2xl p-5 md:p-6 mb-8 border border-white/5 backdrop-blur-sm">
          <h3 class="font-bold text-sm mb-2 text-amber-500 uppercase tracking-wide">Sinopsis</h3>
          <p id="synopsis-text" class="text-gray-300 text-sm leading-relaxed text-justify ${isLongSynopsis ? 'line-clamp-4' : ''} transition-all duration-300">
            ${synopsisText}
          </p>
          ${isLongSynopsis ? `
            <button onclick="toggleSynopsis()" id="synopsis-btn" class="text-amber-500 text-xs font-bold mt-2 hover:text-white transition flex items-center gap-1">
              Baca Selengkapnya <i class="fa fa-chevron-down"></i>
            </button>` : ''}
        </div>

        <div class="glass rounded-2xl border border-white/10 overflow-hidden">
          <div class="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5">
            <h3 class="font-bold text-lg flex items-center gap-2">
              <i class="fa fa-list-ul text-amber-500"></i> Daftar Chapter
              <span class="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">${res.chapters?.length || 0}</span>
            </h3>
            <div class="relative w-full sm:w-auto group">
              <i class="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs group-focus-within:text-amber-500 transition"></i>
              <input type="text" id="chapter-search" onkeyup="filterChapters()" placeholder="Cari Chapter..."
                class="w-full sm:w-64 bg-black/30 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-amber-500 transition text-white">
            </div>
          </div>

          <div id="chapter-list-container" class="max-h-[500px] overflow-y-auto chapter-list-scroll p-2 bg-black/20"></div>
        </div>
      </div>
    </div>
  `;

  renderChapterList(res.chapters || [], slug);
  checkBookmarkStatus(slug);
  saveHistory(slug, res.title, res.image);
  window.scrollTo(0, 0);
}

function toggleSynopsis() {
  const txt = document.getElementById('synopsis-text');
  const btn = document.getElementById('synopsis-btn');
  if (!txt || !btn) return;

  if (txt.classList.contains('line-clamp-4')) {
    txt.classList.remove('line-clamp-4');
    btn.innerHTML = `Tutup <i class="fa fa-chevron-up"></i>`;
  } else {
    txt.classList.add('line-clamp-4');
    btn.innerHTML = `Baca Selengkapnya <i class="fa fa-chevron-down"></i>`;
  }
}

function renderChapterList(chapters, comicSlug) {
  const container = document.getElementById('chapter-list-container');
  const history = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  const comicHistory = history.find(h => h.slug === comicSlug);
  const lastReadSlug = comicHistory ? comicHistory.lastChapterSlug : '';

  if (!chapters || chapters.length === 0) {
    container.innerHTML = '<div class="p-8 text-center text-gray-500 text-sm">Tidak ada chapter.</div>';
    return;
  }

  container.innerHTML = chapters.map(ch => {
    const isLastRead = ch.slug === lastReadSlug;
    return `
      <div onclick="safeReadChapter('${ch.slug}', '${comicSlug}')"
        class="chapter-item group flex items-center justify-between p-3 mb-1 rounded-xl cursor-pointer border border-transparent transition-all duration-200
        ${isLastRead ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 hover:bg-white/10 hover:border-amber-500/30'}">

        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition shrink-0">
            <i class="fa ${isLastRead ? 'fa-history' : 'fa-hashtag'} text-xs"></i>
          </div>
          <span class="text-sm font-medium truncate group-hover:text-amber-500 transition ${isLastRead ? 'text-amber-500' : 'text-gray-300'}">
            ${ch.title}
          </span>
        </div>

        <div class="text-[10px] text-gray-500 bg-black/20 px-2 py-1 rounded group-hover:bg-amber-500 group-hover:text-black transition font-bold shrink-0">
          Baca
        </div>
      </div>
    `;
  }).join('');
}

function safeReadChapter(chSlug, comicSlug) {
  if (isNavigating) return;
  readChapter(chSlug, comicSlug, true);
}

function filterChapters() {
  const input = document.getElementById('chapter-search');
  const filter = (input?.value || '').toLowerCase();
  const container = document.getElementById('chapter-list-container');
  const items = container.getElementsByClassName('chapter-item');

  for (let i = 0; i < items.length; i++) {
    const span = items[i].getElementsByTagName("span")[0];
    const txtValue = span.textContent || span.innerText;
    items[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
  }
}

/* ---------------- Reader Logic (final header 1 baris) ---------------- */

function normalizeChapterLabel(text) {
  if (!text) return "Chapter";
  const t = String(text).trim();

  if (/chapter/i.test(t)) return t;

  const m = t.match(/(\d+(\.\d+)?)/);
  if (m) return `Chapter ${m[1]}`;

  return t;
}

async function readChapter(chIdOrSlug, comicSlug = null, push = true) {
  if (isNavigating) return;
  lockNav();

  setLoading();

  try {
    let chSlug = chIdOrSlug;

    if (chIdOrSlug.length === 36) {
      const mapping = await getSlugFromUuid(chIdOrSlug);
      if (mapping) chSlug = mapping.slug;
    }

    if (push) {
      const uuid = await getUuidFromSlug(chSlug, 'chapter');
      updateURL(`/chapter/${uuid}`);
    }

    mainNav.classList.add('-translate-y-full');
    mobileNav.classList.add('translate-y-full');

    const data = await fetchAPI(`${API_BASE}/chapter/${chSlug}`);
    if (!data || !data.data) { redirectTo404(); return; }

    const res = data.data;

    let finalComicSlug = comicSlug;
    if (!finalComicSlug) {
      if (res.parent_slug) finalComicSlug = res.parent_slug;
      else if (res.comic_slug) finalComicSlug = res.comic_slug;
      else if (res.relation && res.relation.slug) finalComicSlug = res.relation.slug;
    }

    const comicTitle =
      currentComicContext?.title ||
      res.comic_title ||
      res.parent_title ||
      "Komik";

    const chapterLabel = normalizeChapterLabel(res.title || chSlug);
    const headerTitle = `${comicTitle} - ${chapterLabel}`;

    const backAction = finalComicSlug ? `showDetail('${finalComicSlug}')` : `showHome()`;

    let dropdownHTML = '';
    if (currentChapterList && currentChapterList.length > 0) {
      dropdownHTML = generateDropdownHTML(currentChapterList, chSlug, finalComicSlug);
    } else {
      dropdownHTML = `<div id="dropdown-placeholder" class="w-32"></div>`;
    }

    contentArea.innerHTML = `
      <div class="relative min-h-screen bg-[#0b0b0f] -mx-4 -mt-24">

        <div id="reader-top" class="reader-ui fixed top-0 w-full bg-gradient-to-b from-black/90 to-transparent z-[60] p-4 flex justify-between items-center transition-all duration-300">
          <div class="flex items-center gap-3">
            <button onclick="${backAction}" class="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-amber-500 hover:text-black hover:border-amber-500 transition text-white">
              <i class="fa fa-arrow-left"></i>
            </button>

            <div class="flex flex-col drop-shadow-md min-w-0">
              <span class="text-[9px] text-amber-500 uppercase tracking-widest font-bold">Reading</span>
              <h2 class="text-xs font-bold text-white max-w-[280px] truncate">${headerTitle}</h2>
            </div>
          </div>

          <button onclick="toggleFullScreen()" class="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition text-white">
            <i class="fa fa-expand text-xs"></i>
          </button>
        </div>

        <div id="reader-images" class="flex flex-col items-center pt-0 pb-0 min-h-screen w-full max-w-3xl mx-auto bg-[#111]" onclick="toggleReaderUI()">
        </div>

        <div id="reader-bottom" class="reader-ui fixed bottom-6 left-0 w-full z-[60] px-4 flex justify-center transition-all duration-300">
          <div class="glass p-2 rounded-2xl flex gap-1 items-center shadow-2xl border border-white/10 bg-black/80 backdrop-blur-xl">
            <button id="btn-prev"
              onclick="${res.navigation?.prev ? `readChapter('${res.navigation.prev}', '${finalComicSlug || ''}')` : ''}"
              class="w-10 h-10 flex items-center justify-center rounded-xl ${!res.navigation?.prev ? 'opacity-30 cursor-not-allowed text-gray-500' : 'hover:bg-amber-500 hover:text-black transition text-white'}">
              <i class="fa fa-chevron-left"></i>
            </button>

            <div id="chapter-dropdown-container">
              ${dropdownHTML}
            </div>

            <button id="btn-next"
              onclick="${res.navigation?.next ? `readChapter('${res.navigation.next}', '${finalComicSlug || ''}')` : ''}"
              class="w-10 h-10 flex items-center justify-center rounded-xl ${!res.navigation?.next ? 'opacity-30 cursor-not-allowed text-gray-500' : 'amber-gradient text-black hover:scale-105 transition shadow-lg shadow-amber-500/20'}">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    const imageContainer = document.getElementById('reader-images');
    const imgs = res.images || [];

    setProgress(10);

    let loadedCount = 0;
    const total = Math.max(1, imgs.length);

    imgs.forEach((imgUrl) => {
      const wrapper = document.createElement('div');
      wrapper.className = "w-full relative min-h-[400px] bg-[#1a1a1a]";

      const skeleton = document.createElement('div');
      skeleton.className = "skeleton absolute inset-0 w-full h-full z-10";

      const img = new Image();
      img.src = imgUrl;
      img.className = "comic-page opacity-0 transition-opacity duration-500 relative z-20";
      img.loading = "lazy";

      img.onload = () => {
        loadedCount++;
        skeleton.remove();
        img.classList.remove('opacity-0');
        wrapper.style.minHeight = "auto";
        wrapper.style.backgroundColor = "transparent";
        setProgress(10 + (loadedCount / total) * 70);
      };

      img.onerror = () => {
        loadedCount++;
        skeleton.remove();
        wrapper.innerHTML = `
          <div class="flex flex-col items-center justify-center py-12 bg-zinc-900 text-gray-500 gap-3 border border-red-900/30">
            <i class="fa fa-triangle-exclamation text-red-500 text-2xl"></i>
            <span class="text-xs">Gagal memuat gambar</span>
            <button onclick="this.parentElement.parentElement.querySelector('img').src='${imgUrl}'" class="text-[10px] bg-white/10 px-4 py-2 rounded hover:bg-white/20 mt-1">Coba Lagi</button>
          </div>
        `;
        wrapper.appendChild(img);
        setProgress(10 + (loadedCount / total) * 70);
      };

      wrapper.appendChild(skeleton);
      wrapper.appendChild(img);
      imageContainer.appendChild(wrapper);
    });

    if (finalComicSlug) {
      // simpan history: judul chapter pakai "Chapter X" yang sudah bersih
      saveHistory(finalComicSlug, currentComicContext?.title, currentComicContext?.image, chSlug, chapterLabel);
    }

    if ((!currentChapterList || currentChapterList.length === 0) && finalComicSlug) {
      fetchAndPopulateDropdown(finalComicSlug, chSlug);
    }

    setProgress(100);
    window.scrollTo(0, 0);
    bindReaderProgress();
  } finally {
    unlockNav();
  }
}

function generateDropdownHTML(list, currentSlug, comicSlug) {
  return `
    <div class="relative group mx-2">
      <select onchange="safeReadChapter(this.value, '${comicSlug || ''}')"
        class="appearance-none bg-black/50 backdrop-blur text-white border border-white/10 rounded-xl text-xs py-2.5 pl-3 pr-8 focus:outline-none focus:border-amber-500 cursor-pointer hover:bg-white/10 transition w-40 md:w-auto truncate">
        ${list.map(ch => `<option value="${ch.slug}" ${ch.slug === currentSlug ? 'selected' : ''}>${ch.title}</option>`).join('')}
      </select>
      <i class="fa fa-chevron-up absolute right-3 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none text-gray-400"></i>
    </div>
  `;
}

async function fetchAndPopulateDropdown(comicSlug, currentChapterSlug) {
  const data = await fetchAPI(`${API_BASE}/detail/${comicSlug}`);
  if (data && data.data) {
    currentChapterList = data.data.chapters || [];
    currentComicContext = { slug: comicSlug, title: data.data.title, image: data.data.image };

    const container = document.getElementById('chapter-dropdown-container');
    if (container) {
      container.innerHTML = generateDropdownHTML(currentChapterList, currentChapterSlug, comicSlug);
    }
    saveHistory(comicSlug, data.data.title, data.data.image, currentChapterSlug);
  }
}

function toggleReaderUI() {
  const top = document.getElementById('reader-top');
  const bottom = document.getElementById('reader-bottom');
  if (!top || !bottom) return;
  top.classList.toggle('ui-hidden-top');
  bottom.classList.toggle('ui-hidden-bottom');
}

/* ---------------- History & Bookmarks ---------------- */

function handleSearch(e) { if (e.key === 'Enter') applyAdvancedFilter(); }

function saveHistory(slug, title, image, chSlug, chTitle) {
  let history = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  let existing = history.find(h => h.slug === slug);

  const data = {
    slug,
    title: title || existing?.title || 'Unknown Title',
    image: image || existing?.image || 'assets/icon.png',
    lastChapterSlug: chSlug || existing?.lastChapterSlug,
    lastChapterTitle: chTitle || existing?.lastChapterTitle || 'Chapter ?',
    timestamp: new Date().getTime()
  };

  history = history.filter(h => h.slug !== slug);
  history.unshift(data);
  if (history.length > 50) history.pop();
  localStorage.setItem('fmc_history', JSON.stringify(history));
}

function showHistory() {
  updateURL('/history'); resetNavs();
  let history = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  renderGrid({ data: history }, "Riwayat Baca", null);
}

function toggleBookmark(slug, title, image) {
  let bookmarks = JSON.parse(localStorage.getItem('fmc_bookmarks') || '[]');
  const idx = bookmarks.findIndex(b => b.slug === slug);
  if (idx > -1) bookmarks.splice(idx, 1);
  else bookmarks.push({ slug, title, image });
  localStorage.setItem('fmc_bookmarks', JSON.stringify(bookmarks));
  checkBookmarkStatus(slug);
}

function checkBookmarkStatus(slug) {
  let bookmarks = JSON.parse(localStorage.getItem('fmc_bookmarks') || '[]');
  const btn = document.getElementById('btn-bookmark');
  if (!btn) return;

  if (bookmarks.some(b => b.slug === slug)) {
    btn.innerHTML = `<i class="fa fa-check text-amber-500"></i> Tersimpan`;
    btn.classList.add('border-amber-500/50', 'bg-amber-500/10');
    btn.classList.remove('glass');
  } else {
    btn.innerHTML = `<i class="fa fa-bookmark"></i> Simpan`;
    btn.classList.remove('border-amber-500/50', 'bg-amber-500/10');
    btn.classList.add('glass');
  }
}

function showBookmarks() {
  updateURL('/bookmarks'); resetNavs();
  let bookmarks = JSON.parse(localStorage.getItem('fmc_bookmarks') || '[]');
  renderGrid({ data: bookmarks }, "Koleksi Favorit", null);
}

/* ---------------- Init ---------------- */

async function handleInitialLoad() {
  const path = window.location.pathname;
  resetNavs();

  if (path === '/404.html') return;

  if (path.startsWith('/series/')) {
    const uuid = path.split('/')[2];
    if (uuid) showDetail(uuid, false);
    else showHome(false);
  }
  else if (path.startsWith('/chapter/')) {
    const uuid = path.split('/')[2];
    if (uuid) readChapter(uuid, null, false);
    else showHome(false);
  }
  else if (path === '/ongoing') showOngoing(1);
  else if (path === '/completed') showCompleted(1);
  else if (path === '/history') showHistory();
  else if (path === '/bookmarks') showBookmarks();
  else showHome(false);
}

window.addEventListener('popstate', () => handleInitialLoad());

document.addEventListener('DOMContentLoaded', () => {
  loadGenres();
  handleInitialLoad();
});

package.json : 
{
  "name": "fmc-comic-uuid",
  "version": "1.0.0",
  "main": "api/index.js",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "uuid": "^9.0.1"
  }
}
vercel.json :
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/series/(.*)", "destination": "/index.html" },
    { "source": "/chapter/(.*)", "destination": "/index.html" },
    { "source": "/ongoing", "destination": "/index.html" },
    { "source": "/completed", "destination": "/index.html" }
  ]
}
api/index.js : 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const connectionOptions = {
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,
};

const MappingSchema = new mongoose.Schema({
    uuid: { type: String, unique: true },
    slug: String,
    type: String
});
const Mapping = mongoose.models.Mapping || mongoose.model('Mapping', MappingSchema);

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) return;
    
    console.log("Mencoba menyambung ke MongoDB...");
    try {
        await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
        console.log("✅ Database Terhubung!");
    } catch (err) {
        console.error("❌ Gagal menyambung ke DB:", err.message);
        throw err;
    }
}

app.post('/api/get-id', async (req, res) => {
    try {
        await connectToDatabase();
        
        const { slug, type } = req.body;
        if (!slug || !type) return res.status(400).json({ error: "Slug/Type kurang" });

        console.log(`Mencari mapping untuk: ${slug} (${type})`);
        
        let data = await Mapping.findOne({ slug, type });
        if (!data) {
            console.log("Mapping tidak ditemukan, membuat UUID baru...");
            data = await Mapping.create({ uuid: uuidv4(), slug, type });
        }
        
        return res.json({ uuid: data.uuid });
    } catch (e) {
        console.error("Internal Error @ get-id:", e.message);
        return res.status(500).json({ error: e.message });
    }
});

app.get('/api/get-slug/:uuid', async (req, res) => {
    try {
        await connectToDatabase();
        const data = await Mapping.findOne({ uuid: req.params.uuid });
        if (data) return res.json(data);
        return res.status(404).json({ error: "UUID tidak ada di database" });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.get('/api/health', async (req, res) => {
    try {
        await connectToDatabase();
        res.json({ status: "OK", database: "Connected" });
    } catch (e) {
        res.status(500).json({ status: "Error", message: e.message });
    }
});

module.exports = app;

.env : 
MONGODB_URI=mongodb+srv://gu4rdian2021_db_user:mR0W9TGt1x6gr9Rq@cluster0.bfxgeuf.mongodb.net/?appName=Cluster0



#Semua Endpoint apinya : 
ini bagian  pencarian di atas atau di pojok untuk search komik :
apa yang user ketik dan di pencariannya otomatis ambil api search : https://www.sankavollerei.com/comic/komikindo/search/${text}/1, misalnya user nyari naruto akan otomatis get sesuai query: https://www.sankavollerei.com/comic/komikindo/search/naruto/1
${text} adalah bagian nama/ query yang di cari di fitur search komiknya 
/1 adalah pagenation selanjutnya atau halaman selanjutnya 

respon api : 
{
  "creator": "Sanka Vollerei",
  "success": true,
  "query": "naruto",
  "pagination": {
    "currentPage": 1,
    "hasNextPage": false,
    "nextPage": null
  },
  "komikList": [
    {
      "title": "Renge to Naruto!",
      "rating": "7.58",
      "slug": "renge-to-naruto",
      "image": "https://komikindo.ch/wp-content/uploads/2023/11/Komik-Renge-to-Naruto-226x319.png",
      "type": "Manga"
    },
    {
      "title": "Naruto: The Whorl within the Spiral",
      "rating": "8.34",
      "slug": "naruto-the-whorl-within-the-spiral",
      "image": "https://komikindo.ch/wp-content/uploads/2023/07/Komik-Naruto-The-Whorl-within-the-Spiral-236x285.jpg",
      "type": "Manga"
    },
    {
      "title": "Naruto: Konoha’s Story—The Steam Ninja Scrolls",
      "rating": "8.06",
      "slug": "naruto-konohas-story-the-steam-ninja-scrolls",
      "image": "https://komikindo.ch/wp-content/uploads/2022/10/Komik-Naruto-Konohas-StoryThe-Steam-Ninja-Scrolls-The-Manga-236x236.jpg",
      "type": "Manga"
    },
    {
      "title": "Naruto Sasuke’s Story The Uchiha And The Heavenly Stardust",
      "rating": "8.09",
      "slug": "893930-naruto-sasukes-story-the-uchiha-and-the-heavenly-stardust",
      "image": "https://komikindo.ch/wp-content/uploads/2022/10/Komik-Naruto-Sasukes-StoryThe-Uchiha-and-the-Heavenly-Stardust-The-Manga-202x319.jpg",
      "type": "Manga"
    },
    {
      "title": "Naruto Shippuden – Sai and Ino (Doujinshi)",
      "rating": "7",
      "slug": "naruto-shippuden-sai-and-ino-doujinshi",
      "image": "https://komikindo.ch/wp-content/uploads/2021/01/Komik-Naruto-Shippuden-Sai-and-Ino-Doujinshi-169x319.jpg",
      "type": "Manga"
    },
    {
      "title": "Naruto",
      "rating": "7.98",
      "slug": "naruto-id",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Naruto-204x319.jpg",
      "type": "Manga"
    },
    {
      "title": "Boruto",
      "rating": "6.49",
      "slug": "boruto",
      "image": "https://komikindo.ch/wp-content/uploads/2023/08/Komik-Boruto-Naruto-Next-Generations-203x319.jpg",
      "type": "Manga"
    }
  ]
}
Note bagian fitur search jika hasil di temukan tampilkan semua hasilnya  yang berupa nama komik thumbanil/cover komik ratingnya dan type komiknya dan sesuaikan gimana nanti sistemnya untuk next pagenation yg /1 sampai mentok brp

jadi yang ada di situ hamepage / latest yang mengambil bagian  Data update terbaru komik. : 
https://www.sankavollerei.com/comic/komikindo/latest/1
respon api kira kira : 
{
  "creator": "Sanka Vollerei",
  "success": true,
  "pagination": {
    "currentPage": 1,
    "totalPages": 207,
    "hasNextPage": true,
    "nextPage": 2
  },
  "komikList": [
    {
      "title": "Nano Machine",
      "slug": "155895-nano-machine",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Nano-Machine-223x319.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 300",
          "slug": "nano-machine-chapter-300",
          "date": "15 jam lalu"
        }
      ]
    },
    {
      "title": "The Return of the Mythical Archmage",
      "slug": "the-return-of-the-mythical-archmage",
      "image": "https://komikindo.ch/wp-content/uploads/2024/11/Komik-The-Return-of-the-Legendary-Archmage-236x315.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 81",
          "slug": "the-return-of-the-mythical-archmage-chapter-81",
          "date": "17 menit lalu"
        }
      ]
    },
    {
      "title": "Extremely Evil Game",
      "slug": "extremely-evil-game",
      "image": "https://komikindo.ch/wp-content/uploads/2022/07/Komik-Extremely-Evil-Game-236x315.jpg",
      "type": "Manhua",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 22",
          "slug": "extremely-evil-game-chapter-22",
          "date": "18 menit lalu"
        }
      ]
    },
    {
      "title": "Megami to Kekkon Shite Isekai de Shinkon Seikatsu",
      "slug": "megami-to-kekkon-shite-isekai-de-shinkon-seikatsu",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Megami-to-Kekkon-Shite-Isekai-de-Shinkon-Seikatsu-222x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 5",
          "slug": "megami-to-kekkon-shite-isekai-de-shinkon-seikatsu-chapter-5",
          "date": "20 menit lalu"
        }
      ]
    },
    {
      "title": "Ore ga Watashi ni Naru made",
      "slug": "ore-ga-watashi-ni-naru-made",
      "image": "https://komikindo.ch/wp-content/uploads/2022/04/Komik-Ore-ga-Watashi-ni-Naru-made-224x319.png",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 29",
          "slug": "ore-ga-watashi-ni-naru-made-chapter-29",
          "date": "23 menit lalu"
        }
      ]
    },
    {
      "title": "Otaku Onna to Danshi Kosei",
      "slug": "otaku-onna-to-danshi-kosei",
      "image": "https://komikindo.ch/wp-content/uploads/2024/02/Komik-Otaku-Onna-to-Danshi-Kosei-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 8",
          "slug": "otaku-onna-to-danshi-kosei-chapter-8",
          "date": "24 menit lalu"
        }
      ]
    },
    {
      "title": "Sewayaki Danshi to Guutara Osananajimi",
      "slug": "sewayaki-danshi-to-guutara-osananajimi",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Sewayaki-Danshi-to-Guutara-Osananajimi-226x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 4",
          "slug": "sewayaki-danshi-to-guutara-osananajimi-chapter-4",
          "date": "28 menit lalu"
        }
      ]
    },
    {
      "title": "Mahou Shoujo Fuusen wo Ane kara Moratte Nani ka ni Mezameru Shounen",
      "slug": "mahou-shoujo-fuusen-wo-ane-kara-moratte-nani-ka-ni-mezameru-shounen",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Mahou-Shoujo-Fuusen-wo-Ane-kara-Moratte-Nani-ka-ni-Mezameru-Shounen-225x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 2",
          "slug": "mahou-shoujo-fuusen-wo-ane-kara-moratte-nani-ka-ni-mezameru-shounen-chapter-2",
          "date": "32 menit lalu"
        }
      ]
    },
    {
      "title": "Replica Datte, Koi wo suru.",
      "slug": "replica-datte-koi-wo-suru",
      "image": "https://komikindo.ch/wp-content/uploads/2024/09/Komik-Replica-Datte-Koi-wo-suru-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 10",
          "slug": "replica-datte-koi-wo-suru-chapter-10-2",
          "date": "34 menit lalu"
        }
      ]
    },
    {
      "title": "Danjohi 1:39 no Heikou Sekai wa Omoi no Hoka Futsuu",
      "slug": "danjohi-139-no-heikou-sekai-wa-omoi-no-hoka-futsuu",
      "image": "https://komikindo.ch/wp-content/uploads/2023/11/Komik-Danjohi-139-no-Heikou-Sekai-wa-Omoi-no-Hoka-Futsuu-226x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 264",
          "slug": "danjohi-139-no-heikou-sekai-wa-omoi-no-hoka-futsuu-chapter-264",
          "date": "36 menit lalu"
        }
      ]
    },
    {
      "title": "Virgin Killer Ninpouchou",
      "slug": "virgin-killer-ninpouchou",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Virgin-Killer-Ninpouchou-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 1",
          "slug": "virgin-killer-ninpouchou-chapter-1",
          "date": "39 menit lalu"
        }
      ]
    },
    {
      "title": "Oshi no Imouto ni Tensei Shite Shimatta no de, Saikyou no Akujo ni Natte Onii-sama wo Dokusen Suru Koto ni Itashimasu",
      "slug": "oshi-no-imouto-ni-tensei-shite-shimatta-no-de-saikyou-no-akujo-ni-natte-onii-sama-wo-dokusen-suru-koto-ni-itashimasu",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Oshi-no-Imouto-ni-Tensei-Shite-Shimatta-no-de-Saikyou-no-Akujo-ni-Natte-Onii-sama-wo-Dokusen-Suru-Koto-ni-Itashimasu-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 10",
          "slug": "oshi-no-imouto-ni-tensei-shite-shimatta-no-de-saikyou-no-akujo-ni-natte-onii-sama-wo-dokusen-suru-koto-ni-itashimasu-chapter-10",
          "date": "45 menit lalu"
        }
      ]
    },
    {
      "title": "Ato wa Gojiyuu ni Douzo! ~Tutorial de Kami-sama ga Last Boss wo Taoshi Chatta node Watashi wa Suki Houdai Ikiteiku~",
      "slug": "ato-wa-gojiyuu-ni-douzo-tutorial-de-kami-sama-ga-last-boss-wo-taoshi-chatta-node-watashi-wa-suki-houdai-ikiteiku",
      "image": "https://komikindo.ch/wp-content/uploads/2024/10/Komik-Ato-wa-Gojiyuu-ni-Douzo-Tutorial-de-Kami-sama-ga-Last-Boss-wo-Taoshi-Chatta-node-Watashi-wa-Suki-Houdai-Ikiteiku-222x319.png",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 14",
          "slug": "ato-wa-gojiyuu-ni-douzo-tutorial-de-kami-sama-ga-last-boss-wo-taoshi-chatta-node-watashi-wa-suki-houdai-ikiteiku-chapter-14",
          "date": "56 menit lalu"
        }
      ]
    },
    {
      "title": "Mofumofu to Iku, Harapeko Ryourinin no Zeppin Gourmet Life",
      "slug": "mofumofu-to-iku-harapeko-ryourinin-no-zeppin-gourmet-life",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Mofumofu-to-Iku-Harapeko-Ryourinin-no-Zeppin-Gourmet-Life-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 4",
          "slug": "mofumofu-to-iku-harapeko-ryourinin-no-zeppin-gourmet-life-chapter-4",
          "date": "57 menit lalu"
        }
      ]
    },
    {
      "title": "The Masterful Cat Is Depressed Again Today",
      "slug": "the-masterful-cat-is-depressed-again-today",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Dekiru-Neko-wa-Kyou-mo-Yuuutsu-225x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 35.5",
          "slug": "the-masterful-cat-is-depressed-again-today-chapter-35-5",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Spare Me, Great Lord!",
      "slug": "spare-me-great-lord",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Spare-Me-Great-Lord-236x315.jpg",
      "type": "Manhua",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 725",
          "slug": "spare-me-great-lord-chapter-725",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Tensei Shitara Dragon no Tamago Datta - Ibara no Dragon Road",
      "slug": "tensei-shitara-dragon-no-tamago-datta-ibara-no-dragon-road",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Tensei-Shitara-Dragon-no-Tamago-Datta-Ibara-no-Dragon-Road-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 45",
          "slug": "tensei-shitara-dragon-no-tamago-datta-ibara-no-dragon-road-chapter-45",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Kyou kara Onushi wa Warawa no Musuko",
      "slug": "kyou-kara-onushi-wa-warawa-no-musuko",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Kyou-kara-Onushi-wa-Warawa-no-Musuko-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 2",
          "slug": "kyou-kara-onushi-wa-warawa-no-musuko-chapter-2",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Chikasugiru Futari",
      "slug": "chikasugiru-futari",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 4.2",
          "slug": "chikasugiru-futari-chapter-4-2",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Watashi no Koto Suki ja Nakatta no ka yo!?",
      "slug": "watashi-no-koto-suki-ja-nakatta-no-ka-yo",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 1",
          "slug": "watashi-no-koto-suki-ja-nakatta-no-ka-yo-chapter-1",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Saigo no Natsu wo Hitozuma to",
      "slug": "saigo-no-natsu-wo-hitozuma-to",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Saigo-no-Natsu-wo-Hitozuma-to-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 9",
          "slug": "saigo-no-natsu-wo-hitozuma-to-chapter-9",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Exorcist wo Otosenai",
      "slug": "exorcist-wo-otosenai",
      "image": "https://komikindo.ch/wp-content/uploads/2022/07/Komik-Exorcist-wo-Otosenai-203x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 88",
          "slug": "exorcist-wo-otosenai-chapter-88",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Kareinaru Akujo ni Naritai wa!: Aisare Tensei Shoujo wa, Tanoshii Nidome no Jinsei o Okurimasu",
      "slug": "kareinaru-akujo-ni-naritai-wa-aisare-tensei-shoujo-wa-tanoshii-nidome-no-jinsei-o-okurimasu",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Kareinaru-Akujo-ni-Naritai-wa-Aisare-Tensei-Shoujo-wa-Tanoshii-Nidome-no-Jinsei-o-Okurimasu-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 6.3",
          "slug": "kareinaru-akujo-ni-naritai-wa-aisare-tensei-shoujo-wa-tanoshii-nidome-no-jinsei-o-okurimasu-chapter-6-3",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Shinimodori Reijou no Karisome Kekkon: Nidome no Jinsei wa Kimajime Shougun to Seijuu Mofumofu",
      "slug": "shinimodori-reijou-no-karisome-kekkon-nidome-no-jinsei-wa-kimajime-shougun-to-seijuu-mofumofu",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Shinimodori-Reijou-no-Karisome-Kekkon-Nidome-no-Jinsei-wa-Kimajime-Shougun-to-Seijuu-Mofumofu-227x319.jpg",
      "type": "Manhwa",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 2",
          "slug": "shinimodori-reijou-no-karisome-kekkon-nidome-no-jinsei-wa-kimajime-shougun-to-seijuu-mofumofu-chapter-2",
          "date": "1 jam lalu"
        }
      ]
    },
    {
      "title": "Jitsu wa Imouto Deshita ~Saikin de Kita Giri no Otouto no Kyorikan ga Yatara Chikai Wake~",
      "slug": "jitsu-wa-imouto-deshita-saikin-de-kita-giri-no-otouto-no-kyorikan-ga-yatara-chikai-wake",
      "image": "https://komikindo.ch/wp-content/uploads/2023/06/Komik-She-Was-Actually-My-Stepsister-225x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 19",
          "slug": "jitsu-wa-imouto-deshita-saikin-de-kita-giri-no-otouto-no-kyorikan-ga-yatara-chikai-wake-chapter-19",
          "date": "2 jam lalu"
        }
      ]
    },
    {
      "title": "MARRIAGETOXIN",
      "slug": "marriagetoxin",
      "image": "https://komikindo.ch/wp-content/uploads/2022/05/Komik-MARRIAGETOXIN-236x305.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 90",
          "slug": "marriagetoxin-chapter-90",
          "date": "2 jam lalu"
        }
      ]
    },
    {
      "title": "Revenger: Apocalypse of Vengeance",
      "slug": "revenger-apocalypse-of-vengeance",
      "image": "https://komikindo.ch/wp-content/uploads/2025/11/Komik-Revenger-Apocalypse-of-Vengeance-226x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 21",
          "slug": "revenger-apocalypse-of-vengeance-chapter-21",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "Yui Can Only Live In the Shadows",
      "slug": "yui-can-only-live-in-the-shadows",
      "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Yui-Can-Only-Live-In-the-Shadows-226x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 8",
          "slug": "yui-can-only-live-in-the-shadows-chapter-8",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "Tensei Shite High Elf ni Narimashitaga, Slow Life wa 120-nen de Akimashita",
      "slug": "tensei-shite-high-elf-ni-narimashitaga-slow-life-wa-120-nen-de-akimashita",
      "image": "https://komikindo.ch/wp-content/uploads/2021/10/Komik-Growing-Tired-of-the-Lazy-High-Elf-Life-After-120-Years-236x317.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 46",
          "slug": "tensei-shite-high-elf-ni-narimashitaga-slow-life-wa-120-nen-de-akimashita-chapter-46",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "The Art Student Who Lived Twice",
      "slug": "the-art-student-who-lived-twice",
      "image": "https://komikindo.ch/wp-content/uploads/2025/04/Komik-The-Art-Student-Who-Lived-Twice-226x319.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 56",
          "slug": "the-art-student-who-lived-twice-chapter-56",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "Office Worker in the Ice Age Apocalypse",
      "slug": "office-worker-in-the-ice-age-apocalypse",
      "image": "https://komikindo.ch/wp-content/uploads/2025/08/Office-Worker-in-the-Ice-Age-Apocalypse-230x319.jpg",
      "type": "Manga",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 48",
          "slug": "office-worker-in-the-ice-age-apocalypse-chapter-48",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "To Hell With Being A Saint, I’m A Doctor",
      "slug": "884694-to-hell-with-being-a-saint-im-a-doctor",
      "image": "https://komikindo.ch/wp-content/uploads/2022/06/Komik-To-Hell-With-Being-A-Saint-Im-A-Doctor-223x319.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 150",
          "slug": "to-hell-with-being-a-saint-im-a-doctor-chapter-150",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "Tougen Anki",
      "slug": "tougen-anki",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Tougen-Anki-207x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 228",
          "slug": "tougen-anki-chapter-228",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "Demons’ Crest",
      "slug": "demons-crest-2",
      "image": "https://komikindo.ch/wp-content/uploads/2026/01/Komik-Demons-Crest-224x319.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 47",
          "slug": "demons-crest-chapter-47",
          "date": "3 jam lalu"
        }
      ]
    },
    {
      "title": "7-Nin no Nemuri Hime",
      "slug": "7-nin-no-nemuri-hime",
      "image": "https://komikindo.ch/wp-content/uploads/2023/06/Komik-7-Nin-no-Nemuri-Hime-236x170.jpg",
      "type": "Manga",
      "color": "Hitam",
      "chapters": [
        {
          "title": "Chapter 20",
          "slug": "7-nin-no-nemuri-hime-chapter-20",
          "date": "4 jam lalu"
        }
      ]
    },
    {
      "title": "The Tale of the Skeleton Messenger",
      "slug": "the-tale-of-the-skeleton-messenger",
      "image": "https://komikindo.ch/wp-content/uploads/2025/09/The-Tale-of-the-Skeleton-Messenger-220x319.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 24",
          "slug": "the-tale-of-the-skeleton-messenger-chapter-24",
          "date": "4 jam lalu"
        }
      ]
    },
    {
      "title": "The Suspicious Little Prince is the World’s Greatest Teenage Master",
      "slug": "the-suspicious-little-prince-is-the-worlds-greatest-teenage-master",
      "image": "https://komikindo.ch/wp-content/uploads/2024/07/Komik-The-Suspicious-Boy-Is-One-of-the-Worlds-Top-Ten-Masters-236x306.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 73",
          "slug": "the-suspicious-little-prince-is-the-worlds-greatest-teenage-master-chapter-73",
          "date": "4 jam lalu"
        }
      ]
    },
    {
      "title": "Margrave’s Bastard Son was The Emperor",
      "slug": "998548-margraves-bastard-son-was-the-emperor",
      "image": "https://komikindo.ch/wp-content/uploads/2024/05/Komik-Margraves-Bastard-Son-was-The-Emperor-223x319.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 66",
          "slug": "margraves-bastard-son-was-the-emperor-chapter-66",
          "date": "4 jam lalu"
        }
      ]
    },
    {
      "title": "Become the Strongest Hero Through the Cheat System",
      "slug": "become-the-strongest-hero-through-the-cheat-system",
      "image": "https://komikindo.ch/wp-content/uploads/2025/06/Komik-Become-the-Strongest-Hero-Through-the-Cheat-System-236x314.jpg",
      "type": "Manhua",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 100",
          "slug": "become-the-strongest-hero-through-the-cheat-system-chapter-100",
          "date": "1 minggu lalu"
        }
      ]
    },
    {
      "title": "Lookism",
      "slug": "950565-lookism",
      "image": "https://komikindo.ch/wp-content/uploads/2023/01/Komik-Lookism-224x319.jpg",
      "type": "Manhwa",
      "color": "Warna",
      "chapters": [
        {
          "title": "Chapter 595",
          "slug": "lookism-chapter-595",
          "date": "4 jam lalu"
        }
      ]
    }
  ],
  "komikPopuler": [
    {
      "rank": "1",
      "title": "Solo Leveling",
      "slug": "179384-solo-leveling",
      "author": "Chugong 추공",
      "rating": "9.33",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Solo-Leveling-79x107.jpeg"
    },
    {
      "rank": "2",
      "title": "Martial Peak",
      "slug": "martial-peak",
      "author": "Pikapi",
      "rating": "8.06",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Martial-Peak-79x105.jpg"
    },
    {
      "rank": "3",
      "title": "The Beginning After the End",
      "slug": "447206-the-beginning-after-the-end",
      "author": "TurtleMe",
      "rating": "9.06",
      "image": "https://komikindo.ch/wp-content/uploads/2021/01/Komik-The-Beginning-After-the-End-79x99.jpg"
    },
    {
      "rank": "4",
      "title": "Nano Machine",
      "slug": "155895-nano-machine",
      "author": "한중월야, 현절무",
      "rating": "8.54",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Nano-Machine-79x114.jpg"
    },
    {
      "rank": "5",
      "title": "Magic Emperor",
      "slug": "magic-emperor",
      "author": "Wuer Manhua, Ye Xiao",
      "rating": "8.3",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Demonic-Emperor-71x114.jpg"
    },
    {
      "rank": "6",
      "title": "Eleceed",
      "slug": "846048-eleceed",
      "author": "Son Jae-Ho",
      "rating": "8.89",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Eleceed-79x114.jpg"
    },
    {
      "rank": "7",
      "title": "Mercenary Enrollment",
      "slug": "134898-mercenary-enrollment",
      "author": "YC",
      "rating": "9.1",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Mercenary-Enrollment-79x114.jpg"
    },
    {
      "rank": "8",
      "title": "Wind Breaker",
      "slug": "183821-wind-breaker",
      "author": "Jo Yong Seok",
      "rating": "8.03",
      "image": "https://komikindo.ch/wp-content/uploads/2021/04/Komik-Wind-Breaker-79x109.jpg"
    },
    {
      "rank": "9",
      "title": "The Great Mage Returns After 4000 Years",
      "slug": "758554-the-great-mage-returns-after-4000-years",
      "author": "Barnacle",
      "rating": "8.49",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-The-Great-Mage-Returns-After-4000-Years-79x107.jpg"
    },
    {
      "rank": "10",
      "title": "Swordmaster’s Youngest Son",
      "slug": "583721-swordmasters-youngest-son",
      "author": "AZI",
      "rating": "7",
      "image": "https://komikindo.ch/wp-content/uploads/2022/05/Komik-Swordmasters-Youngest-Son-79x107.jpg"
    }
  ]
}

Library / Daftar Komik
desc : Daftar komik dengan filter genre, type, atau search.

api : https://www.sankavollerei.com/comic/komikindo/library?page=1
respon : 
{
  "creator": "Sanka Vollerei",
  "success": true,
  "pagination": {
    "currentPage": 1,
    "totalPages": 275,
    "hasNextPage": true,
    "nextPage": 2
  },
  "filters": {},
  "komikList": [
    {
      "title": "-50kg Cinderella",
      "rating": "8.01",
      "slug": "50kg-cinderella",
      "image": "https://komikindo.ch/wp-content/uploads/2022/09/Komik-50kg-Cinderella-224x319.jpg",
      "type": "Manga",
      "color": "Warna"
    },
    {
      "title": "-Aoppella!?- Hajimari no Playlist",
      "rating": "7",
      "slug": "aoppella-hajimari-no-playlist",
      "image": "https://komikindo.ch/wp-content/uploads/2021/11/Komik-Aoppella-Hajimari-no-Playlist-226x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "??? Rank no Ura Soubi Musou",
      "rating": "7",
      "slug": "rank-no-ura-soubi-musou",
      "image": "https://komikindo.ch/wp-content/uploads/2024/04/Komik-Rank-no-Ura-Soubi-Musou-223x319.jpg",
      "type": "Manga",
      "color": "Warna"
    },
    {
      "title": "“Bijin de Okane Mochi no Kanojo ga Hoshii” to Ittara, Wake Ari Joshi ga Yattekita Ken",
      "rating": "6.73",
      "slug": "bijin-de-okane-mochi-no-kanojo-ga-hoshii-to-ittara-wake-ari-joshi-ga-yattekita-ken",
      "image": "https://komikindo.ch/wp-content/uploads/2023/02/Komik-Bijin-de-Okane-Mochi-no-Kanojo-ga-Hosh-to-Ittara-Wake-Ari-Joshi-ga-Yattekita-Ken-222x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Cold”",
      "rating": "7.56",
      "slug": "cold",
      "image": "https://komikindo.ch/wp-content/uploads/2023/04/Komik-Cold-226x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Honyaku” no Sainou de Ore Dake ga Sekai wo Kaihen Dekiru Ken",
      "rating": "7",
      "slug": "honyaku-no-sainou-de-ore-dake-ga-sekai-wo-kaihen-dekiru-ken",
      "image": "https://komikindo.ch/wp-content/uploads/2022/06/Komik-Honyaku-no-Sainou-de-Ore-Dake-ga-Sekai-wo-Kaihen-Dekiru-Ken-224x319.webp",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Issho ni Netaindesu yo Ne, Senpai?” to Amaku Sasayakarete Kon’ya mo Nemurenai",
      "rating": "7.57",
      "slug": "issho-ni-netaindesu-yo-ne-senpai-to-amaku-sasayakarete-konya-mo-nemurenai",
      "image": "https://komikindo.ch/wp-content/uploads/2025/05/Komik-Issho-ni-Netaindesu-yo-Ne-Senpai-to-Amaku-Sasayakarete-Konya-mo-Nemurenai-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“It’s too precious and hard to read !!” 4P Short Stories",
      "rating": "7.35",
      "slug": "its-too-precious-and-hard-to-read-4p-short-stories",
      "image": "https://komikindo.ch/wp-content/uploads/2021/05/Komik-Its-too-precious-and-hard-to-read-4P-Short-Stories-225x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Jako ni wa Kaji ga Oniaida www” to Iwareta Kaji Level 9999 no Ore, Tsuihousareta no de Boukensha ni Tenshoku suru – Saikyou de Musou Shinagara Guild de Tanoshiku Kurashimasu",
      "rating": "6.52",
      "slug": "jako-ni-wa-kaji-ga-oniaida-www-to-iwareta-kaji-level-9999-no-ore-tsuihousareta-no-de-boukensha-ni-tenshoku-suru-saikyou-de-musou-shinagara-guild-de-tanoshiku-kurashimasu",
      "image": "https://komikindo.ch/wp-content/uploads/2023/11/Komik-Jako-ni-wa-Kaji-ga-Oniai-da-www-to-Iwareta-Kaji-Level-9999-no-Ore-Tsuihousareta-no-de-Boukensha-ni-Tenshokusuru-Saikyou-Buki-de-Musou-Shinagara-Guild-de-Tanoshiku-Kurashimasu-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Kawaii” wa Kimi no mono",
      "rating": "7.58",
      "slug": "kawaii-wa-kimi-no-mono",
      "image": "https://komikindo.ch/wp-content/uploads/2021/09/Komik-The-Cute-One-Is-You-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Koko wa Makasete Sakini Ike!” wo shitai Shinitagari no Nozomanu Uchuu Gekokujou",
      "rating": "7.45",
      "slug": "koko-wa-makasete-sakini-ike-wo-shitai-shinitagari-no-nozomanu-uchuu-gekokujou",
      "image": "https://komikindo.ch/wp-content/uploads/2024/09/Komik-Koko-wa-Makasete-Sakini-Ike-wo-shitai-Shinitagari-no-Nozomanu-Uchuu-Gekokujou-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Kukuku ……. He is the weakest of the Four Heavenly Monarchs.” I was dismissed from my job, but somehow I became the master of a hero and a holy maiden.",
      "rating": "7.95",
      "slug": "kukuku-he-is-the-weakest-of-the-four-heavenly-monarchs-i-was-dismissed-from-my-job-but-somehow-i-became-the-master-of-a-hero-and-a-holy-maiden",
      "image": "https://komikindo.ch/wp-content/uploads/2021/03/Komik-Kukuku-He-is-the-weakest-of-the-Four-Heavenly-Monarchs-I-was-dismissed-from-my-job-but-somehow-I-became-the-master-of-a-hero-and-a-holy-maiden-216x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Love Live Nijigasaki x Uma Musume” Hoenn Pixiv Collection",
      "rating": "7",
      "slug": "love-live-nijigasaki-x-uma-musume-hoenn-pixiv-collection",
      "image": "https://komikindo.ch/wp-content/uploads/2022/03/Komik-Love-Live-Nijigasaki-x-Uma-Musume-Hoenn-Pixiv-Collection-226x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Mou…. Hatarakitakunaindesu” Boukensha Nanka Yamete yaru. Imasara, Taiguu wo Kaerukara to Onegai sarete mo Okotowaridesu. Boku wa Zettai Hatarakimasen.",
      "rating": "7.53",
      "slug": "mou-hatarakitakunaindesu-boukensha-nanka-yamete-yaru-imasara-taiguu-wo-kaerukara-to-onegai-sarete-mo-okotowaridesu-boku-wa-zettai-hatarakimasen",
      "image": "https://komikindo.ch/wp-content/uploads/2021/10/Komik-I-Dont-Want-to-Work-Anymore-I-Quit-Being-an-Adventurer-Even-if-You-Treat-Me-Better-Now-I-Wont-Do-It-I-Will-NEVER-Work-Again-224x319.png",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Osananajimi ga Hoshii” to Tsubuyaitara Yoku Issho ni Asobu Onna Tomodachi no Yousu ga Hen ni Nattanda ga",
      "rating": "7.38",
      "slug": "osananajimi-ga-hoshii-to-tsubuyaitara-yoku-issho-ni-asobu-onna-tomodachi-no-yousu-ga-hen-ni-nattanda-ga",
      "image": "https://komikindo.ch/wp-content/uploads/2025/02/Komik-Osananajimi-ga-Hoshii-to-Tsubuyaitara-Yoku-Issho-ni-Asobu-Onna-Tomodachi-no-Yousu-ga-Hen-ni-Nattanda-ga-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "“Shop” Skill Sae Areba, Dungeon-ka Shita Sekai Demo Rakushou da",
      "rating": "7",
      "slug": "shop-skill-sae-areba-dungeon-ka-shita-sekai-demo-rakushou-da",
      "image": "https://komikindo.ch/wp-content/uploads/2022/04/Komik-Shop-Skill-Sae-Areba-Dungeon-ka-Shita-Sekai-Demo-Rakushou-da-236x209.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "#Zombie Sagashitemasu",
      "rating": "8.2",
      "slug": "zombie-sagashitemasu",
      "image": "https://komikindo.ch/wp-content/uploads/2022/12/Komik-Zombie-Sagashitemasu-222x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "+99 Wooden Stick",
      "rating": "7",
      "slug": "393629-99-wooden-stick",
      "image": "https://komikindo.ch/wp-content/uploads/2022/03/Komik-99-Wooden-Stick-220x319.jpg",
      "type": "Manhwa",
      "color": "Warna"
    },
    {
      "title": "0 Magic, a High Spirit, and a Demonic Sword",
      "rating": "7.56",
      "slug": "0-magic-a-high-spirit-and-a-demonic-sword",
      "image": "https://komikindo.ch/wp-content/uploads/2022/08/Komik-0-Magic-a-High-Spirit-and-a-Demonic-Sword-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "0 Saiji Start Dash Monogatari",
      "rating": "7.89",
      "slug": "0-saiji-start-dash-monogatari",
      "image": "https://komikindo.ch/wp-content/uploads/2023/06/Komik-0-sai-Ji-Start-Dash-Monogatari-224x319.jpg",
      "type": "Manga",
      "color": "Warna"
    },
    {
      "title": "07-Ghost",
      "rating": "8.2",
      "slug": "136271-07-ghost",
      "image": "https://komikindo.ch/wp-content/uploads/2020/11/Komik-07-Ghost-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "1 Million Times Attack Speed",
      "rating": "7",
      "slug": "1-million-times-attack-speed",
      "image": "https://komikindo.ch/wp-content/uploads/2023/07/Komik-1-Million-Times-Attack-Speed-236x315.png",
      "type": "Manhua",
      "color": "Warna"
    },
    {
      "title": "1 RT de Nakawarui Nonke Joshi-tachi ga 1-byou Kiss suru",
      "rating": "7.26",
      "slug": "1-rt-de-nakawarui-nonke-joshi-tachi-ga-1-byou-kiss-suru",
      "image": "https://komikindo.ch/wp-content/uploads/2022/09/Komik-For-Each-Retweet-Two-Straight-Girls-Who-Dont-Get-Along-Will-Kiss-for-One-Second-226x319.jpg",
      "type": "Manga",
      "color": "Warna"
    },
    {
      "title": "1 Second",
      "rating": "8.38",
      "slug": "176317-1-second",
      "image": "https://komikindo.ch/wp-content/uploads/2021/02/Komik-1-Second-222x319.png",
      "type": "Manhwa",
      "color": "Warna"
    },
    {
      "title": "1-nen A-gumi no Monster",
      "rating": "7.1",
      "slug": "1-nen-a-gumi-no-monster",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-1-nen-A-gumi-no-Monster-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "10 Kaime no Kokuhaku de Tsukiau Osananajimi",
      "rating": "7.64",
      "slug": "10-kaime-no-kokuhaku-de-tsukiau-osananajimi",
      "image": "https://komikindo.ch/wp-content/uploads/2023/07/Komik-Childhood-Friend-Dating-at-the-10th-Confession-226x319.jpg",
      "type": "Manga",
      "color": "Warna"
    },
    {
      "title": "10-Nen Buri ni Saikai shita Kusogaki wa Seijun Bishoujo JK ni Seichou shiteita",
      "rating": "7.66",
      "slug": "10-nen-buri-ni-saikai-shita-kusogaki-wa-seijun-bishoujo-jk-ni-seichou-shiteita",
      "image": "https://komikindo.ch/wp-content/uploads/2025/01/Komik-10-Nen-Buri-ni-Saikai-shita-Kusogaki-wa-Seijun-Bishoujo-JK-ni-Seichou-shiteita-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "10-nenmae ni Time Leap shite Osananajimi no Ojousama wo Tasuketara Iinazuke ni Narimashita",
      "rating": "7.52",
      "slug": "10-nenmae-ni-time-leap-shite-osananajimi-no-ojousama-wo-tasuketara-iinazuke-ni-narimashita",
      "image": "https://komikindo.ch/wp-content/uploads/2025/05/Komik-10-nenmae-ni-Time-Leap-shite-Osananajimi-no-Ojousama-wo-Tasuketara-Iinazuke-ni-Narimashita-224x319.jpg",
      "type": "Manga",
      "color": "Hitam"
    },
    {
      "title": "100 Nichigo ni S○X suru Tsuinte-chan",
      "rating": "7.89",
      "slug": "100-nichigo-ni-s%e2%97%8bx-suru-tsuinte-chan",
      "image": "https://komikindo.ch/wp-content/uploads/2021/02/Komik-100-Nichigo-ni-SX-suru-Tsuinte-chan-236x229.png",
      "type": "Manga",
      "color": "Warna"
    },
    {
      "title": "100 Years Old Top Chef",
      "rating": "7.1",
      "slug": "100-years-old-top-chef",
      "image": "https://komikindo.ch/wp-content/uploads/2023/05/Komik-100-Year-Old-Top-Chef-226x319.png",
      "type": "Manhwa",
      "color": "Warna"
    }
  ],
  "komikPopuler": [
    {
      "rank": "1",
      "title": "Solo Leveling",
      "slug": "179384-solo-leveling",
      "author": "Chugong 추공",
      "rating": "9.33",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Solo-Leveling-79x107.jpeg"
    },
    {
      "rank": "2",
      "title": "Martial Peak",
      "slug": "martial-peak",
      "author": "Pikapi",
      "rating": "8.06",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Martial-Peak-79x105.jpg"
    },
    {
      "rank": "3",
      "title": "The Beginning After the End",
      "slug": "447206-the-beginning-after-the-end",
      "author": "TurtleMe",
      "rating": "9.06",
      "image": "https://komikindo.ch/wp-content/uploads/2021/01/Komik-The-Beginning-After-the-End-79x99.jpg"
    },
    {
      "rank": "4",
      "title": "Nano Machine",
      "slug": "155895-nano-machine",
      "author": "한중월야, 현절무",
      "rating": "8.54",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Nano-Machine-79x114.jpg"
    },
    {
      "rank": "5",
      "title": "Magic Emperor",
      "slug": "magic-emperor",
      "author": "Wuer Manhua, Ye Xiao",
      "rating": "8.3",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Demonic-Emperor-71x114.jpg"
    },
    {
      "rank": "6",
      "title": "Eleceed",
      "slug": "846048-eleceed",
      "author": "Son Jae-Ho",
      "rating": "8.89",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Eleceed-79x114.jpg"
    },
    {
      "rank": "7",
      "title": "Mercenary Enrollment",
      "slug": "134898-mercenary-enrollment",
      "author": "YC",
      "rating": "9.1",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Mercenary-Enrollment-79x114.jpg"
    },
    {
      "rank": "8",
      "title": "Wind Breaker",
      "slug": "183821-wind-breaker",
      "author": "Jo Yong Seok",
      "rating": "8.03",
      "image": "https://komikindo.ch/wp-content/uploads/2021/04/Komik-Wind-Breaker-79x109.jpg"
    },
    {
      "rank": "9",
      "title": "The Great Mage Returns After 4000 Years",
      "slug": "758554-the-great-mage-returns-after-4000-years",
      "author": "Barnacle",
      "rating": "8.49",
      "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-The-Great-Mage-Returns-After-4000-Years-79x107.jpg"
    },
    {
      "rank": "10",
      "title": "Swordmaster’s Youngest Son",
      "slug": "583721-swordmasters-youngest-son",
      "author": "AZI",
      "rating": "7",
      "image": "https://komikindo.ch/wp-content/uploads/2022/05/Komik-Swordmasters-Youngest-Son-79x107.jpg"
    }
  ]
}

( Ingat ini bagian fitur penting untuk menampilkan detail dan baca setiap chapter) 


bagian : Info detail, sinopsis, dan daftar chapter.
desc : Nah jadi setelah user nih melihat pasti user otomatis milih komiknya kan nah ini api yang berfungi menampilkan detail komik yang di pilih  
https://www.sankavollerei.com/comic/komikindo/detail/${slug}
nah ${slug} itu nama komik yang di klik user liat hasil recom slug itu  nama komiknya misal : https://www.sankavollerei.com/comic/komikindo/detail/one-piece

respon api : 
{
  "creator": "Sanka Vollerei",
  "success": true,
  "data": {
    "id": "16975",
    "title": "Komik\n              One Piece",
    "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-One-Piece-203x319.jpg",
    "rating": "9.33",
    "votes": "6 Ribu Orang",
    "detail": {
      "alternativeTitle": "Đảo Hải Tặc, Wan pis, Wan Pīsu, Ван Пис, וואן פיס, وان پیس, ون بيس, วันพีซ, ワンピース, 海贼王, 航海王, 원피스",
      "status": "Berjalan",
      "author": "Oda Eiichiro",
      "illustrator": "Oda Eiichiro",
      "type": "Manga",
      "theme": "Supernatural"
    },
    "genres": [
      {
        "name": "Action",
        "slug": "/genres/action"
      },
      {
        "name": "Adventure",
        "slug": "/genres/adventure"
      },
      {
        "name": "Comedy",
        "slug": "/genres/comedy"
      },
      {
        "name": "Drama",
        "slug": "/genres/drama"
      },
      {
        "name": "Fantasy",
        "slug": "/genres/fantasy"
      }
    ],
    "description": "Manga One Piece yang dibuat oleh komikus bernama Oda Eiichiro ini bercerita tentang Gol D. Roger, seorang pria yang disebut sebagai \"Raja Bajak Laut,\" akan dieksekusi oleh Pemerintah Dunia. Tapi tepat sebelum kematiannya, dia mengkonfirmasi keberadaan harta karun besar, One Piece, yang terletak di suatu tempat di lautan luas yang dikenal sebagai Grand Line. Mengumumkan bahwa One Piece dapat diklaim oleh siapa saja yang cukup layak untuk mencapainya, Raja Bajak Laut dieksekusi dan Zaman Bajak Laut Hebat dimulai. Dua puluh dua tahun kemudian, seorang pemuda bernama Monkey D.Luffy siap untuk memulai petualangannya sendiri, mencari One Piece dan berusaha untuk menjadi Raja Bajak Laut yang baru. Berbekal hanya topi jerami, perahu kecil, dan tubuh elastis, ia memulai perjalanan yang fantastis untuk mengumpulkan awaknya sendiri dan kapal yang layak yang akan membawa mereka melintasi Grand Line untuk mengklaim status terbesar di laut lepas.",
    "firstChapter": {
      "title": "Chapter Awal Chapter\n                        001",
      "slug": "one-piece-chapter-001"
    },
    "latestChapter": {
      "title": "Chapter Baru Chapter\n                        1174",
      "slug": "one-piece-chapter-1174"
    },
    "chapters": [
      {
        "title": "Chapter 005",
        "slug": "one-piece-chapter-005",
        "releaseTime": "5 tahun yang lalu"
      },
      {
        "title": "Chapter 004",
        "slug": "one-piece-chapter-004",
        "releaseTime": "5 tahun yang lalu"
      },
      {
        "title": "Chapter 003",
        "slug": "one-piece-chapter-003",
        "releaseTime": "5 tahun yang lalu"
      },
      {
        "title": "Chapter 002",
        "slug": "one-piece-chapter-002",
        "releaseTime": "5 tahun yang lalu"
      },
      {
        "title": "Chapter 001",
        "slug": "one-piece-chapter-001",
        "releaseTime": "5 tahun yang lalu"
      }
    ],
    "spoilerImages": [
      "https://i1.wp.com/ttb58t4jfnpo6fh691p6.lol/data/772241/001/AGn0Y6kM94XVzej/iOLavSTMApbRV26007.jpg?resize=251,345",
      "https://i1.wp.com/ttb58t4jfnpo6fh691p6.lol/data/772241/001/AGn0Y6kM94XVzej/5wr3Iz65Vi7iOoQ008.jpg?resize=251,345",
      "https://i1.wp.com/ttb58t4jfnpo6fh691p6.lol/data/772241/001/AGn0Y6kM94XVzej/q2botFH2HpbMFZ3009.jpg?resize=251,345",
      "https://i1.wp.com/ttb58t4jfnpo6fh691p6.lol/data/772241/001/AGn0Y6kM94XVzej/5pktY7NXoHLHDw1010.jpg?resize=251,345"
    ],
    "similarManga": [
      {
        "title": "Kuitsume Youhei no Gensou Kitan",
        "slug": "kuitsume-youhei-no-gensou-kitan",
        "image": "https://komikindo.ch/wp-content/uploads/2021/11/Komik-Kuitsume-Youhei-no-Gensou-Kitan-224x319.jpg",
        "description": "Setelah kelompok tentara bayaran tempat dia dulu bekerja benar-benar..."
      },
      {
        "title": "Karakai Jouzu no Takagi-san",
        "slug": "936992-karakai-jouzu-no-takagi-san",
        "image": "https://komikindo.ch/wp-content/uploads/2024/12/Komik-Karakai-Jouzu-no-Takagi-san-224x319.jpg",
        "description": "Jika Anda tersipu, Anda kalah! Dengan prinsip ini, Nishikata,..."
      },
      {
        "title": "Takabisha Dorei-chan",
        "slug": "takabisha-dorei-chan",
        "image": "https://komikindo.ch/wp-content/uploads/2024/09/Komik-Arrogant-Slave-226x319.jpg",
        "description": "Di pasar, seorang pria bertemu dengan seorang budak yang..."
      },
      {
        "title": "86 — Eighty Six —",
        "slug": "86-eighty-six",
        "image": "https://komikindo.ch/wp-content/uploads/2021/02/Komik-86-Eighty-Six-224x319.jpg",
        "description": "Republik San Magnolia telah lama diserang oleh tentara drone..."
      }
    ]
  }
}

( ini bagian baca chapter/read chapter) 
nah jika user memilih salah satu chapter  misal chapter 1 sesuai anime yang di click user dan dia otomatis mengambil gambar chapter ke yang sesuai kita pilih dari detail chapter berdasarkan slug  : 
https://www.sankavollerei.com/comic/komikindo/chapter/${slug} misalnya : https://www.sankavollerei.com/comic/komikindo/chapter/one-piece-chapter-1
nah respon api : 
{
  "creator": "Sanka Vollerei",
  "success": true,
  "data": {
    "id": "17081",
    "title": "Komik\n              One Piece Chapter 100",
    "navigation": {
      "prev": "one-piece-chapter-099",
      "next": "one-piece-chapter-101"
    },
    "allChapterSlug": "one-piece-id",
    "images": [
      {
        "id": 1,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/vyz7BwjPhBJfLbT001.jpg"
      },
      {
        "id": 2,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/azeBh7jemSFx0bl002.png"
      },
      {
        "id": 3,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/WtinLZOO7hR65Iy003.jpg"
      },
      {
        "id": 4,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/imh2m9PjV2n7lAi004.png"
      },
      {
        "id": 5,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/6lhlS2QIPtY956r005.png"
      },
      {
        "id": 6,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/ps735YTTLU0qcga006.png"
      },
      {
        "id": 7,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/8XHvaa7CXVUk4Re007.png"
      },
      {
        "id": 8,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/gX9M6WpknCEV6pi008.png"
      },
      {
        "id": 9,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/sdBgop0Pl3jDEXn009.png"
      },
      {
        "id": 10,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/n4UjtIMBDafFy6J010.png"
      },
      {
        "id": 11,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/50Ltmt4PJIu8nKJ011.png"
      },
      {
        "id": 12,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/OGOp7CPmdsw0YVN012.png"
      },
      {
        "id": 13,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/ndhmFszi4gA0IJ9013.png"
      },
      {
        "id": 14,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/sQyBF5Nff0WrVTy014.png"
      },
      {
        "id": 15,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/0u7zB3Yip3rt2F0015.png"
      },
      {
        "id": 16,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/5aYpMc9iuMCJ6lI016.png"
      },
      {
        "id": 17,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/USOYCqSFqDZax1O017.png"
      },
      {
        "id": 18,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/4Wr9xkPvxPVIAcM018.png"
      },
      {
        "id": 19,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/8nGVjaRe10o8db9019.png"
      },
      {
        "id": 20,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/m5j6pKMAixSNBwj020.png"
      },
      {
        "id": 21,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/BL1CgVvAvOhYywd021.png"
      },
      {
        "id": 22,
        "url": "https://imageainewgeneration.lol/data/772241/100/9JsTjARHEJRqiUY/sZY2MwnNvm7UdZN022.png"
      },
      {
        "id": 23,
        "url": "https://himmga.lat/data/772241/100/9JsTjARHEJRqiUY/oG85WTWJzajPQz4023.png"
      },
      {
        "id": 24,
        "url": "https://gaimgame.pics/data/772241/100/9JsTjARHEJRqiUY/0wvBkmGXv7jSCBD024.png"
      }
    ],
    "thumbnail": {
      "url": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-One-Piece-181x285.jpg",
      "title": "Komik One Piece"
    },
    "komikInfo": {
      "title": "Komik One Piece Indo",
      "description": "Gol D. Roger, seorang pria yang disebut sebagai \"Raja Bajak Laut,\" akan dieksekusi oleh Pemerintah Dunia. Tapi tepat sebelum kematiannya, dia mengkonfirmasi keberadaan harta karun besar, One Piece, yang terletak di suatu tempat di lautan luas yang dikenal sebagai Grand Line. Mengumumkan bahwa One Piece dapat diklaim oleh siapa saja yang cukup layak untuk mencapainya, Raja Bajak Laut dieksekusi dan Zaman Bajak Laut Hebat dimulai.\n\nDua puluh dua tahun kemudian, seorang pemuda bernama Monkey D.Luffy siap untuk memulai petualangannya sendiri, mencari One Piece dan berusaha untuk menjadi Raja Bajak Laut yang baru. Berbekal hanya topi jerami, perahu kecil, dan tubuh elastis, ia memulai perjalanan yang fantastis untuk mengumpulkan awaknya sendiri dan kapal yang layak yang akan membawa mereka melintasi Grand Line untuk mengklaim status terbesar di laut lepas.",
      "chapters": [
        {
          "title": "Chapter 1174",
          "slug": "one-piece-chapter-1174"
        },
        {
          "title": "Chapter 1173",
          "slug": "one-piece-chapter-1173"
        },
        {
          "title": "Chapter 1172",
          "slug": "one-piece-chapter-1172"
        },
        {
          "title": "Chapter 1171",
          "slug": "one-piece-chapter-1171"
        },
        {
          "title": "Chapter 1170",
          "slug": "one-piece-chapter-1170"
        }
      ]
    }
  }
}



penjelasan : 
/1 pada api itu adalah pagenation halamanya berarti ada halaman 2 dan seterusnya 
page=1 adalah page juga ada juga berarti halaman ke 2 dan seterusnya 
dan 
"pagination": {
    "currentPage": 1,
    "totalPages": 207,
    "hasNextPage": true,
    "nextPage": 2
  },
  
  ini true berarti ada halaman selanjutnya sampai mentok totalpages 
  sesuaikan aja ya! 








Tambahan : 
Oh Dan ganti api cors saya karena api cors nekolabs saya juga udh mati! 

Endpoint api saya : https://api-proxy-eight-mu.vercel.app/api/tools/proxy?url=${text} misal nya : https://api-proxy-eight-mu.vercel.app/api/tools/proxy?url=https://www.sankavollerei.com/comic/komikindo/latest/1


Maka respon api cors saya : 
{
  "success": true,
  "result": {
    "status": 200,
    "content": {
      "creator": "Sanka Vollerei",
      "success": true,
      "pagination": {
        "currentPage": 1,
        "totalPages": 207,
        "hasNextPage": true,
        "nextPage": 2
      },
      "komikList": [
        {
          "title": "Nano Machine",
          "slug": "155895-nano-machine",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Nano-Machine-223x319.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 300",
              "slug": "nano-machine-chapter-300",
              "date": "15 jam lalu"
            }
          ]
        },
        {
          "title": "The Return of the Mythical Archmage",
          "slug": "the-return-of-the-mythical-archmage",
          "image": "https://komikindo.ch/wp-content/uploads/2024/11/Komik-The-Return-of-the-Legendary-Archmage-236x315.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 81",
              "slug": "the-return-of-the-mythical-archmage-chapter-81",
              "date": "17 menit lalu"
            }
          ]
        },
        {
          "title": "Extremely Evil Game",
          "slug": "extremely-evil-game",
          "image": "https://komikindo.ch/wp-content/uploads/2022/07/Komik-Extremely-Evil-Game-236x315.jpg",
          "type": "Manhua",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 22",
              "slug": "extremely-evil-game-chapter-22",
              "date": "18 menit lalu"
            }
          ]
        },
        {
          "title": "Megami to Kekkon Shite Isekai de Shinkon Seikatsu",
          "slug": "megami-to-kekkon-shite-isekai-de-shinkon-seikatsu",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Megami-to-Kekkon-Shite-Isekai-de-Shinkon-Seikatsu-222x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 5",
              "slug": "megami-to-kekkon-shite-isekai-de-shinkon-seikatsu-chapter-5",
              "date": "20 menit lalu"
            }
          ]
        },
        {
          "title": "Ore ga Watashi ni Naru made",
          "slug": "ore-ga-watashi-ni-naru-made",
          "image": "https://komikindo.ch/wp-content/uploads/2022/04/Komik-Ore-ga-Watashi-ni-Naru-made-224x319.png",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 29",
              "slug": "ore-ga-watashi-ni-naru-made-chapter-29",
              "date": "23 menit lalu"
            }
          ]
        },
        {
          "title": "Otaku Onna to Danshi Kosei",
          "slug": "otaku-onna-to-danshi-kosei",
          "image": "https://komikindo.ch/wp-content/uploads/2024/02/Komik-Otaku-Onna-to-Danshi-Kosei-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 8",
              "slug": "otaku-onna-to-danshi-kosei-chapter-8",
              "date": "24 menit lalu"
            }
          ]
        },
        {
          "title": "Sewayaki Danshi to Guutara Osananajimi",
          "slug": "sewayaki-danshi-to-guutara-osananajimi",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Sewayaki-Danshi-to-Guutara-Osananajimi-226x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 4",
              "slug": "sewayaki-danshi-to-guutara-osananajimi-chapter-4",
              "date": "28 menit lalu"
            }
          ]
        },
        {
          "title": "Mahou Shoujo Fuusen wo Ane kara Moratte Nani ka ni Mezameru Shounen",
          "slug": "mahou-shoujo-fuusen-wo-ane-kara-moratte-nani-ka-ni-mezameru-shounen",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Mahou-Shoujo-Fuusen-wo-Ane-kara-Moratte-Nani-ka-ni-Mezameru-Shounen-225x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 2",
              "slug": "mahou-shoujo-fuusen-wo-ane-kara-moratte-nani-ka-ni-mezameru-shounen-chapter-2",
              "date": "32 menit lalu"
            }
          ]
        },
        {
          "title": "Replica Datte, Koi wo suru.",
          "slug": "replica-datte-koi-wo-suru",
          "image": "https://komikindo.ch/wp-content/uploads/2024/09/Komik-Replica-Datte-Koi-wo-suru-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 10",
              "slug": "replica-datte-koi-wo-suru-chapter-10-2",
              "date": "34 menit lalu"
            }
          ]
        },
        {
          "title": "Danjohi 1:39 no Heikou Sekai wa Omoi no Hoka Futsuu",
          "slug": "danjohi-139-no-heikou-sekai-wa-omoi-no-hoka-futsuu",
          "image": "https://komikindo.ch/wp-content/uploads/2023/11/Komik-Danjohi-139-no-Heikou-Sekai-wa-Omoi-no-Hoka-Futsuu-226x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 264",
              "slug": "danjohi-139-no-heikou-sekai-wa-omoi-no-hoka-futsuu-chapter-264",
              "date": "36 menit lalu"
            }
          ]
        },
        {
          "title": "Virgin Killer Ninpouchou",
          "slug": "virgin-killer-ninpouchou",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Virgin-Killer-Ninpouchou-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 1",
              "slug": "virgin-killer-ninpouchou-chapter-1",
              "date": "39 menit lalu"
            }
          ]
        },
        {
          "title": "Oshi no Imouto ni Tensei Shite Shimatta no de, Saikyou no Akujo ni Natte Onii-sama wo Dokusen Suru Koto ni Itashimasu",
          "slug": "oshi-no-imouto-ni-tensei-shite-shimatta-no-de-saikyou-no-akujo-ni-natte-onii-sama-wo-dokusen-suru-koto-ni-itashimasu",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Oshi-no-Imouto-ni-Tensei-Shite-Shimatta-no-de-Saikyou-no-Akujo-ni-Natte-Onii-sama-wo-Dokusen-Suru-Koto-ni-Itashimasu-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 10",
              "slug": "oshi-no-imouto-ni-tensei-shite-shimatta-no-de-saikyou-no-akujo-ni-natte-onii-sama-wo-dokusen-suru-koto-ni-itashimasu-chapter-10",
              "date": "45 menit lalu"
            }
          ]
        },
        {
          "title": "Ato wa Gojiyuu ni Douzo! ~Tutorial de Kami-sama ga Last Boss wo Taoshi Chatta node Watashi wa Suki Houdai Ikiteiku~",
          "slug": "ato-wa-gojiyuu-ni-douzo-tutorial-de-kami-sama-ga-last-boss-wo-taoshi-chatta-node-watashi-wa-suki-houdai-ikiteiku",
          "image": "https://komikindo.ch/wp-content/uploads/2024/10/Komik-Ato-wa-Gojiyuu-ni-Douzo-Tutorial-de-Kami-sama-ga-Last-Boss-wo-Taoshi-Chatta-node-Watashi-wa-Suki-Houdai-Ikiteiku-222x319.png",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 14",
              "slug": "ato-wa-gojiyuu-ni-douzo-tutorial-de-kami-sama-ga-last-boss-wo-taoshi-chatta-node-watashi-wa-suki-houdai-ikiteiku-chapter-14",
              "date": "56 menit lalu"
            }
          ]
        },
        {
          "title": "Mofumofu to Iku, Harapeko Ryourinin no Zeppin Gourmet Life",
          "slug": "mofumofu-to-iku-harapeko-ryourinin-no-zeppin-gourmet-life",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Mofumofu-to-Iku-Harapeko-Ryourinin-no-Zeppin-Gourmet-Life-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 4",
              "slug": "mofumofu-to-iku-harapeko-ryourinin-no-zeppin-gourmet-life-chapter-4",
              "date": "57 menit lalu"
            }
          ]
        },
        {
          "title": "The Masterful Cat Is Depressed Again Today",
          "slug": "the-masterful-cat-is-depressed-again-today",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Dekiru-Neko-wa-Kyou-mo-Yuuutsu-225x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 35.5",
              "slug": "the-masterful-cat-is-depressed-again-today-chapter-35-5",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Spare Me, Great Lord!",
          "slug": "spare-me-great-lord",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Spare-Me-Great-Lord-236x315.jpg",
          "type": "Manhua",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 725",
              "slug": "spare-me-great-lord-chapter-725",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Tensei Shitara Dragon no Tamago Datta - Ibara no Dragon Road",
          "slug": "tensei-shitara-dragon-no-tamago-datta-ibara-no-dragon-road",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Tensei-Shitara-Dragon-no-Tamago-Datta-Ibara-no-Dragon-Road-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 45",
              "slug": "tensei-shitara-dragon-no-tamago-datta-ibara-no-dragon-road-chapter-45",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Kyou kara Onushi wa Warawa no Musuko",
          "slug": "kyou-kara-onushi-wa-warawa-no-musuko",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Kyou-kara-Onushi-wa-Warawa-no-Musuko-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 2",
              "slug": "kyou-kara-onushi-wa-warawa-no-musuko-chapter-2",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Chikasugiru Futari",
          "slug": "chikasugiru-futari",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 4.2",
              "slug": "chikasugiru-futari-chapter-4-2",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Watashi no Koto Suki ja Nakatta no ka yo!?",
          "slug": "watashi-no-koto-suki-ja-nakatta-no-ka-yo",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 1",
              "slug": "watashi-no-koto-suki-ja-nakatta-no-ka-yo-chapter-1",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Saigo no Natsu wo Hitozuma to",
          "slug": "saigo-no-natsu-wo-hitozuma-to",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Saigo-no-Natsu-wo-Hitozuma-to-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 9",
              "slug": "saigo-no-natsu-wo-hitozuma-to-chapter-9",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Exorcist wo Otosenai",
          "slug": "exorcist-wo-otosenai",
          "image": "https://komikindo.ch/wp-content/uploads/2022/07/Komik-Exorcist-wo-Otosenai-203x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 88",
              "slug": "exorcist-wo-otosenai-chapter-88",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Kareinaru Akujo ni Naritai wa!: Aisare Tensei Shoujo wa, Tanoshii Nidome no Jinsei o Okurimasu",
          "slug": "kareinaru-akujo-ni-naritai-wa-aisare-tensei-shoujo-wa-tanoshii-nidome-no-jinsei-o-okurimasu",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Kareinaru-Akujo-ni-Naritai-wa-Aisare-Tensei-Shoujo-wa-Tanoshii-Nidome-no-Jinsei-o-Okurimasu-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 6.3",
              "slug": "kareinaru-akujo-ni-naritai-wa-aisare-tensei-shoujo-wa-tanoshii-nidome-no-jinsei-o-okurimasu-chapter-6-3",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Shinimodori Reijou no Karisome Kekkon: Nidome no Jinsei wa Kimajime Shougun to Seijuu Mofumofu",
          "slug": "shinimodori-reijou-no-karisome-kekkon-nidome-no-jinsei-wa-kimajime-shougun-to-seijuu-mofumofu",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Shinimodori-Reijou-no-Karisome-Kekkon-Nidome-no-Jinsei-wa-Kimajime-Shougun-to-Seijuu-Mofumofu-227x319.jpg",
          "type": "Manhwa",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 2",
              "slug": "shinimodori-reijou-no-karisome-kekkon-nidome-no-jinsei-wa-kimajime-shougun-to-seijuu-mofumofu-chapter-2",
              "date": "1 jam lalu"
            }
          ]
        },
        {
          "title": "Jitsu wa Imouto Deshita ~Saikin de Kita Giri no Otouto no Kyorikan ga Yatara Chikai Wake~",
          "slug": "jitsu-wa-imouto-deshita-saikin-de-kita-giri-no-otouto-no-kyorikan-ga-yatara-chikai-wake",
          "image": "https://komikindo.ch/wp-content/uploads/2023/06/Komik-She-Was-Actually-My-Stepsister-225x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 19",
              "slug": "jitsu-wa-imouto-deshita-saikin-de-kita-giri-no-otouto-no-kyorikan-ga-yatara-chikai-wake-chapter-19",
              "date": "2 jam lalu"
            }
          ]
        },
        {
          "title": "MARRIAGETOXIN",
          "slug": "marriagetoxin",
          "image": "https://komikindo.ch/wp-content/uploads/2022/05/Komik-MARRIAGETOXIN-236x305.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 90",
              "slug": "marriagetoxin-chapter-90",
              "date": "2 jam lalu"
            }
          ]
        },
        {
          "title": "Revenger: Apocalypse of Vengeance",
          "slug": "revenger-apocalypse-of-vengeance",
          "image": "https://komikindo.ch/wp-content/uploads/2025/11/Komik-Revenger-Apocalypse-of-Vengeance-226x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 21",
              "slug": "revenger-apocalypse-of-vengeance-chapter-21",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "Yui Can Only Live In the Shadows",
          "slug": "yui-can-only-live-in-the-shadows",
          "image": "https://komikindo.ch/wp-content/uploads/2026/02/Komik-Yui-Can-Only-Live-In-the-Shadows-226x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 8",
              "slug": "yui-can-only-live-in-the-shadows-chapter-8",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "Tensei Shite High Elf ni Narimashitaga, Slow Life wa 120-nen de Akimashita",
          "slug": "tensei-shite-high-elf-ni-narimashitaga-slow-life-wa-120-nen-de-akimashita",
          "image": "https://komikindo.ch/wp-content/uploads/2021/10/Komik-Growing-Tired-of-the-Lazy-High-Elf-Life-After-120-Years-236x317.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 46",
              "slug": "tensei-shite-high-elf-ni-narimashitaga-slow-life-wa-120-nen-de-akimashita-chapter-46",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "The Art Student Who Lived Twice",
          "slug": "the-art-student-who-lived-twice",
          "image": "https://komikindo.ch/wp-content/uploads/2025/04/Komik-The-Art-Student-Who-Lived-Twice-226x319.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 56",
              "slug": "the-art-student-who-lived-twice-chapter-56",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "Office Worker in the Ice Age Apocalypse",
          "slug": "office-worker-in-the-ice-age-apocalypse",
          "image": "https://komikindo.ch/wp-content/uploads/2025/08/Office-Worker-in-the-Ice-Age-Apocalypse-230x319.jpg",
          "type": "Manga",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 48",
              "slug": "office-worker-in-the-ice-age-apocalypse-chapter-48",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "To Hell With Being A Saint, I’m A Doctor",
          "slug": "884694-to-hell-with-being-a-saint-im-a-doctor",
          "image": "https://komikindo.ch/wp-content/uploads/2022/06/Komik-To-Hell-With-Being-A-Saint-Im-A-Doctor-223x319.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 150",
              "slug": "to-hell-with-being-a-saint-im-a-doctor-chapter-150",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "Tougen Anki",
          "slug": "tougen-anki",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Tougen-Anki-207x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 228",
              "slug": "tougen-anki-chapter-228",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "Demons’ Crest",
          "slug": "demons-crest-2",
          "image": "https://komikindo.ch/wp-content/uploads/2026/01/Komik-Demons-Crest-224x319.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 47",
              "slug": "demons-crest-chapter-47",
              "date": "3 jam lalu"
            }
          ]
        },
        {
          "title": "7-Nin no Nemuri Hime",
          "slug": "7-nin-no-nemuri-hime",
          "image": "https://komikindo.ch/wp-content/uploads/2023/06/Komik-7-Nin-no-Nemuri-Hime-236x170.jpg",
          "type": "Manga",
          "color": "Hitam",
          "chapters": [
            {
              "title": "Chapter 20",
              "slug": "7-nin-no-nemuri-hime-chapter-20",
              "date": "4 jam lalu"
            }
          ]
        },
        {
          "title": "The Tale of the Skeleton Messenger",
          "slug": "the-tale-of-the-skeleton-messenger",
          "image": "https://komikindo.ch/wp-content/uploads/2025/09/The-Tale-of-the-Skeleton-Messenger-220x319.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 24",
              "slug": "the-tale-of-the-skeleton-messenger-chapter-24",
              "date": "4 jam lalu"
            }
          ]
        },
        {
          "title": "The Suspicious Little Prince is the World’s Greatest Teenage Master",
          "slug": "the-suspicious-little-prince-is-the-worlds-greatest-teenage-master",
          "image": "https://komikindo.ch/wp-content/uploads/2024/07/Komik-The-Suspicious-Boy-Is-One-of-the-Worlds-Top-Ten-Masters-236x306.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 73",
              "slug": "the-suspicious-little-prince-is-the-worlds-greatest-teenage-master-chapter-73",
              "date": "4 jam lalu"
            }
          ]
        },
        {
          "title": "Margrave’s Bastard Son was The Emperor",
          "slug": "998548-margraves-bastard-son-was-the-emperor",
          "image": "https://komikindo.ch/wp-content/uploads/2024/05/Komik-Margraves-Bastard-Son-was-The-Emperor-223x319.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 66",
              "slug": "margraves-bastard-son-was-the-emperor-chapter-66",
              "date": "4 jam lalu"
            }
          ]
        },
        {
          "title": "Become the Strongest Hero Through the Cheat System",
          "slug": "become-the-strongest-hero-through-the-cheat-system",
          "image": "https://komikindo.ch/wp-content/uploads/2025/06/Komik-Become-the-Strongest-Hero-Through-the-Cheat-System-236x314.jpg",
          "type": "Manhua",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 100",
              "slug": "become-the-strongest-hero-through-the-cheat-system-chapter-100",
              "date": "1 minggu lalu"
            }
          ]
        },
        {
          "title": "Lookism",
          "slug": "950565-lookism",
          "image": "https://komikindo.ch/wp-content/uploads/2023/01/Komik-Lookism-224x319.jpg",
          "type": "Manhwa",
          "color": "Warna",
          "chapters": [
            {
              "title": "Chapter 595",
              "slug": "lookism-chapter-595",
              "date": "4 jam lalu"
            }
          ]
        }
      ],
      "komikPopuler": [
        {
          "rank": "1",
          "title": "Solo Leveling",
          "slug": "179384-solo-leveling",
          "author": "Chugong 추공",
          "rating": "9.33",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Solo-Leveling-79x107.jpeg"
        },
        {
          "rank": "2",
          "title": "Martial Peak",
          "slug": "martial-peak",
          "author": "Pikapi",
          "rating": "8.06",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Martial-Peak-79x105.jpg"
        },
        {
          "rank": "3",
          "title": "The Beginning After the End",
          "slug": "447206-the-beginning-after-the-end",
          "author": "TurtleMe",
          "rating": "9.06",
          "image": "https://komikindo.ch/wp-content/uploads/2021/01/Komik-The-Beginning-After-the-End-79x99.jpg"
        },
        {
          "rank": "4",
          "title": "Nano Machine",
          "slug": "155895-nano-machine",
          "author": "한중월야, 현절무",
          "rating": "8.54",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Nano-Machine-79x114.jpg"
        },
        {
          "rank": "5",
          "title": "Magic Emperor",
          "slug": "magic-emperor",
          "author": "Wuer Manhua, Ye Xiao",
          "rating": "8.3",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Demonic-Emperor-71x114.jpg"
        },
        {
          "rank": "6",
          "title": "Eleceed",
          "slug": "846048-eleceed",
          "author": "Son Jae-Ho",
          "rating": "8.89",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Eleceed-79x114.jpg"
        },
        {
          "rank": "7",
          "title": "Mercenary Enrollment",
          "slug": "134898-mercenary-enrollment",
          "author": "YC",
          "rating": "9.1",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-Mercenary-Enrollment-79x114.jpg"
        },
        {
          "rank": "8",
          "title": "Wind Breaker",
          "slug": "183821-wind-breaker",
          "author": "Jo Yong Seok",
          "rating": "8.03",
          "image": "https://komikindo.ch/wp-content/uploads/2021/04/Komik-Wind-Breaker-79x109.jpg"
        },
        {
          "rank": "9",
          "title": "The Great Mage Returns After 4000 Years",
          "slug": "758554-the-great-mage-returns-after-4000-years",
          "author": "Barnacle",
          "rating": "8.49",
          "image": "https://komikindo.ch/wp-content/uploads/2020/12/Komik-The-Great-Mage-Returns-After-4000-Years-79x107.jpg"
        },
        {
          "rank": "10",
          "title": "Swordmaster’s Youngest Son",
          "slug": "583721-swordmasters-youngest-son",
          "author": "AZI",
          "rating": "7",
          "image": "https://komikindo.ch/wp-content/uploads/2022/05/Komik-Swordmasters-Youngest-Son-79x107.jpg"
        }
      ]
    },
    "headers": {
      "date": "Fri, 20 Feb 2026 11:41:07 GMT",
      "content-type": "application/json; charset=utf-8",
      "transfer-encoding": "chunked",
      "connection": "keep-alive",
      "access-control-allow-origin": "*",
      "etag": "W/\"57cc-BepgOMkv9w6a3+PWQ1dAQfsnYjY\"",
      "cf-cache-status": "DYNAMIC",
      "nel": "{\"report_to\":\"cf-nel\",\"success_fraction\":0.0,\"max_age\":604800}",
      "speculation-rules": "\"/cdn-cgi/speculation\"",
      "report-to": "{\"group\":\"cf-nel\",\"max_age\":604800,\"endpoints\":[{\"url\":\"https://a.nel.cloudflare.com/report/v4?s=hJvaz5xrYRTHkHJTw7BXN9wvaVAYo4lstwFFJavQftFi6N1LXvGVqtbIi1f4Q%2Bw3NP8VWY6hFJLbOtkudYPT2xHWdPGT0UwXBkAg1RKTCZEhnQfUOg%3D%3D\"}]}",
      "server": "cloudflare",
      "cf-ray": "9d0dbba4df68e5f5-IAD",
      "alt-svc": "h3=\":443\"; ma=86400"
    }
  },
  "timestamp": "2026-02-20T11:41:07.564Z",
  "responseTime": "911ms"
}



note : tolong ya! saya minta bantuan! 