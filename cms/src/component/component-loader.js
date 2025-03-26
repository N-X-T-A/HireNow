import { ComponentLoader } from "adminjs";
import path from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentLoader = new ComponentLoader()

const Component = {
    TruncateText: componentLoader.add(
        "TruncateText",
        path.join(__dirname, './Text/TruncateText.jsx')
    ),

    PreviewImage: componentLoader.add(
        "PreviewImage",
        path.join(__dirname, './Image/Preview.jsx')
    ),
    ShowImage: componentLoader.add(
        "ShowImage",
        path.join(__dirname, './Image/Show.jsx')
    ),
    ComboboxDetail: componentLoader.add(
        "ComboboxDetail",
        path.join(__dirname, './Combobox/Detail.jsx')
    )
}


export { componentLoader, Component }
