"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postVideo = exports.postEncryptImages = exports.postImages = exports.createNormalBuzz = exports.createBuzz = void 0;
var utils_1 = require("./utils");
var utils_2 = require("./utils");
var utils_3 = require("./utils");
var uuid_1 = require("uuid");
var createBuzz = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var buzz, feeRate, host, chain, btcConnector, mvcConnector, network, _a, isPayBuzz, serviceFee, payInfo, content, publicImages, encryptContent, encryptImages, _b, nfts, payType, payTicker, _c, payAmount, manPubKey, manDomain, payTo, transactions, randomKey, _publicImages, _encryptImages, _encryptContent, _d, attachments, fileTransactions, _e, encryptAttachments, encryptFileTransactions, payload, path, metaidData, pid, ret, revealTxId, pinTransations, _f, sharedSecret, ecdhPubKey, contorlPayload, contorlPath, contorlMetaidData, ret, ret;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                buzz = params.buzz, feeRate = params.feeRate, host = params.host, chain = params.chain, btcConnector = params.btcConnector, mvcConnector = params.mvcConnector, network = params.network, _a = params.isPayBuzz, isPayBuzz = _a === void 0 ? false : _a, serviceFee = params.serviceFee, payInfo = params.payInfo;
                content = buzz.content, publicImages = buzz.publicImages, encryptContent = buzz.encryptContent, encryptImages = buzz.encryptImages, _b = buzz.nfts, nfts = _b === void 0 ? [] : _b;
                if (!!isPayBuzz) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.createNormalBuzz)(params)];
            case 1: return [2 /*return*/, _g.sent()];
            case 2:
                if (!payInfo) {
                    throw new Error("Please input pay info");
                }
                payType = payInfo.payType, payTicker = payInfo.payTicker, _c = payInfo.payAmount, payAmount = _c === void 0 ? 0 : _c, manPubKey = payInfo.manPubKey, manDomain = payInfo.manDomain, payTo = payInfo.payTo;
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
                transactions = [];
                randomKey = (0, utils_3.generateAESKey)();
                _publicImages = [];
                if (!(publicImages.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utils_1.image2Attach)((0, utils_2.convertToFileList)(publicImages))];
            case 3:
                _publicImages = _g.sent();
                _g.label = 4;
            case 4:
                _encryptImages = [];
                if (!(encryptImages.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, utils_1.image2Attach)((0, utils_2.convertToFileList)(encryptImages))];
            case 5:
                _encryptImages = _g.sent();
                _g.label = 6;
            case 6:
                _encryptContent = encryptContent
                    ? (0, utils_1.encryptPayloadAES)(randomKey, Buffer.from(encryptContent, "utf-8").toString("hex"))
                    : "";
                return [4 /*yield*/, (0, exports.postImages)(_publicImages, feeRate, host, chain, btcConnector, mvcConnector, network)];
            case 7:
                _d = _g.sent(), attachments = _d.attachments, fileTransactions = _d.fileTransactions;
                transactions = fileTransactions;
                return [4 /*yield*/, (0, exports.postEncryptImages)(_encryptImages, feeRate, host, chain, btcConnector, mvcConnector, randomKey, transactions, network)];
            case 8:
                _e = _g.sent(), encryptAttachments = _e.attachments, encryptFileTransactions = _e.fileTransactions;
                transactions = encryptFileTransactions;
                payload = {
                    publicContent: content,
                    encryptContent: _encryptContent,
                    contentType: "text/plain",
                    publicFiles: __spreadArray(__spreadArray([], nfts.map(function (nft) { return "metafile://nft/mrc721/".concat(nft.itemPinId); }), true), attachments, true),
                    encryptFiles: encryptAttachments,
                };
                path = "".concat(host || "", "/protocols/paybuzz");
                metaidData = {
                    operation: "create",
                    body: JSON.stringify(payload),
                    path: path,
                    contentType: "text/plain",
                    flag: "metaid",
                };
                pid = "";
                if (!(chain === "btc")) return [3 /*break*/, 10];
                return [4 /*yield*/, btcConnector.inscribe({
                        inscribeDataArray: [metaidData],
                        options: {
                            noBroadcast: "no",
                            feeRate: Number(feeRate),
                            service: serviceFee,
                        },
                    })];
            case 9:
                ret = _g.sent();
                if (ret.status)
                    throw new Error(ret.status);
                revealTxId = ret.revealTxIds[0];
                pid = "".concat(revealTxId, "i0");
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, mvcConnector.createPin(metaidData, {
                    network: network,
                    signMessage: "create paybuzz",
                    serialAction: "combo",
                    transactions: __spreadArray([], transactions, true),
                    // @ts-ignore
                    service: serviceFee,
                })];
            case 11:
                pinTransations = (_g.sent()).transactions;
                transactions = pinTransations;
                pid = transactions[transactions.length - 1].txComposer.getTxId() + "i0";
                _g.label = 12;
            case 12: return [4 /*yield*/, window.metaidwallet.common.ecdh({
                    externalPubKey: manPubKey,
                })];
            case 13:
                _f = _g.sent(), sharedSecret = _f.sharedSecret, ecdhPubKey = _f.ecdhPubKey;
                contorlPayload = {
                    controlPins: [pid],
                    manDomain: manDomain || "",
                    manPubkey: manPubKey,
                    creatorPubkey: ecdhPubKey,
                    encryptedKey: (0, utils_1.encryptPayloadAES)(sharedSecret, randomKey),
                };
                if (payType === "mrc20" && payTicker) {
                    contorlPayload.holdCheck = {
                        type: "mrc20",
                        ticker: payTicker.tick,
                        amount: "1",
                    };
                }
                else {
                    contorlPayload.payCheck = {
                        type: "chainCoin",
                        ticker: "",
                        amount: payAmount.toString(),
                        payTo: payTo,
                    };
                }
                contorlPath = "".concat(host || "", "/metaaccess/accesscontrol");
                contorlMetaidData = {
                    operation: "create",
                    body: JSON.stringify(contorlPayload),
                    path: contorlPath,
                    contentType: "text/plain",
                    flag: "metaid",
                };
                if (!(chain === "btc")) return [3 /*break*/, 15];
                return [4 /*yield*/, btcConnector.inscribe({
                        inscribeDataArray: [contorlMetaidData],
                        options: {
                            noBroadcast: "no",
                            feeRate: Number(feeRate),
                            service: serviceFee,
                        },
                    })];
            case 14:
                ret = _g.sent();
                if (ret.status)
                    throw new Error(ret.status);
                return [2 /*return*/, ret.revealTxIds[0]];
            case 15: return [4 /*yield*/, mvcConnector.createPin(contorlMetaidData, {
                    network: network,
                    signMessage: "create accesscontrol",
                    serialAction: "finish",
                    transactions: __spreadArray([], transactions, true),
                })];
            case 16:
                ret = _g.sent();
                return [2 /*return*/, ret.txid];
        }
    });
}); };
exports.createBuzz = createBuzz;
var createNormalBuzz = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var buzz, feeRate, host, chain, btcConnector, mvcConnector, network, serviceFee, publicImages, video, quotePin, _a, nfts, buzzEntity, fileTransactions, finalBody, _b, metafile, transactions, _publicImages, _c, attachments, imagesTransactions, createRes, buzzEntity_1, createRes;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                buzz = params.buzz, feeRate = params.feeRate, host = params.host, chain = params.chain, btcConnector = params.btcConnector, mvcConnector = params.mvcConnector, network = params.network, serviceFee = params.serviceFee;
                publicImages = buzz.publicImages, video = buzz.video, quotePin = buzz.quotePin, _a = buzz.nfts, nfts = _a === void 0 ? [] : _a;
                return [4 /*yield*/, btcConnector.use("buzz")];
            case 1:
                buzzEntity = _e.sent();
                fileTransactions = [];
                finalBody = {
                    content: buzz.content,
                    contentType: "text/plain",
                };
                if (!(video && chain === "mvc")) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.postVideo)(video.file, host, chain, btcConnector, mvcConnector, network)];
            case 2:
                _b = _e.sent(), metafile = _b.metafile, transactions = _b.transactions;
                fileTransactions = transactions;
                finalBody.attachments = [metafile];
                _e.label = 3;
            case 3:
                if (!(publicImages.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, utils_1.image2Attach)((0, utils_2.convertToFileList)(publicImages))];
            case 4:
                _publicImages = _e.sent();
                return [4 /*yield*/, (0, exports.postImages)(_publicImages, feeRate, host, chain, btcConnector, mvcConnector, network)];
            case 5:
                _c = _e.sent(), attachments = _c.attachments, imagesTransactions = _c.fileTransactions;
                fileTransactions = imagesTransactions;
                finalBody.attachments = __spreadArray(__spreadArray([], ((_d = finalBody.attachments) !== null && _d !== void 0 ? _d : []), true), attachments, true);
                _e.label = 6;
            case 6:
                if (quotePin) {
                    finalBody.quotePin = quotePin.id;
                }
                if (nfts.length > 0) {
                    finalBody.attachments = __spreadArray(__spreadArray([], nfts.map(function (nft) { return "metafile://nft/mrc721/".concat(nft.itemPinId); }), true), (finalBody.attachments || []), true);
                }
                if (!(chain === "btc")) return [3 /*break*/, 8];
                return [4 /*yield*/, buzzEntity.create({
                        dataArray: [
                            {
                                body: JSON.stringify(finalBody),
                                contentType: "text/plain;utf-8",
                                flag: "metaid",
                                path: "".concat(host || "", "/protocols/simplebuzz"),
                            },
                        ],
                        options: {
                            noBroadcast: "no",
                            feeRate: Number(feeRate),
                            service: serviceFee,
                        },
                    })];
            case 7:
                createRes = _e.sent();
                if (createRes === null || createRes === void 0 ? void 0 : createRes.revealTxIds[0]) {
                    return [2 /*return*/, createRes.revealTxIds[0]];
                }
                else {
                    throw new Error("create buzz failed");
                }
                return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, mvcConnector.load({
                    name: "buzz",
                    nodeName: "simplebuzz",
                    path: "".concat(host || "", "/protocols/simplebuzz"),
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
                })];
            case 9:
                buzzEntity_1 = (_e.sent());
                return [4 /*yield*/, buzzEntity_1.create({
                        data: { body: JSON.stringify(__assign({}, finalBody)) },
                        options: {
                            network: network,
                            signMessage: "create buzz",
                            serialAction: "finish",
                            transactions: fileTransactions,
                            service: serviceFee,
                        },
                    })];
            case 10:
                createRes = _e.sent();
                if (createRes.txid) {
                    return [2 /*return*/, createRes.txid];
                }
                else {
                    throw new Error("create buzz failed");
                }
                _e.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.createNormalBuzz = createNormalBuzz;
