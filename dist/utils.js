"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFileList = exports.mergeFileLists = exports.image2Attach = exports.IsEncrypt = void 0;
exports.parseMetaFile = parseMetaFile;
exports.parseAvatarWithMetaid = parseAvatarWithMetaid;
exports.parseAvatarWithUri = parseAvatarWithUri;
exports.compressImage = compressImage;
exports.FileToAttachmentItem = FileToAttachmentItem;
exports.FileToBinaryData = FileToBinaryData;
exports.removeFileFromList = removeFileFromList;
exports.calculateChunkHash = calculateChunkHash;
exports.processFile = processFile;
exports.generateAESKey = generateAESKey;
exports.encryptPayloadAES = encryptPayloadAES;
var browser_image_compression_1 = __importDefault(require("browser-image-compression"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var crypto_js_2 = require("crypto-js");
var CryptoJS = crypto_js_1.default;
var IsEncrypt;
(function (IsEncrypt) {
    IsEncrypt[IsEncrypt["Yes"] = 1] = "Yes";
    IsEncrypt[IsEncrypt["No"] = 0] = "No";
})(IsEncrypt || (exports.IsEncrypt = IsEncrypt = {}));
/**
 * 解析元文件URL
 * @param rawUri - 原始URI字符串，支持metafile://和metacontract://协议
 * @returns 解析后的完整URL
 * @example
 * parseMetaFile('metafile://example.jpg') // => 'https://api.show3.io/metafile/example.jpg'
 */
function parseMetaFile(rawUri) {
    var METAFILE_API_HOST = "https://api.show3.io/metafile";
    var METACONTRACT_API_HOST = "https://api.show3.io/metafile/metacontract";
    var uri = rawUri.split(/metafile:\/\/|metacontract:\/\//)[1];
    // if there is no extension name in metaFile, add .png
    if (rawUri.includes("metafile")) {
        return "".concat(METAFILE_API_HOST, "/").concat(uri);
    }
    else if (rawUri.includes("metacontract")) {
        return "".concat(METACONTRACT_API_HOST, "/").concat(uri);
    }
    else {
        return rawUri;
    }
}
function parseAvatarWithMetaid(metaid) {
    var METAFILE_API_HOST = "https://api.show3.io/metafile";
    return "".concat(METAFILE_API_HOST, "/avatar/compress/").concat(metaid);
}
function parseAvatarWithUri(originUri, txid) {
    var METAFILE_API_HOST = "https://api.show3.io/metafile";
    if (originUri.includes("metafile")) {
        return "".concat(METAFILE_API_HOST, "/compress/").concat(txid);
    }
    if (originUri.includes("sensibile")) {
        return "".concat(METAFILE_API_HOST, "/sensible/").concat(originUri.split("sensibile://")[1]);
    }
    if (originUri.includes("metacontract")) {
        return "".concat(METAFILE_API_HOST, "/metacontract/").concat(originUri.split("metacontract://")[1]);
    }
}
function compressImage(image) {
    return __awaiter(this, void 0, void 0, function () {
        var file, options, compressedFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = image instanceof Blob ? new File([image], "image.png") : image;
                    options = {
                        maxSizeMB: 0.3,
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                    };
                    return [4 /*yield*/, (0, browser_image_compression_1.default)(file, options)];
                case 1:
                    compressedFile = _a.sent();
                    return [2 /*return*/, compressedFile];
            }
        });
    });
}
// 降文件转为 AttachmentItem， 便于操作/上链
function FileToAttachmentItem(file, encrypt) {
    var _this = this;
    if (encrypt === void 0) { encrypt = IsEncrypt.No; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        function readResult(blob) {
            return new Promise(function (resolve) {
                var reader = new FileReader();
                reader.onload = function () {
                    // @ts-ignore
                    var wordArray = crypto_js_1.default.lib.WordArray.create(reader.result);
                    // @ts-ignore
                    var buffer = Buffer.from(reader.result);
                    // console.log("buffer", buffer, reader.result);
                    hex += buffer.toString("hex"); // 更新hex
                    // 增量更新计算结果
                    sha256Algo.update(wordArray); // 更新hash
                    resolve();
                };
                reader.readAsArrayBuffer(blob);
            });
        }
        var chunkSize, hex, sha256Algo, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chunkSize = 20 * 1024 * 1024;
                    hex = "";
                    sha256Algo = crypto_js_1.default.algo.SHA256.create();
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < file.size)) return [3 /*break*/, 4];
                    return [4 /*yield*/, readResult(file.slice(index, index + chunkSize))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index += chunkSize;
                    return [3 /*break*/, 1];
                case 4:
                    resolve({
                        data: hex,
                        fileName: file.name,
                        fileType: file.type,
                        sha256: crypto_js_2.enc.Hex.stringify(sha256Algo.finalize()),
                        url: URL.createObjectURL(file),
                        encrypt: encrypt,
                        size: file.size,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
function FileToBinaryData(file, encrypt) {
    var _this = this;
    if (encrypt === void 0) { encrypt = IsEncrypt.No; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        function readResult(file) {
            return new Promise(function (resolve) {
                var reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = function () {
                    var _a;
                    // @ts-ignore
                    var wordArray = crypto_js_1.default.lib.WordArray.create(reader.result);
                    // 增量更新计算结果
                    sha256Algo.update(wordArray); // 更新hash
                    // @ts-ignore
                    // const buffer = Buffer.from(reader.result);
                    // console.log("buffer", buffer, reader.result);
                    // hex += buffer.toString("hex"); // 更新hex
                    binaryData = (_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString("UTF-8");
                    // String.fromCharCode.apply(null, reader.result)
                    resolve();
                };
            });
        }
        var sha256Algo, binaryData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sha256Algo = crypto_js_1.default.algo.SHA256.create();
                    binaryData = "";
                    return [4 /*yield*/, readResult(file)];
                case 1:
                    _a.sent();
                    resolve({
                        data: binaryData,
                        fileName: file.name,
                        fileType: file.type,
                        sha256: crypto_js_2.enc.Hex.stringify(sha256Algo.finalize()),
                        url: URL.createObjectURL(file),
                        encrypt: encrypt,
                        size: file.size,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
var image2Attach = function (images) { return __awaiter(void 0, void 0, void 0, function () {
    var attachments, i, current, compressed, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                attachments = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < images.length)) return [3 /*break*/, 5];
                current = images[i];
                return [4 /*yield*/, compressImage(current)];
            case 2:
                compressed = _a.sent();
                return [4 /*yield*/, FileToAttachmentItem(current.type === "image/gif" ? current : compressed)];
            case 3:
                result = _a.sent();
                if (result)
                    attachments.push(result);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, attachments];
        }
    });
}); };
exports.image2Attach = image2Attach;
var mergeFileLists = function (fileListA, fileListB) {
    var dataTransfer = new DataTransfer();
    for (var i = 0; i < fileListA.length; i++) {
        dataTransfer.items.add(fileListA[i]);
    }
    for (var i = 0; i < fileListB.length; i++) {
        dataTransfer.items.add(fileListB[i]);
    }
    return dataTransfer.files;
};
exports.mergeFileLists = mergeFileLists;
function removeFileFromList(fileList, index) {
    // Step 1: Create a new File array without the file at the specified index
    var filesArray = Array.from(fileList)
        .slice(0, index)
        .concat(Array.from(fileList).slice(index + 1));
    // Step 2: Create a new FileList object with the remaining files
    var newFileList = new DataTransfer();
    for (var i = 0; i < filesArray.length; i++) {
        newFileList.items.add(filesArray[i]);
    }
    // Step 3: Return the new FileList object
    return newFileList.files;
}
var convertToFileList = function (images) {
    var dataTransfer = new DataTransfer();
    images.forEach(function (image) {
        dataTransfer.items.add(image.file); // 添加每个 File 对象
    });
    return dataTransfer.files; // 返回 FileList 对象
};
exports.convertToFileList = convertToFileList;
// Calculate the SHA-256 hash of a chunk
function calculateChunkHash(chunk) {
    // Convert ArrayBuffer to CryptoJS WordArray
    var wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(chunk));
    // Compute the SHA-256 hash
    var hash = CryptoJS.SHA256(wordArray);
    // Return the hash as a hexadecimal string
    return hash.toString(CryptoJS.enc.Hex);
}
// Convert a chunk to a hex string
function chunkToHexString(chunk) {
    // Convert ArrayBuffer to CryptoJS WordArray
    var wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(chunk));
    // Convert the WordArray to a hex string
    return wordArray.toString(CryptoJS.enc.Hex);
}
function processFile(file, chunkSize) {
    return __awaiter(this, void 0, void 0, function () {
        var totalChunks, chunks, metafile, _a, i, chunk, chunkBuffer, chunkBase64Str, chunkHash;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("file", file.size);
                    totalChunks = Math.ceil(file.size / chunkSize);
                    chunks = Array.from({ length: totalChunks }, function (_, index) {
                        var start = index * chunkSize;
                        var end = Math.min(start + chunkSize, file.size);
                        return file.slice(start, end);
                    });
                    _b = {};
                    _a = calculateChunkHash;
                    return [4 /*yield*/, file.arrayBuffer()];
                case 1:
                    metafile = (_b.sha256 = _a.apply(void 0, [_c.sent()]),
                        _b.fileSize = file.size,
                        _b.chunkNumber = chunks.length,
                        _b.chunkSize = chunkSize,
                        _b.dataType = file.type,
                        _b.name = file.name,
                        _b.chunks = [],
                        _b);
                    i = 0;
                    _c.label = 2;
                case 2:
                    if (!(i < chunks.length)) return [3 /*break*/, 5];
                    chunk = chunks[i];
                    return [4 /*yield*/, chunk.arrayBuffer()];
                case 3:
                    chunkBuffer = _c.sent();
                    chunkBase64Str = btoa(new Uint8Array(chunkBuffer).reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ""));
                    chunkHash = calculateChunkHash(chunkBuffer);
                    metafile.chunks.push({
                        chunk: chunkBase64Str,
                        hash: chunkHash,
                    });
                    _c.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, metafile];
            }
        });
    });
}
function generateAESKey() {
    // 32 字节 = 256 位
    var key = CryptoJS.lib.WordArray.random(32);
    // 将密钥转换为十六进制字符串
    return key.toString(CryptoJS.enc.Hex);
}
function encryptPayloadAES(keyHex, payload) {
    var key = CryptoJS.enc.Hex.parse(keyHex);
    var payloadWordArray = CryptoJS.enc.Hex.parse(payload);
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(payloadWordArray, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });
    var ivAndCiphertext = iv.concat(encrypted.ciphertext);
    return ivAndCiphertext.toString(CryptoJS.enc.Hex);
}
