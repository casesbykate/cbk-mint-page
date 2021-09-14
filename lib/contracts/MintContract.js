"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Contract_1 = __importDefault(require("./Contract"));
class MintContract extends Contract_1.default {
    constructor() {
        super("0x10e29c9320a2caCE027eb1f2648e33480d4A1aEf", require("./MintContractABI.json"));
    }
    async mint(to, count) {
        await this.runWalletMethodWithValue(ethers_1.utils.parseEther(String(20 * count)), "mint", to, count);
    }
}
exports.default = new MintContract();
//# sourceMappingURL=MintContract.js.map