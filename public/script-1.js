      if (typeof navigator.serviceWorker !== 'undefined') {
          navigator.serviceWorker.register('sw.js')
      }

// main.js

let installPrompt = null;
const installButton = document.querySelector(".install");
var pwaInstall = document.getElementsByTagName('pwa-install')[0];


window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  pwaInstall.install();
  installButton.classList.remove("hidden");
  //installButton.removeAttribute("hidden");
});

// main.js

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.classList.add("hidden");
  //installButton.setAttribute("hidden", "");
}

// main.js

window.addEventListener("appinstalled", () => {
  disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.classList.add("hidden");
  //installButton.setAttribute("hidden", "");
}
