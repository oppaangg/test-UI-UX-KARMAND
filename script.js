// Navbar background on scroll with smooth transitions and logo change
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const logoImg = navbar.querySelector(".logo-img");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    if (logoImg) logoImg.src = "logo-2.png";
  } else {
    navbar.classList.remove("scrolled");
    if (logoImg) logoImg.src = "logo-karmand.png";
  }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Mobile dropdown toggle for product catalog
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
dropdownMenus.forEach((menu) => {
  const toggle = menu.querySelector(".dropdown-toggle");
  if (toggle && window.innerWidth <= 768) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      menu.classList.toggle("active");
    });
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && mobileMenuToggle) {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      dropdownMenus.forEach((menu) => menu.classList.remove("active"));
      const spans = mobileMenuToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  }
});

// Close mobile menu when clicking on a link (but not dropdown toggle)
const navLinks = document.querySelectorAll(".nav-menu > li > a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      // Don't close menu if clicking on dropdown toggle
      if (!link.classList.contains("dropdown-toggle")) {
        navMenu.classList.remove("active");
        dropdownMenus.forEach((menu) => menu.classList.remove("active"));
        if (mobileMenuToggle) {
          const spans = mobileMenuToggle.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
        }
      }
    }
  });
});

// Close dropdown when clicking on a dropdown item
const dropdownLinks = document.querySelectorAll(".dropdown a");
dropdownLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      dropdownMenus.forEach((menu) => menu.classList.remove("active"));
      navMenu.classList.remove("active");
      if (mobileMenuToggle) {
        const spans = mobileMenuToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    }
  });
});

// Form submission handling - Send to database via API
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable submit button while processing
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN":
            document.querySelector('meta[name="csrf-token"]')?.content || "",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        alert(
          data.message ||
            "Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda."
        );
        contactForm.reset();
      } else {
        alert("Error: " + (data.message || "Gagal mengirim pesan"));
        console.error("Validation errors:", data.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Newsletter form handling
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Terima kasih telah berlangganan! Anda akan menerima update terbaru dari kami."
    );
    this.reset();
  });
}

// Blog category filter
const categoryButtons = document.querySelectorAll(".category-btn");
const blogCards = document.querySelectorAll(".blog-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    // Filter blog cards
    blogCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "flex";
        card.style.animation = "fadeInUp 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Job filter
const filterButtons = document.querySelectorAll(".filter-btn");
const jobCards = document.querySelectorAll(".job-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const department = button.getAttribute("data-department");

    // Filter job cards
    jobCards.forEach((card) => {
      if (
        department === "all" ||
        card.getAttribute("data-department") === department
      ) {
        card.style.display = "flex";
        card.style.animation = "fadeInUp 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Application Modal
const modal = document.getElementById("applicationModal");
const closeModal = document.querySelector(".close-modal");
const applicationForm = document.getElementById("applicationForm");

function openApplicationModal(position) {
  document.getElementById("positionName").textContent = position;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

if (closeModal) {
  closeModal.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  // Close product modal when clicking outside
  const productModal = document.getElementById("productModal");
  if (productModal && event.target == productModal) {
    closeProductModal();
  }
};

if (applicationForm) {
  applicationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Terima kasih! Lamaran Anda telah diterima. Tim HR kami akan menghubungi Anda segera."
    );
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    this.reset();
  });
}

// Product Detail Modal Functions
function openProductModal(
  name,
  description,
  composition,
  physicalProps,
  usage,
  applications,
  packaging,
  tokopediaLink,
  shopeeLink,
  imagePath
) {
  const modal = document.getElementById("productModal");

  // Get the icon/image from the clicked card
  const cards = document.querySelectorAll(".product-card-compact");
  let productIcon = "🧪";
  let hasImage = false;
  let imgSrc = null;

  cards.forEach((card) => {
    if (card.querySelector("h3").textContent === name) {
      const img = card.querySelector(".product-image");
      if (img && img.style.display !== "none" && img.complete) {
        imgSrc = img.src;
        hasImage = true;
      } else {
        const icon = card.querySelector(".product-icon, .product-icon-fallback");
        if (icon) productIcon = icon.textContent;
      }
    }
  });

  // Set modal icon/image
  const modalIcon = document.getElementById("modalIcon");
  
  // Prioritas: imagePath parameter > imgSrc dari card > icon emoji
  if (imagePath) {
    modalIcon.innerHTML = `<img src="${imagePath}" alt="${name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
  } else if (hasImage && imgSrc) {
    modalIcon.innerHTML = `<img src="${imgSrc}" alt="${name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
  } else {
    modalIcon.textContent = productIcon;
  }

  // Set modal content
  document.getElementById("modalProductName").textContent = name;
  document.getElementById("modalProductDescription").textContent = description;
  document.getElementById("modalComposition").textContent = composition;
  document.getElementById("modalPhysicalProperties").textContent =
    physicalProps;
  document.getElementById("modalUsage").textContent = usage;
  // document.getElementById('modalApplications').textContent = applications;
  // document.getElementById('modalPackaging').textContent = packaging;

  // Create WhatsApp message
  const waMessage = encodeURIComponent(
    `Halo, saya tertarik dengan produk *${name}*. Bisa tolong berikan informasi lebih lanjut?`
  );
  const waNumber = "6281353468612";
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  // Set purchase links
  document.getElementById("whatsappLink").href = waLink;
  document.getElementById("tokopediaLink").href = tokopediaLink;
  document.getElementById("shopeeLink").href = shopeeLink;

  // Show modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Setup close modal button with event stopping
document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      closeProductModal();
    });
  });
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeProductModal();
    const appModal = document.getElementById("applicationModal");
    if (appModal) {
      appModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
});

