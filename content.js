// content.js
chrome.runtime.sendMessage({ command: "fetchVideoData" }, response => {
    if (response.success) {
      const videos = response.data;
      const currentUrl = new URL(window.location.href);
      const domain = currentUrl.hostname.toLowerCase();
      let matchingEntry = null;
  
      videos.forEach(entry => {
        entry.keywords.forEach(keyword => {
          if (domain.includes(keyword.toLowerCase())) {
            matchingEntry = entry;
          }
        });
      });
  
      if (matchingEntry) {
        const videoUrl = matchingEntry.videoUrl;
        const videoEmbedCode = `<iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
        document.body.innerHTML = videoEmbedCode;
      } else {
        console.log('No matching entry found.');
      }
    } else {
      console.error('Error fetching video data:', response.error);
    }
  });
  