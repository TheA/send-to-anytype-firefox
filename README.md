# Send to Anytype Firefox Extension
> [!IMPORTANT]
> This Addon will not be developed further. It may not work if the API changed

A Firefox extension that saves the current tab's URL as a bookmark in your Anytype space.

The Addon is not available through the firefox extension hub. You can download the release and manually install the add-on.

## Features

- Save the current tab as a **bookmark** object to your selected "space"
- Choose from available spaces using the **options page**
- Works with the [local API from Anytype](https://developers.anytype.io/)

## Security Notice

This extension stores your API token using Firefox's `browser.storage.sync` API. This means:

- The token is stored **locally in the browser**, and may be synced across devices if Firefox Sync is enabled.
- It is **not accessible to websites**, but it is **not encrypted** and could be read by someone with access to your browser profile.

## How to use
1. Download and install the add-on from the [release page](https://github.com/TheA/send-to-anytype-firefox/releases)
2. Configure your connection to Anytype in the add-on settings
3. Use the add-on button to save the current page to Anytype

## Maintenance & Support Notice

I had a few more ideas in the works, but since I no longer use Anytype, I won't be continuing to develop the add-on  
Feel free to use the project as a baseline to improve.
