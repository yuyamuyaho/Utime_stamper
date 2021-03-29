$("#flexSwitchCheckDefault").change(function() {
    if(this.checked) 
    {
        chrome.runtime.sendMessage({greeting: "START"},
        function (response) {
            console.log(response.farewell);
        });
    }
    
    else
    {
        chrome.runtime.sendMessage({greeting: "FINISH"},
        function (response) {
            console.log(response.farewell);
        });
    }
});