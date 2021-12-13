# Shelf Tag Web App
[![Netlify Status](https://api.netlify.com/api/v1/badges/3bd1e3a7-ccfc-45eb-86d3-451c7470e4b3/deploy-status)](https://app.netlify.com/sites/shelf-tag/deploys)

An easy to use app for quickly generating shelf tag pricing labels from your web browser.

### Is Your Printer Supported?
- [Check Supported Models](https://www.brother.co.jp/eng/dev/bpac/environment/index.aspx#model)

### Required Dependencies
- [b-PAC Client Component](https://support.brother.com/g/b/agreement.aspx?dlid=dlfp100924_000)
- [Brother b-PAC Extention for Chrome](https://chrome.google.com/webstore/detail/brother-b-pac-extension/ilpghlfadkjifilabejhhijpfphfcfhb)
- [Shelf Tag Templates](https://www.github.com/yeasir01/shelf-tags/blob/main/templates.zip?raw=true)

### Setup & Configuration

- Download & install the driver for your specific printer.

- Install the b-PAC client component & p-PAC web browser extension.

- Create a directory called "templates" in your C drive. Your path should look something like this ```C:/templates```. This is where you will need to store all your prebuild shelf tag templates.

- Download the two pre-made templates Here & place them in the directory you created. Don't like the designs? The template layouts can be customized using Brothers Free P-Touch Editor software. Just make sure the property objects match the templates provided.

- Happy Printing!


### Web Interface
![ScreenShot](./.github/assets/app.png)

### Tags printed with a Brother QL-820NWB thermal printer.
![ScreenShot](./.github/assets/tags.png)