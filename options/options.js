document.getElementById("saveSettings").addEventListener("click", async () => {
  const apiUrl = getInputValue("apiUrl");
  const token = getInputValue("token");

  if (!apiUrl || !token) {
    showAnytypeStatus("Please enter both API URL and the API token.", true);
    return;
  }

  try {
    await browser.storage.sync.set({ apiUrl, token });
    showAnytypeStatus("Settings saved!");
    await loadSpaces(apiUrl, token);
  } catch (err) {
    console.error("Failed to save settings:", err);
    showAnytypeStatus("Failed to save settings.", true);
  }
});

document.getElementById("spaceDropdown").addEventListener("change", async (event) => {
  const option = event.target.options[event.target.selectedIndex];
  const selectedSpace = {
    spaceId: option.value,
    spaceName: option.text
  };

  try {
    await browser.storage.sync.set({ selectedSpace });
    showSpaceStatus("Space selection saved!");
  } catch (err) {
    console.error("Failed to save selected space:", err);
    showSpaceStatus("Failed to save space selection.", true);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const { apiUrl, token, selectedSpace } = await browser.storage.sync.get(["apiUrl", "token", "selectedSpace"]);

    if (apiUrl) setInputValue("apiUrl", apiUrl);
    if (token) setInputValue("token", token);

    if (apiUrl && token) {
      await loadSpaces(apiUrl, token, selectedSpace?.spaceId);
    }
  } catch (err) {
    console.error("Failed to initialize settings:", err);
    showStatus("Failed to load saved settings.", true);
  }
});

async function loadSpaces(apiUrl, token, preselectId = null) {
  const dropdown = document.getElementById("spaceDropdown");
  dropdown.disabled = true;
  dropdown.innerHTML = `<option disabled selected>Loading...</option>`;

  try {
    const res = await fetch(`${apiUrl}/v1/spaces`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const body = await res.text();
    if (!res.ok) throw new Error(`Status ${res.status}: ${body}`);

    const data = JSON.parse(body);
    const spaces = Array.isArray(data.data) ? data.data : [];

    dropdown.innerHTML = ""; // Clear

    spaces.forEach(space => {
      const option = document.createElement("option");
      option.value = space.id;
      option.textContent = space.name || "Unnamed Space";
      dropdown.appendChild(option);
    });

    // Preselect if applicable
    if (preselectId && spaces.some(s => s.id === preselectId)) {
      dropdown.value = preselectId;
    }

    // Save selected space to storage
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedSpace = {
      spaceId: selectedOption.value,
      spaceName: selectedOption.text
    };
    await browser.storage.sync.set({ selectedSpace });

    showSpaceStatus("Spaces loaded!");
    dropdown.disabled = false;
  } catch (err) {
    console.error("Failed to load spaces:", err);
    dropdown.innerHTML = `<option disabled selected>Failed to load</option>`;
    showSpaceStatus("Failed to load spaces.", true);
  }
}

// 🔧 Helpers

function getInputValue(id) {
  return document.getElementById(id)?.value.trim();
}

function setInputValue(id, value) {
  const input = document.getElementById(id);
  if (input) input.value = value;
}

function showAnytypeStatus(msg, isError = false) {
  const status = document.getElementById("anytypeStatus");
  if (!status) return;
  status.style.color = isError ? "red" : "green";
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), 3000);
}

function showSpaceStatus(msg, isError = false) {
  const status = document.getElementById("spaceStatus");
  if (!status) return;
  status.style.color = isError ? "red" : "green";
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), 3000);
}
