import {
  CreateOptions,
  IBtcConnector,
  IBtcEntity,
  IMvcConnector,
  IMvcEntity,
  MvcTransaction,
} from "@feiyangl1020/metaid";
import {
  AttachmentItem,
  encryptPayloadAES,
  image2Attach,
  processFile,
} from "./utils";
import { convertToFileList } from "./utils";
import { generateAESKey } from "./utils";
import { InscribeData } from "@feiyangl1020/metaid/dist/core/entity/btc";
import { v4 as uuidv4 } from "uuid";

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
  encryptImages: { file: File }[];
  publicImages: { file: File }[];
  nfts?: NFT[];
  video?: { file: File };
  quotePin?: { id: string };
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
  serviceFee:
    | {
        address: string;
        satoshis: string;
      }
    | undefined;
  isPayBuzz?: boolean;
  payInfo?: PayBuzzInfo;
};

export const createBuzz = async (params: Props) => {
  const {
    buzz,
    feeRate,
    host,
    chain,
    btcConnector,
    mvcConnector,
    network,
    isPayBuzz = false,
    serviceFee,
    payInfo,
  } = params;
  const {
    content,
    publicImages,
    encryptContent,
    encryptImages,
    nfts = [],
  } = buzz;

  if (!isPayBuzz) {
    return await createNormalBuzz(params);
  }
  if (!payInfo) {
    throw new Error("Please input pay info");
  }
  const {
    payType,
    payTicker,
    payAmount = 0,
    manPubKey,
    manDomain,
    payTo,
  } = payInfo;
  if (encryptImages.length === 0 && !encryptContent) {
    throw new Error("Please input encrypt content or encrypt images");
  }
  if (!payType) {
    throw new Error("Please select pay type");
  }
  if (payType === "mrc20" && !payTicker) {
    throw new Error("Please Launch Your Unique ID-COIN");
  }
  if (payType === "btc" && payAmount <= 0) {
    throw new Error("Please input valid pay amount");
  }

  let transactions: MvcTransaction[] = [];
  const randomKey = generateAESKey();

  let _publicImages: AttachmentItem[] = [];
  if (publicImages.length > 0) {
    _publicImages = await image2Attach(convertToFileList(publicImages));
  }
  let _encryptImages: AttachmentItem[] = [];
  if (encryptImages.length > 0) {
    _encryptImages = await image2Attach(convertToFileList(encryptImages));
  }
  const _encryptContent = encryptContent
    ? encryptPayloadAES(
        randomKey,
        Buffer.from(encryptContent, "utf-8").toString("hex")
      )
    : "";

  const { attachments, fileTransactions } = await postImages(
    _publicImages,
    feeRate,
    host,
    chain,
    btcConnector,
    mvcConnector,
    network
  );

  transactions = fileTransactions;
  const {
    attachments: encryptAttachments,
    fileTransactions: encryptFileTransactions,
  } = await postEncryptImages(
    _encryptImages,
    feeRate,
    host,
    chain,
    btcConnector,
    mvcConnector,
    randomKey,
    transactions,
    network
  );
  transactions = encryptFileTransactions;

  const payload = {
    publicContent: content,
    encryptContent: _encryptContent,
    contentType: "text/plain",
    publicFiles: [
      ...nfts.map((nft) => `metafile://nft/mrc721/${nft.itemPinId}`),
      ...attachments,
    ],
    encryptFiles: encryptAttachments,
  };
  const path = `${host || ""}/protocols/paybuzz`;
  const metaidData: InscribeData = {
    operation: "create",
    body: JSON.stringify(payload),
    path,
    contentType: "text/plain",
    flag: "metaid",
  };

  let pid = "";
  if (chain === "btc") {
    const ret = await btcConnector!.inscribe({
      inscribeDataArray: [metaidData],
      options: {
        noBroadcast: "no",
        feeRate: Number(feeRate),
        service: serviceFee,
      },
    });
    if (ret.status) throw new Error(ret.status);
    const [revealTxId] = ret.revealTxIds;
    pid = `${revealTxId}i0`;
  } else {
    const { transactions: pinTransations } = await mvcConnector!.createPin(
      metaidData,
      {
        network: network,
        signMessage: "create paybuzz",
        serialAction: "combo",
        transactions: [...transactions],
        // @ts-ignore
        service: serviceFee,
      }
    );
    transactions = pinTransations as MvcTransaction[];
    pid = transactions[transactions.length - 1].txComposer.getTxId() + "i0";
  }
  //@ts-ignore
  const { sharedSecret, ecdhPubKey } = await window.metaidwallet.common.ecdh({
    externalPubKey: manPubKey,
  });

  const contorlPayload: any = {
    controlPins: [pid],
    manDomain: manDomain || "",
    manPubkey: manPubKey,
    creatorPubkey: ecdhPubKey,
    encryptedKey: encryptPayloadAES(sharedSecret, randomKey),
  };

  if (payType === "mrc20" && payTicker) {
    contorlPayload.holdCheck = {
      type: "mrc20",
      ticker: payTicker.tick,
      amount: "1",
    };
  } else {
    contorlPayload.payCheck = {
      type: "chainCoin",
      ticker: "",
      amount: payAmount.toString(),
      payTo: payTo,
    };
  }
  const contorlPath = `${host || ""}/metaaccess/accesscontrol`;
  const contorlMetaidData: InscribeData = {
    operation: "create",
    body: JSON.stringify(contorlPayload),
    path: contorlPath,
    contentType: "text/plain",
    flag: "metaid",
  };

  if (chain === "btc") {
    const ret = await btcConnector!.inscribe({
      inscribeDataArray: [contorlMetaidData],
      options: {
        noBroadcast: "no",
        feeRate: Number(feeRate),
        service: serviceFee,
      },
    });
    if (ret.status) throw new Error(ret.status);
    return ret.revealTxIds[0];
  } else {
    const ret = await mvcConnector!.createPin(contorlMetaidData, {
      network: network,
      signMessage: "create accesscontrol",
      serialAction: "finish",
      transactions: [...transactions],
    });
    return ret.txid;
  }
};

