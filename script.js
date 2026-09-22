// "BARAKAT" - Collector's Birthday Edition Core Interactivity · Volume 34
// Asake "Blessings" Soundtrack, Layered Cake Ceremony, Pinned Husband Tribute & Autoplay Media

document.addEventListener('DOMContentLoaded', () => {
  initMusicEngine();
  initAutoplayVideos();
  initTopCakeCeremony();
  initGuestbook();
  initFlipbook();
  initModalsAndNavigation();
  initAnimations();
  initDragScrollGallery();
  initParallaxSections();
  initCursorGlowTrail();
  initRippleClicks();
});

/* =========================================================
   1. BACKGROUND MUSIC ENGINE: ASAKE — BLESSINGS (REMIX)
      Plays Fridayy-Ft.-Asake-Blessings-Remix.mp3 automatically
      in the background on loop. Completely invisible (no controls on UI).
   ========================================================= */
let bgAudio = null;
let musicStarted = false;
const ASAKE_VERSE_START = 83; // 1:23 into track where Asake drops

function initMusicEngine() {
  bgAudio = document.getElementById('bg-audio');
  if (!bgAudio) return;

  bgAudio.volume = 0.85;
  bgAudio.loop = true;

  // Function to kick off playback
  window.startBgMusic = function() {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      if (bgAudio.currentTime < 80) {
        bgAudio.currentTime = ASAKE_VERSE_START;
      }
      bgAudio.play().then(() => {
        musicStarted = true;
        removeGestureTriggers();
      }).catch(err => {
        console.log('Audio playback pending user interaction:', err);
      });
    }
  };

  const gestureTriggers = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
  const onUserGesture = () => {
    window.startBgMusic();
  };

  const removeGestureTriggers = () => {
    gestureTriggers.forEach(evt => {
      window.removeEventListener(evt, onUserGesture, { capture: true });
      document.removeEventListener(evt, onUserGesture, { capture: true });
    });
  };

  gestureTriggers.forEach(evt => {
    window.addEventListener(evt, onUserGesture, { capture: true, once: false });
    document.addEventListener(evt, onUserGesture, { capture: true, once: false });
  });

  // Try immediate autoplay on page load
  window.startBgMusic();
}

/* =========================================================
   2. VIDEO AUTOPLAY & SMOOTH STREAMING ENGINE
   ========================================================= */
function initAutoplayVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {});
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        }
      });
    }, { threshold: 0.15 });

    videos.forEach(v => observer.observe(v));
  }

  const kickstart = () => {
    videos.forEach(v => v.play().catch(() => {}));
    window.removeEventListener('click', kickstart);
    window.removeEventListener('touchstart', kickstart);
  };
  window.addEventListener('click', kickstart, { once: true });
  window.addEventListener('touchstart', kickstart, { once: true });
}

/* =========================================================
   3. TOP 3D MODELED CAKE & 10-CANDLE BLOWOUT CEREMONY
   ========================================================= */
let isCandleBlown = false;

function initTopCakeCeremony() {
  const blowBtn = document.getElementById('btn-blow-candles');
  const flames = document.querySelectorAll('.cake-flame');
  const wishBanner = document.getElementById('cake-wish-banner');

  if (!blowBtn) return;

  blowBtn.addEventListener('click', () => {
    // Ensure music is triggered on click if browser delayed it
    if (typeof window.startBgMusic === 'function') {
      window.startBgMusic();
    }

    if (isCandleBlown) {
      // Re-light if tapped again
      isCandleBlown = false;
      flames.forEach(f => {
        f.classList.remove('extinguished');
      });
      if (wishBanner) wishBanner.classList.remove('active');
      blowBtn.innerHTML = '🎂 Make a Wish & Blow Out The Candles!';
      blowBtn.style.background = 'var(--gold-gradient)';
      blowBtn.style.color = '#0c0b08';
      return;
    }

    isCandleBlown = true;

    // Extinguish the 10 candle flames with staggered animation
    flames.forEach((f, idx) => {
      setTimeout(() => {
        f.classList.add('extinguished');
      }, idx * 50);
    });

    // Display birthday wish toast banner
    if (wishBanner) {
      setTimeout(() => {
        wishBanner.classList.add('active');
      }, 300);
    }

    blowBtn.innerHTML = '✨ HAPPY 34TH BIRTHDAY AUNTY BARAKAT! 👑';
    blowBtn.style.background = 'linear-gradient(135deg, #1b5e20, #43a047)';
    blowBtn.style.color = '#fff';

    // Trigger Golden Birthday Confetti Shower
    triggerGoldenConfetti();
  });
}

