const derouleList = document.getElementById('deroule-list');
const phraseCulteList = document.getElementById('phrase-culte-list');
const ambianceList = document.getElementById('ambiance-list');

const sounds = [
  { label: 'Épreuve Départ', file: '6. epreuve 1 go.mp3', category: 'déroulé' },
  { label: 'Épreuve Départ 2', file: '8. epreuve 2 go.mp3', category: 'déroulé' },
  { label: 'Grand Gagnant', file: '15. gagnant.mp3', category: 'déroulé' },
  { label: '[Denis Brogniart] C est valide !!!', file: '[Denis Brogniart]C est valide !!!.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Et la victoire aux JAUNES !', file: '[Denis Brogniart]Et la victoire aux JAUNES !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Et la victoire aux ROUGES !', file: '[Denis Brogniart]Et la victoire aux ROUGE!.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Il faut avaler !', file: '[Denis Brogniart]Il faut avaler !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Le mental !', file: '[Denis Brogniart]Le mental !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Les jaunes accelerent !', file: '[Denis Brogniart]Les jaunes a la trainent !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Les rouges accelerent !', file: '[Denis Brogniart]Les rouges a la trainent !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Tout peut basculer !', file: '[Denis Brogniart]Tout peut basculer !.mp3', category: 'phrase culte' },
  { label: '99. Conseil', file: '99. Conseil.mp3', category: 'ambiance' },
  { label: '99. Emotions', file: '99. Emotions.mp3', category: 'ambiance' },
  { label: '99. Épreuves', file: '99. Epreuves.mp3', category: 'ambiance' },
  { label: '99. Intro et Fin', file: '99. Intro et Fin.mp3', category: 'ambiance' }
];

const playingAudioByCategory = new Map();

function createButton(item) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sound-button';
  button.textContent = item.label;
  button.addEventListener('click', () => playSound(item));
  return button;
}

function playSound(item) {
  const previousAudio = playingAudioByCategory.get(item.category);
  if (previousAudio && !previousAudio.paused) {
    previousAudio.pause();
    previousAudio.currentTime = 0;
  }

  const audio = new Audio(`assets/son/${encodeURIComponent(item.file)}`);
  playingAudioByCategory.set(item.category, audio);

  audio.play().catch((error) => {
    console.error(error);
  });
}

function renderCategory(categoryName, container) {
  const filtered = sounds.filter(sound => sound.category === categoryName);
  filtered.forEach(sound => container.appendChild(createButton(sound)));
}

function toggleSectionVisibility(section, button) {
  const isHidden = section.classList.toggle('hidden');
  button.textContent = isHidden ? 'Afficher' : 'Cacher';
}

function muteCategory(section) {
  const category = section.dataset.category;
  const currentAudio = playingAudioByCategory.get(category);
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    playingAudioByCategory.delete(category);
  }
}

document.querySelectorAll('.section-controls').forEach((controls) => {
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const section = button.closest('.category');
    if (!section) return;

    if (button.dataset.action === 'toggle') {
      toggleSectionVisibility(section, button);
    }

    if (button.dataset.action === 'mute') {
      muteCategory(section);
    }
  });
});

document.querySelectorAll('button[data-action="toggle-puzzle"]').forEach((button) => {
  button.addEventListener('click', (event) => {
    const puzzleItem = event.target.closest('.puzzle-item');
    if (!puzzleItem) return;

    const isHidden = puzzleItem.classList.toggle('hidden');
    event.target.textContent = isHidden ? 'Afficher' : 'Cacher';
  });
});

renderCategory('déroulé', derouleList);
renderCategory('phrase culte', phraseCulteList);
renderCategory('ambiance', ambianceList);