export const createNormalBuzz = async (params: Props) => {
  const {
    buzz,
    feeRate,
    host,
    chain,
    btcConnector,
    mvcConnector,
    network,
    serviceFee,
  } = params;
  const { publicImages, video, quotePin, nfts = [] } = buzz;
  const buzzEntity: IBtcEntity = await btcConnector!.use("buzz");
  let fileTransactions: MvcTransaction[] = [];
  const finalBody: any = {
    content: buzz.content,
    contentType: "text/plain",
  };
  if (video && chain === "mvc") {
    const { metafile, transactions } = await postVideo(
      video.file,
      host,
      chain,
      btcConnector,
      mvcConnector,
      network
    );
    fileTransactions = transactions as MvcTransaction[];
    finalBody.attachments = [metafile];
  }
  if (publicImages.length > 0) {
    const _publicImages = await image2Attach(convertToFileList(publicImages));
    const { attachments, fileTransactions: imagesTransactions } =
      await postImages(
        _publicImages,
        feeRate,
        host,
        chain,
        btcConnector,
        mvcConnector,
        network
      );
    fileTransactions = imagesTransactions;
    finalBody.attachments = [...(finalBody.attachments ?? []), ...attachments];
  }
  if (quotePin) {
    finalBody.quotePin = quotePin.id;
  }
  if (nfts.length > 0) {
    finalBody.attachments = [
      ...nfts.map((nft) => `metafile://nft/mrc721/${nft.itemPinId}`),
      ...(finalBody.attachments || []),
    ];
  }
  if (chain === "btc") {
    const createRes = await buzzEntity!.create({
      dataArray: [
        {
          body: JSON.stringify(finalBody),
          contentType: "text/plain;utf-8",
          flag: "metaid",
          path: `${host || ""}/protocols/simplebuzz`,
        },
      ],
      options: {
        noBroadcast: "no",
        feeRate: Number(feeRate),
        service: serviceFee,
      },
    });

    if (createRes?.revealTxIds[0]) {
      return createRes.revealTxIds[0];
    } else {
      throw new Error("create buzz failed");
    }
  } else {
    const buzzEntity = (await mvcConnector!.load({
      name: "buzz",
      nodeName: "simplebuzz",
      path: `${host || ""}/protocols/simplebuzz`,
      versions: [
        {
          version: 1,
          body: [
            {
              name: "content",
              type: "string",
            },
            {
              name: "contentType",
              type: "string",
            },
            {
              name: "quotePin",
              type: "string",
            },
            {
              name: "attachments",
              type: "array",
            },
          ],
        },
      ],
    })) as IMvcEntity;

    const createRes = await buzzEntity!.create({
      data: { body: JSON.stringify({ ...finalBody }) },
      options: {
        network: network,
        signMessage: "create buzz",
        serialAction: "finish",
        transactions: fileTransactions,
        service: serviceFee,
      },
    });
    if (createRes.txid) {
      return createRes.txid;
    } else {
      throw new Error("create buzz failed");
    }
  }
};

