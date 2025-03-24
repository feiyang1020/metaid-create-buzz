import { IBtcConnector, IMvcConnector, MvcTransaction } from "@feiyangl1020/metaid";
import { AttachmentItem } from "./utils";
type IdCoin = {
    tick: string;
    tokenName: string;
    decimals: string;
};
type NFT = {
    collectionPinId: string;
    collectionName: string;
    itemPinId: string;
    itemPinNumber: number;
    descPinId: string;
    name: string;
    desc: string;
    cover: string;
    metaData: string;
    createTime: number;
    address: string;
    content: string;
    metaId: string;
    descadded: boolean;
    contentType: string;
    contentTypeDetect: string;
    contentString: string;
    previewImage: string;
};
type Chain = "btc" | "mvc";
type Network = "mainnet" | "testnet";
export type BuzzContent = {
    content: string;
    encryptContent: string;
    encryptImages: {
        file: File;
    }[];
    publicImages: {
        file: File;
    }[];
    nfts?: NFT[];
    video?: {
        file: File;
    };
    quotePin?: {
        id: string;
    };
};
export type PayBuzzInfo = {
    manPubKey: string;
    payType: string;
    payTicker?: IdCoin;
    payAmount?: number;
    manDomain: string;
    payTo?: string;
};
export type Props = {
    buzz: BuzzContent;
    host: string;
    feeRate: number;
    chain: Chain;
    btcConnector: IBtcConnector | undefined;
    mvcConnector: IMvcConnector | undefined;
    network: Network;
    serviceFee: {
        address: string;
        satoshis: string;
    } | undefined;
    isPayBuzz?: boolean;
    payInfo?: PayBuzzInfo;
};
export declare const createBuzz: (params: Props) => Promise<string | undefined>;
export declare const createNormalBuzz: (params: Props) => Promise<string>;
export declare const postImages: (images: AttachmentItem[], feeRate: number, host: string, chain: Chain, btcConnector: IBtcConnector | undefined, mvcConnector: IMvcConnector | undefined, network: Network) => Promise<{
    fileTransactions: MvcTransaction[];
    attachments: string[];
}>;
export declare const postEncryptImages: (images: AttachmentItem[], feeRate: number, host: string, chain: Chain, btcConnector: IBtcConnector | undefined, mvcConnector: IMvcConnector | undefined, randomKey: string, _fileTransactions: MvcTransaction[], network: Network) => Promise<{
    fileTransactions: MvcTransaction[];
    attachments: string[];
}>;
export declare const postVideo: (file: File, host: string, chain: Chain, btcConnector: IBtcConnector | undefined, mvcConnector: IMvcConnector | undefined, network: Network) => Promise<{
    transactions: MvcTransaction[];
    metafile: string;
}>;
export {};
