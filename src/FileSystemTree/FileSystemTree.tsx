import styles from "./FileSystemTree.module.css";
import renameIcon from "../assets/rename.svg";
import saveIcon from "../assets/save.svg";
import cancelIcon from "../assets/cancel.svg";
import addFileIcon from "../assets/add-file.svg";
import addFolderIcon from "../assets/add-folder.svg";
import fileIcon from "../assets/file.svg";
import folderIcon from "../assets/folder.svg";
import expandedIcon from "../assets/expanded.svg";
import collapsedIcon from "../assets/collapsed.svg";
import useFileSystemTree, { FileDataProps } from "./FileSystemTree.hook";
import { FileData } from "../file-system-backend/file-system-backend";

function FileSystemTree(props: FileDataProps) {
    const {
        isRenameInputEnabled,
        renameInputRef,
        isExpanded,
        isFileCreationEnabled,
        isFolderCreationEnabled,
        fileNameInputRef,
        folderNameInputRef,
        setIsRenameInputEnabled,
        setIsExpanded,
        setIsFileCreationEnabled,
        setIsFolderCreationEnabled,
        updateEntityName,
        addFileToList,
        addFolderToList
    } = useFileSystemTree(props);

    //UI Handlers
    function renameClickHandler() {
        setIsRenameInputEnabled(true);
    }

    function updateNameHandler() {
        if (renameInputRef.current!.value) {
            setIsRenameInputEnabled(false);
            updateEntityName(renameInputRef.current!.value);
        }
    }

    function expandCollapseHandler() {
        setIsExpanded(!isExpanded);
    }

    function createNewFileHandler() {
        setIsExpanded(true);
        setIsFileCreationEnabled(true);
        setIsFolderCreationEnabled(false);
    }

    function createNewFolderHandler() {
        setIsExpanded(true);
        setIsFileCreationEnabled(false);
        setIsFolderCreationEnabled(true);
    }

    function cancelEntityCreationHandler() {
        setIsFileCreationEnabled(false);
        setIsFolderCreationEnabled(false);
    }

    function saveFileHandler() {
        if (fileNameInputRef.current!.value) {
            addFileToList(fileNameInputRef.current!.value);
            cancelEntityCreationHandler();
        }
    }

    function saveFolderHandler() {
        cancelEntityCreationHandler();
        if (folderNameInputRef.current!.value) {
            addFolderToList(folderNameInputRef.current!.value);
            cancelEntityCreationHandler();
        }
    }

    return (
        <>
            <div className={styles.container}>
                {
                    isRenameInputEnabled ? (
                        //Rename entity
                        <>
                            <input defaultValue={props.entity.name} ref={renameInputRef} />
                            <button
                                className={styles.action_btn}
                                title="Save"
                                onClick={updateNameHandler}
                            >
                                <img src={saveIcon} />
                            </button>
                        </>
                    ) : (
                        //Entity info and actions
                        <>
                            <div className={styles.expand_collapse_container}>
                                {
                                    !props.entity.isFile && (
                                        <button
                                            className={styles.action_btn}
                                            onClick={expandCollapseHandler}
                                        >
                                            <img src={isExpanded ? expandedIcon : collapsedIcon} />
                                        </button>
                                    )
                                }
                            </div>
                            <img
                                className={styles.entity_icon}
                                src={props.entity.isFile ? fileIcon : folderIcon}
                            />
                            <p>{props.entity.name}</p>
                            <div className={styles.actions}>
                                {
                                    !props.entity.isFile && (
                                        <>
                                            <button
                                                className={styles.action_btn}
                                                title="Add File"
                                                onClick={createNewFileHandler}
                                            >
                                                <img src={addFileIcon} />
                                            </button>
                                            <button
                                                className={styles.action_btn}
                                                title="Add Folder"
                                                onClick={createNewFolderHandler}
                                            >
                                                <img src={addFolderIcon} />
                                            </button>
                                        </>
                                    )
                                }
                                {
                                    !props.entity.isRoot && (
                                        <>
                                            <button
                                                className={styles.action_btn}
                                                title="Rename"
                                                onClick={renameClickHandler}
                                            >
                                                <img src={renameIcon} />
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
            {
                isExpanded && (
                    <div className={styles.children_container}>
                        {
                            isFileCreationEnabled && (
                                //File creation form
                                <>
                                    <input ref={fileNameInputRef} placeholder="Enter File Name" />
                                    <button
                                        className={styles.action_btn}
                                        title="Save"
                                        onClick={saveFileHandler}
                                    >
                                        <img src={saveIcon} />
                                    </button>
                                    <button
                                        className={styles.action_btn}
                                        title="Save"
                                        onClick={cancelEntityCreationHandler}
                                    >
                                        <img src={cancelIcon} />
                                    </button>
                                </>
                            )
                        }
                        {
                            isFolderCreationEnabled && (
                                //Folder creation form
                                <>
                                    <input ref={folderNameInputRef} placeholder="Enter Folder Name" />
                                    <button
                                        className={styles.action_btn}
                                        title="Save"
                                        onClick={saveFolderHandler}
                                    >
                                        <img src={saveIcon} />
                                    </button>
                                    <button
                                        className={styles.action_btn}
                                        title="Save"
                                        onClick={cancelEntityCreationHandler}
                                    >
                                        <img src={cancelIcon} />
                                    </button>
                                </>
                            )
                        }
                        {
                            //Child folders
                            props.entity.folderList.map((folder: FileData) => (
                                <FileSystemTree key={folder.id} entity={folder} />
                            ))
                        }
                        {
                            //Child files
                            props.entity.fileList.map((file: FileData) => (
                                <FileSystemTree key={file.id} entity={file} />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}


export default FileSystemTree;