export const postImages = async (
  images: AttachmentItem[],
  feeRate: number,
  host: string,
  chain: Chain,
  btcConnector: IBtcConnector | undefined,
  mvcConnector: IMvcConnector | undefined,
  network: Network
) => {
  if (images.length === 0)
    return {
      attachments: [],
      fileTransactions: [],
    };

  const fileOptions: CreateOptions[] = [];
  for (const image of images) {
    fileOptions.push({
      body: Buffer.from(image.data, "hex").toString("base64"),
      contentType: `${image.fileType};binary`,
      encoding: "base64",
      flag: "metaid",
      path: `${host || ""}/file`,
    });
  }
  if (chain === "btc") {
    const fileEntity = await btcConnector!.use("file");
    const imageRes = await fileEntity.create({
      dataArray: fileOptions,
      options: {
        noBroadcast: "no",
        feeRate: Number(feeRate),
      },
    });
    return {
      attachments: imageRes.revealTxIds.map(
        (rid) => "metafile://" + rid + "i0"
      ),
      fileTransactions: [],
    };
  } else {
    let fileTransactions: MvcTransaction[] = [];
    const fileEntity = (await mvcConnector!.use("file")) as IMvcEntity;
    const finalAttachMetafileUri: string[] = [];

    for (let i = 0; i < fileOptions.length; i++) {
      const fileOption = fileOptions[i];
      const { transactions } = await fileEntity.create({
        data: fileOption,
        options: {
          network,
          signMessage: "upload image file",
          serialAction: "combo",
          transactions: fileTransactions,
        },
      });

      if (!transactions) {
        throw new Error("upload image file failed");
      }

      finalAttachMetafileUri.push(
        "metafile://" +
          transactions[transactions.length - 1].txComposer.getTxId() +
          "i0"
      );
      fileTransactions = transactions;
    }

    return {
      fileTransactions,
      attachments: finalAttachMetafileUri,
    };
  }
};

