import { BodyNode, DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import MintContract from "./contracts/MintContract";
import NFTContract from "./contracts/NFTContract";
import ExtWallet from "./klaytn/ExtWallet";
import Wallet from "./klaytn/Wallet";

(async () => {

    let balance: DomNode;
    let addressInput: DomNode<HTMLInputElement>;
    let countInput: DomNode<HTMLInputElement>;

    const minted = 10000 - (await NFTContract.balanceOf(MintContract.address)).toNumber();

    BodyNode.append(
        el(".price-info",
            el("span", "* 20 klay = 1 case\n"),
            balance = el("span", "* Your Klay balance : "),
        ),
        el("main",
            el("img", { src: "/images/logo.png", height: "300" }),
            el("p", "You can mint your own Cases below.\nGet your own case from <Cases By Kate> and feel free to trace the clues."),
            el("label",
                el("span", "Address"),
                addressInput = el("input", { placeholder: "0x1234...", readonly: "readonly" }),
            ),
            el("label",
                el("span", "Mint Limit"),
                countInput = el("input"),
            ),
            el("a.mint-button", "Mint", {
                click: async () => {
                    const balance = (await NFTContract.balanceOf(MintContract.address)).toNumber();
                    const count = parseInt(countInput.domElement.value, 10);
                    if (count > 10) {
                        alert("한번에 최대 10개의 NFT만 민팅할 수 있습니다.");
                    } else if (balance >= count) {
                        await MintContract.mint(
                            addressInput.domElement.value,
                            count,
                        );
                        setTimeout(() => location.reload(), 1000);
                    } else {
                        alert(`남은 물량인 ${balance}개만 민팅할 수 있습니다.`);
                    }
                },
            }),
            el(".progress",
                "mint progress",
                el(".meter red", el("span", { style: { width: `${minted / 100}%` } })),
                el("span", `${minted}/10000 cases`),
            ),
        ),
        el("a.opensea-button",
            el("img", { src: "/images/opensea.png", height: "50" }),
            { href: "https://opensea.io/collection/cases-by-kate" },
        ),
        el("a.website-button",
            el("img", { src: "/images/website.png", height: "40" }),
            { href: "https://casesbykate.xyz/" },
        ),
    );

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
    const address = await Wallet.loadAddress();
    if (address !== undefined) {
        addressInput.domElement.value = address;
    }
    balance.appendText(utils.formatEther(await ExtWallet.loadBalance()));
})();