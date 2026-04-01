gsap.registerPlugin(ScrollTrigger);

const heroLottie = lottie.loadAnimation({
  container: document.getElementById("heroLottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "https://assets6.lottiefiles.com/packages/lf20_touohxv0.json",
});

const sceneLottie = lottie.loadAnimation({
  container: document.getElementById("sceneLottie"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json",
});

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

sceneLottie.addEventListener("DOMLoaded", () => {
  const totalFrames = sceneLottie.totalFrames || 180;

  const playhead = { frame: 0 };
  gsap.to(playhead, {
    frame: totalFrames - 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#immersiveScene",
      start: "top top",
      end: "+=1200",
      scrub: true,
    },
    onUpdate: () => sceneLottie.goToAndStop(playhead.frame, true),
  });
});

// Ambient glow pulses
gsap.to(".sky-glow", {
  opacity: 0.7,
  duration: 2.6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
