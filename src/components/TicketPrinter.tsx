import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { getImage } from '../utils/ImageUtils';

interface ActionButtonProperties {
    icon: React.ReactNode;
    title: string;
    action: () => void;
    disabled?: boolean
}

const ActionButton = ({ icon, title, action, disabled = false }: ActionButtonProperties) => {
    const styleClasses = "p-2 text-gray-600 no-transition-effects " + (disabled ? "opacity-40" : "hover:bg-opacity-30 hover:text-white hover:text-opacity-90 active:scale-95")
    return <button onClick={action} title={title}
        className={styleClasses}>
        {icon}
    </button>
}

// Tipos para las props del componente
type TicketRow = {
    label: string;
    value?: string | null;
    type: "string" | "number" | "image" | "qr"
};

type FooterItem = {
    classNames?: string;
    value: string;
};

type TicketPrinterProps = {
    title: string;
    subtitle?: string;
    ticketContent?: TicketRow[];
    highlightContent?: TicketRow[];
    footerContent?: FooterItem[];
    showPreview?: boolean;
    showDownload?: boolean;
    showPrint?: boolean;
    onPrint?: () => void;
};

const TicketPrinter: React.FC<TicketPrinterProps> = ({
    title,
    subtitle = 'CORONA TICKET SYSTEM 1.0',
    ticketContent = [],
    highlightContent = [],
    footerContent = [],
    showPreview = true,
    showDownload = false,
    showPrint = true,
    onPrint,
}) => {
    const logoUPN = getImage('LogotipoUPN');
    const logoSistemas = getImage('LogotipoSistemas');
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);
    // Función para generar el HTML completo del ticket
    const generateTicketHTML = (logosistemas: string, logoupn: string) => {
        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TicketsGenerator 1.0</title>
    <style>
        /* Reset y estilos base compatibles con Tailwind */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial Narrow', Arial, sans-serif;
            line-height: 1.5; /* leading-normal */
        }
        
        body {
            background-color: white;
            color: black;
            width: 58mm;
            height: auto;
            padding: 1mm; /* p-1 */
            font-size: 14px; /* text-base */
            margin: 0;
        }
        
        .ticket {
            border: 1px solid #e1e1e1; /* border */
            border-radius: 4px; /* rounded */
            padding: 2mm; /* p-2 */
            box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* shadow-sm */
            position: relative;
            overflow: hidden;
        }
        
        /* Encabezado - Flexbox como Tailwind */
        .header {
            width: 100%;
            display: flex;
            justify-content: center; /* justify-center */
            align-items: center; /* items-center */
            margin-top: 2mm; /* mt-2 */
            margin-bottom: 1mm; /* mb-1 */
            padding-bottom: 2mm; /* pb-2 */
            border-bottom: 2px solid #000; /* border-b-2 border-black */
        }
        
        .imgUPN, .imgSISTEMAS {
            height: 25mm;
            width: auto;
            object-fit: contain; /* object-contain */
        }
        
        /* Titulo principal */
        .title-container {
            text-align: center; /* text-center */
            margin: 1.5mm 0 0 0; /* mt-1.5 */
            position: relative;
        }
        
        .title {
            font-size: 18px; /* text-lg */
            font-weight: bold; /* font-bold */
            text-transform: uppercase; /* uppercase */
            letter-spacing: 0.5px; /* tracking-wider */
            color: #000; /* text-black */
            margin-bottom: 2mm; /* mb-2 */
        }
        
        .subtitle {
            font-size: 14px; /* text-sm */
            font-weight: bold; /* font-bold */
            color: #000; /* text-black */
            letter-spacing: 0.3px; /* tracking-wider */
        }
        
        .title-decoration {
            height: 1px; /* h-px */
            background: linear-gradient(90deg, transparent, #000, transparent); /* bg-gradient-to-r */
            margin: 3mm auto; /* mx-auto my-3 */
            width: 70%; /* w-7/10 */
        }
        
        /* Contenido del ticket */
        .ticket-content {
            width: 100%; /* w-full */
            margin: 2mm 0; /* my-2 */
        }
        
        .ticket-row {
            display: flex; /* flex */
            justify-content: space-between; /* justify-between */
            margin-bottom: 1mm; /* mb-1 */
            padding-bottom: 1mm; /* pb-1 */
            border-bottom: 1px dashed #000; /* border-b border-dotted border-black */
        }
        
        .ticket-label {
            font-weight: bold; /* font-bold */
            color: #374151; /* text-gray-700 */
            font-size: 14px; /* text-sm */
        }
        
        .ticket-value {
            flex: 1; /* flex-1 */
            text-align: right; /* text-right */
            font-weight: bold; /* font-bold */
            color: #000; /* text-black */
            font-size: 14px; /* text-sm */
        }
        
        /* Destacar información importante */
        .highlight-row {
            padding: 0mm; /* p-0 */
            border-radius: 3px; /* rounded-sm */
            margin: 0mm 0; /* m-0 */
        }
        
        .highlight-label {
            font-weight: bold; /* font-bold */
            color: #000; /* text-black */
        }
        
        /* Footer */
        .footer {
            text-align: center; /* text-center */
            margin-top: 1mm; /* mt-1 */
            padding-top: 3mm; /* pt-3 */
            border-top: 1px dashed #000; /* border-t-2 border-dashed border-black */
            font-size: 12px; /* text-xs */
            color: #000; /* text-black */
            line-height: 1.3; /* leading-snug */
        }
        
        /* Utilidades adicionales Tailwind */
        .mb-1 { margin-bottom: 0.25rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mr-1 { margin-right: 0.25rem; }
        .ml-1 { margin-left: 0.25rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .my-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
        
        .p-1 { padding: 0.25rem; }
        .pt-1 { padding-top: 0.25rem; }
        .pb-1 { padding-bottom: 0.25rem; }
        .px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        
        .text-left { text-align: left; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        
        .font-normal { font-weight: 400; }
        .font-bold { font-weight: 700; }
        
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.875rem; }
        .text-base { font-size: 1rem; }
        .text-lg { font-size: 1.125rem; }
        
        .rounded { border-radius: 0.25rem; }
        .rounded-sm { border-radius: 0.125rem; }
        
        .border { border-width: 1px; }
        .border-0 { border-width: 0; }
        .border-2 { border-width: 2px; }
        
        .border-black { border-color: #000; }
        .border-gray-300 { border-color: #d1d5db; }
        
        .border-solid { border-style: solid; }
        .border-dashed { border-style: dashed; }
        .border-dotted { border-style: dotted; }
        
        /* Estilos para impresión */
        @media print {
            @page {
                size: 58mm 100mm;
                margin: 0;
            }
            
            body {
                width: 58mm;
                height: auto;
                min-height: 100mm;
                padding: 2mm;
                margin: 0;
                font-size: 14px !important;
                overflow: hidden;
                background: white;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .ticket {
                border: none;
                box-shadow: none;
                padding: 1mm;
                page-break-inside: avoid;
                break-inside: avoid;
            }

            .ticket-row {
                border-bottom: 1px dashed #000; /* border-b border-dotted border-black */
            }
            
            /* Asegurar que todo el contenido sea negro para impresión */
            * {
                color: black !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            /* Evitar cortes de página en elementos importantes */
            .ticket-content, .highlight-row, .footer {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            /* Optimizar fuentes para impresión */
            body, .ticket-label, .ticket-value, .title, .subtitle {
                font-family: 'Arial Narrow', Arial, sans-serif !important;
                -webkit-print-font-smoothing: antialiased;
            }
        }
    </style>
</head>
<body>
    <div class="ticket">
        <header class="header">
            <img class="imgSISTEMAS" src="${logosistemas}" alt="Logo Sistemas">
            <img class="imgUPN" src="${logoupn}" alt="Logo UPN">
        </header>
        
        <div class="title-container">
            <h1 class="title">${title}</h1>
            <div class="title-decoration"></div>
            <p class="subtitle">${subtitle}</p>
        </div>
        
        <div class="ticket-content">
            ${ticketContent.map(row => {
            if (row.type == "qr") {
                return `
                    <div class="ticket-row">
                        <img
                            src={${row.value}}
                            alt="QR Code"
                            className="w-[300px] h-[300px] mx-auto mb-4"
                            />
                    </div>
                    `
            } else if (row.type == "image") {
                return `
                    <div class="ticket-row">
                        <span class="ticket-label">${row.label}:</span>
                        <span class="ticket-value">${row.value}</span>
                    </div>
                    `
            } else {
                return `
                    <div class="ticket-row">
                        <span class="ticket-label">${row.label}:</span>
                        <span class="ticket-value">${row.value}</span>
                    </div>
                    `
            }
        }).join('')}
        </div>
        
        ${highlightContent.length > 0 ? `
        <div class="highlight-row">
            ${highlightContent.map(row => {
            if (row.type == "qr") {
                return `
                    <div class="ticket-row flex" style="border-bottom:none; margin-bottom:0; flex-direction: column;">
                        <span class="ticket-label highlight-label text-center">${row.label}:</span>
                        <img
                            src="${row.value}"
                            alt="QR Code"
                            className="mx-auto mb-4 ml-4"
                            style="width: 180px; height: 180px; margin-bottom: 4px; margin-left: 6px;"
                            />
                    </div>
                    `;
            } else {
                return `<div class="ticket-row" style="border-bottom:none; margin-bottom:0;">
                <span class="ticket-label highlight-label">${row.label}:</span>
                <span class="ticket-value highlight-label">${row.value}</span>
            </div>`;
            }
        }
        ).join('')}
        </div>
        ` : ''}
        
        ${footerContent.length > 0 ? `
        <div class="footer">
            ${footerContent.map(item => `
            <div class="${item.classNames || ''}">${item.value}</div>
            `).join('')}
        </div>
        ` : ''}
    </div>
    
    <script>
        // Autoimpresión al cargar
        // window.onload = function() {
        //     setTimeout(function() {
        //         window.print();
        //         setTimeout(function() {
        //             window.close();
        //         }, 50);
        //     }, 50);
        // };
    </script>
</body>
</html>`;
    };

    async function convertirImagenABase64(url: any): Promise<string> {
        // console.log("urle", url);

        try {
            // Si ya es un string base64, retornarlo directamente
            if (url.startsWith('data:image')) {
                return url;
            }

            // Para imágenes en el filesystem (React/Webpack)
            if (typeof url === 'string' && url.startsWith('/')) {
                const response = await fetch(url);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            }

            // Para imports directos de imágenes (require o import)
            if (typeof url === 'object' && url.default) {
                const response = await fetch(url.default);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            }

            throw new Error('Formato de imagen no soportado');
        } catch (error) {
            console.error('Error al convertir imagen a Base64:', error);
            return ''; // O podrías retornar un placeholder en base64
        }
    }

    // Función para imprimir el ticket
    const handlePrintTicket = async () => {

        const ls = await convertirImagenABase64(logoSistemas);
        const lupn = await convertirImagenABase64(logoUPN);

        try {
            const ticketHTML = generateTicketHTML(ls, lupn);
            const result = await window.electron.ipcRenderer.invoke('print-ticket', ticketHTML);
            if (!result.success) {
                console.log(`Error al imprimir: ${result.error || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al invocar print-ticket:', error);
        }

        if (onPrint) {
            onPrint();
        }
    };

    const handleDownloadTicket = async () => {
        if (canvasRef.current) {
            const canvas = await html2canvas(canvasRef.current);
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'myTicket.png';
            link.href = dataUrl;
            link.click();
        }
    };

    const Ticket = () => {
        return <div className="ticket w-[58mm] h-fit border border-gray-300 px-2 py-4 bg-white rounded-xs flex flex-col items-center justify-start">
            <header className="header flex justify-center items-center mt-[2mm] mb-[1mm] pb-[2mm] border-b-2 border-black">
                <img className="imgSISTEMAS h-[25mm] w-auto object-contain" src={logoSistemas} alt="Logo Sistemas" />
                <img className="imgUPN h-[25mm] w-auto object-contain" src={logoUPN} alt="Logo UPN" />
            </header>

            <div className="title-container text-center mt-[1.5mm]">
                <h1 className="title text-lg font-bold uppercase tracking-wider text-black mb-[2mm]">{title}</h1>
                <div className="title-decoration h-1 bg-gradient-to-r from-transparent via-black to-transparent mx-auto w-[70%] my-[3mm]"></div>
                <p className="subtitle text-xs font-bold text-black tracking-wider">{subtitle}</p>
            </div>

            <div className="ticket-content w-full my-[2mm] overflow-hidden">
                {
                    ticketContent.map((row, index) => {
                        if (row.type == "qr") {
                            return row.value && <div key={index} className="ticket-row flex justify-between mb-[1mm] pb-[1mm] border-b border-dotted border-black">
                                <img
                                    src={row.value}
                                    alt="QR Code"
                                    className="w-[300px] h-[300px] mx-auto mb-4"
                                />
                            </div>

                        } else if (row.type == "image") {
                            return <div key={index} className="ticket-row flex justify-between mb-[1mm] pb-[1mm] border-b border-dotted border-black">
                                <span className="ticket-label font-bold text-gray-700 text-sm">{row.label}:</span>
                                <span className="ticket-value flex-1 text-right font-bold text-black text-sm">{row.value}</span>
                            </div>
                        } else {
                            return <div key={index} className="ticket-row flex justify-between mb-[1mm] pb-[1mm] border-b border-dotted border-black">
                                <span className="ticket-label font-bold text-gray-700 text-sm">{row.label}:</span>
                                <span className="ticket-value flex-1 text-right font-bold text-black text-sm">{row.value}</span>
                            </div>
                        }
                    })
                }
            </div>

            {highlightContent.length > 0 && (
                <div className="highlight-row">
                    {
                        highlightContent.map((row, index) => {
                            if (row.type == "qr") {
                                return row.value && <div key={index} className="ticket-row flex flex-col justify-between mb-0 pb-[1mm] border-b border-dotted border-black">
                                    <span className="ticket-label font-bold text-gray-700 text-sm text-center">{row.label}:</span>
                                    <img
                                        src={row.value}
                                        alt="QR Code"
                                        className="w-[180px] h-[180px] mx-auto mb-0"
                                    />
                                </div>

                            } else if (row.type == "image") {
                                return row.value && <div key={index} className="ticket-row flex justify-between mb-[1mm] pb-[1mm] border-b border-dotted border-black">
                                    <span className="ticket-label font-bold text-gray-700 text-sm">{row.label}:</span>
                                    <img
                                        src={row.value}
                                        alt="QR Code"
                                        className="w-[300px] h-[300px] mx-auto mb-4"
                                    />
                                </div>
                            } else {
                                return <div key={index} className="ticket-row flex justify-between" style={{ borderBottom: 'none', marginBottom: 0 }}>
                                    <span className="ticket-label font-bold text-black">{row.label}:</span>
                                    <span className="ticket-value flex-1 text-right font-bold text-black">{row.value}</span>
                                </div>
                            }
                        })
                    }
                </div>
            )}

            {footerContent.length > 0 && (
                <div className="footer text-center mt-[1mm] pt-[3mm] border-t-2 border-dashed border-black text-xs text-black leading-snug">
                    {footerContent.map((item, index) => (
                        <div key={index} className={item.classNames || ''}>{item.value}</div>
                    ))}
                </div>
            )}
        </div>
    }

    const handleZoomIn = () => setScale(prev => {
        let newScale = Math.min(prev + 0.1, 2);
        if (newScale > 1) {
            return 1
        }
        return newScale;
    });

    const handleZoomOut = () => setScale(prev => {
        let newScale = Math.max(prev - 0.1, 0.5);
        if (newScale <= 0.5) {
            return 0.5;
        }
        return newScale;
    });




    return (
        <div className="w-full h-full overflow-hidden select-none">
            {showPreview && <>
                <div className="bg-transparent w-full h-1/12 flex items-center justify-around gap-2 controls-section bg-blue-600">
                    <div className="left">
                        {
                            (showDownload || showPrint) && <>
                                {
                                    showPrint && <ActionButton icon={<Printer size={20} />} title="Imprimir ticket" action={handlePrintTicket} />
                                }
                                {
                                    showDownload && <ActionButton icon={<Download size={20} />} title="Descargar ticket" action={handleDownloadTicket} />
                                }
                            </>
                        }
                    </div>
                    <div className="right">
                        <ActionButton icon={<ZoomOut size={20} />} title="Reducir vista previa" action={handleZoomOut} disabled={scale <= 0.5} />
                        <ActionButton icon={<ZoomIn size={20} />} title="Aumentar vista previa" action={handleZoomIn} disabled={scale === 1} />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center overflow-hidden overflow-y-auto p-2 py-4 h-[630px] bg-transparent render-section" ref={canvasRef}>
                    <div className="renderContent h-full w-full flex flex-row items-baseline justify-center" style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.3s ease'
                    }}>
                        <Ticket />
                    </div>

                </div>
            </>}
        </div>
    );
};

export default TicketPrinter;