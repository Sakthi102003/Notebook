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

    // If Full App Display is on, sleep on its progress bar instead
    const fullAppDisplay = document.getElementById("fad-progress");
    if (fullAppDisplay) {
      mousePosX = fullAppDisplay.getBoundingClientRect().right - 16;
      mousePosY = fullAppDisplay.getBoundingClientRect().top - 12;
      return;
    }

    // Get the far right and top of the progress bar
    const progressBar = document.querySelector(".main-nowPlayingBar-center .playback-progressbar");
    const progressBarRight = progressBar.getBoundingClientRect().right;
    const progressBarTop = progressBar.getBoundingClientRect().top;
    const progressBarBottom = progressBar.getBoundingClientRect().bottom;

    // Make the cat sleep on the progress bar
    mousePosX = progressBarRight - 16;
    mousePosY = progressBarTop - 8;

    // Get the position of the remaining time
    const remainingTime = document.querySelector(".main-playbackBarRemainingTime-container");
    const remainingTimeLeft = remainingTime.getBoundingClientRect().left;
    const remainingTimeBottom = remainingTime.getBoundingClientRect().bottom;
    const remainingTimeTop = remainingTime.getBoundingClientRect().top;

    // Get the position of elapsed time
    const elapsedTime = document.querySelector(".playback-bar__progress-time-elapsed");
    const elapsedTimeRight = elapsedTime.getBoundingClientRect().right;
    const elapsedTimeLeft = elapsedTime.getBoundingClientRect().left;

    // If the remaining time is on top right of the progress bar, make the cat sleep to the a little bit to the left of the remaining time
    // Theme compatibility
    if (remainingTimeLeft < progressBarRight && remainingTimeTop < progressBarBottom && progressBarTop - remainingTimeBottom < 32) {
      mousePosX = remainingTimeLeft - 16;

      // Comfy special case
      if (Spicetify.Config.current_theme === "Comfy") {
        mousePosY = progressBarTop - 14;
      }

      // Move the cat to the left of elapsed time if it is too close to the remaining time (Nord theme)
      if (remainingTimeLeft - elapsedTimeRight < 32) {
        mousePosX = elapsedTimeLeft - 16;
      }
    }
  }

  function create() {
    variant = parseLocalStorage("variant", "classic");
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
    nekoEl.style.filter = kuroNeko ? "invert(100%)" : "none";
    // Render Oneko below Spicetify's Popup Modal
    nekoEl.style.zIndex = "99";

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
      nekoEl.style.filter = kuroNeko ? "invert(100%)" : "none";
    });

    nekoEl.addEventListener("dblclick", sleep);

    // Click on neko to open variant picker modal
    nekoEl.addEventListener("click", (e) => {
      if (!grabbing) {
        showPickerModal();
      }
    });

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
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(4px);
    `;

    // Create modal container
    const modal = document.createElement("div");
    modal.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
    `;

    // Create title
    const title = document.createElement("h2");
    title.textContent = "Choose your neko";
    title.style.cssText = `
      margin: 0 0 20px 0;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: #333;
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
      font-size: 32px;
      cursor: pointer;
      color: #666;
      line-height: 1;
      padding: 0;
      width: 32px;
      height: 32px;
    `;
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
        gap: 8px;
      `;

      const div = document.createElement("div");
      div.className = "oneko-variant-button";
      div.id = variantEnum[0];
      div.style.cssText = `
        width: 64px;
        height: 64px;
        cursor: pointer;
        background-image: url('/oneko/oneko-${variantEnum[0]}.gif');
        background-size: 800%;
        background-position: ${idle[0] * 64}px ${idle[1] * 64}px;
        border-radius: 12px;
        transition: all 0.2s ease-in-out;
        image-rendering: pixelated;
        border: 2px solid transparent;
      `;

      const label = document.createElement("div");
      label.textContent = variantEnum[1];
      label.style.cssText = `
        font-size: 12px;
        text-align: center;
        color: #666;
      `;

      div.onmouseenter = () => {
        div.style.backgroundPosition = `${active[0] * 64}px ${active[1] * 64}px`;
        div.style.transform = "scale(1.1)";
      };

      div.onmouseleave = () => {
        div.style.backgroundPosition = `${idle[0] * 64}px ${idle[1] * 64}px`;
        div.style.transform = "scale(1)";
      };

      div.onclick = () => {
        setVariant(variantEnum);
        const allButtons = container.querySelectorAll(".oneko-variant-button");
        allButtons.forEach(btn => btn.style.border = "2px solid transparent");
        div.style.border = "2px solid #3b82f6";
        setTimeout(() => document.body.removeChild(overlay), 300);
      };

      if (variantEnum[0] === variant) {
        div.style.border = "2px solid #3b82f6";
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