export const postEncryptImages = async (
  images: AttachmentItem[],
  feeRate: number,
  host: string,
  chain: Chain,
  btcConnector: IBtcConnector | undefined,
  mvcConnector: IMvcConnector | undefined,
  randomKey: string,
  _fileTransactions: MvcTransaction[],
  network: Network
) => {
  if (images.length === 0)
    return {
      attachments: [],
      fileTransactions: [..._fileTransactions],
    };

  const fileOptions: CreateOptions[] = [];
  for (const image of images) {
    fileOptions.push({
      body: encryptPayloadAES(
        randomKey,
        Buffer.from(image.data, "hex").toString("hex")
      ),
      contentType: `binary`,
      encoding: "binary",
      flag: "metaid",
      path: `${host || ""}/file`,
    });
  }
  if (chain === "btc") {
    const fileEntity = await btcConnector!.use("file");
    const imageRes = await fileEntity.create({
      dataArray: fileOptions,
      options: {
        noBroadcast: "no",
        feeRate: Number(feeRate),
      },
    });
    return {
      attachments: imageRes.revealTxIds.map(
        (rid) => "metafile://" + rid + "i0"
      ),
      fileTransactions: [],
    };
  } else {
    let fileTransactions: MvcTransaction[] = [..._fileTransactions];
    const fileEntity = (await mvcConnector!.use("file")) as IMvcEntity;
    const finalAttachMetafileUri: string[] = [];

    for (let i = 0; i < fileOptions.length; i++) {
      const fileOption = fileOptions[i];
      const { transactions } = await fileEntity.create({
        data: fileOption,
        options: {
          network: network,
          signMessage: "upload image file",
          serialAction: "combo",
          transactions: fileTransactions,
        },
      });

      if (!transactions) {
        throw new Error("upload image file failed");
      }

      finalAttachMetafileUri.push(
        "metafile://" +
          transactions[transactions.length - 1].txComposer.getTxId() +
          "i0"
      );
      fileTransactions = transactions;
    }

    return {
      fileTransactions,
      attachments: finalAttachMetafileUri,
    };
  }
};

export const postVideo = async (
  file: File,
  host: string,
  chain: Chain,
  btcConnector: IBtcConnector | undefined,
  mvcConnector: IMvcConnector | undefined,
  network: Network
) => {
  let chunkTransactions: MvcTransaction[] = [];

  const chunkSize = 1024 * 1024 * 0.2;
  const { chunks, chunkNumber, sha256, fileSize, dataType, name } =
    await processFile(file, chunkSize);
  let chunkPids: string[] = [];
  let chunkList: any[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const { chunk, hash } = chunks[i];
    const metaidData: InscribeData = {
      operation: "create",
      body: chunk,
      path: `${host || ""}/file/chunk/${hash}`,
      contentType: "metafile/chunk;binary",
      encoding: "base64",
      flag: "metaid",
    };
    if (chain === "btc") {
      // todo
    } else {
      const serialAction = (i + 1) % 4 === 0 ? "finish" : "combo";
      //@ts-ignore
      const { transactions, txid, allTxid } = await mvcConnector!.createPin(
        metaidData,
        {
          network: network,
          signMessage: "file chunk",
          serialAction: serialAction,
          transactions: chunkTransactions,
        }
      );

      if (allTxid || i === chunks.length - 1) {
        if (allTxid) {
          chunkList = [
            ...chunkList,
            ...allTxid.map((txid: string) => {
              return {
                sha256: hash,
                pinId: txid + "i0",
              };
            }),
          ];
        } else {
          chunkList = [
            ...chunkList,
            ...transactions!.map((tx) => {
              return {
                sha256: hash,
                pinId: tx.txComposer.getTxId() + "i0",
              };
            }),
          ];
        }
      }

      chunkTransactions = transactions as MvcTransaction[];
    }
  }
  const metaidData: InscribeData = {
    operation: "create",
    body: JSON.stringify({
      chunkList: chunkList,
      fileSize,
      chunkSize,
      dataType,
      name,
      chunkNumber,
      sha256,
    }),
    path: `${host || ""}/file/index/${uuidv4()}`,
    contentType: "metafile/index;utf-8",
    flag: "metaid",
  };
  const { transactions: pinTransations } = await mvcConnector!.createPin(
    metaidData,
    {
      network: network,
      signMessage: "file index",
      serialAction: "combo",
      transactions: [...(chunkTransactions ?? [])],
    }
  );
  chunkTransactions = pinTransations as MvcTransaction[];
  return {
    transactions: chunkTransactions,
    metafile:
      "metafile://video/" +
      chunkTransactions[chunkTransactions.length - 1].txComposer.getTxId() +
      "i0",
  };
};
