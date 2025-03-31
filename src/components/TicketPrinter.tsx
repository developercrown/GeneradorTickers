import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import LogotipoSistemas from "../assets/logosistemas.svg"
import LogotipoUPN from "../assets/LogotipoOficialUPN164-2025.svg"
import { Download, Printer } from 'lucide-react';

// Tipos para las props del componente
type TicketRow = {
    label: string;
    value: string;
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
    const canvasRef = useRef(null);
    // Función para generar el HTML completo del ticket
    const generateTicketHTML = () => {
        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
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
            <img class="imgSISTEMAS" src="/src/assets/logosistemas.svg" alt="Logo Sistemas">
            <img class="imgUPN" src="/src/assets/LogotipoOficialUPN164-2025.svg" alt="Logo UPN">
        </header>
        
        <div class="title-container">
            <h1 class="title">${title}</h1>
            <div class="title-decoration"></div>
            <p class="subtitle">${subtitle}</p>
        </div>
        
        <div class="ticket-content">
            ${ticketContent.map(row => `
            <div class="ticket-row">
                <span class="ticket-label">${row.label}:</span>
                <span class="ticket-value">${row.value}</span>
            </div>
            `).join('')}
        </div>
        
        ${highlightContent.length > 0 ? `
        <div class="highlight-row">
            ${highlightContent.map(row => `
            <div class="ticket-row" style="border-bottom:none; margin-bottom:0;">
                <span class="ticket-label highlight-label">${row.label}:</span>
                <span class="ticket-value highlight-label">${row.value}</span>
            </div>
            `).join('')}
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
        window.onload = function() {
            setTimeout(function() {
                window.print();
                setTimeout(function() {
                    window.close();
                }, 200);
            }, 300);
        };
    </script>
</body>
</html>`;
    };

    // Función para imprimir el ticket
    const handlePrintTicket = () => {
        const ticketHTML = generateTicketHTML();
        const printWindow = window.open('', '_blank');

        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(ticketHTML);
            printWindow.document.close();

            // Llamar al callback si existe
            if (onPrint) {
                onPrint();
            }
        } else {
            console.error('No se pudo abrir la ventana de impresión');
        }
    };

    const handleDownloadTicket = async () => {
        if (canvasRef.current) {
            const canvas = await html2canvas(canvasRef.current);
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'cita-credencializacion.png';
            link.href = dataUrl;
            link.click();
        }
    };

    // Renderizar la previsualización si showPreview es true
    return (
        <div className="flex flex-col items-center">
            {showPreview && (
                <div className="w-[58mm] h-auto border border-gray-300 p-2 mb-4 bg-white" ref={canvasRef}>
                    <div className="ticket">
                        <header className="header flex justify-center items-center mt-[2mm] mb-[1mm] pb-[2mm] border-b-2 border-black">
                            <img className="imgSISTEMAS h-[25mm] w-auto object-contain" src={LogotipoSistemas} alt="Logo Sistemas" />
                            <img className="imgUPN h-[25mm] w-auto object-contain" src={LogotipoUPN} alt="Logo UPN" />
                        </header>

                        <div className="title-container text-center mt-[1.5mm]">
                            <h1 className="title text-lg font-bold uppercase tracking-wider text-black mb-[2mm]">{title}</h1>
                            <div className="title-decoration h-1 bg-gradient-to-r from-transparent via-black to-transparent mx-auto w-[70%] my-[3mm]"></div>
                            <p className="subtitle text-xs font-bold text-black tracking-wider">{subtitle}</p>
                        </div>

                        <div className="ticket-content w-full my-[2mm]">
                            {ticketContent.map((row, index) => (
                                <div key={index} className="ticket-row flex justify-between mb-[1mm] pb-[1mm] border-b border-dotted border-black">
                                    <span className="ticket-label font-bold text-gray-700 text-sm">{row.label}:</span>
                                    <span className="ticket-value flex-1 text-right font-bold text-black text-sm">{row.value}</span>
                                </div>
                            ))}
                        </div>

                        {highlightContent.length > 0 && (
                            <div className="highlight-row">
                                {highlightContent.map((row, index) => (
                                    <div key={index} className="ticket-row flex justify-between" style={{ borderBottom: 'none', marginBottom: 0 }}>
                                        <span className="ticket-label font-bold text-black">{row.label}:</span>
                                        <span className="ticket-value flex-1 text-right font-bold text-black">{row.value}</span>
                                    </div>
                                ))}
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
                </div>
            )}
            <div className="actions w-full flex items-center justify-around">
                {
                    showDownload && <button
                        onClick={handleDownloadTicket}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        <Download size={24} />
                    </button>
                }
                {
                    showPrint && <button
                    onClick={handlePrintTicket}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    <Printer size={24} />
                </button>}
            </div>
        </div>
    );
};

export default TicketPrinter;