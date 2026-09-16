(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const header = $(".site-header");
  const progress = $("#scrollProgress");
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  const shareBtn = $("#shareBtn");
  const copyLinkBtn = $("#copyLinkBtn");
  const toast = $("#toast");

  const readerModal = $("#readerModal");
  const closeReaderBtn = $("#closeReaderBtn");
  const pdfFrame = $("#pdfFrame");
  const readerButtons = [$("#openReaderBtn"), $("#openReaderBtn2")].filter(Boolean);

  // ---------------------------
  // Header + scroll progress
  // ---------------------------
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("scrolled", y > 20);

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? y / max : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------------------------
  // Mobile menu
  // ---------------------------
  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  $$("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navLinks?.classList.contains("open")) return;
    if (navLinks.contains(event.target) || menuBtn?.contains(event.target)) return;
    navLinks.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });

  // ---------------------------
  // Reveal on scroll
  // ---------------------------
  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }

  // ---------------------------
  // Cover parallax (desktop only)
  // ---------------------------
  const visual = $(".hero-visual");
  const cover = $(".cover-shell");

  if (visual && cover && matchMedia("(pointer:fine)").matches) {
    visual.addEventListener("mousemove", (event) => {
      const r = visual.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      cover.style.transform = `rotateY(${(-7 + x * 7).toFixed(2)}deg) rotateX(${(1 - y * 5).toFixed(2)}deg) translateY(${(y * -4).toFixed(1)}px)`;
    });

    visual.addEventListener("mouseleave", () => {
      cover.style.transform = "rotateY(-7deg) rotateX(1deg)";
    });
  }

  // ---------------------------
  // PDF Reader
  // ---------------------------
  const openReader = () => {
    if (!readerModal) return;

    if (!pdfFrame.src) {
      pdfFrame.src = pdfFrame.dataset.src;
    }

    if (typeof readerModal.showModal === "function") {
      readerModal.showModal();
    } else {
      window.open("./book.pdf", "_blank", "noopener");
      return;
    }

    document.body.classList.add("modal-open");
  };

  const closeReader = () => {
    if (readerModal?.open) readerModal.close();
    document.body.classList.remove("modal-open");
  };

  readerButtons.forEach(btn => btn.addEventListener("click", openReader));
  closeReaderBtn?.addEventListener("click", closeReader);

  readerModal?.addEventListener("click", (event) => {
    const box = $(".reader-shell", readerModal)?.getBoundingClientRect();
    if (!box) return;
    const outside =
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom;

    if (outside) closeReader();
  });

  readerModal?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });

  // ---------------------------
  // Share + Copy
  // ---------------------------
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
  };

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("لینک صفحه کپی شد.");
    } catch {
      const input = document.createElement("textarea");
      input.value = window.location.href;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      showToast("لینک صفحه کپی شد.");
    }
  };

  copyLinkBtn?.addEventListener("click", copyPageLink);

  shareBtn?.addEventListener("click", async () => {
    const data = {
      title: "الگوریتم‌های مرگ",
      text: "نقش هوش مصنوعی در تحول میدان نبرد",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (error) {
        if (error?.name !== "AbortError") copyPageLink();
      }
    } else {
      copyPageLink();
    }
  });

  // ---------------------------
  // Soft active nav state
  // ---------------------------
  const sections = ["about", "chapters", "themes", "download"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$("#navLinks a").forEach(a => {
          const active = a.getAttribute("href") === `#${entry.target.id}`;
          a.style.color = active ? "#ffffff" : "";
        });
      });
    }, { threshold: 0.45 });

    sections.forEach(section => activeObserver.observe(section));
  }
})();
