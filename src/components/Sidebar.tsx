interface SidebarProperties {
  onHide: () => void
}

const Sidebar = ({ onHide }: SidebarProperties) => {
  
  const handleHide = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (onHide) {
      onHide();
    }
  }

  const handlePreventPropgation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return <div className="bg-red-500 h-full w-full absolute" onClick={handleHide}>
    <div className="main-content bg-black bg-opacity-85 h-full w-[500px] fixed -right-2 z-40 backdrop-blur-sm p-o m-0" onClick={handlePreventPropgation}>
      <div className="main-title bg-black text-center p-2 w-full animate-pulse">
        <h2 className="font-bold">Historial de redes emitidas</h2>
      </div>
    </div>
  </div>
}

export default Sidebar;