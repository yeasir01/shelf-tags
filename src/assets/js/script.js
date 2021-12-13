const form = document.getElementById("form").elements;
const printBtn = document.getElementById("print");

import { IDocument, IsExtensionInstalled } from "../lib/bpac.js";
import Modal from "./factory.js";

const modal = new Modal(document.getElementById("modal"));
const BPAC = IDocument;

let config = {
    printer: "Brother QL-820NWB", //Brother QL-800 or Brother QL-820NWB
    promoTemp: "C:\\templates\\shelf_tag_promo.lbx",
    standTemp: "C:\\templates\\shelf_tag.lbx"
};

async function handlePrint(e) {
    e.preventDefault();

    if (!IsExtensionInstalled()) {
        const agent = window.navigator.userAgent.toLowerCase();
        const ischrome = agent.indexOf("chrome") !== -1 && agent.indexOf("edge") === -1 && agent.indexOf("opr") === -1;

        if (ischrome) {
            return noExtentionHandler();
        }
    }

    try {
        const isPromo = form.promo.value.trim().length !== 0;
        const tempPath = isPromo ? config.promoTemp : config.standTemp;
        const copies = parseInt(form.copies.value);
        const isOpen = await BPAC.Open(tempPath);
        
        if (!isOpen) {
            throw new Error('Invalid template path. Check your settings and try again.');
        }
        
        await BPAC.SetPrinter(config.printer);

        if (isPromo) {
            const promoObj = await BPAC.GetObject("objPromo");
            promoObj.Text = form.promo.value.trim().toUpperCase();
        }

        const brandObj = await BPAC.GetObject("objBrand");
        brandObj.Text = form.brand.value.trim().toUpperCase();

        const subBrandObj = await BPAC.GetObject("objSubBrand");
        subBrandObj.Text = form.subBrand.value.trim().toUpperCase();

        const sizeObj = await BPAC.GetObject("objSize");
        sizeObj.Text = form.size.value.trim().toUpperCase();

        const barcodeObj = await BPAC.GetObject("objBarcode");
        barcodeObj.Text = form.barcode.value.trim();

        const feeMessageObj = await BPAC.GetObject("objFeeMessage");
        feeMessageObj.Text = form.feeMessage.value.trim().toUpperCase();

        const priceObj = await BPAC.GetObject("objPrice");
        priceObj.Text = "$" + form.price.value.trim();

        await BPAC.StartPrint("Shelf Tag Label", 0);
        await BPAC.PrintOut(copies, 0);
        await BPAC.EndPrint();
        await BPAC.Close();

        form.barcode.select();
    } catch (err) {
        console.error(err);
        modal.renderError(err);
    }
}

function renderConfig() {
    const template = document.getElementById("config");
    const templateContent = template.content.cloneNode(true);
    modal.renderContentFromTemplate(templateContent);
}

function noExtentionHandler() {
    const objTemp = {
        title: 'Chrome Extention Required',
        content: `The b-PAC chrome extention is required to print from a web browser,
        please download the extention, enable it and reload this page. If you already have the 
        extention, please make sure to enable it.`,
        buttons: [{ 
            label: 'Get Extention', 
            handler(){ 
                window.open( "https://chrome.google.com/webstore/detail/ilpghlfadkjifilabejhhijpfphfcfhb", "_blank") 
            },
        }]
    }

    modal.render(objTemp);
};

printBtn.addEventListener("click", handlePrint);
//document.getElementById("open").addEventListener("click", renderConfig);