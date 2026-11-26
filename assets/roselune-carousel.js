class RoseluneRail extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector('.roselune-track');
    this.controls = this.querySelector('.roselune-controls');
    if (!this.controls || !this.track.firstElementChild) return;
    this.events = new AbortController();
    const options = { signal: this.events.signal };
    this.prev = this.controls.querySelector('[data-roselune-prev]');
    this.next = this.controls.querySelector('[data-roselune-next]');
    this.output = this.controls.querySelector('output');
    this.prev?.addEventListener('click', () => this.move(-1), options);
    this.next?.addEventListener('click', () => this.move(1), options);
    this.track.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); this.move(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); this.move(1); }
    }, options);
    this.track.addEventListener('scroll', () => this.update(), { ...options, passive: true });
    this.addEventListener('shopify:block:select', event => {
      event.target.closest('li')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }, options);
    this.observer = new ResizeObserver(() => this.update());
    this.observer.observe(this.track);
    this.update();
  }

  get step() {
    return this.track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(this.track).columnGap);
  }

  update() {
    const distance = this.track.scrollWidth - this.track.clientWidth;
    const offset = Math.abs(this.track.scrollLeft);
    this.controls.hidden = distance <= 2 || !this.controls.children.length;
    if (this.prev) this.prev.disabled = offset <= 2;
    if (this.next) this.next.disabled = offset >= distance - 2;
    if (this.output && this.step > 0) {
      const total = Math.round(distance / this.step) + 1;
      this.output.textContent = (Math.min(total, Math.round(offset / this.step) + 1)) + ' / ' + total;
    }
  }

  move(direction) {
    const rtl = getComputedStyle(this.track).direction === 'rtl';
    this.track.scrollBy({ left: this.step * direction * (rtl ? -1 : 1),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  disconnectedCallback() {
    this.events?.abort();
    this.observer?.disconnect();
  }
}
if (!customElements.get('roselune-rail')) customElements.define('roselune-rail', RoseluneRail);
