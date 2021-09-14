import { utils } from "ethers";
import Contract from "./Contract";

class MintContract extends Contract {

    constructor() {
        super("0x10e29c9320a2caCE027eb1f2648e33480d4A1aEf", require("./MintContractABI.json"));
    }

    public async mint(to: string, count: number): Promise<void> {
        await this.runWalletMethodWithValue(utils.parseEther(String(20 * count)), "mint", to, count);
    }
}

export default new MintContract();