var postImages = function (images, feeRate, host, chain, btcConnector, mvcConnector, network) { return __awaiter(void 0, void 0, void 0, function () {
    var fileOptions, _i, images_1, image, fileEntity, imageRes, fileTransactions, fileEntity, finalAttachMetafileUri, i, fileOption, transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (images.length === 0)
                    return [2 /*return*/, {
                            attachments: [],
                            fileTransactions: [],
                        }];
                fileOptions = [];
                for (_i = 0, images_1 = images; _i < images_1.length; _i++) {
                    image = images_1[_i];
                    fileOptions.push({
                        body: Buffer.from(image.data, "hex").toString("base64"),
                        contentType: "".concat(image.fileType, ";binary"),
                        encoding: "base64",
                        flag: "metaid",
                        path: "".concat(host || "", "/file"),
                    });
                }
                if (!(chain === "btc")) return [3 /*break*/, 3];
                return [4 /*yield*/, btcConnector.use("file")];
            case 1:
                fileEntity = _a.sent();
                return [4 /*yield*/, fileEntity.create({
                        dataArray: fileOptions,
                        options: {
                            noBroadcast: "no",
                            feeRate: Number(feeRate),
                        },
                    })];
            case 2:
                imageRes = _a.sent();
                return [2 /*return*/, {
                        attachments: imageRes.revealTxIds.map(function (rid) { return "metafile://" + rid + "i0"; }),
                        fileTransactions: [],
                    }];
            case 3:
                fileTransactions = [];
                return [4 /*yield*/, mvcConnector.use("file")];
            case 4:
                fileEntity = (_a.sent());
                finalAttachMetafileUri = [];
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < fileOptions.length)) return [3 /*break*/, 8];
                fileOption = fileOptions[i];
                return [4 /*yield*/, fileEntity.create({
                        data: fileOption,
                        options: {
                            network: network,
                            signMessage: "upload image file",
                            serialAction: "combo",
                            transactions: fileTransactions,
                        },
                    })];
            case 6:
                transactions = (_a.sent()).transactions;
                if (!transactions) {
                    throw new Error("upload image file failed");
                }
                finalAttachMetafileUri.push("metafile://" +
                    transactions[transactions.length - 1].txComposer.getTxId() +
                    "i0");
                fileTransactions = transactions;
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/, {
                    fileTransactions: fileTransactions,
                    attachments: finalAttachMetafileUri,
                }];
        }
    });
}); };
exports.postImages = postImages;
var postEncryptImages = function (images, feeRate, host, chain, btcConnector, mvcConnector, randomKey, _fileTransactions, network) { return __awaiter(void 0, void 0, void 0, function () {
    var fileOptions, _i, images_2, image, fileEntity, imageRes, fileTransactions, fileEntity, finalAttachMetafileUri, i, fileOption, transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (images.length === 0)
                    return [2 /*return*/, {
                            attachments: [],
                            fileTransactions: __spreadArray([], _fileTransactions, true),
                        }];
                fileOptions = [];
                for (_i = 0, images_2 = images; _i < images_2.length; _i++) {
                    image = images_2[_i];
                    fileOptions.push({
                        body: (0, utils_1.encryptPayloadAES)(randomKey, Buffer.from(image.data, "hex").toString("hex")),
                        contentType: "binary",
                        encoding: "binary",
                        flag: "metaid",
                        path: "".concat(host || "", "/file"),
                    });
                }
                if (!(chain === "btc")) return [3 /*break*/, 3];
                return [4 /*yield*/, btcConnector.use("file")];
            case 1:
                fileEntity = _a.sent();
                return [4 /*yield*/, fileEntity.create({
                        dataArray: fileOptions,
                        options: {
                            noBroadcast: "no",
                            feeRate: Number(feeRate),
                        },
                    })];
            case 2:
                imageRes = _a.sent();
                return [2 /*return*/, {
                        attachments: imageRes.revealTxIds.map(function (rid) { return "metafile://" + rid + "i0"; }),
                        fileTransactions: [],
                    }];
            case 3:
                fileTransactions = __spreadArray([], _fileTransactions, true);
                return [4 /*yield*/, mvcConnector.use("file")];
            case 4:
                fileEntity = (_a.sent());
                finalAttachMetafileUri = [];
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < fileOptions.length)) return [3 /*break*/, 8];
                fileOption = fileOptions[i];
                return [4 /*yield*/, fileEntity.create({
                        data: fileOption,
                        options: {
                            network: network,
                            signMessage: "upload image file",
                            serialAction: "combo",
                            transactions: fileTransactions,
                        },
                    })];
            case 6:
                transactions = (_a.sent()).transactions;
                if (!transactions) {
                    throw new Error("upload image file failed");
                }
                finalAttachMetafileUri.push("metafile://" +
                    transactions[transactions.length - 1].txComposer.getTxId() +
                    "i0");
                fileTransactions = transactions;
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/, {
                    fileTransactions: fileTransactions,
                    attachments: finalAttachMetafileUri,
                }];
        }
    });
}); };
exports.postEncryptImages = postEncryptImages;
var postVideo = function (file, host, chain, btcConnector, mvcConnector, network) { return __awaiter(void 0, void 0, void 0, function () {
    var chunkTransactions, chunkSize, _a, chunks, chunkNumber, sha256, fileSize, dataType, name, chunkPids, chunkList, _loop_1, i, metaidData, pinTransations;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                chunkTransactions = [];
                chunkSize = 1024 * 1024 * 0.2;
                return [4 /*yield*/, (0, utils_1.processFile)(file, chunkSize)];
            case 1:
                _a = _b.sent(), chunks = _a.chunks, chunkNumber = _a.chunkNumber, sha256 = _a.sha256, fileSize = _a.fileSize, dataType = _a.dataType, name = _a.name;
                chunkPids = [];
                chunkList = [];
                _loop_1 = function (i) {
                    var _c, chunk, hash, metaidData_1, serialAction, _d, transactions, txid, allTxid;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _c = chunks[i], chunk = _c.chunk, hash = _c.hash;
                                metaidData_1 = {
                                    operation: "create",
                                    body: chunk,
                                    path: "".concat(host || "", "/file/chunk/").concat(hash),
                                    contentType: "metafile/chunk;binary",
                                    encoding: "base64",
                                    flag: "metaid",
                                };
                                if (!(chain === "btc")) return [3 /*break*/, 1];
                                return [3 /*break*/, 3];
                            case 1:
                                serialAction = (i + 1) % 4 === 0 ? "finish" : "combo";
                                return [4 /*yield*/, mvcConnector.createPin(metaidData_1, {
                                        network: network,
                                        signMessage: "file chunk",
                                        serialAction: serialAction,
                                        transactions: chunkTransactions,
                                    })];
                            case 2:
                                _d = _e.sent(), transactions = _d.transactions, txid = _d.txid, allTxid = _d.allTxid;
                                if (allTxid || i === chunks.length - 1) {
                                    if (allTxid) {
                                        chunkList = __spreadArray(__spreadArray([], chunkList, true), allTxid.map(function (txid) {
                                            return {
                                                sha256: hash,
                                                pinId: txid + "i0",
                                            };
                                        }), true);
                                    }
                                    else {
                                        chunkList = __spreadArray(__spreadArray([], chunkList, true), transactions.map(function (tx) {
                                            return {
                                                sha256: hash,
                                                pinId: tx.txComposer.getTxId() + "i0",
                                            };
                                        }), true);
                                    }
                                }
                                chunkTransactions = transactions;
                                _e.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < chunks.length)) return [3 /*break*/, 5];
                return [5 /*yield**/, _loop_1(i)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                metaidData = {
                    operation: "create",
                    body: JSON.stringify({
                        chunkList: chunkList,
                        fileSize: fileSize,
                        chunkSize: chunkSize,
                        dataType: dataType,
                        name: name,
                        chunkNumber: chunkNumber,
                        sha256: sha256,
                    }),
                    path: "".concat(host || "", "/file/index/").concat((0, uuid_1.v4)()),
                    contentType: "metafile/index;utf-8",
                    flag: "metaid",
                };
                return [4 /*yield*/, mvcConnector.createPin(metaidData, {
                        network: network,
                        signMessage: "file index",
                        serialAction: "combo",
                        transactions: __spreadArray([], (chunkTransactions !== null && chunkTransactions !== void 0 ? chunkTransactions : []), true),
                    })];
            case 6:
                pinTransations = (_b.sent()).transactions;
                chunkTransactions = pinTransations;
                return [2 /*return*/, {
                        transactions: chunkTransactions,
                        metafile: "metafile://video/" +
                            chunkTransactions[chunkTransactions.length - 1].txComposer.getTxId() +
                            "i0",
                    }];
        }
    });
}); };
exports.postVideo = postVideo;
