import styles from "./App.module.css";
import FileSystemTree from "./FileSystemTree/FileSystemTree";
import { fileSystemTree } from "./file-system-backend/file-system-backend";

function App() {

    return (
        <div className={styles.container}>
            <FileSystemTree entity={fileSystemTree} />
        </div>
    )
}


export default App;