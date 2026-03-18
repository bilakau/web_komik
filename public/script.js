/* ============================================================
   FmcComic - Main Script
   API: sankavollerei.com/comic/komikindo
   CORS Proxy: api-proxy-eight-mu.vercel.app
   ============================================================ */

const CORS = 'https://api-proxy-eight-mu.vercel.app/api/tools/proxy?url=';
const API = 'https://www.sankavollerei.com/comic/komikindo';
const BACKEND_URL = window.location.origin;

// DOM refs
const contentArea = document.getElementById('content-area');
const mainNav = document.getElementById('main-nav');
const mobileNav = document.getElementById('mobile-nav');
const progressBar = document.getElementById('progress-bar');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchClearBtn = document.getElementById('search-clear-btn');
const toast = document.getElementById('toast');

// State
let currentChapterList = [];
let currentComicCtx = { slug: null, title: null, image: null };
let isNavigating = false;
let heroSlides = [];
let heroIdx = 0;
let heroTimer = null;
let toastTimer = null;

/* ── Helpers ── */

function setProgress(p) {
  if (!progressBar) return;
  progressBar.style.width = Math.max(0, Math.min(100, p)) + '%';
}

function showLoading() {
  contentArea.innerHTML = `
    <div class="loading-center fade-in">
      <div class="spinner"></div>
      <p class="loading-text">Memuat...</p>
    </div>`;
  setProgress(30);
}

function showError(msg = 'Tidak dapat memuat data. Coba lagi.') {
  contentArea.innerHTML = `
    <div class="empty-state fade-in">
      <div class="empty-state-icon"><i class="fa fa-triangle-exclamation"></i></div>
      <h3>Oops!</h3>
      <p>${msg}</p>
      <button class="btn-primary" onclick="showHome()" style="margin-top:8px">
        <i class="fa fa-house"></i> Kembali ke Beranda
      </button>
    </div>`;
  setProgress(100);
}

function showEmpty(msg = 'Tidak ada data ditemukan.') {
  contentArea.innerHTML = `
    <div class="empty-state fade-in">
      <div class="empty-state-icon"><i class="fa fa-folder-open"></i></div>
      <h3>Kosong</h3>
      <p>${msg}</p>
    </div>`;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
}

function updateURL(path) {
  if (window.location.pathname !== path) history.pushState(null, null, path);
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.mob-btn').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  const mobId = id.replace('nav-', 'mob-');
  const mob = document.getElementById(mobId);
  if (mob) mob.classList.add('active');
}

function getTypeClass(type) {
  if (!type) return 'type-default';
  const t = String(type).toLowerCase();
  if (t.includes('manga')) return 'type-manga';
  if (t.includes('manhwa')) return 'type-manhwa';
  if (t.includes('manhua')) return 'type-manhua';
  return 'type-default';
}

function safeText(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str).trim();
  return div.innerHTML;
}

function cleanTitle(title) {
  if (!title) return 'Tanpa Judul';
  return String(title).replace(/Komik\s*/gi, '').replace(/\n\s*/g, ' ').trim();
}

/* ── UUID Mapping (via backend) ── */
async function getUuidFromSlug(slug, type) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/get-id`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type })
    });
    const data = await res.json();
    return data.uuid || slug;
  } catch { return slug; }
}

async function getSlugFromUuid(uuid) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/get-slug/${uuid}`);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

/* ── Core Fetch ── */
async function fetchAPI(url) {
  try {
    const res = await fetch(CORS + encodeURIComponent(url));
    const json = await res.json();
    if (json.success && json.result && json.result.content) {
      return json.result.content;
    }
    return null;
  } catch (e) {
    console.error('fetchAPI error:', e);
    return null;
  }
}

/* ── Search Overlay ── */
function toggleSearch() {
  const isHidden = searchOverlay.classList.contains('hidden');
  if (isHidden) {
    searchOverlay.classList.remove('hidden');
    setTimeout(() => searchInput.focus(), 100);
    loadGenres();
  } else {
    searchOverlay.classList.add('hidden');
  }
}

function clearSearch() {
  searchInput.value = '';
  searchClearBtn.classList.add('hidden');
  searchInput.focus();
}

searchInput && searchInput.addEventListener('input', () => {
  if (searchInput.value.length > 0) searchClearBtn.classList.remove('hidden');
  else searchClearBtn.classList.add('hidden');
});

searchInput && searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') applySearch();
  if (e.key === 'Escape') toggleSearch();
});

async function loadGenres() {
  const sel = document.getElementById('filter-genre');
  if (!sel || sel.options.length > 1) return;
  const data = await fetchAPI(`${API}/genres`);
  if (data && data.genres) {
    const sorted = [...data.genres].sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''));
    sorted.forEach(g => {
      const opt = document.createElement('option');
      const slug = (g.slug || '').replace('/genres/', '').replace('/genre/', '');
      opt.value = slug;
      opt.text = g.name || g.title || slug;
      sel.appendChild(opt);
    });
  }
}

