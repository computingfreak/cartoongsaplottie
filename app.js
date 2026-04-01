gsap.registerPlugin(ScrollTrigger);

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
  },
  frozen: {
    title: "Frozen's Northern Lights Quest",
    caption: "❄️ Aurora rivers wake and the ice bridge forms with each scroll.",
    lottie: "https://assets2.lottiefiles.com/packages/lf20_jmBauI.json",
    back: "radial-gradient(circle at 25% 35%, rgba(122, 220, 255, 0.3), transparent 58%)",
    mid: "radial-gradient(circle at 70% 50%, rgba(184, 138, 255, 0.32), transparent 48%)",
    front: "radial-gradient(circle at 50% 90%, rgba(214, 244, 255, 0.26), transparent 35%)",
  },
  toy: {
    title: "Toy Room Time Machine",
    caption: "🚀 The toy rocket ignites and cardboard galaxies spin to life.",
    lottie: "https://assets1.lottiefiles.com/packages/lf20_mf5j5kua.json",
    back: "radial-gradient(circle at 20% 30%, rgba(255, 176, 106, 0.26), transparent 58%)",
    mid: "radial-gradient(circle at 76% 48%, rgba(255, 107, 129, 0.3), transparent 52%)",
    front: "radial-gradient(circle at 50% 90%, rgba(255, 230, 161, 0.26), transparent 35%)",
  },
  jungle: {
    title: "Jungle Book River Riddles",
    caption: "🌿 Drums echo and vines swirl as clues unlock the river path.",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_2ks3pjua.json",
    back: "radial-gradient(circle at 30% 40%, rgba(114, 243, 164, 0.26), transparent 58%)",
    mid: "radial-gradient(circle at 70% 55%, rgba(73, 197, 125, 0.3), transparent 48%)",
    front: "radial-gradient(circle at 50% 90%, rgba(204, 255, 145, 0.22), transparent 35%)",
  },
  lantern: {
    title: "The Little Match Girl – Hopeful Reimagining",
    caption: "🕯️ Lantern spirits rise and kindness lights the winter sky.",
    lottie: "https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json",
    back: "radial-gradient(circle at 22% 38%, rgba(255, 184, 130, 0.28), transparent 58%)",
    mid: "radial-gradient(circle at 72% 54%, rgba(255, 124, 177, 0.3), transparent 50%)",
    front: "radial-gradient(circle at 50% 90%, rgba(255, 222, 133, 0.28), transparent 35%)",
  },
  alice: {
    title: "Alice in Wonder Forest",
    caption: "🫖 Portals bloom and clocks bend as perspective flips by chapter.",
    lottie: "https://assets10.lottiefiles.com/packages/lf20_hl5nqf8w.json",
    back: "radial-gradient(circle at 26% 34%, rgba(163, 143, 255, 0.28), transparent 58%)",
    mid: "radial-gradient(circle at 70% 55%, rgba(255, 135, 224, 0.32), transparent 48%)",
    front: "radial-gradient(circle at 50% 90%, rgba(255, 208, 236, 0.24), transparent 35%)",
  },
};

let sceneLottie;
let lottieFrameTween;

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
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    y: 35,
    opacity: 0,
    duration: 0.65,
    delay: i * 0.05,
    ease: "power2.out",
  });

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

function attachLottieScroll(animation) {
  const totalFrames = animation.totalFrames || 180;
  const playhead = { frame: 0 };
  if (lottieFrameTween) lottieFrameTween.kill();
  lottieFrameTween = gsap.to(playhead, {
    frame: totalFrames - 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#immersiveScene",
      start: "top top",
      end: "+=1200",
      scrub: true,
    },
    onUpdate: () => animation.goToAndStop(playhead.frame, true),
  });
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

  sceneLottie.addEventListener("DOMLoaded", () => attachLottieScroll(sceneLottie));
  sceneLottie.addEventListener("data_failed", () => {
    caption.textContent = "✨ Story visuals are loading slowly. Scroll for parallax chapters meanwhile.";
  });
}

function setActiveScene(sceneKey) {
  const active = scenes[sceneKey];
  if (!active) return;

  sceneTitle.textContent = active.title;
  caption.textContent = active.caption;
  gsap.to(lBack, { backgroundImage: active.back, duration: 0.45 });
  gsap.to(lMid, { backgroundImage: active.mid, duration: 0.45 });
  gsap.to(lFront, { backgroundImage: active.front, duration: 0.45 });
  loadSceneLottie(active.lottie);

  cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.scene === sceneKey);
  });
}

const sceneTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#immersiveScene",
    start: "top top",
    end: "+=1200",
    scrub: true,
    pin: true,
  },
});

sceneTl
  .to(lBack, { yPercent: -8, scale: 1.08, ease: "none" }, 0)
  .to(lMid, { yPercent: -18, scale: 1.15, ease: "none" }, 0)
  .to(lFront, { yPercent: -30, scale: 1.2, ease: "none" }, 0)
  .to(caption, { textShadow: "0 0 20px rgba(255,206,84,0.8)", opacity: 1 }, 0.2)
  .to(scene, { filter: "saturate(1.35)", ease: "none" }, 0.3);

setActiveScene("lion");

// Ambient glow pulses
gsap.to(".sky-glow", {
  opacity: 0.7,
  duration: 2.6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
