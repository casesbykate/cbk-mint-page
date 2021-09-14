import { BodyNode, DomNode, el } from "@hanul/skynode";
import MintContract from "./contracts/MintContract";
import NFTContract from "./contracts/NFTContract";
import Wallet from "./klaytn/Wallet";

(async () => {

    let addressInput: DomNode<HTMLInputElement>;
    let countInput: DomNode<HTMLInputElement>;

    BodyNode.append(
        el(".price-info"),
        el("p", "You can mint your own Cases below.\nGet your own case from <Cases By Kate> and feel free to trace the clues."),
        el("label",
            el("span", "Address"),
            addressInput = el("input", { placeholder: "0x1234..." }),
        ),
        el("label",
            el("span", "Mint Limit"),
            countInput = el("input"),
        ),
        el("a.mint-button", "Mint", {
            click: async () => {
                const balance = (await NFTContract.balanceOf(MintContract.address)).toNumber();
                const count = parseInt(countInput.domElement.value, 10);
                if (balance >= count) {
                    await MintContract.mint(
                        addressInput.domElement.value,
                        count,
                    );
                } else {
                    alert(`최대 ${balance}개 민팅할 수 있습니다.`);
                }
            },
        }),
        el(".meter red", el("span", { style: { width: "80%" } })),
        el("a.opensea-button"),
        el("a.site-button"),
    );

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
})();