async function applySearch() {
  const query = searchInput.value.trim();
  const genre = document.getElementById('filter-genre').value;
  const type = document.getElementById('filter-type').value;
  const status = document.getElementById('filter-status').value;

  toggleSearch();

  if (query) {
    await showSearch(query, 1);
    return;
  }
  if (genre) {
    await showGenre(genre, 1);
    return;
  }

  let url = `${API}/library?page=1`;
  if (type) url += `&type=${type}`;
  if (status) url += `&status=${status}`;
  await showLibraryRaw(url, `Hasil Filter`, null, null, 1);
}

/* ── Home Page ── */
async function showHome(push = true) {
  if (push) updateURL('/');
  setActiveNav('nav-home');
  resetNavUI();
  showLoading();

  const data = await fetchAPI(`${API}/latest/1`);
  setProgress(70);

  if (!data || !data.komikList) { showError(); return; }

  const list = data.komikList || [];
  const popular = data.komikPopuler || [];

  // Build Hero from popular
  heroSlides = popular.slice(0, 5).map(p => ({
    slug: p.slug, title: p.title, image: p.image,
    rating: p.rating, author: p.author || '', type: 'Terpopuler'
  }));

  contentArea.innerHTML = `
    <div id="hero-section" class="fade-in" style="margin-bottom:40px"></div>
    <div class="home-grid">
      <div>
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-bar"></span> Update Terbaru
          </h2>
          <button class="btn-icon-sm" onclick="showLatest()">
            Lihat Semua <i class="fa fa-arrow-right"></i>
          </button>
        </div>
        <div class="latest-grid" id="latest-list"></div>
      </div>
      <aside>
        <div class="section-header" style="margin-bottom:16px">
          <h2 class="section-title" style="font-size:0.95rem">
            <span class="title-bar"></span> Komik Populer
          </h2>
        </div>
        <div class="popular-list" id="popular-list"></div>
      </aside>
    </div>
  `;

  // Render hero
  renderHero();

  // Render latest list
  const latestEl = document.getElementById('latest-list');
  latestEl.innerHTML = list.slice(0, 18).map(item => `
    <div class="latest-item" onclick="showDetail('${safeText(item.slug)}')">
      <div class="latest-item-img">
        <img src="${item.image || ''}" loading="lazy" alt="${safeText(item.title)}"
          onerror="this.src='https://placehold.co/60x80/13131f/555?text=No+Img'" />
      </div>
      <div class="latest-item-info">
        <div class="latest-item-title clamp-2">${cleanTitle(item.title)}</div>
        <div class="latest-item-chapter">${item.chapters?.[0]?.title || 'Baru'}</div>
        <div class="latest-item-date">${item.chapters?.[0]?.date || ''}</div>
      </div>
    </div>
  `).join('');

  // Render popular sidebar
  const popEl = document.getElementById('popular-list');
  popEl.innerHTML = popular.map((item, i) => {
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
    return `
      <div class="popular-item" onclick="showDetail('${safeText(item.slug)}')">
        <div class="popular-rank ${rankClass}">${item.rank || i+1}</div>
        <div class="popular-img">
          <img src="${item.image || ''}" loading="lazy" alt="${safeText(item.title)}"
            onerror="this.src='https://placehold.co/44x58/13131f/555?text=.'" />
        </div>
        <div class="popular-info">
          <div class="popular-title">${safeText(item.title)}</div>
          <div class="popular-author">${safeText(item.author || '')}</div>
          <div class="popular-rating"><i class="fa fa-star"></i> ${item.rating || '?'}</div>
        </div>
      </div>
    `;
  }).join('');

  setProgress(100);
  window.scrollTo(0, 0);
}

/* ── Hero Banner ── */
function renderHero() {
  const heroSection = document.getElementById('hero-section');
  if (!heroSection || !heroSlides.length) return;

  const s = heroSlides[heroIdx];
  heroSection.innerHTML = `
    <div class="hero-banner" id="hero-banner">
      <div class="hero-backdrop">
        <img src="${s.image || ''}" alt="${safeText(s.title)}" onerror="this.src=''" />
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content fade-in">
        <div class="hero-eyebrow">
          <span class="hero-dot"></span>
          ${s.type || 'Populer'}
        </div>
        <h2 class="hero-title clamp-2">${safeText(s.title)}</h2>
        <div class="hero-meta">
          <span class="hero-chip rating"><i class="fa fa-star"></i> ${s.rating || '?'}</span>
          ${s.author ? `<span class="hero-chip"><i class="fa fa-pen-nib"></i> ${safeText(s.author)}</span>` : ''}
        </div>
        <div class="hero-actions">
          <button class="btn-primary" onclick="showDetail('${safeText(s.slug)}')">
            <i class="fa fa-book-open"></i> Baca Sekarang
          </button>
          <button class="btn-secondary" onclick="showDetail('${safeText(s.slug)}')">
            <i class="fa fa-info-circle"></i> Detail
          </button>
        </div>
      </div>
      <div class="hero-nav">
        ${heroSlides.map((_, i) => `
          <button class="hero-dot-nav ${i === heroIdx ? 'active' : ''}" onclick="jumpHero(${i})"></button>
        `).join('')}
      </div>
    </div>
  `;

  clearTimeout(heroTimer);
  heroTimer = setTimeout(() => {
    heroIdx = (heroIdx + 1) % heroSlides.length;
    renderHero();
  }, 5000);
}

