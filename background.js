chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    const headers = details.responseHeaders.filter(header => {
      if (
        header.name.toLowerCase() === 'set-cookie' &&
        header.value.toLowerCase().includes('whmcsaffiliateid=')
      ) {
        // 过滤掉这个 Cookie，不返回到浏览器
        console.log(`Blocked WHMCSAffiliateID cookie from: ${details.url}`);
        return false;
      }
      return true;
    });

    return { responseHeaders: headers };
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame"]
  },
  ["blocking", "responseHeaders"]
);
