// oneko.js: https://github.com/adryd325/oneko.js

(async function oneko() {
  const nekoEl = document.createElement("div");
  let nekoPosX = 32,
    nekoPosY = 32,
    mousePosX = 0,
    mousePosY = 0,
    frameCount = 0,
    idleTime = 0,
    idleAnimation = null,
    idleAnimationFrame = 0,
    forceSleep = false,
    grabbing = false,
    grabStop = true,
    nudge = false,
    kuroNeko = false,
    variant = "classic";

  function parseLocalStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(`oneko:${key}`));
      return typeof value === typeof fallback ? value : fallback;
    } catch (e) {
      console.error(e);
      return fallback;
    }
  }

  const nekoSpeed = 10,
    variants = [
      ["classic", "Classic"],
      ["dog", "Dog"],
      ["tora", "Tora"],
      ["maia", "Maia (maia.crimew.gay)"],
      ["vaporwave", "Vaporwave (nya.rest)"],
    ],
    spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    }, // Get keys with 2 or more sprites
    keys = Object.keys(spriteSets).filter((key) => spriteSets[key].length > 1),
    usedKeys = new Set();

  function sleep() {
    forceSleep = !forceSleep;
    nudge = false;
    localStorage.setItem("oneko:forceSleep", forceSleep);
    if (!forceSleep) {
      resetIdleAnimation();
      return;
    }

    // Try to find the Visitor Counter to sleep on
    // Use a class selector or look for the element ID if we add one.
    // Based on VisitorCounter.tsx, it has a specific structure. 
    // We'll search for the text "Live_Views" container or similar.

    // As a fallback/primary target, we'll look for the "VisitorCounter" module if accessible,
    // otherwise we might sleep effectively at the bottom right where such counters usually are.
    // Or we can find specific text elements.

    const visitorCounter = document.querySelector(".font-mono.text-electric-blue")?.closest(".group");

    if (visitorCounter) {
      const rect = visitorCounter.getBoundingClientRect();
      mousePosX = rect.right - 16;
      mousePosY = rect.top - 8;
      return;
    }

    // Fallback: Sleep on the bottom status bar if it exists (e.g. in AllProjectsPage)
    const statusBar = document.querySelector(".border-b.border-white\\/5");
    if (statusBar) {
      const rect = statusBar.getBoundingClientRect();
      mousePosX = rect.right - 32;
      mousePosY = rect.top - 16;
      return;
    }

    // Default: Sleep at bottom right corner
    mousePosX = window.innerWidth - 32;
    mousePosY = window.innerHeight - 32;
  }

  function create() {
    // Select a random variant on each reload, distinct from the last one
    const lastVariant = localStorage.getItem("oneko:last_variant");
    let availableVariants = variants;
    if (lastVariant) {
      availableVariants = variants.filter(v => v[0] !== lastVariant);
    }
    // Safety check
    if (availableVariants.length === 0) availableVariants = variants;

    variant = availableVariants[Math.floor(Math.random() * availableVariants.length)][0];
    localStorage.setItem("oneko:last_variant", variant);

    kuroNeko = parseLocalStorage("kuroneko", false);

    if (!variants.some((v) => v[0] === variant)) {
      variant = "classic";
    }

    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";
    nekoEl.style.backgroundImage = `url('/oneko/oneko-${variant}.gif')`;
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.filter = kuroNeko ? "invert(100%) drop-shadow(0 0 4px #00E5FF)" : "none";
    nekoEl.style.zIndex = "9999";

    document.body.appendChild(nekoEl);

    window.addEventListener("mousemove", (e) => {
      if (forceSleep) return;

      mousePosX = e.clientX;
      mousePosY = e.clientY;
    });

    window.addEventListener("resize", () => {
      if (forceSleep) {
        forceSleep = false;
        sleep();
      }
    });

    // Handle dragging of the cat
    nekoEl.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      grabbing = true;
      let startX = e.clientX;
      let startY = e.clientY;
      let startNekoX = nekoPosX;
      let startNekoY = nekoPosY;
      let grabInterval;

      const mousemove = (e) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Scratch in the opposite direction of the drag
        if (absDeltaX > absDeltaY && absDeltaX > 10) {
          setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
        } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
          setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
        }

        if (grabStop || absDeltaX > 10 || absDeltaY > 10 || Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10) {
          grabStop = false;
          clearTimeout(grabInterval);
          grabInterval = setTimeout(() => {
            grabStop = true;
            nudge = false;
            startX = e.clientX;
            startY = e.clientY;
            startNekoX = nekoPosX;
            startNekoY = nekoPosY;
          }, 150);
        }

        nekoPosX = startNekoX + e.clientX - startX;
        nekoPosY = startNekoY + e.clientY - startY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      };

      const mouseup = () => {
        grabbing = false;
        nudge = true;
        resetIdleAnimation();
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    });

    nekoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      kuroNeko = !kuroNeko;
      localStorage.setItem("oneko:kuroneko", kuroNeko);
      // Cyber-Glow Effect for Kuroneko
      nekoEl.style.filter = kuroNeko ? "invert(100%) drop-shadow(0 0 4px #00E5FF)" : "none";
    });

    nekoEl.addEventListener("dblclick", sleep);



    window.onekoInterval = setInterval(frame, 100);
  }

  function getSprite(name, frame) {
    return spriteSets[name][frame % spriteSets[name].length];
  }

  function setSprite(name, frame) {
    const sprite = getSprite(name, frame);
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation = avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
    }

    if (forceSleep) {
      avalibleIdleAnimations = ["sleeping"];
      idleAnimation = "sleeping";
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8 && nudge && forceSleep) {
          setSprite("idle", 0);
          break;
        } else if (nudge) {
          nudge = false;
          resetIdleAnimation();
        }
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192 && !forceSleep) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;



    if (grabbing) {
      grabStop && setSprite("alert", 0);
      return;
    }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    // Cat has to sleep on top of the progress bar
    if (forceSleep && Math.abs(diffY) < nekoSpeed && Math.abs(diffX) < nekoSpeed) {
      // Make the cat sleep exactly on the top of the progress bar
      nekoPosX = mousePosX;
      nekoPosY = mousePosY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;

      idle();
      return;
    }

    if ((distance < nekoSpeed || distance < 48) && !forceSleep) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  create();

  function getRandomSprite() {
    let unusedKeys = keys.filter((key) => !usedKeys.has(key));
    if (unusedKeys.length === 0) {
      usedKeys.clear();
      unusedKeys = keys;
    }
    const index = Math.floor(Math.random() * unusedKeys.length);
    const key = unusedKeys[index];
    usedKeys.add(key);
    return [getSprite(key, 0), getSprite(key, 1)];
  }

  function setVariant(arr) {
    console.log(arr);

    variant = arr[0];
    localStorage.setItem("oneko:variant", `"${variant}"`);
    nekoEl.style.backgroundImage = `url('/oneko/oneko-${variant}.gif')`;
  }

  // Popup modal to choose variant
  function showPickerModal() {
    // Create modal overlay
    const overlay = document.createElement("div");
    overlay.id = "oneko-modal-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 10, 11, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(8px);
    `;

    // Create modal container
    const modal = document.createElement("div");
    modal.style.cssText = `
      background: rgba(15, 15, 17, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 32px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 229, 255, 0.1);
      position: relative;
      font-family: "Space Grotesk", "Inter", sans-serif;
    `;

    // Create Cyber Accents (Corner brackets)
    const accentStyle = `
      position: absolute;
      width: 8px;
      height: 8px;
      border-color: #00E5FF;
      border-style: solid;
      pointer-events: none;
    `;

    const tl = document.createElement('div');
    tl.style.cssText = `${accentStyle} top: -1px; left: -1px; border-width: 2px 0 0 2px;`;
    const tr = document.createElement('div');
    tr.style.cssText = `${accentStyle} top: -1px; right: -1px; border-width: 2px 2px 0 0;`;
    const bl = document.createElement('div');
    bl.style.cssText = `${accentStyle} bottom: -1px; left: -1px; border-width: 0 0 2px 2px;`;
    const br = document.createElement('div');
    br.style.cssText = `${accentStyle} bottom: -1px; right: -1px; border-width: 0 2px 2px 0;`;

    modal.appendChild(tl);
    modal.appendChild(tr);
    modal.appendChild(bl);
    modal.appendChild(br);

    // Create title
    const title = document.createElement("h2");
    title.textContent = "SYSTEM_PET // SELECT_VARIANT";
    title.style.cssText = `
      margin: 0 0 24px 0;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
    `;

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.style.cssText = `
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1;
      padding: 0;
      width: 32px;
      height: 32px;
      transition: color 0.2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.color = "#00E5FF";
    closeBtn.onmouseleave = () => closeBtn.style.color = "rgba(255, 255, 255, 0.5)";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    // Create variant container
    const container = document.createElement("div");
    container.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 16px;
      justify-items: center;
    `;

    const [idle, active] = getRandomSprite();

    function variantButton(variantEnum) {
      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      `;

      const div = document.createElement("div");
      div.className = "oneko-variant-button";
      div.id = variantEnum[0];
      div.style.cssText = `
        width: 72px;
        height: 72px;
        cursor: pointer;
        background-image: url('/oneko/oneko-${variantEnum[0]}.gif');
        background-size: 800%;
        background-position: ${idle[0] * 32}px ${idle[1] * 32}px; /* Adjusted scaling */
        background-repeat: no-repeat;
        /* Correction for scaling pixel art in css background is tricky, 
           so we use the sprite logic but scale the element. 
           The original code used 64px div with 32px sprite scaled?
           Original was: background-size: 800%; pos: ...*64
        */
        background-size: 800%; 
        background-position: ${idle[0] * 100}% ${idle[1] * 33.33}%; /* Approximate % for sprites? No, let's stick to pixel math */
        
        /* 
           Original: 
           div size: 64px
           image: 256x128 
           bg-size: 800% -> this means the bg image is treated as 8 * 64px wide? 
           Let's replicate exactly what worked but with new styles.
        */
        background-position: ${idle[0] * 64}px ${idle[1] * 64}px;

        background-color: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease-in-out;
        image-rendering: pixelated;
        position: relative;
        overflow: hidden;
      `;

      /* Re-evaluating background sizing:
         The sprites have 32x32 frames. 
         Original div was 64x64.
         To show a 32x32 frame purely scaled 2x in a 64x64 box:
         background-size: (256 * 2)px (128 * 2)px = 512px 256px
         512 / 64 = 8 => 800% width. This is correct.
      */

      const label = document.createElement("div");
      label.textContent = variantEnum[1];
      label.style.cssText = `
        font-size: 10px;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        font-family: "JetBrains Mono", monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      `;

      div.onmouseenter = () => {
        div.style.backgroundPosition = `${active[0] * 64}px ${active[1] * 64}px`;
        div.style.borderColor = "#00E5FF";
        div.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.2)";
        div.style.backgroundColor = "rgba(0, 229, 255, 0.05)";
        label.style.color = "#00E5FF";
      };

      div.onmouseleave = () => {
        div.style.backgroundPosition = `${idle[0] * 64}px ${idle[1] * 64}px`;
        if (variantEnum[0] !== variant) {
          div.style.borderColor = "rgba(255, 255, 255, 0.1)";
          div.style.boxShadow = "none";
          div.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
          label.style.color = "rgba(255, 255, 255, 0.6)";
        } else {
          div.style.borderColor = "#00E5FF";
          div.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.1)";
          label.style.color = "#fff";
        }
      };

      div.onclick = () => {
        setVariant(variantEnum);
        // Update all buttons styling
        const allButtons = container.querySelectorAll(".oneko-variant-button");
        allButtons.forEach(btn => {
          btn.style.borderColor = "rgba(255, 255, 255, 0.1)";
          btn.style.boxShadow = "none";
          btn.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
          btn.nextElementSibling.style.color = "rgba(255, 255, 255, 0.6)";
        });

        div.style.borderColor = "#00E5FF";
        div.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.1)";
        div.style.backgroundColor = "rgba(0, 229, 255, 0.05)";
        label.style.color = "#fff";

        setTimeout(() => document.body.removeChild(overlay), 300);
      };

      if (variantEnum[0] === variant) {
        div.style.borderColor = "#00E5FF";
        div.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.1)";
        label.style.color = "#fff";
      }

      wrapper.appendChild(div);
      wrapper.appendChild(label);
      return wrapper;
    }

    for (const v of variants) {
      container.appendChild(variantButton(v));
    }

    modal.appendChild(title);
    modal.appendChild(closeBtn);
    modal.appendChild(container);
    overlay.appendChild(modal);

    overlay.onclick = (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    };

    document.body.appendChild(overlay);
  }
})();