function jumpHero(idx) {
  heroIdx = idx;
  renderHero();
}

/* ── Latest Page ── */
async function showLatest(page = 1) {
  updateURL(page === 1 ? '/latest' : `/latest/${page}`);
  setActiveNav('nav-latest');
  resetNavUI();
  showLoading();

  const data = await fetchAPI(`${API}/latest/${page}`);
  setProgress(70);

  if (!data || !data.komikList) { showError(); return; }

  const list = data.komikList || [];
  const pagination = data.pagination || {};

  contentArea.innerHTML = `
    <div class="section-header fade-in" style="margin-bottom:24px">
      <h1 class="section-title">
        <span class="title-bar"></span> Update Terbaru
      </h1>
    </div>
    <div class="comic-grid fade-in wide" id="grid-area"></div>
    <div id="pagination-area"></div>
  `;

  renderComicGrid(document.getElementById('grid-area'), list);
  renderPagination(document.getElementById('pagination-area'), pagination, 'showLatest');

  setProgress(100);
  window.scrollTo(0, 0);
}

/* ── Library Page ── */
async function showLibrary(page = 1) {
  updateURL(page === 1 ? '/library' : `/library/${page}`);
  setActiveNav('nav-library');
  await showLibraryRaw(`${API}/library?page=${page}`, 'Perpustakaan Komik', 'showLibrary', null, page);
}

async function showLibraryRaw(url, title, funcName, extraArg, page) {
  resetNavUI();
  showLoading();

  const data = await fetchAPI(url);
  setProgress(70);

  if (!data || !data.komikList) { showError(); return; }

  const list = data.komikList || [];
  const pagination = data.pagination || {};

  contentArea.innerHTML = `
    <div class="section-header fade-in" style="margin-bottom:24px">
      <h1 class="section-title">
        <span class="title-bar"></span> ${title}
      </h1>
    </div>
    <div class="comic-grid fade-in wide" id="grid-area"></div>
    <div id="pagination-area"></div>
  `;

  renderComicGrid(document.getElementById('grid-area'), list);

  const paginationEl = document.getElementById('pagination-area');
  if (funcName) {
    renderPagination(paginationEl, pagination, funcName, extraArg);
  }

  setProgress(100);
  window.scrollTo(0, 0);
}