// Intersection Observer untuk animasi scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Animate service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate product cards
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate portfolio items
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "scale(0.9)";
    item.style.transition = "all 0.8s ease";
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Animate stats
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.8s ease";
    item.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(item);
  });
});

// Counter animation for stats
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 30);
};

// Trigger counter animation when stats are visible
const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.textContent);
        animateCounter(entry.target, target);
        entry.target.dataset.animated = "true";
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((stat) => {
  statsObserver.observe(stat);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Ensure purchase buttons reliably open links and don't get blocked by modal click handlers
document.addEventListener("DOMContentLoaded", () => {
  const setupPurchaseLink = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        window.open(href, "_blank");
      }
    });
  };

  setupPurchaseLink("whatsappLink");
  setupPurchaseLink("tokopediaLink");
  setupPurchaseLink("shopeeLink");
});

// Hero slider functionality (dynamic dots, background per-slide, swipe support)
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");
  const dotsContainer = slider.querySelector(".slider-dots");
  let dots = [];
  let current = 0;
  const total = slides.length;
  let interval = null;
  const delay = 6000;

  // apply background images (from data-bg) and ensure stacking
  slides.forEach((s, i) => {
    const bg = s.getAttribute("data-bg");
    if (bg) {
      // set CSS variable used by pseudo-element for background image
      s.style.setProperty("--bg-url", `url('${bg}')`);
    }
    // ensure slides stacked absolutely
    s.style.position = "absolute";
    s.style.left = "0";
    s.style.top = "0";
    s.style.right = "0";
    s.style.bottom = "0";
  });

  // build dots dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = "dot";
      btn.setAttribute("data-index", i);
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      dotsContainer.appendChild(btn);
      dots.push(btn);
    });
  }

  const goTo = (index) => {
    slides.forEach((s, i) => {
      const isActive = i === index;
      s.classList.toggle("active", isActive);
      s.setAttribute("aria-hidden", (!isActive).toString());
      s.style.zIndex = isActive ? 3 : 1;
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-selected", (i === index).toString());
    });
    current = index;
  };

  const next = () => goTo((current + 1) % total);
  const prev = () => goTo((current - 1 + total) % total);

  nextBtn &&
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      next();
      reset();
    });
  prevBtn &&
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
      reset();
    });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(dot.getAttribute("data-index")) || 0;
      goTo(idx);
      reset();
    });
  });

  // swipe support for touch devices
  let touchStartX = 0;
  let touchDeltaX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchDeltaX = 0;
        stop();
      }
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches && e.touches.length === 1) {
        touchDeltaX = e.touches[0].clientX - touchStartX;
      }
    },
    { passive: true }
  );

  slider.addEventListener("touchend", () => {
    const threshold = 50; // px
    if (touchDeltaX > threshold) {
      prev();
      reset();
    } else if (touchDeltaX < -threshold) {
      next();
      reset();
    }
    touchStartX = 0;
    touchDeltaX = 0;
    start();
  });

  const start = () => {
    if (interval) return;
    interval = setInterval(next, delay);
  };

  const stop = () => {
    if (!interval) return;
    clearInterval(interval);
    interval = null;
  };

  const reset = () => {
    stop();
    start();
  };

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  // keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      next();
      reset();
    }
    if (e.key === "ArrowLeft") {
      prev();
      reset();
    }
  });

  // init
  goTo(0);
  start();
});