function audioBtnAvailable() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  return true;
}

function triggerGoldenConfetti() {
  if (typeof confetti === 'function') {
    const count = 220;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 30,
      startVelocity: 55,
      colors: ['#d4af37', '#ffd700', '#f5e6a8']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ff1493', '#ff69b4', '#ffffff']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.15,
      colors: ['#d4af37', '#ffffff', '#e5a7a0']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffd700', '#ff69b4']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#ffffff', '#d4af37']
    });
  }
}

/* =========================================================
   3. LIVE EDITORIAL GUESTBOOK (SUPABASE CLOUD & REALTIME)
   ========================================================= */
const SUPABASE_URL = 'https://ldvqlejuaddxwpayesfq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdnFsZWp1YWRkeHdwYXllc2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NzA1MDUsImV4cCI6MjEwNTQ0NjUwNX0.nrPyv8fQabLi3gNuwKq_FoOjdZMtT3oSdVqzQciF87A';

let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Supabase initialization warning:', e);
  }
}

let allTributes = [];
const STORAGE_KEY = 'barakat_magazine_tributes_v2';

async function fetchCloudTributes() {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient
      .from('tributes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch notice (using local storage):', error.message);
      return null;
    }
    if (data && data.length > 0) {
      return data.map(row => ({
        name: row.name,
        relation: row.relation,
        tag: row.tag,
        isHusband: !!row.is_husband,
        message: row.message,
        date: row.date || 'September 2026',
        mediaUrl: row.media_url || null,
        mediaType: row.media_type || null
      }));
    }
  } catch (e) {
    console.warn('Supabase network notice:', e);
  }
  return null;
}

async function uploadMediaToSupabase(file) {
  if (!supabaseClient || !file) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const cleanName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `uploads/${cleanName}`;

    const { data, error } = await supabaseClient.storage
      .from('tribute-media')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.warn('Storage upload notice (falling back to data URL):', error.message);
      return null;
    }
    const { data: publicUrlData } = supabaseClient.storage
      .from('tribute-media')
      .getPublicUrl(filePath);

    return publicUrlData ? publicUrlData.publicUrl : null;
  } catch (e) {
    console.warn('Storage upload exception:', e);
    return null;
  }
}

async function saveToSupabase(tribute) {
  if (!supabaseClient) return;
  try {
    const { error } = await supabaseClient
      .from('tributes')
      .insert([
        {
          name: tribute.name,
          relation: tribute.relation,
          tag: tribute.tag,
          is_husband: tribute.isHusband,
          message: tribute.message,
          media_url: tribute.mediaUrl,
          media_type: tribute.mediaType,
          date: tribute.date
        }
      ]);
    if (error) {
      console.warn('Supabase insert notice (stored locally):', error.message);
    } else {
      console.log('Tribute successfully published to Supabase Cloud!');
    }
  } catch (e) {
    console.warn('Supabase insert exception:', e);
  }
}

