"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const MintContract_1 = __importDefault(require("./contracts/MintContract"));
const NFTContract_1 = __importDefault(require("./contracts/NFTContract"));
const ExtWallet_1 = __importDefault(require("./klaytn/ExtWallet"));
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
(async () => {
    let balance;
    let addressInput;
    let countInput;
    const minted = 10000 - (await NFTContract_1.default.balanceOf(MintContract_1.default.address)).toNumber();
    skynode_1.BodyNode.append((0, skynode_1.el)(".price-info", (0, skynode_1.el)("span", "* 20 klay = 1 case\n"), balance = (0, skynode_1.el)("span", "* Your Klay balance : ")), (0, skynode_1.el)("main", (0, skynode_1.el)("img", { src: "/images/logo.png", height: "300" }), (0, skynode_1.el)("p", "You can mint your own Cases below.\nGet your own case from <Cases By Kate> and feel free to trace the clues."), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "Address"), addressInput = (0, skynode_1.el)("input", { placeholder: "0x1234...", readonly: "readonly" })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "Mint Limit"), countInput = (0, skynode_1.el)("input")), (0, skynode_1.el)("a.mint-button", "Mint", {
        click: async () => {
            const balance = (await NFTContract_1.default.balanceOf(MintContract_1.default.address)).toNumber();
            const count = parseInt(countInput.domElement.value, 10);
            if (count > 10) {
                alert("한번에 최대 10개의 NFT만 민팅할 수 있습니다.");
            }
            else if (balance >= count) {
                await MintContract_1.default.mint(addressInput.domElement.value, count);
                setTimeout(() => location.reload(), 1000);
            }
            else {
                alert(`남은 물량인 ${balance}개만 민팅할 수 있습니다.`);
            }
        },
    }), (0, skynode_1.el)(".progress", "mint progress", (0, skynode_1.el)(".meter red", (0, skynode_1.el)("span", { style: { width: `${minted / 100}%` } })), (0, skynode_1.el)("span", `${minted}/10000 cases`))), (0, skynode_1.el)("a.opensea-button", (0, skynode_1.el)("img", { src: "/images/opensea.png", height: "50" }), { href: "https://opensea.io/collection/cases-by-kate" }), (0, skynode_1.el)("a.website-button", (0, skynode_1.el)("img", { src: "/images/website.png", height: "40" }), { href: "https://casesbykate.xyz/" }));
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
    const address = await Wallet_1.default.loadAddress();
    if (address !== undefined) {
        addressInput.domElement.value = address;
    }
    balance.appendText(ethers_1.utils.formatEther(await ExtWallet_1.default.loadBalance()));
})();
//# sourceMappingURL=main.js.map