import { Controller } from '@hotwired/stimulus';
import autosize from 'autosize';
import { debounce } from '../utils/debounce';

/**
 * Adds the ability for a text area element to be auto-sized as the user
 * types in the field so that it expands to show all content.
 *
 * @example
 * <textarea data-controller="w-autosize"></textarea>
 */

export default class AutosizeController extends Controller<HTMLTextAreaElement> {
  resizeObserver?: ResizeObserver;

  resize() {
    autosize.update(this.textareaTarget);
  }

  initialize() {
    this.resize = debounce(this.resize.bind(this), 50);
  }

  connect() {
    autosize(this.textareaTarget);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(this.textareaTarget);
  }

  disconnect() {
    this.resizeObserver?.disconnect();
    autosize.destroy(this.textareaTarget);
  }

  get textareaTarget(): HTMLTextAreaElement {
    return this.element.querySelector(
      '[data-w-autosize-target="textarea"]',
    ) as HTMLTextAreaElement;
  }
}
