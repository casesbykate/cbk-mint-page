"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MintContract_1 = __importDefault(require("./contracts/MintContract"));
const NFTContract_1 = __importDefault(require("./contracts/NFTContract"));
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
(async () => {
    let addressInput;
    let countInput;
    skynode_1.BodyNode.append((0, skynode_1.el)(".price-info"), (0, skynode_1.el)("p", "You can mint your own Cases below.\nGet your own case from <Cases By Kate> and feel free to trace the clues."), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "Address"), addressInput = (0, skynode_1.el)("input", { placeholder: "0x1234..." })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "Mint Limit"), countInput = (0, skynode_1.el)("input")), (0, skynode_1.el)("a.mint-button", "Mint", {
        click: async () => {
            const balance = (await NFTContract_1.default.balanceOf(MintContract_1.default.address)).toNumber();
            const count = parseInt(countInput.domElement.value, 10);
            if (balance >= count) {
                await MintContract_1.default.mint(addressInput.domElement.value, count);
            }
            else {
                alert(`최대 ${balance}개 민팅할 수 있습니다.`);
            }
        },
    }), (0, skynode_1.el)(".meter red", (0, skynode_1.el)("span", { style: { width: "80%" } })), (0, skynode_1.el)("a.opensea-button"), (0, skynode_1.el)("a.site-button"));
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
})();
//# sourceMappingURL=main.js.map