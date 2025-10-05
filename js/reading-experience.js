/* Reading Experience Enhancements
   Making the interface disappear into pure content */

class ReadingExperience {
  constructor() {
    this.initProgressBar();
    this.initFocusMode();
    this.initSmoothScroll();
    this.initSmartQuotes();
    this.initImageEnhancements();
    this.initReadingTime();
    this.initKeyboardShortcuts();
    this.initPrefetch();
  }

  // ═══════════════════════════════════════════════════════════════════
  // READING PROGRESS INDICATOR
  // ═══════════════════════════════════════════════════════════════════

  initProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const bar = progressBar.querySelector('.reading-progress-bar');
    let ticking = false;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      bar.style.transform = `scaleX(${progress / 100})`;
      
      // Show/hide based on scroll position
      if (scrolled > 100) {
        progressBar.classList.add('visible');
      } else {
        progressBar.classList.remove('visible');
      }
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
        setTimeout(() => ticking = false, 100);
      }
    };

    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', updateProgress);
  }

  // ═══════════════════════════════════════════════════════════════════
  // FOCUS MODE - Highlight Current Paragraph
  // ═══════════════════════════════════════════════════════════════════

  initFocusMode() {
    let focusMode = false;
    let currentParagraph = null;

    const toggleFocusMode = () => {
      focusMode = !focusMode;
      document.body.classList.toggle('focus-mode');
      
      if (focusMode) {
        trackReading();
        this.showToast('Focus mode enabled (ESC to exit)');
      } else {
        if (currentParagraph) {
          currentParagraph.classList.remove('in-focus');
        }
        this.showToast('Focus mode disabled');
      }
    };

    const trackReading = () => {
      if (!focusMode) return;

      const paragraphs = document.querySelectorAll('.content p, .content blockquote');
      const viewportMiddle = window.innerHeight / 2;

      paragraphs.forEach(p => {
        const rect = p.getBoundingClientRect();
        const paragraphMiddle = rect.top + rect.height / 2;
        
        if (Math.abs(paragraphMiddle - viewportMiddle) < 100) {
          if (currentParagraph && currentParagraph !== p) {
            currentParagraph.classList.remove('in-focus');
          }
          p.classList.add('in-focus');
          currentParagraph = p;
        }
      });

      requestAnimationFrame(trackReading);
    };

    // Add focus mode button
    const button = document.createElement('button');
    button.className = 'focus-mode-toggle';
    button.innerHTML = '👁';
    button.title = 'Toggle focus mode (F)';
    button.addEventListener('click', toggleFocusMode);
    document.body.appendChild(button);

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          toggleFocusMode();
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SMOOTH SCROLL WITH MOMENTUM
  // ═══════════════════════════════════════════════════════════════════

  initSmoothScroll() {
    // Internal links only
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 80; // Header height
          const position = target.getBoundingClientRect().top + window.scrollY - offset;
          
          window.scrollTo({
            top: position,
            behavior: 'smooth'
          });

          // Add brief highlight
          target.classList.add('highlight');
          setTimeout(() => target.classList.remove('highlight'), 2000);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SMART TYPOGRAPHY
  // ═══════════════════════════════════════════════════════════════════

  initSmartQuotes() {
    const replaceQuotes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent
          .replace(/(\W|^)"(\S)/g, '$1"$2') // Opening doubles
          .replace(/(\S)"(\W|$)/g, '$1"$2') // Closing doubles
          .replace(/(\W|^)'(\S)/g, '$1'$2') // Opening singles
          .replace(/(\S)'(\W|$)/g, '$1'$2') // Closing singles
          .replace(/--/g, '—') // Em dashes
          .replace(/\.\.\./g, '…') // Ellipsis
          .replace(/(\d+)x(\d+)/g, '$1×$2'); // Multiplication sign
      }
    };

    const processNode = (node) => {
      if (node.tagName === 'CODE' || node.tagName === 'PRE') return;
      
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          replaceQuotes(child);
        } else {
          processNode(child);
        }
      });
    };

    document.querySelectorAll('.content').forEach(processNode);
  }

  // ═══════════════════════════════════════════════════════════════════
  // IMAGE ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════

  initImageEnhancements() {
    // Progressive loading with blur-up
    const images = document.querySelectorAll('.content img');
    
    images.forEach(img => {
      // Add loading class
      img.classList.add('loading');
      
      // Create low-quality placeholder
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      
      // Load high-quality version
      if (img.complete) {
        img.classList.remove('loading');
      } else {
        img.addEventListener('load', () => {
          img.classList.remove('loading');
          img.classList.add('loaded');
        });
      }

      // Zoom on click
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
          overlay.remove();
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // READING TIME ESTIMATION
  // ═══════════════════════════════════════════════════════════════════

  initReadingTime() {
    const content = document.querySelector('.content');
    if (!content) return;

    const text = content.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    const indicator = document.createElement('div');
    indicator.className = 'reading-time';
    indicator.textContent = `${readingTime} min read`;
    
    const header = document.querySelector('.post-header, .site-header');
    if (header) {
      header.appendChild(indicator);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════════════

  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Skip if in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch(e.key) {
        case 'j': // Scroll down
          window.scrollBy({ top: 100, behavior: 'smooth' });
          break;
        case 'k': // Scroll up
          window.scrollBy({ top: -100, behavior: 'smooth' });
          break;
        case 'g': // Go to top
          if (e.shiftKey) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;
        case 'd': // Toggle dark mode
          document.body.classList.toggle('dark-mode');
          localStorage.setItem('theme', 
            document.body.classList.contains('dark-mode') ? 'dark' : 'light'
          );
          break;
        case '?': // Show help
          this.showKeyboardHelp();
          break;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // PREFETCH LINKS ON HOVER
  // ═══════════════════════════════════════════════════════════════════

  initPrefetch() {
    const prefetched = new Set();

    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (!prefetched.has(href)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
          prefetched.add(href);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('visible'), 100);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  showKeyboardHelp() {
    const help = document.createElement('div');
    help.className = 'keyboard-help';
    help.innerHTML = `
      <div class="keyboard-help-content">
        <h3>Keyboard Shortcuts</h3>
        <dl>
          <dt>j</dt><dd>Scroll down</dd>
          <dt>k</dt><dd>Scroll up</dd>
          <dt>g</dt><dd>Go to top</dd>
          <dt>G</dt><dd>Go to bottom</dd>
          <dt>f</dt><dd>Toggle focus mode</dd>
          <dt>d</dt><dd>Toggle dark mode</dd>
          <dt>?</dt><dd>Show this help</dd>
          <dt>ESC</dt><dd>Close dialogs</dd>
        </dl>
        <p>Click anywhere to close</p>
      </div>
    `;
    
    document.body.appendChild(help);
    help.addEventListener('click', () => help.remove());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') help.remove();
    }, { once: true });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ReadingExperience());
} else {
  new ReadingExperience();
}