function subscribeToCloudTributes() {
  if (!supabaseClient) return;
  try {
    supabaseClient
      .channel('public:tributes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tributes' }, payload => {
        const row = payload.new;
        if (!row) return;
        const incoming = {
          name: row.name,
          relation: row.relation,
          tag: row.tag,
          isHusband: !!row.is_husband,
          message: row.message,
          date: row.date || 'September 2026',
          mediaUrl: row.media_url,
          mediaType: row.media_type
        };

        const exists = allTributes.some(t => t.name === incoming.name && t.message === incoming.message);
        if (!exists) {
          if (incoming.isHusband) {
            allTributes = allTributes.filter(t => !t.isHusband);
            allTributes.unshift(incoming);
          } else {
            const husbandIndex = allTributes.findIndex(t => t.isHusband);
            if (husbandIndex !== -1) {
              allTributes.splice(husbandIndex + 1, 0, incoming);
            } else {
              allTributes.unshift(incoming);
            }
          }
          renderTributes('all');
          triggerGoldenConfetti();
        }
      })
      .subscribe();
  } catch (e) {
    console.warn('Realtime subscription notice:', e);
  }
}

function initGuestbook() {
  const saved = localStorage.getItem(STORAGE_KEY);
  
  if (saved) {
    try {
      allTributes = JSON.parse(saved);
    } catch(e) {
      allTributes = [...window.MAGAZINE_DATA.initialTributes];
    }
  } else {
    allTributes = [...window.MAGAZINE_DATA.initialTributes];
  }

  renderTributes('all');

  // Load from Supabase Cloud if available
  fetchCloudTributes().then(cloudTributes => {
    if (cloudTributes && cloudTributes.length > 0) {
      // Merge unique cloud tributes
      const cloudHusband = cloudTributes.find(t => t.isHusband);
      const otherCloud = cloudTributes.filter(t => !t.isHusband);
      allTributes = cloudHusband ? [cloudHusband, ...otherCloud] : otherCloud;
      renderTributes('all');
    }
  });

  // Enable Realtime live updates
  subscribeToCloudTributes();

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderTributes(filter);
    });
  });

  // Form Submission
  const form = document.getElementById('tribute-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const author = document.getElementById('input-author').value.trim();
      const relationSelect = document.getElementById('select-relation');
      const relationTag = relationSelect.value;
      const relationName = relationSelect.options[relationSelect.selectedIndex].text;
      const message = document.getElementById('input-message').value.trim();
      const mediaInput = document.getElementById('input-media');

      if (!author || !message) return;

      const isHusband = (relationTag === 'husband');

      const newTribute = {
        name: author,
        relation: relationName,
        tag: relationTag,
        isHusband: isHusband,
        message: message,
        date: "September 2026",
        mediaUrl: null,
        mediaType: null
      };

      if (mediaInput.files && mediaInput.files[0]) {
        const file = mediaInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          newTribute.mediaUrl = event.target.result;
          newTribute.mediaType = file.type.startsWith('video') ? 'video' : 'image';
          saveAndPublishTribute(newTribute, file);
        };
        reader.readAsDataURL(file);
      } else {
        saveAndPublishTribute(newTribute, null);
      }
    });
  }
}

