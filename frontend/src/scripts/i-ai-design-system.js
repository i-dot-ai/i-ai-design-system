/*
 * Toggle enhancement module.
 *
 * Progressive enhancement for elements marked with
 * data-module="govuk-toggle". Without this script the control renders as a
 * plain, fully-functional checkbox (styled by toggle.css). With it, the
 * checkbox is upgraded into a sliding toggle:
 *
 *   - the input gains role="switch"
 *   - the input is wrapped in a .iai-toggle control
 *   - a decorative .iai-toggle__display track (handle + icons) is injected
 *
 * The enhanced appearance itself is gated in CSS on the
 * body.govuk-frontend-supported class (added by the page template), so this
 * script only builds the DOM the CSS needs.
 */

const CHECKMARK_SVG = '<svg aria-hidden="true" focusable="false" class="iai-toggle__icon iai-toggle__icon--checkmark" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.08471 10.6237L2.29164 6.83059L1 8.11313L6.08471 13.1978L17 2.28255L15.7175 1L6.08471 10.6237Z" fill="currentcolor" stroke="currentcolor"></path></svg>';

const CROSS_SVG = '<svg aria-hidden="true" focusable="false" class="iai-toggle__icon iai-toggle__icon--cross" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.167 0L6.5 4.667L1.833 0L0 1.833L4.667 6.5L0 11.167L1.833 13L6.5 8.333L11.167 13L13 11.167L8.333 6.5L13 1.833L11.167 0Z" fill="currentcolor"></path></svg>';

/**
 * Enhance a single toggle item.
 * @param {Element} item - element with data-module="govuk-toggle"
 */
function enhanceToggle(item) {
  if (item.dataset.toggleInitialised === 'true') {
    return;
  }

  const input = item.querySelector('.iai-toggle__input');
  if (!input) {
    return;
  }

  // Announce as a switch to assistive tech only once the visual switch exists.
  input.setAttribute('role', 'switch');

  /*
   * If the input is already inside a control wrapper, reuse it; otherwise
   * wrap it so the CSS has a .iai-toggle to key off.
   */
  let control = input.closest('.iai-toggle');
  if (!control) {
    control = document.createElement('div');
    control.className = 'iai-toggle';
    input.parentNode.insertBefore(control, input);
    control.appendChild(input);
  }

  // Inject the decorative track (handle + icons) if not already present.
  if (!control.querySelector('.iai-toggle__display')) {
    const display = document.createElement('span');
    display.className = 'iai-toggle__display';
    display.setAttribute('aria-hidden', 'true');
    display.innerHTML = `<span class="iai-toggle__handle"></span>${CHECKMARK_SVG}${CROSS_SVG}`;
    control.appendChild(display);
  }

  item.dataset.toggleInitialised = 'true';
}

/** Enhance all toggles on the page. */
export function initToggles() {
  document
    .querySelectorAll('[data-module="govuk-toggle"]')
    .forEach(enhanceToggle);
}

export function initAllIAIDesignSystem() {
  initToggles();
}
