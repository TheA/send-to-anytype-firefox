# Send to Anytype Firefox Extension

A lightweight Firefox extension that saves the current tab's URL as a bookmark in your Anytype space.

Currently it is not available through the firefox extension hub. I would like to refine the add-on a little bit more. If you found this you can manually install the add-on.


## Current features

- Save the current tab as a **bookmark** object to your selected "space"
- Choose from available spaces using the **options page**
- Works with the [local API from Anytype](https://developers.anytype.io/)



## ⚠️ Security Notice

This extension stores your API token using Firefox's `browser.storage.sync` API. This means:

- The token is stored **locally in the browser**, and may be synced across devices if Firefox Sync is enabled.
- It is **not accessible to websites**, but it is **not encrypted** and could be read by someone with access to your browser profile.

## How to use
1. Download and install the add-on from the [release page](https://github.com/TheA/send-to-anytype-firefox/releases)
2. Configure your connection to Anytype in the add-on settings
3. Use the add-on button to save the current page to Anytype

## Disclaimer & Contributor Note

This is my **first open-source project**, and my JavaScript might be a little rusty — so please use this extension **at your own risk**.

I'm always open to **suggestions, tips, improvements, or pull requests**. If you spot a bug, have a better way to do something, or want to contribute, feel free to open an issue or PR.

> Thanks for checking it out and helping me learn!

---

## 🔓 Reuse & License

Feel free to **use this code as a starting point for your own projects**, fork it, or modify it — as long as you follow the terms of the [MIT License](LICENSE).

> In short: Keep the license and copyright notice, and you're good!