/* ── Search Results ── */
async function showSearch(query, page = 1) {
  updateURL(`/search?q=${encodeURIComponent(query)}&page=${page}`);
  resetNavUI();
  showLoading();

  const data = await fetchAPI(`${API}/search/${encodeURIComponent(query)}/${page}`);
  setProgress(70);

  if (!data) { showError('Gagal menghubungi server.'); return; }

  const list = data.komikList || [];
  const pagination = data.pagination || {};

  contentArea.innerHTML = `
    <div class="section-header fade-in" style="margin-bottom:24px">
      <h1 class="section-title">
        <span class="title-bar"></span> Hasil: "${safeText(query)}"
      </h1>
      <span style="font-size:0.8rem;color:var(--text-muted)">${list.length} komik ditemukan</span>
    </div>
    <div class="comic-grid fade-in wide" id="grid-area"></div>
    <div id="pagination-area"></div>
  `;

  if (list.length === 0) {
    document.getElementById('grid-area').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon"><i class="fa fa-search"></i></div>
        <h3>Tidak Ditemukan</h3>
        <p>Tidak ada komik dengan kata kunci "<strong>${safeText(query)}</strong>"</p>
      </div>`;
  } else {
    renderComicGrid(document.getElementById('grid-area'), list);
  }

  renderPagination(document.getElementById('pagination-area'), pagination, null);
  // We'll handle pagination for search inline
  if (pagination.hasNextPage || pagination.currentPage > 1) {
    const el = document.getElementById('pagination-area');
    el.innerHTML = '';
    const cur = pagination.currentPage || page;
    el.innerHTML = `
      <div class="pagination">
        ${cur > 1 ? `<button class="page-btn" onclick="showSearch('${safeText(query)}', ${cur-1})"><i class="fa fa-chevron-left"></i> Prev</button>` : ''}
        <span class="page-current">${cur}</span>
        ${pagination.hasNextPage ? `<button class="page-btn" onclick="showSearch('${safeText(query)}', ${cur+1})">Next <i class="fa fa-chevron-right"></i></button>` : ''}
      </div>`;
  }

  setProgress(100);
  window.scrollTo(0, 0);
}

/* ── Genre Page ── */
async function showGenre(genreSlug, page = 1) {
  updateURL(`/genre/${genreSlug}/${page}`);
  resetNavUI();
  await showLibraryRaw(
    `${API}/library?genre=${encodeURIComponent(genreSlug)}&page=${page}`,
    `Genre: ${genreSlug.charAt(0).toUpperCase() + genreSlug.slice(1)}`,
    'showGenre',
    genreSlug,
    page
  );
}

/* ── Comic Grid Renderer ── */
function renderComicGrid(container, list) {
  if (!list || list.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state-icon"><i class="fa fa-folder-open"></i></div>
      <h3>Kosong</h3><p>Tidak ada komik yang ditemukan.</p>
    </div>`;
    return;
  }

  container.innerHTML = list.map(item => {
    const title = cleanTitle(item.title);
    const chapter = item.chapters?.[0]?.title || item.latestChapter || '';
    const rating = item.rating || '';
    const type = item.type || '';
    const color = item.color === 'Warna';
    return `
      <div class="comic-card" onclick="showDetail('${safeText(item.slug)}')">
        <div class="card-img-wrap">
          <span class="type-badge ${getTypeClass(type)}">${safeText(type) || 'Comic'}</span>
          ${color ? '<span class="color-badge">Warna</span>' : ''}
          <img src="${item.image || ''}" loading="lazy" alt="${safeText(title)}"
            onerror="this.src='https://placehold.co/200x280/13131f/555?text=No+Image'" />
          <div class="card-overlay"></div>
        </div>
        <div class="card-body">
          <div class="card-title">${safeText(title)}</div>
          <div class="card-meta">
            <span class="card-chapter">${safeText(chapter) || 'Baca'}</span>
            ${rating ? `<span class="card-rating"><i class="fa fa-star"></i> ${safeText(rating)}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ── Pagination Renderer ── */
function renderPagination(container, pagination, funcName, extraArg = null) {
  if (!container) return;
  const cur = pagination.currentPage || 1;
  const hasNext = pagination.hasNextPage;
  const total = pagination.totalPages;

  if (!hasNext && cur <= 1) { container.innerHTML = ''; return; }

  const argStr = extraArg ? `'${safeText(extraArg))', ` : '';
  // Fix the argStr
  const argPart = extraArg ? `'${extraArg}', ` : '';

  container.innerHTML = `
    <div class="pagination">
      ${cur > 1 ? `<button class="page-btn" onclick="${funcName}(${argPart}${cur-1})">
        <i class="fa fa-chevron-left"></i> Prev
      </button>` : ''}
      ${cur > 2 ? `<button class="page-btn" onclick="${funcName}(${argPart}1)">1</button>` : ''}
      ${cur > 3 ? `<span style="color:var(--text-dim)">...</span>` : ''}
      <span class="page-current">${cur}</span>
      ${total && cur < total - 1 ? `<span style="color:var(--text-dim)">...</span>` : ''}
      ${total && cur < total ? `<button class="page-btn" onclick="${funcName}(${argPart}${total})">${total}</button>` : ''}
      ${hasNext ? `<button class="page-btn" onclick="${funcName}(${argPart}${cur+1})">
        Next <i class="fa fa-chevron-right"></i>
      </button>` : ''}
    </div>`;
}

/* ── Detail Page ── */
async function showDetail(idOrSlug, push = true) {
  let slug = idOrSlug;
  resetNavUI();
  showLoading();
  setProgress(20);

  // UUID resolution
  if (idOrSlug && idOrSlug.length === 36 && idOrSlug.includes('-')) {
    const mapping = await getSlugFromUuid(idOrSlug);
    if (mapping && mapping.slug) slug = mapping.slug;
  }

  if (push) {
    const uuid = await getUuidFromSlug(slug, 'series');
    updateURL(`/series/${uuid}`);
  }

  const data = await fetchAPI(`${API}/detail/${slug}`);
  setProgress(70);

  if (!data || !data.data) { showError('Komik tidak ditemukan.'); return; }

  const res = data.data;
  const title = cleanTitle(res.title);
  const chapters = res.chapters || [];
  currentChapterList = chapters;
  currentComicCtx = { slug, title, image: res.image || '' };

  // History read info
  const history = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  const savedItem = history.find(h => h.slug === slug);
  const lastCh = savedItem?.lastChapterSlug || null;
  const lastChTitle = savedItem?.lastChapterTitle || 'Lanjutkan';

  // First chapter (bottom of chapters array)
  const firstCh = chapters.length > 0 ? chapters[chapters.length - 1].slug : null;

  const startBtnText = lastCh ? `<i class="fa fa-play"></i> Lanjut Baca` : `<i class="fa fa-book-open"></i> Mulai Baca`;
  const startBtnAction = lastCh
    ? `readChapter('${lastCh}', '${slug}')`
    : (firstCh ? `readChapter('${firstCh}', '${slug}')` : `showToast('Chapter belum tersedia')`);

  // Detail info
  const detail = res.detail || {};
  const genres = res.genres || [];
  const synopsis = res.description || res.synopsis || 'Sinopsis tidak tersedia.';

  contentArea.innerHTML = `
    <div class="detail-backdrop">
      <img src="${res.image || ''}" alt="" onerror="this.src=''" />
      <div class="detail-backdrop-overlay"></div>
    </div>

    <div class="detail-layout fade-in">
      <div class="detail-poster">
        <img src="${res.image || ''}" alt="${safeText(title)}"
          onerror="this.src='https://placehold.co/220x310/13131f/555?text=No+Cover'" />
        <div style="margin-top:16px;display:flex;flex-direction:column;gap:10px">
          <button class="btn-primary" onclick="${startBtnAction}" style="width:100%;padding:12px">
            ${startBtnText}${lastCh ? ' (' + safeText(lastChTitle) + ')' : ''}
          </button>
          <button onclick="toggleBookmark('${safeText(slug)}')" id="btn-bookmark"
            class="btn-secondary" style="width:100%;padding:12px">
            <i class="fa fa-bookmark"></i> Simpan
          </button>
        </div>
      </div>

      <div class="detail-info">
        <h1 class="detail-title">${safeText(title)}</h1>

        <div class="detail-chips">
          ${res.rating ? `<span class="chip chip-amber"><i class="fa fa-star"></i> ${safeText(res.rating)}</span>` : ''}
          ${detail.status ? `<span class="chip chip-green"><i class="fa fa-circle" style="font-size:0.5rem"></i> ${safeText(detail.status)}</span>` : ''}
          ${detail.type ? `<span class="chip chip-blue">${safeText(detail.type)}</span>` : ''}
          ${res.votes ? `<span class="chip"><i class="fa fa-users"></i> ${safeText(res.votes)}</span>` : ''}
        </div>

        ${genres.length > 0 ? `
          <div class="genre-tags">
            ${genres.map(g => {
              const gSlug = (g.slug || '').replace('/genres/', '').replace('/genre/', '');
              return `<span class="genre-tag" onclick="showGenre('${safeText(gSlug)}')">${safeText(g.name)}</span>`;
            }).join('')}
          </div>` : ''}

        ${detail.author || detail.alternativeTitle ? `
          <div class="info-table" style="margin-bottom:20px">
            ${detail.author ? `<div class="info-row"><span class="info-label">Pengarang</span><span class="info-value">${safeText(detail.author)}</span></div>` : ''}
            ${detail.alternativeTitle ? `<div class="info-row"><span class="info-label">Judul Lain</span><span class="info-value clamp-2">${safeText(detail.alternativeTitle)}</span></div>` : ''}
          </div>` : ''}

        <div class="synopsis-box">
          <div class="synopsis-label">Sinopsis</div>
          <p id="synopsis-text" class="synopsis-text ${synopsis.length > 300 ? 'clamp' : ''}">${safeText(synopsis)}</p>
          ${synopsis.length > 300 ? `
            <button class="synopsis-btn" id="synopsis-btn" onclick="toggleSynopsis()">
              Baca Selengkapnya <i class="fa fa-chevron-down"></i>
            </button>` : ''}
        </div>

        <div class="chapter-box">
          <div class="chapter-box-header">
            <div class="chapter-box-title">
              <i class="fa fa-list-ul" style="color:var(--amber)"></i>
              Daftar Chapter
              <span class="chapter-count">${chapters.length}</span>
            </div>
            <div class="chapter-search-wrap">
              <i class="fa fa-search"></i>
              <input type="text" id="chapter-search" placeholder="Cari chapter..." oninput="filterChapters()" />
            </div>
          </div>
          <div id="chapter-list-container"></div>
        </div>

        ${res.similarManga && res.similarManga.length > 0 ? `
          <div class="similar-section">
            <div class="section-header" style="margin-bottom:16px">
              <h3 class="section-title" style="font-size:0.95rem">
                <span class="title-bar"></span> Mungkin Suka
              </h3>
            </div>
            <div class="similar-grid">
              ${res.similarManga.map(s => `
                <div class="comic-card" onclick="showDetail('${safeText(s.slug)}')">
                  <div class="card-img-wrap">
                    <img src="${s.image || ''}" loading="lazy" alt="${safeText(s.title)}"
                      onerror="this.src='https://placehold.co/200x280/13131f/555?text=?'" />
                    <div class="card-overlay"></div>
                  </div>
                  <div class="card-body">
                    <div class="card-title">${safeText(s.title)}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}
      </div>
    </div>
  `;

  renderChapterList(chapters, slug);
  checkBookmarkStatus(slug);
  saveHistory(slug, title, res.image || '');
  setProgress(100);
  window.scrollTo(0, 0);
}

function toggleSynopsis() {
  const txt = document.getElementById('synopsis-text');
  const btn = document.getElementById('synopsis-btn');
  if (!txt || !btn) return;
  if (txt.classList.contains('clamp')) {
    txt.classList.remove('clamp');
    btn.innerHTML = 'Kecilkan <i class="fa fa-chevron-up"></i>';
  } else {
    txt.classList.add('clamp');
    btn.innerHTML = 'Baca Selengkapnya <i class="fa fa-chevron-down"></i>';
  }
}

function renderChapterList(chapters, comicSlug) {
  const container = document.getElementById('chapter-list-container');
  if (!container) return;

  const history = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  const comicHist = history.find(h => h.slug === comicSlug);
  const lastReadSlug = comicHist?.lastChapterSlug || '';

  if (!chapters || chapters.length === 0) {
    container.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:0.83rem">Belum ada chapter tersedia.</div>';
    return;
  }

  container.innerHTML = chapters.map(ch => {
    const isLast = ch.slug === lastReadSlug;
    return `
      <div class="chapter-item ${isLast ? 'active' : ''}" onclick="safeReadChapter('${safeText(ch.slug)}', '${safeText(comicSlug)}')">
        <div class="chapter-item-left">
          <div class="chapter-item-ico">
            <i class="fa ${isLast ? 'fa-history' : 'fa-hashtag'}"></i>
          </div>
          <span class="chapter-item-name">${safeText(ch.title)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${ch.releaseTime ? `<span class="chapter-item-date">${safeText(ch.releaseTime)}</span>` : ''}
          <span class="chapter-read-btn">Baca</span>
        </div>
      </div>
    `;
  }).join('');
}

function filterChapters() {
  const input = document.getElementById('chapter-search');
  const q = (input?.value || '').toLowerCase();
  const items = document.querySelectorAll('#chapter-list-container .chapter-item');
  items.forEach(el => {
    const name = el.querySelector('.chapter-item-name')?.textContent?.toLowerCase() || '';
    el.style.display = name.includes(q) ? '' : 'none';
  });
}

/* ── Reader ── */
function normalizeChLabel(text) {
  if (!text) return 'Chapter';
  const t = String(text).trim().replace(/Komik\s*/gi, '').replace(/\n\s*/g, ' ');
  if (/chapter/i.test(t)) return t;
  const m = t.match(/(\d+(\.\d+)?)/);
  if (m) return `Chapter ${m[1]}`;
  return t;
}

function safeReadChapter(chSlug, comicSlug) {
  if (isNavigating) return;
  readChapter(chSlug, comicSlug, true);
}

async function readChapter(chIdOrSlug, comicSlug = null, push = true) {
  if (isNavigating) return;
  isNavigating = true;

  showLoading();
  setProgress(15);

  try {
    let chSlug = chIdOrSlug;

    // UUID resolution
    if (chIdOrSlug && chIdOrSlug.length === 36 && chIdOrSlug.includes('-')) {
      const mapping = await getSlugFromUuid(chIdOrSlug);
      if (mapping && mapping.slug) chSlug = mapping.slug;
    }

    if (push) {
      const uuid = await getUuidFromSlug(chSlug, 'chapter');
      updateURL(`/chapter/${uuid}`);
    }

    // Hide nav for immersive reading
    mainNav.classList.add('nav-hidden');
    mobileNav.classList.add('mobile-nav-hidden');

    const data = await fetchAPI(`${API}/chapter/${chSlug}`);
    setProgress(60);

    if (!data || !data.data) { showError('Chapter tidak ditemukan.'); return; }

    const res = data.data;
    const chapterLabel = normalizeChLabel(res.title);

    // Resolve comic slug
    let finalComicSlug = comicSlug;
    if (!finalComicSlug) {
      finalComicSlug = res.allChapterSlug || res.parent_slug || res.comic_slug || null;
    }

    const comicTitle = currentComicCtx?.title || cleanTitle(res.komikInfo?.title || 'Komik');
    const headerTitle = `${comicTitle} · ${chapterLabel}`;

    // Chapter list for dropdown
    let chListForDropdown = currentChapterList.length > 0
      ? currentChapterList
      : (res.komikInfo?.chapters || []);

    const navPrev = res.navigation?.prev;
    const navNext = res.navigation?.next;

    const images = res.images || [];

    contentArea.innerHTML = `
      <div class="reader-wrapper" onclick="toggleReaderUI()">
        <div class="reader-header" id="reader-top">
          <button class="reader-back-btn" onclick="event.stopPropagation();handleReaderBack('${safeText(finalComicSlug || '')}')">
            <i class="fa fa-arrow-left"></i>
          </button>
          <div class="reader-title-wrap">
            <div class="reader-eyebrow">Membaca</div>
            <div class="reader-title">${safeText(headerTitle)}</div>
          </div>
          <div class="reader-controls">
            <button class="reader-ctrl-btn" onclick="event.stopPropagation();toggleFullScreen()" title="Layar Penuh">
              <i class="fa fa-expand"></i>
            </button>
          </div>
        </div>

        <div class="reader-images" id="reader-images"></div>

        <div class="reader-bottom-bar" id="reader-bottom" onclick="event.stopPropagation()">
          <button class="reader-nav-btn ${navPrev ? 'prev-btn' : 'inactive'}"
            ${navPrev ? `onclick="readChapter('${safeText(navPrev)}','${safeText(finalComicSlug || '')}')"` : 'disabled'}>
            <i class="fa fa-chevron-left"></i>
          </button>

          <div class="chapter-select-wrap" id="chapter-dropdown"></div>

          <button class="reader-nav-btn ${navNext ? 'active' : 'inactive'}"
            ${navNext ? `onclick="readChapter('${safeText(navNext)}','${safeText(finalComicSlug || '')}')"` : 'disabled'}>
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `;

    // Render dropdown
    const dropdownEl = document.getElementById('chapter-dropdown');
    if (dropdownEl && chListForDropdown.length > 0) {
      dropdownEl.innerHTML = generateDropdownHTML(chListForDropdown, chSlug, finalComicSlug);
    }

    // Render images
    const imgContainer = document.getElementById('reader-images');
    const total = images.length || 1;
    let loadedCount = 0;

    setProgress(65);

    images.forEach(imgData => {
      const imgUrl = typeof imgData === 'string' ? imgData : imgData.url;
      const wrapper = document.createElement('div');
      wrapper.className = 'reader-page';

      const skel = document.createElement('div');
      skel.className = 'skeleton';
      skel.style.cssText = 'position:absolute;inset:0;';

      const img = new Image();
      img.className = 'reader-img';
      img.style.cssText = 'width:100%;height:auto;display:block;opacity:0;transition:opacity 0.4s;user-select:none;';
      img.loading = 'lazy';

      img.onload = () => {
        loadedCount++;
        skel.remove();
        img.style.opacity = '1';
        wrapper.style.minHeight = 'auto';
        wrapper.style.background = 'transparent';
        setProgress(65 + (loadedCount / total) * 30);
      };

      img.onerror = () => {
        loadedCount++;
        skel.remove();
        wrapper.innerHTML = `
          <div class="page-error">
            <i class="fa fa-image-slash"></i>
            <span>Gambar gagal dimuat</span>
            <button onclick="event.stopPropagation();this.closest('.reader-page').querySelector('img').src='${imgUrl}'" 
              style="font-size:0.75rem;background:rgba(255,255,255,0.1);color:var(--text-muted);padding:5px 12px;border-radius:6px;margin-top:4px">
              Coba Lagi
            </button>
          </div>`;
      };

      img.src = imgUrl;
      wrapper.appendChild(skel);
      wrapper.appendChild(img);
      imgContainer.appendChild(wrapper);
    });

    if (finalComicSlug) {
      saveHistory(finalComicSlug, currentComicCtx?.title || comicTitle, currentComicCtx?.image || '', chSlug, chapterLabel);
    }

    // Populate chapter list if not loaded
    if (currentChapterList.length === 0 && finalComicSlug) {
      fetchAndPopulateDropdown(finalComicSlug, chSlug);
    }

    setProgress(100);
    window.scrollTo(0, 0);
    bindReaderScroll();

  } finally {
    isNavigating = false;
  }
}

function generateDropdownHTML(list, currentSlug, comicSlug) {
  return `
    <select onchange="safeReadChapter(this.value, '${safeText(comicSlug || '')}')">
      ${list.map(ch =>
        `<option value="${safeText(ch.slug)}" ${ch.slug === currentSlug ? 'selected' : ''}>${safeText(ch.title)}</option>`
      ).join('')}
    </select>`;
}

async function fetchAndPopulateDropdown(comicSlug, currentChSlug) {
  const data = await fetchAPI(`${API}/detail/${comicSlug}`);
  if (data?.data) {
    currentChapterList = data.data.chapters || [];
    currentComicCtx = { slug: comicSlug, title: cleanTitle(data.data.title), image: data.data.image || '' };
    const dropdown = document.getElementById('chapter-dropdown');
    if (dropdown) {
      dropdown.innerHTML = generateDropdownHTML(currentChapterList, currentChSlug, comicSlug);
    }
  }
}

function handleReaderBack(comicSlug) {
  mainNav.classList.remove('nav-hidden');
  mobileNav.classList.remove('mobile-nav-hidden');
  if (comicSlug && comicSlug !== '') {
    showDetail(comicSlug);
  } else {
    showHome();
  }
}

function toggleReaderUI() {
  const top = document.getElementById('reader-top');
  const bot = document.getElementById('reader-bottom');
  if (top) top.classList.toggle('ui-hidden-top');
  if (bot) bot.classList.toggle('ui-hidden-bottom');
}

function bindReaderScroll() {
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) return setProgress(0);
    setProgress((scrollTop / scrollHeight) * 100);
  };
  window.removeEventListener('scroll', onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen && document.exitFullscreen();
  }
}

function resetNavUI() {
  mainNav.classList.remove('nav-hidden');
  mobileNav.classList.remove('mobile-nav-hidden');
  searchOverlay.classList.add('hidden');
}

/* ── History ── */
function saveHistory(slug, title, image, chSlug, chTitle) {
  let hist = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  let existing = hist.find(h => h.slug === slug);
  const d = {
    slug, title: title || existing?.title || 'Unknown',
    image: image || existing?.image || '',
    latestChapter: existing?.latestChapter || '',
    lastChapterSlug: chSlug || existing?.lastChapterSlug,
    lastChapterTitle: chTitle || existing?.lastChapterTitle || '',
    timestamp: Date.now()
  };
  hist = hist.filter(h => h.slug !== slug);
  hist.unshift(d);
  if (hist.length > 50) hist.pop();
  localStorage.setItem('fmc_history', JSON.stringify(hist));
}

function showHistory() {
  updateURL('/history');
  resetNavUI();
  const hist = JSON.parse(localStorage.getItem('fmc_history') || '[]');
  contentArea.innerHTML = `
    <div class="section-header fade-in" style="margin-bottom:24px">
      <h1 class="section-title"><span class="title-bar"></span> Riwayat Baca</h1>
      ${hist.length > 0 ? `<button class="btn-icon-sm" onclick="clearHistory()"><i class="fa fa-trash"></i> Hapus Semua</button>` : ''}
    </div>
    <div class="comic-grid wide fade-in" id="hist-grid"></div>`;

  if (hist.length === 0) {
    document.getElementById('hist-grid').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon"><i class="fa fa-history"></i></div>
        <h3>Riwayat Kosong</h3><p>Mulai baca komik untuk melihat riwayat kamu.</p>
      </div>`;
    return;
  }

  renderComicGrid(document.getElementById('hist-grid'), hist.map(h => ({
    slug: h.slug, title: h.title, image: h.image,
    chapters: h.lastChapterTitle ? [{ title: h.lastChapterTitle }] : [],
    type: '', rating: ''
  })));
}

function clearHistory() {
  localStorage.removeItem('fmc_history');
  showHistory();
  showToast('Riwayat dihapus');
}

/* ── Bookmarks ── */
function toggleBookmark(slug) {
  let bm = JSON.parse(localStorage.getItem('fmc_bookmarks') || '[]');
  const idx = bm.findIndex(b => b.slug === slug);
  if (idx > -1) {
    bm.splice(idx, 1);
    showToast('Dihapus dari favorit');
  } else {
    bm.push({ slug, title: currentComicCtx?.title || '', image: currentComicCtx?.image || '' });
    showToast('Ditambahkan ke favorit');
  }
  localStorage.setItem('fmc_bookmarks', JSON.stringify(bm));
  checkBookmarkStatus(slug);
}

function checkBookmarkStatus(slug) {
  const bm = JSON.parse(localStorage.getItem('fmc_bookmarks') || '[]');
  const btn = document.getElementById('btn-bookmark');
  if (!btn) return;
  if (bm.some(b => b.slug === slug)) {
    btn.innerHTML = '<i class="fa fa-check text-amber" style="color:var(--amber)"></i> Tersimpan';
    btn.style.borderColor = 'rgba(245,158,11,0.4)';
    btn.style.color = 'var(--amber)';
  } else {
    btn.innerHTML = '<i class="fa fa-bookmark"></i> Simpan';
    btn.style.borderColor = '';
    btn.style.color = '';
  }
}

function showBookmarks() {
  updateURL('/bookmarks');
  resetNavUI();
  const bm = JSON.parse(localStorage.getItem('fmc_bookmarks') || '[]');
  contentArea.innerHTML = `
    <div class="section-header fade-in" style="margin-bottom:24px">
      <h1 class="section-title"><span class="title-bar"></span> Favorit</h1>
    </div>
    <div class="comic-grid wide fade-in" id="bm-grid"></div>`;

  if (bm.length === 0) {
    document.getElementById('bm-grid').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon"><i class="fa fa-bookmark"></i></div>
        <h3>Favorit Kosong</h3><p>Simpan komik favorit kamu di sini.</p>
      </div>`;
    return;
  }

  renderComicGrid(document.getElementById('bm-grid'), bm.map(b => ({
    slug: b.slug, title: b.title, image: b.image, type: '', rating: ''
  })));
}

/* ── Init & Router ── */
async function handleRoute() {
  const path = window.location.pathname;
  const search = window.location.search;
  resetNavUI();

  if (path === '/404.html') return;

  if (path.startsWith('/series/')) {
    const uuid = path.split('/')[2];
    if (uuid) await showDetail(uuid, false);
    else showHome(false);
  } else if (path.startsWith('/chapter/')) {
    const uuid = path.split('/')[2];
    if (uuid) await readChapter(uuid, null, false);
    else showHome(false);
  } else if (path === '/latest' || path.startsWith('/latest/')) {
    const p = parseInt(path.split('/')[2]) || 1;
    await showLatest(p);
  } else if (path === '/library' || path.startsWith('/library/')) {
    const p = parseInt(path.split('/')[2]) || 1;
    await showLibrary(p);
  } else if (path.startsWith('/genre/')) {
    const parts = path.split('/');
    const genre = parts[2];
    const p = parseInt(parts[3]) || 1;
    await showGenre(genre, p);
  } else if (path === '/search' || path.startsWith('/search/')) {
    const params = new URLSearchParams(search);
    const q = params.get('q');
    const p = parseInt(params.get('page')) || 1;
    if (q) await showSearch(q, p);
    else showHome(false);
  } else if (path === '/history') {
    showHistory();
  } else if (path === '/bookmarks') {
    showBookmarks();
  } else {
    await showHome(false);
  }
}

window.addEventListener('popstate', () => handleRoute());
document.addEventListener('DOMContentLoaded', () => handleRoute());
