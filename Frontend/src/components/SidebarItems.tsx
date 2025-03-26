import { ReactElement } from "react"

interface SidebarItemsProps {
    icon : ReactElement,
    iconName : string
}
export const SidebarItems = ({icon , iconName} : SidebarItemsProps) => {
    return(
        <>
        <div className="flex gap-4 p-2 hover:bg-gray-200 rounded-md">
            <div>{icon}</div>
            <div className="text-md font-medium font-sans">{iconName}</div>
        </div>
        </>
    )
}