async function saveAndPublishTribute(tribute, originalFile) {
  // If a file is uploaded, upload to Supabase Storage
  if (originalFile && supabaseClient) {
    const cloudUrl = await uploadMediaToSupabase(originalFile);
    if (cloudUrl) {
      tribute.mediaUrl = cloudUrl;
    }
  }

  // Save to Supabase Cloud Database
  saveToSupabase(tribute);

  // If husband, unshift to very front; else add after husband if husband exists
  if (tribute.isHusband) {
    allTributes = allTributes.filter(t => !t.isHusband);
    allTributes.unshift(tribute);
  } else {
    const husbandIndex = allTributes.findIndex(t => t.isHusband);
    if (husbandIndex !== -1) {
      allTributes.splice(husbandIndex + 1, 0, tribute);
    } else {
      allTributes.unshift(tribute);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allTributes));
  
  // Close Festive Modal
  document.getElementById('tribute-modal').classList.remove('open');
  document.getElementById('tribute-form').reset();

  // Re-render and trigger celebration
  renderTributes('all');
  triggerGoldenConfetti();

  // Scroll smoothly to guestbook
  const guestbookEl = document.getElementById('guestbook');
  if (guestbookEl) {
    guestbookEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderTributes(filter = 'all') {
  const container = document.getElementById('tributes-container');
  if (!container) return;
  container.innerHTML = '';

  let filtered = allTributes;
  if (filter === 'husband') {
    filtered = allTributes.filter(t => t.isHusband || t.tag === 'husband');
  } else if (filter !== 'all') {
    filtered = allTributes.filter(t => t.tag === filter);
  }

  if (!filtered.length) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #888;">
        <p style="font-family: var(--font-serif-body); font-size: 1.3rem;">No tributes in this category yet. Be the first to leave one!</p>
      </div>
    `;
    return;
  }

  // Sort: Pinned husband always first
  const sorted = [...filtered].sort((a, b) => {
    if (a.isHusband) return -1;
    if (b.isHusband) return 1;
    return 0;
  });

  sorted.forEach(item => {
    const card = document.createElement('article');
    card.className = `tribute-card ${item.isHusband ? 'pinned-husband' : ''}`;

    let mediaHtml = '';
    if (item.mediaUrl) {
      if (item.mediaType === 'video') {
        mediaHtml = `<video src="${item.mediaUrl}" controls class="tribute-media-thumb" style="max-height: 240px; border-radius: 8px; margin-bottom: 1rem; width: 100%; object-fit: cover;"></video>`;
      } else {
        mediaHtml = `<img src="${item.mediaUrl}" alt="Tribute memory" class="tribute-media-thumb" style="max-height: 240px; border-radius: 8px; margin-bottom: 1rem; width: 100%; object-fit: cover;">`;
      }
    }

    let husbandBadgeHtml = '';
    if (item.isHusband) {
      husbandBadgeHtml = `
        <div class="husband-pin-banner">
          👑 PINNED · A LOVE TRIBUTE FROM HER HUSBAND
        </div>
      `;
    }

    card.innerHTML = `
      <div>
        ${husbandBadgeHtml}
        <div class="tribute-tag-pill" style="color: ${item.isHusband ? '#fce8e6' : 'var(--gold-primary)'}; font-size: 0.75rem; letter-spacing: 0.15em; font-weight: 700; margin-bottom: 0.75rem;">
          ${escapeHtml(item.relation)}
        </div>
        ${mediaHtml}
        <p class="tribute-quote" style="${item.isHusband ? 'font-size: 1.45rem; color: #fff; font-style: italic;' : ''}">
          “${escapeHtml(item.message)}”
        </p>
      </div>
      <div class="tribute-author-row">
        <span class="tribute-author">${escapeHtml(item.name)}</span>
        <span class="tribute-relation">${escapeHtml(item.date)}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

/* =========================================================
   4. FLIPBOOK DUAL-SPREAD VIEWER ENGINE (VOLUME 34)
   ========================================================= */
const FLIPBOOK_SPREADS = [
  {
    left: `
      <div style="text-align: center; padding-top: 4rem;">
        <span class="section-tag">COLLECTOR'S EDITION</span>
        <h1 class="font-title gold-text" style="font-size: 3.8rem; margin: 1rem 0;">BARAKAT</h1>
        <p class="font-display" style="font-size: 1rem; letter-spacing: 0.3em; color: var(--gold-light);">BELLO BARAKAT OMOLABAKE ABEFE</p>
        <p class="font-body" style="font-size: 1.35rem; margin-top: 2rem; color: #ccc; font-style: italic;">
          Volume 34 · A celebration of grace, resilience, and sisterly love.
        </p>
      </div>
    `,
    right: `
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="barakat pictures/@30.jpg" style="width: 80%; height: 75%; object-fit: cover; border-radius: 8px; border: 2px solid var(--gold-primary);">
        <p class="font-display" style="font-size: 0.75rem; letter-spacing: 0.2em; color: var(--gold-light); margin-top: 1rem;">COVER STAR · VOLUME 34</p>
      </div>
    `
  },
  {
    left: `
      <div>
        <span class="section-tag">DEDICATION</span>
        <h2 class="font-title" style="font-size: 2rem; color: var(--gold-light); margin-bottom: 1rem;">Dearest Aunty Barakat,</h2>
        <p class="font-body" style="font-size: 1.15rem; line-height: 1.8; color: #ddd;">
          Growing up, you were not just our big sister. You were our little mom. You looked after us, guided us, and stood between us and the world. Putting this magazine together is our small way of celebrating you.
        </p>
        <p class="font-serif-title" style="font-size: 1.4rem; color: var(--gold-primary); margin-top: 1.5rem;">Abdullah, Jamiu, and Nike</p>
      </div>
    `,
    right: `
      <div style="text-align: center;">
        <span class="section-tag">EARLY MEMORIES</span>
        <img src="barakat pictures/childhood.JPG" style="width: 75%; height: 280px; object-fit: cover; border-radius: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); margin: 0 auto;">
        <h3 class="font-title" style="font-size: 1.5rem; color: #fff; margin-top: 1rem;">Small But Mighty! 👶🤍</h3>
        <p class="font-body" style="font-size: 1.1rem; color: #bbb; font-style: italic;">“Na from small she don dey carry herself with respect! 😂🤍”</p>
      </div>
    `
  },
  {
    left: `
      <div style="padding-top: 1rem;">
        <span class="section-tag">FOR DADDY, PAJAY</span>
        <h2 class="font-title" style="font-size: 1.85rem; color: var(--gold-light);">What Daddy Would Have Said</h2>
        <p class="font-serif-body" style="font-size: 1.15rem; line-height: 1.75; color: #edd9be; margin-top: 1rem;">
          If Daddy were here today, he would just look at you, smile that quiet PaJay smile, and shake his head in pure pride.
        </p>
        <p class="font-serif-body" style="font-size: 1.1rem; color: var(--gold-primary); margin-top: 1rem; font-style: italic;">
          We know wherever Daddy is, he is so proud of you. Keep shining, Aunty Barakat. 🕊️🤍
        </p>
      </div>
    `,
    right: `
      <div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <img src="barakat pictures/dad/IMG_1116.PNG" style="width: 75%; height: auto; max-height: 380px; object-fit: contain; border-radius: 8px; border: 2px solid var(--gold-primary); margin: 0 auto;">
        <p class="font-display" style="font-size: 0.85rem; letter-spacing: 0.2em; color: var(--gold-light); margin-top: 0.75rem;">OUR DADDY, PAJAY</p>
      </div>
    `
  },
  {
    left: `
      <div>
        <span class="section-tag">OUR LITTLE MOM</span>
        <img src="barakat pictures/siblings and i.JPG" style="width: 100%; height: 260px; object-fit: cover; border-radius: 6px; margin-bottom: 1rem;">
        <h3 class="font-title" style="font-size: 1.35rem; color: #fff;">Our Little Mom 🤍</h3>
        <p class="font-body" style="font-size: 1.05rem; color: #ccc;">
          “You took care of us like your own, and we will never take that for granted 💕”
        </p>
      </div>
    `,
    right: `
      <div>
        <span class="section-tag">ROYALTY IN HER BLOOD 👑💃</span>
        <img src="barakat pictures/1a.jpg" style="width: 100%; height: 260px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary); margin-bottom: 1rem;">
        <h3 class="font-title" style="font-size: 1.35rem; color: #fff;">My Sister Too Fine Abeg! 👑🔥</h3>
        <p class="font-serif-body" style="font-size: 1.05rem; color: var(--gold-light); font-style: italic;">
          Àbẹ̀fẹ́ o! Ẹni a bẹ̀ kí a tóó fẹ́, ẹni tí gbogbo ayé ń bẹ̀ láti nífẹ̀ẹ́... 🤍✨
        </p>
      </div>
    `
  },
  {
    left: `
      <div>
        <span class="section-tag">LIFESTYLE & TRAVEL 🥂🌴</span>
        <img src="barakat pictures/u.jpg" style="width: 100%; height: 260px; object-fit: cover; border-radius: 6px; margin-bottom: 1rem;">
        <h3 class="font-title" style="font-size: 1.35rem; color: #fff;">Enjoyment Gallorizzy 🥂🌴</h3>
        <p class="font-body" style="font-size: 1.05rem; color: #ccc;">
          Yacht days, retail therapy, and living life to the absolute fullest!
        </p>
      </div>
    `,
    right: `
      <div>
        <span class="section-tag">FASHION & STYLE 🛍️✨</span>
        <img src="barakat pictures/v.jpg" style="width: 100%; height: 260px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary); margin-bottom: 1rem;">
        <h3 class="font-title" style="font-size: 1.35rem; color: #fff;">Always In Style 💅</h3>
        <p class="font-serif-body" style="font-size: 1.05rem; color: var(--gold-light); font-style: italic;">
          Gucci bags, golden hour glows, and unmatched queen energy!
        </p>
      </div>
    `
  },
  {
    left: `
      <div>
        <span class="section-tag">PROUD OF YOU 🎓🌹</span>
        <img src="barakat pictures/Graduation.jpg" style="width: 100%; height: 260px; object-fit: cover; border-radius: 6px; margin-bottom: 1rem;">
        <h3 class="font-title" style="font-size: 1.35rem; color: #fff;">York University Triumph! 🎓</h3>
        <p class="font-body" style="font-size: 1.05rem; color: #ccc;">
          Bagged that York degree and made the whole family proud! We will never stop bragging with you! 🎓🎉
        </p>
      </div>
    `,
    right: `
      <div style="text-align: center; padding-top: 3rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">👑 🥂 🎂</div>
        <h2 class="font-title gold-text" style="font-size: 2.2rem;">Happy 34th Birthday, Aunty Barakat!</h2>
        <p class="font-body" style="font-size: 1.2rem; color: #ddd; margin-top: 1rem;">
          To our little mom, our queen, and our forever pride. May your 34th year overflow with joy, peace, and endless blessings!
        </p>
        <p class="font-display" style="font-size: 0.85rem; letter-spacing: 0.25em; color: var(--gold-primary); margin-top: 2rem;">
          WITH LOVE FROM ABDULLAH, JAMIU, AND NIKE 💕
        </p>
      </div>
    `
  }
];

let currentSpreadIndex = 0;

function initFlipbook() {
  const overlay = document.getElementById('flipbook-overlay');
  const btnOpen = document.getElementById('btn-view-flipbook');
  const btnClose = document.getElementById('btn-close-flipbook');
  const btnPrev = document.getElementById('btn-flip-prev');
  const btnNext = document.getElementById('btn-flip-next');

  if (!overlay || !btnOpen) return;

  btnOpen.addEventListener('click', () => {
    overlay.classList.add('active');
    renderFlipbookSpread(currentSpreadIndex);
  });

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentSpreadIndex > 0) {
        currentSpreadIndex--;
        renderFlipbookSpread(currentSpreadIndex);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentSpreadIndex < FLIPBOOK_SPREADS.length - 1) {
        currentSpreadIndex++;
        renderFlipbookSpread(currentSpreadIndex);
      }
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'ArrowLeft' && currentSpreadIndex > 0) {
      currentSpreadIndex--;
      renderFlipbookSpread(currentSpreadIndex);
    } else if (e.key === 'ArrowRight' && currentSpreadIndex < FLIPBOOK_SPREADS.length - 1) {
      currentSpreadIndex++;
      renderFlipbookSpread(currentSpreadIndex);
    } else if (e.key === 'Escape') {
      overlay.classList.remove('active');
    }
  });
}

