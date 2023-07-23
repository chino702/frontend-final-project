import { JSDOM } from 'jsdom';
import { setDarkMode } from './script';

describe('setDarkMode function', () => {
  test('should toggle the dark-mode class on the body element and update the text content of the darkModeToggle element', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <div class="wrapper">
            <button id="darkModeToggle">Toggle Dark Mode</button>
          </div>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    global.window = dom.window;

    const darkModeToggle = document.querySelector('#darkModeToggle');

    // Set the initial mode to false (light mode)
    setDarkMode(false);

    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(darkModeToggle.textContent).toBe('Dark Mode');

    // Toggle the mode and check if the class and text content are updated
    darkModeToggle.click();

    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(darkModeToggle.textContent).toBe('Light Mode');
  });
});