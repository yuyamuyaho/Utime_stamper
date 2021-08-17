let enabled = true;

chrome.storage.local.get("enabled", (data) => {
    enabled = data.enabled;
    if (enabled) {
        $("#flexSwitchCheckDefault").prop("checked", true);
    }
});

$("#flexSwitchCheckDefault").change(function () {
    enabled = this.checked;
    chrome.storage.local.set({ enabled: enabled });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "TOGGLE" });
    });
});