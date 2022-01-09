let tabId;
let currentUrl = '';
chrome.webRequest.onCompleted.addListener(
  function(details) {
      const parsedUrl = new URL(details.url);
      if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
          chrome.tabs.sendMessage(tabId, {
              type: 'pageRendered'
          });
      }
  }, {
      urls: ['*://*.github.com/*']
  }
);
chrome.webNavigation.onHistoryStateUpdated.addListener(
  details => {
      tabId = details.tabId;
      currentUrl = details.url;
  }, {
      url: [{
          hostSuffix: 'github.com'
      }]
  }
);