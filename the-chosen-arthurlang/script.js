console.log("The Chosen ArthurLang carregado.");

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn[data-tab]:not(.tab-btn-disabled)");
  const panels = document.querySelectorAll(".tab-panel");
  const homeHero = document.getElementById("home-hero");
  const HOME_TAB = "sobre";

  function activateTab(tabName) {
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    panels.forEach((panel) => {
      const isActive = panel.id === `tab-${tabName}`;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (homeHero) {
      homeHero.hidden = tabName !== HOME_TAB;
    }

    window.scrollTo(0, 0);
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // Efeito: a foto de capa vai sumindo (fade + leve zoom) conforme rola a página
  const heroMedia = document.getElementById("hero-media");
  const heroPhoto = document.getElementById("hero-photo");

  if (heroMedia && heroPhoto) {
    const fadeDistance = () => window.innerHeight * 0.9;

    function updateHeroFade() {
      const progress = Math.min(window.scrollY / fadeDistance(), 1);
      heroMedia.style.opacity = String(1 - progress);
      heroPhoto.style.transform = `scale(${1 + progress * 0.08})`;
    }

    updateHeroFade();
    window.addEventListener("scroll", updateHeroFade, { passive: true });
    window.addEventListener("resize", updateHeroFade);
  }


  // Cards da aba "Em breve": ainda não têm conteúdo, só um aviso de que está sendo feito
  const soonCards = document.querySelectorAll(".soon-card");
  const soonLabels = {
    fisico: "Evolução física",
    engajamento: "Engajamento & vídeos",
    programacao: "Programação",
  };

  function showSoonToast(key) {
    const existing = document.querySelector(".soon-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "soon-toast";
    toast.innerHTML = `<strong>${soonLabels[key] || "Essa área"}</strong> ainda não está pronta — sendo construída com calma. Em breve, sem enrolação.`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  soonCards.forEach((card) => {
    card.addEventListener("click", () => showSoonToast(card.dataset.soon));
  });
});