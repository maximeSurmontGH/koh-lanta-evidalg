const derouleList = document.getElementById('deroule-list');
const phraseCulteList = document.getElementById('phrase-culte-list');
const ambianceList = document.getElementById('ambiance-list');

const sounds = [
  { label: '1. Intro', file: '1. Intro.mp3', category: 'déroulé' },
  { label: '2. Intro 2', file: '2. Intro 2.mp3', category: 'déroulé' },
  { label: '3. Team', file: '3. Team.mp3', category: 'déroulé' },
  { label: '4. Épreuve 1', file: '4. epreuve 1.mp3', category: 'déroulé' },
  { label: '5. Épreuve 1', file: '5. epreuve 1 .mp3', category: 'déroulé' },
  { label: '6. Épreuve 1 Go', file: '6. epreuve 1 go.mp3', category: 'déroulé' },
  { label: '7. Épreuve 2', file: '7. epreuve 2.mp3', category: 'déroulé' },
  { label: '8. Épreuve 2 Go', file: '8. epreuve 2 go.mp3', category: 'déroulé' },
  { label: '9. Épreuve 3', file: '9. epreuve 3.mp3', category: 'déroulé' },
  { label: '10. Orientation', file: '10. orientation.mp3', category: 'déroulé' },
  { label: '11. Orientation fin', file: '11. orientation fin.mp3', category: 'déroulé' },
  { label: '12. Potos', file: '12. potos.mp3', category: 'déroulé' },
  { label: '13. Poto', file: '13. poto.mp3', category: 'déroulé' },
  { label: '14. Poto', file: '14. poto.mp3', category: 'déroulé' },
  { label: '15. Gagnant', file: '15. gagnant.mp3', category: 'déroulé' },
  { label: '[Denis Brogniart] C est valide !!!', file: '[Denis Brogniart]C est valide !!!.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] C’est serre!', file: '[Denis Brogniart]C’est serre!.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Et la victoire aux CHATALERE !', file: '[Denis Brogniart]Et la victoire aux CHATALÈRÉ !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Et la victoire aux JAUNES !', file: '[Denis Brogniart]Et la victoire aux JAUNES !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Et la victoire aux ROUGES !', file: '[Denis Brogniart]Et la victoire aux ROUGE!.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Et la victoire aux petitsZIZI !', file: '[Denis Brogniart]Et la victoire aux petitsZIZI !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Il faut avaler !', file: '[Denis Brogniart]Il faut avaler !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Le mental !', file: '[Denis Brogniart]Le mental !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Les chatalere a la trainent !', file: '[Denis Brogniart]Les chatalere a la trainent !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Les jaunes a la trainent !', file: '[Denis Brogniart]Les jaunes a la trainent !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Les ptiti zizi a la trainent !', file: '[Denis Brogniart]Les ptiti zizi a la trainent !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Les rouges a la trainent !', file: '[Denis Brogniart]Les rouges a la trainent !.mp3', category: 'phrase culte' },
  { label: '[Denis Brogniart] Que c est petit !', file: '[Denis Brogniart]Que c est petit !.mp3', category: 'phrase culte' },
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

renderCategory('déroulé', derouleList);
renderCategory('phrase culte', phraseCulteList);
renderCategory('ambiance', ambianceList);
