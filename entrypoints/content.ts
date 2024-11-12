export default defineContentScript({
  matches: ['*://*.wattpad.com/*'],
  main() {
    console.log('Hello content.');
  },
});
