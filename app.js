const heroLottie = lottie.loadAnimation({
  container: document.getElementById("heroLottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "https://assets6.lottiefiles.com/packages/lf20_touohxv0.json",
});

const sceneEl = document.getElementById("sceneLottie");
const sceneTitle = document.getElementById("sceneTitle");

const scenes = {
  lion: {
    title: "The Lion King's Moonlight Promise",
    caption: "🦁 Fireflies gather as the moon crowns the cub with courage.",
    lottie: "https://assets2.lottiefiles.com/packages/lf20_kxsd2ytq.json",
    back: "radial-gradient(circle at 30% 40%, rgba(250, 190, 95, 0.25), transparent 58%)",
    mid: "radial-gradient(circle at 70% 55%, rgba(255, 155, 94, 0.3), transparent 50%)",
    front: "radial-gradient(circle at 50% 90%, rgba(255, 234, 147, 0.3), transparent 35%)",
    actors: ["🦁", "🦜", "✨"],
  },
  frozen: {
    title: "Frozen's Northern Lights Quest",
    caption: "❄️ Aurora rivers wake and the ice bridge forms with each scroll.",
    lottie: "https://assets2.lottiefiles.com/packages/lf20_jmBauI.json",
    back: "radial-gradient(circle at 25% 35%, rgba(122, 220, 255, 0.3), transparent 58%)",
    mid: "radial-gradient(circle at 70% 50%, rgba(184, 138, 255, 0.32), transparent 48%)",
    front: "radial-gradient(circle at 50% 90%, rgba(214, 244, 255, 0.26), transparent 35%)",
    actors: ["👸", "⛄", "❄️"],
  },
  toy: {
    title: "Toy Room Time Machine",
    caption: "🚀 The toy rocket ignites and cardboard galaxies spin to life.",
    lottie: "https://assets1.lottiefiles.com/packages/lf20_mf5j5kua.json",
    back: "radial-gradient(circle at 20% 30%, rgba(255, 176, 106, 0.26), transparent 58%)",
    mid: "radial-gradient(circle at 76% 48%, rgba(255, 107, 129, 0.3), transparent 52%)",
    front: "radial-gradient(circle at 50% 90%, rgba(255, 230, 161, 0.26), transparent 35%)",
    actors: ["🧸", "🚀", "🤖"],
  },
  lantern: {
    title: "The Little Match Girl – Hopeful Reimagining",
    caption: "🕯️ Lantern spirits rise and kindness lights the winter sky.",
    lottie: "https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json",
    back: "radial-gradient(circle at 22% 38%, rgba(255, 184, 130, 0.28), transparent 58%)",
    mid: "radial-gradient(circle at 72% 54%, rgba(255, 124, 177, 0.3), transparent 50%)",
    front: "radial-gradient(circle at 50% 90%, rgba(255, 222, 133, 0.28), transparent 35%)",
    actors: ["🧒", "🕯️", "🏮"],
  },
};

let sceneLottie;
let actorLoop;

const soundToggleBtn = document.getElementById("soundToggle");
let soundEnabled = false;

const sounds = {
  chime: new Audio("https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3"),
  sparkle: new Audio("https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3"),
  boop: new Audio("https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"),
};

Object.values(sounds).forEach((sound) => {
  sound.preload = "auto";
  sound.volume = 0.45;
});

function playSfx(name) {
  if (!soundEnabled || !sounds[name]) return;
  const sound = sounds[name];
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

soundToggleBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggleBtn.textContent = soundEnabled ? "🔈 Sound FX On" : "🔊 Enable Sound FX";
  gsap.fromTo(
    soundToggleBtn,
    { scale: 0.9, rotate: -3 },
    { scale: 1, rotate: 0, duration: 0.4, ease: "back.out(2)" }
  );
  if (soundEnabled) playSfx("chime");
});

