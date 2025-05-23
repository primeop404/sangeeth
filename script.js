// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading screen
  const loadingScreen = document.querySelector('.loading');
  
  // Hide loading screen after content loaded
  window.addEventListener('load', () => {
      setTimeout(() => {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
              loadingScreen.style.display = 'none';
          }, 500);
      }, 500);
  });

  // Mouse move effect for background gradient
  document.addEventListener('mousemove', (e) => {
      // Throttle the event for better performance
      if (!document.mouseThrottleTimeout) {
          document.mouseThrottleTimeout = setTimeout(() => {
              document.mouseThrottleTimeout = null;
              
              // Calculate mouse position as CSS variables
              const x = e.clientX;
              const y = e.clientY;
              document.body.style.setProperty('--x', `${x}px`);
              document.body.style.setProperty('--y', `${y}px`);
          }, 10); // Update every 10ms for smooth effect
      }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('nav');
  const scrollThreshold = 50;
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
      hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
          // Prevent scrolling when menu is open
          document.body.classList.toggle('no-scroll');
      });
  }
  
  // Close mobile menu when clicking a nav link
  const mobileNavLinks = document.querySelectorAll('.nav-links a');
  mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (hamburger && hamburger.classList.contains('active')) {
              hamburger.classList.remove('active');
              navLinks.classList.remove('active');
              document.body.classList.remove('no-scroll');
          }
      });
  });

  // Initialize GSAP & ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate section titles
      gsap.utils.toArray('.section-title').forEach(title => {
          gsap.from(title, {
              opacity: 0,
              y: 30,
              scrollTrigger: {
                  trigger: title,
                  start: 'top 80%',
                  toggleClass: 'visible',
                  toggleActions: 'play none none reverse'
              }
          });
      });
      
      // Staggered animation for skill cards
      const skillCards = gsap.utils.toArray('.skill-card');
      if (skillCards.length > 0) {
          gsap.from(skillCards, {
              opacity: 0,
              y: 30,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                  trigger: '.skills-grid',
                  start: 'top 80%',
                  toggleClass: {targets: skillCards, className: 'visible'},
                  once: false
              }
          });
      }
      
      // Staggered animation for work cards
      const workCards = gsap.utils.toArray('.work-card');
      if (workCards.length > 0) {
          gsap.from(workCards, {
              opacity: 0,
              scale: 0.95,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                  trigger: '.works-grid',
                  start: 'top 80%',
                  toggleClass: {targets: workCards, className: 'visible'},
                  once: false
              }
          });
      }
  } else {
      // Fallback animation using Intersection Observer if GSAP is not available
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      }, observerOptions);
      
      // Observe all animated elements
      document.querySelectorAll('.section-title, .skill-card, .work-card, .reveal').forEach(el => {
          observer.observe(el);
      });
  }

  // Scroll progress indicator
  const scrollProgress = document.querySelector('.scroll-progress');
  
  window.addEventListener('scroll', () => {
      const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (windowScroll / height) * 100;
      
      if (scrollProgress) {
          scrollProgress.style.width = `${scrolled}%`;
      }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Account for fixed header
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Optional: Dark Mode Toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
      // Check for saved dark mode preference
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      
      // Apply saved preference
      if (isDarkMode) {
          document.body.classList.add('dark-mode');
      }
      
      darkModeToggle.addEventListener('click', () => {
          document.body.classList.toggle('dark-mode');
          // Save preference
          localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      });
  }
  
  // Optional: Custom cursor effect (uncomment if needed)
  
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  const cursorFollower = document.createElement('div');
  cursorFollower.classList.add('cursor-follower');
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);
  
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      setTimeout(() => {
          cursorFollower.style.left = `${e.clientX}px`;
          cursorFollower.style.top = `${e.clientY}px`;
      }, 80);
  });
  
  document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.6)';
  });
  
  document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
  
  // Enlarge cursor on clickable elements
  document.querySelectorAll('a, button, .clickable').forEach(el => {
      el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      
      el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
  });
  
  
  // Form validation (for contact form)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Basic validation
          let isValid = true;
          const inputs = contactForm.querySelectorAll('input, textarea');
          
          inputs.forEach(input => {
              if (input.required && !input.value.trim()) {
                  isValid = false;
                  input.classList.add('error');
              } else {
                  input.classList.remove('error');
              }
              
              // Email validation
              if (input.type === 'email' && input.value) {
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailPattern.test(input.value)) {
                      isValid = false;
                      input.classList.add('error');
                  }
              }
          });
          
          if (isValid) {
              // Form is valid, handle submission
              // This is where you'd typically send the data to a server
              const submitButton = contactForm.querySelector('button[type="submit"]');
              const originalText = submitButton.textContent;
              
              submitButton.disabled = true;
              submitButton.textContent = 'Sending...';
              
              // Simulate form submission (replace with actual AJAX call)
              setTimeout(() => {
                  // Success state
                  submitButton.textContent = 'Message Sent!';
                  contactForm.reset();
                  
                  // Reset button after delay
                  setTimeout(() => {
                      submitButton.disabled = false;
                      submitButton.textContent = originalText;
                  }, 3000);
              }, 1500);

              // Send message to Discord using webhook
              const webhookUrl = 'https://ptb.discord.com/api/webhooks/1342108788273971280/2QWwXLM5RZsYrmrfUaHBdKQXVxI-PxAFfEIzI8pGNv5TkKWcYgARSclvP-cBEu7ENBz9';
              const name = document.getElementById('name').value;
              const email = document.getElementById('email').value;
              const message = document.getElementById('message').value;

              const embed = {
                  title: "New Contact Form Submission",
                  color: 5814783,
                  fields: [
                      { name: "Name", value: name, inline: true },
                      { name: "Email", value: email, inline: true },
                      { name: "Message", value: message }
                  ]
              };

              fetch(webhookUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ embeds: [embed] })
              }).then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  console.log('Message sent to Discord');
              }).catch(error => {
                  console.error('Error sending message to Discord:', error);
              });
          }
      });
  }
  
  // Lazy loading images for performance
  if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll('img').forEach(img => {
          img.setAttribute('loading', 'lazy');
      });
  } else {
      // Fallback for browsers that don't support lazy loading
      // Load a lazy loading library dynamically if needed
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      if (lazyImages.length > 0) {
          const lazyLoadObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      lazyLoadObserver.unobserve(img);
                  }
              });
          });
          
          lazyImages.forEach(img => {
              lazyLoadObserver.observe(img);
          });
      }
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('click-sound');
    const hoverSound = document.getElementById('hover-sound');

    document.querySelectorAll('[data-sound="click"]').forEach(element => {
        element.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    document.querySelectorAll('[data-sound="hover"]').forEach(element => {
        element.addEventListener('mouseenter', () => { // Changed from mouseover to mouseenter
            hoverSound.currentTime = 0;
            hoverSound.play();
            hoverSound.volume = 0.1;
            element.addEventListener('mouseleave', () => {
                hoverSound.volume = 0;
            });
        });
    });
});

document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', function() {
        document.getElementById('zoomed-img').src = this.src;
        document.getElementById('zoom-overlay').classList.add('visible');
        document.body.classList.add('no-scroll');
    });
});

document.getElementById('zoom-overlay').addEventListener('click', function() {
    this.classList.remove('visible');
    document.body.classList.remove('no-scroll');
});


// Category filtering for works section
const categoryButtons = document.querySelectorAll('.category-btn');
const workCards = document.querySelectorAll('.work-card');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get selected category
    const selectedCategory = button.getAttribute('data-category');
    
    // Filter work cards
    workCards.forEach(card => {
      if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    
    // Trigger resize event to fix any layout issues
    window.dispatchEvent(new Event('resize'));
  });
});