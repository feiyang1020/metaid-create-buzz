export declare enum IsEncrypt {
    Yes = 1,
    No = 0
}
export interface AttachmentItem {
    fileName: string;
    fileType: string;
    data: string;
    encrypt: IsEncrypt;
    sha256: string;
    size: number;
    url: string;
}
/**
 * 解析元文件URL
 * @param rawUri - 原始URI字符串，支持metafile://和metacontract://协议
 * @returns 解析后的完整URL
 * @example
 * parseMetaFile('metafile://example.jpg') // => 'https://api.show3.io/metafile/example.jpg'
 */
export declare function parseMetaFile(rawUri: string): string;
export declare function parseAvatarWithMetaid(metaid: string): string;
export declare function parseAvatarWithUri(originUri: string, txid: string): string | undefined;
export declare function compressImage(image: File | Blob): Promise<File>;
export declare function FileToAttachmentItem(file: File, encrypt?: IsEncrypt): Promise<AttachmentItem>;
export declare function FileToBinaryData(file: File, encrypt?: IsEncrypt): Promise<AttachmentItem>;
export declare const image2Attach: (images: FileList) => Promise<AttachmentItem[]>;
export declare const mergeFileLists: (fileListA: FileList, fileListB: FileList) => FileList;
export declare function removeFileFromList(fileList: FileList, index: number): FileList;
export declare const convertToFileList: (images: {
    file: File;
}[]) => FileList;
export declare function calculateChunkHash(chunk: ArrayBuffer): string;
type FileChunk = {
    chunk: string;
    hash: string;
};
export type MetaFile = {
    sha256: string;
    fileSize: number;
    chunkNumber: number;
    chunkSize: number;
    dataType: string;
    name: string;
    chunks: FileChunk[];
};
export declare function processFile(file: File, chunkSize: number): Promise<MetaFile>;
export declare function generateAESKey(): string;
export declare function encryptPayloadAES(keyHex: string, payload: string): string;
export {};
