import { SidebarClose } from "lucide-react";

interface SidebarProperties {
  children?: React.ReactNode,
  title?: string,
  onHide: () => void,
  visibility?: boolean,
}

const Sidebar = ({ children, title, onHide, visibility }: SidebarProperties) => {

  const handleHide = (e: any) => {
    handlePreventPropgation(e);
    if (onHide) {
      onHide();
    }
  }

  const handlePreventPropgation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return <div className={["bg-transparent h-full w-full absolute z-50 transition-transform duration-300", visibility ? "-translate-x-[0%]" : "translate-x-[100%]"].join(" ")} onClick={handleHide}>
    <div className={["main-content bg-blue-950 bg-opacity-70 h-full w-[500px] fixed -right-2 z-40 backdrop-blur-sm p-o m-0", visibility ? "opacity-100" : "opacity-0"].join(" ")} onClick={handlePreventPropgation}>
      <div className="main-title bg-black bg-opacity-75 text-center p-2 w-full select-none">
        <div className="titlebar flex flex-row items-center justify-between px-4">
          <button onClick={handleHide} className="hover:scale-105 active:scale-95 transition-transform"><SidebarClose size={24} className="text-white" /></button>
          {title && <h2 className="font-bold animate-pulse text-center w-full">{title}</h2>}
        </div>
      </div>
      <div className="bg-red-500 w-full h-full p-2 overflow-hidden overflow-y-auto">
          {children}
        </div>
    </div>

  </div>
}

export default Sidebar;