import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: "ELN Stream Tools",
    permissions: [
      'scripting',
      'tabs',
      'activeTab'
    ],
    host_permissions: [
      "http://wattpad.com/*",
      "https://wattpad.com/*",
      "http://www.wattpad.com/*",
      "https://www.wattpad.com/*"
    ],
  }
});
