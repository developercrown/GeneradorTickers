interface ContentBlockTitleInterface {
  children?: React.ReactNode,
  title?: string,
}

const ContentBlockTitle = ({ children, title }: ContentBlockTitleInterface) => {
  return <div className="titlebar flex flex-row w-full items-start justify-center">
    <h2 className="text-2xl font-bold mb-6 text-center w-full">{title} </h2>
    {children}
  </div>
}

interface ContentBlockInterface {
  className?: string;
  children?: React.ReactNode;
  width?: string;      // Ej: "w-full", "w-64", "min-w-[300px]"
  height?: string;     // Ej: "h-full", "h-64", "max-h-[500px]"
  scrollX?: boolean;   // Habilitar scroll horizontal
  scrollY?: boolean;   // Habilitar scroll vertical
  theme?: string,
  overflowHidden?: boolean; // Forzar ocultar overflow
}

const ContentBlock = ({
  children,
  className = '',
  width = 'w-full',
  height = 'h-auto',
  scrollX = false,
  scrollY = true,
  overflowHidden = false,
  theme = "bg-gray-800/50 border-gray-700/30 border"
}: ContentBlockInterface) => {
  const scrollClasses = [
    overflowHidden ? 'overflow-hidden' : '',
    scrollX ? 'overflow-x-auto' : 'overflow-x-hidden',
    scrollY ? 'overflow-y-auto' : 'overflow-y-hidden'
  ].join(' ');
  return <div
    className={[
      "content-block p-4 ",
      theme,
      width,
      height,
      scrollClasses,
      className
    ].join(" ").trim()}
  >
    {children}
  </div>
}


interface LayoutInterface {
  className?: string
  children?: React.ReactNode
}

const Layout = ({ className, children }: LayoutInterface) => {
  //max-w-4xl h-full mx-auto
  return <div className={["m-0 p-0 flex", className].join(" ")}>{children}</div>
}

export default Layout;
export {
  ContentBlock,
  ContentBlockTitle
}