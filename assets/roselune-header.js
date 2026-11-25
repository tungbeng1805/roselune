import { calculateHeaderGroupHeight } from '@theme/utilities';

class RoseluneHeader extends HTMLElement {
  connectedCallback() {
    this.events = new AbortController();
    const options = { signal: this.events.signal };
    const disclosures = this.querySelectorAll('.roselune-nav details, .roselune-region details');
    const closeOutside = event => {
      for (const details of disclosures) {
        if (!details.contains(event.target)) details.open = false;
      }
    };
    document.addEventListener('pointerdown', closeOutside, options);
    document.addEventListener('focusin', closeOutside, options);
    this.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const disclosure = event.target.closest('.roselune-nav details[open], .roselune-region details[open]');
      if (disclosure) {
        disclosure.open = false;
        disclosure.querySelector('summary').focus();
      }
    }, options);

    const group = this.closest('#header-group');
    const measure = () => {
      document.body.style.setProperty('--header-height', this.offsetHeight + 'px');
      document.body.style.setProperty('--header-group-height', calculateHeaderGroupHeight(this, group) + 'px');
    };
    this.sizeObserver = new ResizeObserver(measure);
    const observeSections = () => {
      this.sizeObserver.disconnect();
      this.sizeObserver.observe(this);
      for (const child of group.children) this.sizeObserver.observe(child);
      measure();
    };
    if (group) {
      observeSections();
      this.groupObserver = new MutationObserver(observeSections);
      this.groupObserver.observe(group, { childList: true });
    }
    if (this.hasAttribute('data-roselune-sticky')) {
      this.stickyObserver = new IntersectionObserver(([entry]) => {
        this.dataset.stickyState = entry.boundingClientRect.top < 0 ? 'active' : 'inactive';
      }, { threshold: 1 });
      this.stickyObserver.observe(this);
    }
  }

  disconnectedCallback() {
    this.events?.abort();
    this.sizeObserver?.disconnect();
    this.groupObserver?.disconnect();
    this.stickyObserver?.disconnect();
  }
}
if (!customElements.get('roselune-header')) customElements.define('roselune-header', RoseluneHeader);
