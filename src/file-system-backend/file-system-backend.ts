export type FileData = {
    id: number;
    name: string;
    isFile: boolean;
    isRoot: boolean;
    fileList: FileData[];
    folderList: FileData[];
}

export const fileSystemTree: FileData = {
    id: 0,
    name: "Root",
    isFile: false,
    isRoot: true,
    fileList: [],
    folderList: []
}
