browser.browserAction.onClicked.addListener(async (tab) => {
  try {
    const config = await browser.storage.sync.get(["apiUrl", "token", "selectedSpace"]);
    const missingKeys = getMissingConfigKeys(config, ["apiUrl", "token", "selectedSpace"]);

    if (missingKeys.length) {
      console.error(`Missing config: ${missingKeys.join(', ')}`);
      return;
    }

    const { apiUrl, token, selectedSpace } = config;
    const payload = buildPayload(tab);
    const endpoint = `${apiUrl}/v1/spaces/${selectedSpace.spaceId}/objects`;

    const success = await sendToApi(endpoint, token, payload);

    if (success) {
      console.log("URL sent successfully!");
    }
  } catch (err) {
    sendNotification("Failed to send to Anytype", "Is Anytype open? Is the add-on configuration correct?");
    console.error("Unexpected error:", err);
  }
});

async function sendNotification(title, content){
  browser.notifications.create({
    type: "basic",
    iconUrl: "icons/icon@2x.png",
    title: title,
    message: content,
});
}

function getMissingConfigKeys(config, requiredKeys) {
  return requiredKeys.filter((key) => !config[key]);
}

function buildPayload(tab) {
  return {
    name: tab.title || "My object",
    properties: [
      { key: "source", url: tab.url }
    ],
    type_key: "bookmark"
  };
}

async function sendToApi(url, token, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to send URL:", response.status, errorText);
    return false;
  }

  return true;
}
