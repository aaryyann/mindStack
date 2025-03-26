import { Twitter , Link2 ,ArrowRightLeft , Youtube  , File} from "lucide-react"
import { SidebarItems } from "./SidebarItems"



export  const Sidebar = () => {
    return(
        <>
        <div className={"w-[120%] border-r-2 bg-white h-screen bg-gray-900"}>
            <div className="h-screen ml-3">
            <div className="p-3">
                <SidebarItems icon={<ArrowRightLeft/>} iconName="All"/>
                <SidebarItems icon={<Twitter/>} iconName="Twitter"/>
                <SidebarItems icon={<Youtube/>} iconName="Vedios"/>
                <SidebarItems icon={<Link2/>} iconName="Links"/>
                <SidebarItems icon={<File/>} iconName="Document"/>
            </div>
            </div>
        </div>
        </>
    )
}