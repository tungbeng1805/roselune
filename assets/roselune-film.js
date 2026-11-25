class RoseluneFilm extends HTMLElement {
  connectedCallback() {
    this.controls = this.querySelector('.roselune-film-controls');
    if (!this.controls) return;
    this.events = new AbortController();
    const options = { signal: this.events.signal };
    this.playButton = this.controls.querySelector('[data-roselune-play]');
    this.showPlay = !this.playButton.hidden;
    this.audioButton = this.controls.querySelector('[data-roselune-audio]');
    this.mobile = matchMedia('(max-width: 749px)');
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.mobile.addEventListener('change', () => {
      if (!this.observer) this.selectSource();
    }, options);
    this.reduced.addEventListener('change', () => {
      if (this.reduced.matches) this.video?.pause();
    }, options);
    this.playButton.addEventListener('click', () => {
      if (this.video.paused) this.play();
      else this.video.pause();
    }, options);
    this.audioButton?.addEventListener('click', () => {
      this.video.muted = !this.video.muted;
    }, options);
    if (this.hasAttribute('data-roselune-defer')) {
      this.observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        this.observer.disconnect();
        this.observer = null;
        this.selectSource();
      }, { rootMargin: '200px' });
      this.observer.observe(this);
    } else {
      this.selectSource();
    }
  }

  selectSource() {
    const desktop = this.querySelector('template[data-roselune-desktop]');
    const mobile = this.querySelector('template[data-roselune-mobile]');
    const source = this.mobile.matches ? (mobile || desktop) : desktop;
    if (this.source === source) return;
    this.release();
    this.source = source;
    this.controls.hidden = true;
    const sourceVideo = source?.content.querySelector('video');
    if (!sourceVideo) return;
    const video = sourceVideo.cloneNode(true);
    this.video = video;
    video.muted = true;
    video.controls = !this.showPlay;
    this.playButton.textContent = this.playButton.dataset.play;
    this.audioButton?.setAttribute('aria-pressed', 'false');
    video.addEventListener('play', () => {
      this.playButton.textContent = this.playButton.dataset.pause;
    });
    video.addEventListener('playing', () => {
      video.setAttribute('data-roselune-visible', '');
    }, { once: true });
    video.addEventListener('pause', () => {
      this.playButton.textContent = this.playButton.dataset.play;
    });
    video.addEventListener('volumechange', () => {
      this.audioButton?.setAttribute('aria-pressed', String(!video.muted));
    });
    video.addEventListener('error', () => {
      if (this.video === video) { this.controls.hidden = true; this.release(); }
    }, { once: true });
    this.insertBefore(video, this.controls);
    this.controls.hidden = false;
    this.playButton.hidden = !this.showPlay;
    if (this.hasAttribute('data-roselune-autoplay') && !this.reduced.matches) {
      this.play();
    }
  }

  play() {
    const video = this.video;
    video.play().catch(() => {
      if (video === this.video) this.playButton.hidden = false;
    });
  }

  release() {
    if (!this.video) return;
    const video = this.video;
    this.video = null;
    video.pause();
    video.remove();
    video.querySelectorAll('source').forEach(source => source.remove());
    video.removeAttribute('src');
    video.load();
  }

  disconnectedCallback() {
    this.events?.abort();
    this.observer?.disconnect();
    this.observer = null;
    this.source = undefined;
    this.release();
  }
}
if (!customElements.get('roselune-film')) customElements.define('roselune-film', RoseluneFilm);
