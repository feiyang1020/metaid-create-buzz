import React from 'react'
import { createBuzz } from '../index' // 导入要测试的方法

import {
    IMvcConnector,
    MetaletWalletForBtc,
    MetaletWalletForMvc,
    mvcConnect,
    IBtcConnector,
    btcConnect,
} from "@feiyangl1020/metaid";

export default function App() {
    const test = async () => {
        console.log('test');
        try {
            const ret = await window.metaidwallet.connect();
            const curNetwork = "testnet";
            let { network: _net } = await window.metaidwallet.getNetwork();
            if (_net !== curNetwork) {
                const ret = await window.metaidwallet.switchNetwork(
                    curNetwork === "testnet" ? "testnet" : "livenet"
                );
                if (ret.status === "canceled") return;
                const { network } = await window.metaidwallet.getNetwork();
                if (network !== curNetwork) {
                    return;
                }
            }
            const btcAddress = await window.metaidwallet.btc.getAddress();
            const btcPub = await window.metaidwallet.btc.getPublicKey();
            const mvcAddress = await window.metaidwallet.getAddress();
            const mvcPub = await window.metaidwallet.getPublicKey();
            const btcWallet = MetaletWalletForBtc.restore({
                address: btcAddress,
                pub: btcPub,
                internal: window.metaidwallet,
            });
            const mvcWallet = MetaletWalletForMvc.restore({
                address: mvcAddress,
                xpub: mvcPub,
            });
            const btcConnector = await btcConnect({
                wallet: btcWallet,
                network: curNetwork,

            });

            const mvcConnector = await mvcConnect({
                wallet: mvcWallet,
                network: curNetwork,

            });
            const buzz = await createBuzz({
                buzz: {
                    content: 'test',
                    encryptContent: '',
                    publicImages: [],
                    encryptImages: [],
                },
                mvcConnector: mvcConnector as IMvcConnector,
                btcConnector: btcConnector as IBtcConnector,
                host: '',
                feeRate: 1,
                chain: 'mvc',
                network: curNetwork,
                serviceFee: undefined
            });
            alert(JSON.stringify(buzz));
        } catch (err:any) {
            alert(err.message);
        }


    }

    return (
        <div>
            <h1>Test App for MetaID Buzz</h1>
            <button onClick={test}>
                Test Create Buzz
            </button>
        </div>
    )
}
