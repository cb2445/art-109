// Select the main player elements from the DOM.
const playToggle = document.getElementById('play-toggle');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playlistItems = [...document.querySelectorAll('.queue-item')];

// Build the track list from the playlist items.
const tracks = playlistItems.map((item) => ({
  title: item.dataset.title,
  artist: item.dataset.artist,
  duration: item.dataset.duration,
  element: item,
}));

// Current playback state.
let currentTrackIndex = 0;
let isPlaying = false;
let progress = 38;
let timer = null;

// Convert total seconds into a MM:SS display.
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// Update the active track info and highlight the selected queue item.
function applyTrack(index) {
  currentTrackIndex = (index + tracks.length) % tracks.length;

  const activeTrack = tracks[currentTrackIndex];
  trackTitle.textContent = activeTrack.title;
  trackArtist.textContent = activeTrack.artist;
  totalTimeEl.textContent = activeTrack.duration;

  playlistItems.forEach((item, idx) => {
    item.classList.toggle('active', idx === currentTrackIndex);
  });

  progress = 14;
  updateProgress();
}

// Update the wider progress bar and current time label.
function updateProgress() {
  const activeDuration = tracks[currentTrackIndex].duration;
  const [minutes, seconds] = activeDuration.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;
  const fillWidth = Math.min(Math.max((progress / totalSeconds) * 100, 2), 100);

  progressFill.style.width = `${fillWidth}%`;
  currentTimeEl.textContent = formatTime(Math.min(Math.floor(progress), totalSeconds));
}

// Toggle play/pause and start or stop the timer.
function togglePlayback() {
  isPlaying = !isPlaying;

  playIcon.innerHTML = isPlaying
    ? '<path d="M7 5h4v14H7zm6 0h4v14h-4z"/>'
    : '<path d="M8 5v14l11-7z"/>';

  playToggle.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');

  if (isPlaying) {
    timer = setInterval(() => {
      const activeDuration = tracks[currentTrackIndex].duration;
      const [minutes, seconds] = activeDuration.split(':').map(Number);
      const totalSeconds = minutes * 60 + seconds;

      if (progress >= totalSeconds) {
        progress = 0;
        nextTrack();
        return;
      }

      progress += 0.2;
      updateProgress();
    }, 260);
  } else if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

// Move to the next track in the playlist.
function nextTrack() {
  applyTrack(currentTrackIndex + 1);
  if (isPlaying) {
    clearInterval(timer);
    timer = null;
    togglePlayback();
  }
}

// Move to the previous track in the playlist.
function prevTrack() {
  applyTrack(currentTrackIndex - 1);
  if (isPlaying) {
    clearInterval(timer);
    timer = null;
    togglePlayback();
  }
}

// Hook up the main controls.
playToggle.addEventListener('click', togglePlayback);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

playlistItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    applyTrack(idx);
    if (isPlaying) {
      clearInterval(timer);
      timer = null;
      togglePlayback();
    }
  });
});

// Theme switching setup.
const root = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-option');

// Base theme values for the default palette.
const classicalChocolate = {
  '--page-bg': '#ffffff',
  '--surface': '#f6f8fb',
  '--surface-alt': '#ffffff',
  '--text': '#121821',
  '--muted': 'rgba(18, 24, 33, 0.72)',
  '--border': 'rgba(17, 36, 61, 0.06)',
  '--accent-1': '#3f2a23',
  '--accent-2': '#101a2b',
  '--accent-3': '#24354d',
  '--accent-4': '#121821',
  '--accent-5': '#f6f8fb',
};

// Theme map for each available color palette.
const themeMap = {
  'classical-chocolate': classicalChocolate,
  'summer-melon': {
    '--page-bg': '#ffffff',
    '--surface': '#f4fffd',
    '--surface-alt': '#ffffff',
    '--text': '#1d1d1d',
    '--muted': 'rgba(29, 29, 29, 0.72)',
    '--border': 'rgba(89, 211, 214, 0.2)',
    '--accent-1': '#c04336',
    '--accent-2': '#59d3d6',
    '--accent-3': '#8fd2b7',
    '--accent-4': '#e9a799',
    '--accent-5': '#ffffff',
  },
  'retro-weather': {
    '--page-bg': '#f8f7f4',
    '--surface': '#f0efe9',
    '--surface-alt': '#ffffff',
    '--text': '#2d2a28',
    '--muted': 'rgba(45, 42, 40, 0.72)',
    '--border': 'rgba(140, 124, 108, 0.22)',
    '--accent-1': '#8c7c6c',
    '--accent-2': '#a0a29f',
    '--accent-3': '#82b7cc',
    '--accent-4': '#f5d46b',
    '--accent-5': '#f8f7f4',
  },
  'fresh-water-grape': {
    '--page-bg': '#f4f5fb',
    '--surface': '#eef1fb',
    '--surface-alt': '#ffffff',
    '--text': '#1f233a',
    '--muted': 'rgba(31, 35, 58, 0.72)',
    '--border': 'rgba(43, 56, 141, 0.18)',
    '--accent-1': '#2b388d',
    '--accent-2': '#6465bb',
    '--accent-3': '#8f6ad1',
    '--accent-4': '#8f99d6',
    '--accent-5': '#d9e0e9',
  },
  'grass-fields': {
    '--page-bg': '#f5f5f1',
    '--surface': '#eff0e7',
    '--surface-alt': '#ffffff',
    '--text': '#1d1210',
    '--muted': 'rgba(29, 18, 16, 0.72)',
    '--border': 'rgba(71, 76, 20, 0.18)',
    '--accent-1': '#1d1210',
    '--accent-2': '#474c14',
    '--accent-3': '#b2b636',
    '--accent-4': '#a7b9d0',
    '--accent-5': '#dadae2',
  },
};

// Apply a selected theme by updating CSS custom properties.
function applyTheme(themeName) {
  const theme = themeMap[themeName] || classicalChocolate;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === themeName;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

// Set the default theme and attach click handlers.
root.setAttribute('data-theme', 'classical-chocolate');
applyTheme('classical-chocolate');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTheme = button.dataset.theme;
    root.setAttribute('data-theme', selectedTheme);
    applyTheme(selectedTheme);
  });
});

// Start with the first track loaded.
applyTrack(0);