// Intro cinematic entrance
gsap.from(".hero__copy > *", {
  opacity: 0,
  y: 40,
  stagger: 0.12,
  duration: 0.8,
  ease: "power3.out",
});

// Story cards interactions + micro animations
const cards = gsap.utils.toArray(".card");
cards.forEach((card, i) => {
  gsap.from(card, { y: 25, opacity: 0, duration: 0.55, delay: i * 0.06, ease: "power2.out" });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.2,
      transformPerspective: 900,
      transformOrigin: "center",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.35 });
  });

  card.querySelector(".card-btn").addEventListener("click", () => {
    const sound = card.dataset.sound;
    const sceneKey = card.dataset.scene;
    setActiveScene(sceneKey);
    playSfx(sound);

    gsap.timeline()
      .to(card, { scale: 1.04, duration: 0.18, ease: "power1.out" })
      .to(card, { scale: 1, duration: 0.28, ease: "elastic.out(1, 0.4)" });
  });
});

// Scroll-driven parallax and lottie timeline
const scene = document.getElementById("sceneRoot");
const lBack = document.querySelector(".layer-back");
const lMid = document.querySelector(".layer-mid");
const lFront = document.querySelector(".layer-front");
const caption = document.querySelector(".scene-caption");
const actorA = document.getElementById("actorA");
const actorB = document.getElementById("actorB");
const actorC = document.getElementById("actorC");

function animateActors() {
  if (actorLoop) actorLoop.kill();
  actorLoop = gsap.timeline({ repeat: -1, yoyo: true });
  actorLoop
    .to(".actor-a", { y: -18, x: 16, rotate: 5, duration: 2.6, ease: "sine.inOut" }, 0)
    .to(".actor-b", { y: -24, x: -12, rotate: -6, duration: 2.2, ease: "sine.inOut" }, 0.2)
    .to(".actor-c", { y: 20, scale: 1.18, duration: 1.8, ease: "sine.inOut" }, 0.1);
}

function loadSceneLottie(path) {
  if (sceneLottie) sceneLottie.destroy();
  sceneEl.innerHTML = "";
  sceneLottie = lottie.loadAnimation({
    container: sceneEl,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path,
  });

  sceneLottie.addEventListener("DOMLoaded", () => {
    sceneLottie.play();
  });
  sceneLottie.addEventListener("data_failed", () => {
    caption.textContent = "✨ Story visuals are loading slowly. Scroll for parallax chapters meanwhile.";
  });
}

function setActiveScene(sceneKey) {
  const active = scenes[sceneKey];
  if (!active) return;

  sceneTitle.textContent = active.title;
  caption.textContent = active.caption;
  [actorA.textContent, actorB.textContent, actorC.textContent] = active.actors;
  gsap.to(lBack, { backgroundImage: active.back, duration: 0.45 });
  gsap.to(lMid, { backgroundImage: active.mid, duration: 0.45 });
  gsap.to(lFront, { backgroundImage: active.front, duration: 0.45 });
  gsap.fromTo(".actor", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08 });
  animateActors();
  loadSceneLottie(active.lottie);

  cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.scene === sceneKey);
  });
}

const sceneTl = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

sceneTl
  .to(lBack, { yPercent: -4, scale: 1.04, duration: 5, ease: "sine.inOut" }, 0)
  .to(lMid, { yPercent: -8, scale: 1.08, duration: 4.4, ease: "sine.inOut" }, 0)
  .to(lFront, { yPercent: -12, scale: 1.12, duration: 3.8, ease: "sine.inOut" }, 0)
  .to(caption, { textShadow: "0 0 20px rgba(255,206,84,0.8)", opacity: 1, duration: 3 }, 0.2)
  .to(scene, { filter: "saturate(1.35)", duration: 4, ease: "sine.inOut" }, 0.3);

setActiveScene("lion");

// Ambient glow pulses
gsap.to(".sky-glow", {
  opacity: 0.7,
  duration: 2.6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