function renderFlipbookSpread(index) {
  const spread = FLIPBOOK_SPREADS[index];
  const pageLeft = document.getElementById('flip-page-left');
  const pageRight = document.getElementById('flip-page-right');
  const indicator = document.getElementById('flip-page-indicator');

  if (pageLeft && pageRight && indicator) {
    pageLeft.innerHTML = spread.left;
    pageRight.innerHTML = spread.right;
    indicator.textContent = `SPREAD ${index + 1} OF ${FLIPBOOK_SPREADS.length}`;
  }
}

/* =========================================================
   5. FESTIVE POPUP MODAL & CONTROLLERS
   ========================================================= */
function initModalsAndNavigation() {
  const tributeModal = document.getElementById('tribute-modal');
  const btnOpenModal = document.getElementById('btn-open-tribute-modal');
  const btnOpenModal2 = document.getElementById('btn-open-form-section');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnSkipModal = document.getElementById('btn-skip-modal');

  const openModal = () => {
    if (typeof window.startBgMusic === 'function') window.startBgMusic();
    if (tributeModal) tributeModal.classList.add('open');
  };
  const closeModal = () => {
    if (typeof window.startBgMusic === 'function') window.startBgMusic();
    if (tributeModal) tributeModal.classList.remove('open');
  };

  if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
  if (btnOpenModal2) btnOpenModal2.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnSkipModal) btnSkipModal.addEventListener('click', closeModal);

  // Close on outside backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === tributeModal) closeModal();
  });

  // Print Keepsake Action
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Scroll Mode Action
  const btnScroll = document.getElementById('btn-view-scroll');
  if (btnScroll) {
    btnScroll.addEventListener('click', () => {
      document.getElementById('flipbook-overlay').classList.remove('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* =========================================================
   6. INTERACTIVE ANIMATIONS & LIGHTBOX SYSTEM (ANIME.JS)
   ========================================================= */
function initAnimations() {
  // 1. Hero / Masthead Intro Choreography
  if (typeof anime !== 'undefined') {
    anime.timeline({
      easing: 'cubicBezier(0.16, 1, 0.3, 1)'
    })
    .add({
      targets: '.cover-masthead',
      opacity: [0, 1],
      scale: [0.93, 1],
      duration: 1200
    })
    .add({
      targets: '.cover-fullname',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    }, '-=750')
    .add({
      targets: '.cover-story-item',
      opacity: [0, 1],
      translateY: [25, 0],
      delay: anime.stagger(90),
      duration: 800
    }, '-=500');
  }

  // 2. Interactive Media Lightbox (Tap/Click to Expand Any Photo or Video)
  initMediaLightbox();

  // 3. Interactive 3D Perspective Card Tilt on Mouse Move
  initCardHoverTilt();

  // 4. Interactive Candle Flame Reactions
  initCandleInteractions();

  // 5. Scroll Entrance Choreography
  initScrollAnimations();
}

function initMediaLightbox() {
  const lightbox = document.getElementById('media-lightbox');
  const stage = document.getElementById('lightbox-stage');
  const closeBtn = document.getElementById('lightbox-close');
  if (!lightbox || !stage) return;

  const openLightbox = (mediaEl) => {
    stage.innerHTML = '';
    let clone;
    if (mediaEl.tagName.toLowerCase() === 'video') {
      clone = document.createElement('video');
      clone.src = mediaEl.src;
      clone.autoplay = true;
      clone.controls = true;
      clone.loop = true;
      clone.playsInline = true;
    } else {
      clone = document.createElement('img');
      clone.src = mediaEl.src;
      clone.alt = mediaEl.alt || 'Barakat Birthday Memory';
    }
    stage.appendChild(clone);
    lightbox.classList.add('active');

    if (typeof anime !== 'undefined') {
      anime({
        targets: stage,
        scale: [0.85, 1],
        opacity: [0, 1],
        duration: 350,
        easing: 'easeOutBack'
      });
    }
  };

  const closeLightbox = () => {
    if (typeof anime !== 'undefined') {
      anime({
        targets: stage,
        scale: [1, 0.9],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuad',
        complete: () => {
          lightbox.classList.remove('active');
          stage.innerHTML = '';
        }
      });
    } else {
      lightbox.classList.remove('active');
      stage.innerHTML = '';
    }
  };

  // Gallorizzy cards click to expand
  document.querySelectorAll('.gallorizzy-card').forEach(card => {
    card.addEventListener('click', () => {
      const media = card.querySelector('img, video');
      if (media) openLightbox(media);
    });
  });

  // Milestone PIP media click to expand
  document.querySelectorAll('.milestone-col .pip-main-media, .milestone-col .pip-overlay-card video').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(el);
    });
  });

  // Academic photos, polaroid, and Daddy's portrait
  document.querySelectorAll('.academic-photo-grid img, .academic-photo-grid video, .vintage-spread .polaroid-img, .baba-img, .pip-main-media').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openLightbox(el));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}

