document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = new URL(tabs[0].url);
      const urlParts = currentUrl.toString().toLowerCase().split(/[/?#]/); // Split URL into parts
      const videos = [
          {
              "keywords": ["google", "search", "engine"],
              "videoUrl": "http://box5193.temp.domains/~glofilin/wp-content/uploads/2024/02/Create-a-new-PR-SSP.mp4"
          },
          {
              "keywords": ["admin", "administration"],
              "videoUrl": "https://www.youtube.com/embed/4lKl7ZxIJlg"
          }
      ];

      let matchingEntry = null;
      let matchedKeywords = [];

      videos.forEach(entry => {
          entry.keywords.forEach(keyword => {
              if (urlParts.some(part => part.includes(keyword.toLowerCase()))) {
                  matchingEntry = entry;
                  matchedKeywords.push(keyword);
              }
          });
      });

      if (matchingEntry) {
          const videoUrl = matchingEntry.videoUrl;
          const width = document.getElementById('content').clientWidth;
          const height = Math.round((9 / 16) * width);
          const videoEmbedCode = `<iframe width="100%" height="${height}" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
          const keywords = matchedKeywords.join(', '); // Join matched keywords into a comma-separated string
          const videoElement = `<div>${videoEmbedCode}</div><div class="keyword">Keyword(s): ${keywords}</div>`;
          document.getElementById('content').innerHTML = videoElement;
      } else {
          const noMatchMessage = "No matching keyword found for this website.";
          document.getElementById('content').innerText = noMatchMessage;
          console.log(noMatchMessage);
      }
  });
});
