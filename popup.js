$("#flexSwitchCheckDefault").change(function() {
    if(this.checked) 
    {
        chrome.runtime.sendMessage({action: "START"}, function(response)
        {

        });
    }
    else
    {
        chrome.runtime.sendMessage({action: "FINISH"}, function(response)
        {

        });
    }
});