function initCardHoverTilt() {
  if (window.innerWidth <= 768) return;
  const tiltElements = document.querySelectorAll('.gallorizzy-card, .milestone-col, .sibling-badge-card');
  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 6;
      const rotY = (x / (rect.width / 2)) * 6;
      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initCandleInteractions() {
  const candles = document.querySelectorAll('.striped-candle');
  candles.forEach((candle) => {
    candle.addEventListener('click', () => {
      const flame = candle.querySelector('.candle-flame');
      if (flame && !flame.classList.contains('extinguished')) {
        flame.classList.add('extinguished');

        // Spawn smoke puff
        const puff = document.createElement('div');
        puff.className = 'candle-smoke-puff';
        candle.appendChild(puff);
        setTimeout(() => puff.remove(), 800);

        // Small candle confetti burst
        if (typeof confetti === 'function') {
          const rect = candle.getBoundingClientRect();
          confetti({
            particleCount: 16,
            spread: 45,
            origin: {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: rect.top / window.innerHeight
            },
            colors: ['#ffd700', '#ff69b4', '#ffffff']
          });
        }
      }
    });
  });
}

function initScrollAnimations() {
  const sections = document.querySelectorAll('.spread-section');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sec = entry.target;
        if (sec.dataset.animated) return;
        sec.dataset.animated = 'true';

        // Animate section headings and content
        const headings = sec.querySelectorAll('.section-tag, .font-title, .letter-salutation, .vintage-title, .heritage-title, blockquote');
        if (headings.length && typeof anime !== 'undefined') {
          anime({
            targets: headings,
            opacity: [0, 1],
            translateY: [28, 0],
            delay: anime.stagger(80),
            duration: 850,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
          });
        }

        // Animate media containers and cards
        const mediaCards = sec.querySelectorAll('.pip-container, .polaroid-frame, .baba-portrait-card, .sibling-badge-card, .gallorizzy-card, .milestone-col');
        if (mediaCards.length && typeof anime !== 'undefined') {
          anime({
            targets: mediaCards,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.96, 1],
            delay: anime.stagger(75),
            duration: 900,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
          });
        }
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(sec => observer.observe(sec));
}

