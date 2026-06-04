// Βρίσκουμε τον καμβά στο HTML
const canvas = document.getElementById("blender-canvas");
const context = canvas.getContext("2d");

// Βάλε εδώ την ανάλυση που έκανες render στο Blender (π.χ. Full HD)
canvas.width = 1920;
canvas.height = 1920;

// Αριθμός εικόνων
const frameCount = 100; 

// Λειτουργία που βρίσκει το όνομα του αρχείου
// π.χ. αν το index είναι 0, ψάχνει το "images/step0001.png"
const currentFrame = index => (
  `imageslow/step${(index + 1).toString().padStart(4, '0')}.jpg`
);

const images = [];
const frames = { frame: 0 };

// Φορτώνουμε όλες τις εικόνες κρυφά στη μνήμη για να μην κολλάνε στο scroll
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Μόλις φορτώσει η πρώτη εικόνα, την εμφανίζουμε
images[0].onload = render;

// Συνάρτηση που "ζωγραφίζει" την εικόνα στον καμβά
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const img = images[frames.frame];
  if(img) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

// Ενεργοποίηση του GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Μαγικό συστατικό: Συνδέει το scroll με την αλλαγή του "frames.frame"
gsap.to(frames, {
  frame: frameCount - 1,
  snap: "frame", // Εξασφαλίζει ότι το νούμερο της εικόνας είναι ακέραιος
  ease: "none",
  scrollTrigger: {
    trigger: ".animation-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5 // Προσθέτει μια μικρή αδράνεια (0.5 δευτερόλεπτα) για πιο ομαλό εφέ
  },
  onUpdate: render // Κάθε φορά που αλλάζει το frame λόγω scroll, ξαναζωγράφισε
});