import { useRef, useState } from "react";
import { FileData } from "../file-system-backend/file-system-backend";

export type FileDataProps = {
    entity: FileData;
}

const useFileSystemTree = (props: FileDataProps) => {
    const [isRenameInputEnabled, setIsRenameInputEnabled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFileCreationEnabled, setIsFileCreationEnabled] = useState(false);
    const [isFolderCreationEnabled, setIsFolderCreationEnabled] = useState(false);
    const renameInputRef = useRef<HTMLInputElement>(null);
    const fileNameInputRef = useRef<HTMLInputElement>(null);
    const folderNameInputRef = useRef<HTMLInputElement>(null);

    //Business logic
    function updateEntityName(newName: string) {
        props.entity.name = newName;
    }

    function addFileToList(fileName: string) {
        const newFile: FileData = {
            id: Date.now(),
            name: fileName,
            isFile: true,
            isRoot: false,
            fileList: [],
            folderList: []
        }

        props.entity.fileList = [newFile, ...props.entity.fileList];
    }

    function addFolderToList(folderName: string) {
        const newFolder: FileData = {
            id: Date.now(),
            name: folderName,
            isFile: false,
            isRoot: false,
            fileList: [],
            folderList: []
        }

        props.entity.folderList = [newFolder, ...props.entity.folderList];
    }

    return {
        isRenameInputEnabled,
        renameInputRef,
        fileNameInputRef,
        folderNameInputRef,
        isExpanded,
        isFileCreationEnabled,
        isFolderCreationEnabled,
        setIsRenameInputEnabled,
        setIsExpanded,
        setIsFileCreationEnabled,
        setIsFolderCreationEnabled,
        updateEntityName,
        addFileToList,
        addFolderToList
    }
}

export default useFileSystemTree;