function initDragScrollGallery() {
  const gallery = document.querySelector('.gallorizzy-grid');
  if (!gallery) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.style.cursor = 'grabbing';
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.style.cursor = '';
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.style.cursor = '';
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
  });
}

function initParallaxSections() {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const polaroid = document.querySelector('.polaroid-frame');
    if (polaroid) {
      polaroid.style.transform = `rotate(-2.5deg) translateY(${scrollY * 0.02}px)`;
    }
  }, { passive: true });
}

function initCursorGlowTrail() {
  if (window.innerWidth <= 768) return;
  const glow = document.createElement('div');
  glow.style.position = 'fixed';
  glow.style.width = '240px';
  glow.style.height = '240px';
  glow.style.borderRadius = '50%';
  glow.style.pointerEvents = 'none';
  glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(212, 175, 55, 0) 70%)';
  glow.style.transform = 'translate(-50%, -50%)';
  glow.style.transition = 'transform 0.12s ease-out, opacity 0.3s ease';
  glow.style.zIndex = '9999';
  glow.style.opacity = '0';
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.opacity = '1';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

function initRippleClicks() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-gold-primary, .btn-gold-outline, .btn-blow-out, .pill-btn, .tab-btn');
    if (!btn) return;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255, 255, 255, 0.3)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple-effect 0.6s linear';
    circle.style.pointerEvents = 'none';
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
}

