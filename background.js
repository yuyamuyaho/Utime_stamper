status = false;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
                  
      if (request.greeting == "START")
      {
        sendResponse({farewell: "hi"});
        status = true;
        
        // chrome.tabs.getSelected(null, function(tab) {
        //   chrome.tabs.sendMessage(tab.id, {greeting: "on"}, function(response) {
        //     console.log(response.farewell);
        //   });
        // });

        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     console.log(tabs);
        //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "on"}, function(response) {
        //       console.log(response.farewell);
        //     });
        // });
      }

      else if (request.greeting == "FINISH")
      {
        sendResponse({farewell: "goodbye"});
        status = false;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "off"}, function(response) {
              console.log(response.farewell);
            });
        });
      }
    }
);

chrome.tabs.onCreated.addListener(
  function(tab) {
    console.log("created" + tab);
                
    if (status)
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {greeting: "on"}, function(response) {
            console.log(response.farewell);
          });
      });
    }

    else 
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {greeting: "off"}, function(response) {
            console.log(response.farewell);
          });
      });
    }
  }
);