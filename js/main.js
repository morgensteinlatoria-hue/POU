// Получаем элементы
const base   = document.getElementById('pouBase');
const inject = document.getElementById('pouInject');
const hint   = document.getElementById('hint');
const fade   = document.getElementById('fade');
const splash = document.getElementById('splash');
const main   = document.getElementById('main');
const music  = document.getElementById('bgMusic'); // 🎵 музыка

let started = false;

function startSequence() {
  if (started) return;
  started = true;

  // 🎵 Запуск музыки
  music.play().catch(err => console.log("Ошибка запуска музыки:", err));

  // Убираем пульсацию и подсказку
  base.classList.remove('pulse');
  hint.style.opacity = '0';

  // Запускаем влетание шприца
  inject.classList.add('fly-in');

  // Когда анимация шприца закончится
  inject.addEventListener('animationend', () => {
    // Реакция Pou
    base.classList.add('hit');

    // Через 400 мс затемнение
    setTimeout(() => {
      fade.classList.add('show');

      // Через 600 мс переход на экран 2
      setTimeout(() => {
        splash.classList.add('hidden');
        main.classList.remove('hidden');
      }, 600);

    }, 400);
  }, { once: true });
}

// Запуск по клику на Pou
base.addEventListener('click', startSequence);

// Запуск с клавиатуры (Enter / Пробел)
base.tabIndex = 0;
base.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    startSequence();
  }
});

/* === additions: меню и CA, без вмешательства в твою логику === */
const siteHeader = document.getElementById('siteHeader');
const burger     = document.getElementById('burger');
const navMenu    = document.getElementById('navMenu');
const caText     = document.getElementById('caText');
const copyBtn    = document.getElementById('copyCA');
const copyBadge  = document.getElementById('copyBadge');

// Показать меню, когда main стал видимым (наблюдаем за изменением класса)
if (main && siteHeader) {
  const obs = new MutationObserver(() => {
    if (!main.classList.contains('hidden')) {
      siteHeader.classList.remove('hidden');
      siteHeader.setAttribute('aria-hidden', 'false');
      obs.disconnect();
    }
  });
  obs.observe(main, { attributes: true, attributeFilter: ['class'] });
}

// Копирование CA
async function copyCA() {
  const value = (caText?.dataset?.ca || caText?.textContent || '').trim();
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    showCopied();
  } catch (e) {
    // Фоллбэк
    const tmp = document.createElement('input');
    tmp.value = value;
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); showCopied(); }
    catch (err) { console.warn('Не удалось скопировать CA:', err); }
    finally { document.body.removeChild(tmp); }
  }
}

function showCopied() {
  if (!copyBadge) return;
  copyBadge.classList.add('copy-badge', 'show');
  copyBadge.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    copyBadge.classList.remove('show');
    copyBadge.setAttribute('aria-hidden', 'true');
  }, 1400);
}

if (copyBtn) copyBtn.addEventListener('click', copyCA);

// Бургер для мобильных
function toggleMenu() {
  if (!burger || !navMenu) return;
  const isOpen = navMenu.classList.toggle('open');
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
}
if (burger && navMenu) {
  burger.addEventListener('click', toggleMenu);
  document.addEventListener('click', (e) => {
    if (!siteHeader.contains(e.target) && navMenu.classList.contains('open')) {
      toggleMenu();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) toggleMenu();
  });
}
/* === /additions === */
document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyCA");
  const caText  = document.getElementById("caText");

  if (copyBtn && caText) {
    copyBtn.addEventListener("click", async () => {
      try {
        // копируем текст из data-атрибута или innerText
        const caValue = caText.dataset.ca || caText.innerText;
        await navigator.clipboard.writeText(caValue);

        // меняем текст кнопки
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.disabled = true;

        // через 1.5 секунды возвращаем обратно
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.disabled = false;
        }, 1500);
      } catch (err) {
        console.error("Ошибка копирования:", err);
      }
    });
  }
});

const phrases = [
  "Gym", "Pump", "Protein", "Creatine",
  "Bulking", "Cutting", "Shredded", "Mass",
  "Leg Day", "Chest Day", "Deadlift", "Squat",
  "Bench Press", "Biceps", "Triceps", "Abs",
  "PR", "Rep", "Set", "Cardio", "Preworkout",

  // meme phrases
  "No Pain No Gain", "Do You Even Lift?",
  "It's Always Leg Day", "Bro Split",
  "Natty or Not", "Gym Rat", "Big Gains",
  "Stay Hard", "Rise and Grind", "Chasing PRs",
  "One More Rep", "All Gas No Brakes",
  "Train Insane", "Mind-Muscle Connection",
  "Eat Sleep Lift Repeat", "Grind Never Stops",

  // iconic memes & legends
  "Lightweight Baby!", "Yeah Buddy!",
  "Ronnie Coleman", "Cbum", "Arnold",
  "GigaChad", "Alpha Male", "Sigma Grindset",
  "Swole", "Aesthetic", "Natty Verified",
  "Clanging and Banging", "Broskies",

  // funny gym culture
  "Preworkout Kicked In", "Dry Scoop",
  "Chicken and Rice", "Rice and Chicken",
  "Whey 4 Life", "New PR Incoming",
  "Mirror Selfie", "Sunday Scaries",
  "Chest Pump", "Gym Crush",
  "Sarm Goblin", "Test Levels Rising",



  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",
  "Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it","Pump it",

];

function spawnPhrase() {
  const phrase = document.createElement("span");
  phrase.className = "flying-phrase";
  phrase.textContent = phrases[Math.floor(Math.random() * phrases.length)];

  // случайная позиция по экрану
  phrase.style.left = Math.random() * 90 + "vw";
  phrase.style.top  = Math.random() * 80 + "vh";

  document.body.appendChild(phrase);

  // удалить после окончания анимации
  phrase.addEventListener("animationend", () => phrase.remove());
}

// запускать каждые 1–2 секунды
setInterval(spawnPhrase, 1500 + Math.random() * 1000);
// Auto-open after 2s of no interaction
(function autoOpenSplash() {
  const pou = document.getElementById('pouBase');
  if (!pou) return;

  let opened = false;

  // если пользователь кликнул сам — отмечаем и не автозапускаем
  pou.addEventListener('click', () => { opened = true; }, { once: true });

  // через 2 секунды «кликаем» программно (один раз)
  setTimeout(() => {
    if (opened) return;
    opened = true;

    // запускаем тот же обработчик, что и при реальном клике
    try {
      pou.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    } catch {
      // fallback: если у вас отдельная функция запуска анимации — вызовите её здесь
      if (typeof window.startIntro === 'function') window.startIntro();
    }
  }, 2000);
})();
// Play bgMusic on ANY user interaction (once)
(function enableSoundOnAnyAction(){
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  audio.muted = false;
  audio.loop = true;

  const events = ['pointerdown','mousedown','touchstart','keydown'];
  let armed = true;

  const onInteract = () => {
    if (!armed) return;
    armed = false;

    const tryPlay = audio.play();
    if (tryPlay && typeof tryPlay.then === 'function') {
      tryPlay.then(() => {
        // started OK — stop listening
        detach();
      }).catch(() => {
        // browser still blocked: re-arm and wait for the next real gesture
        armed = true;
      });
    } else {
      // older browsers
      detach();
    }
  };

  const detach = () => events.forEach(t =>
    document.removeEventListener(t, onInteract, true)
  );

  events.forEach(t =>
    document.addEventListener(t, onInteract, { capture: true })
  );
})();
