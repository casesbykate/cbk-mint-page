import { utils } from "ethers";
import Contract from "./Contract";

class MintContract extends Contract {

    constructor() {
        super("0xdAf312BFEb1d03b87F213DA3FC3ceADC220cd92e", require("./MintContractABI.json"));
    }

    public async mint(to: string, count: number): Promise<void> {
        await this.runWalletMethodWithValue(utils.parseEther(String(20 * count)), "mint", to, count);
    }
}

export default new MintContract();
