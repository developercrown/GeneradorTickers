import TicketPrinter from "./TicketPrinter";

const DevTest = () => {
    const ticketData = {
        title: "Cita para Credencialización",
        subtitle: "CORONA TICKET SYSTEM 1.0",
        ticketContent: [
            { label: "Folio Recibo", value: "SCE-2025-1111" },
            { label: "Folio Pago", value: "BAN-2025-2222" },
            { label: "Nombre", value: "RENE CORONA VALDES" },
            { label: "Grupo", value: "1A" },
            { label: "Carrera", value: "Lic. en Pedagogía" },
        ],
        highlightContent: [
            { label: "Fecha", value: "27/03/2025" },
            { label: "Hora", value: "23:42 hrs" },
        ],
        footerContent: [
            { value: "INSTRUCCIONES IMPORTANTES:", classNames: "mb-1 font-bold" },
            { value: "1. Presentar este ticket el día de la cita." },
            { value: "2. Llevar identificación oficial." },
            { value: "3. Debes estar listo para la toma fotográfica." },
            { value: " ", classNames: "mb-1" },
            { value: " ", classNames: "mb-1" },
            { value: " ", classNames: "mb-1" },
            { value: "Departamento de Sistemas y Tecnologias de la información",classNames: "mt-4" },
        ],
    };
    console.log(ticketData);

    return <>
        <div className="p-4">
            <TicketPrinter
                title={ticketData.title}
                subtitle={ticketData.subtitle}
                ticketContent={ticketData.ticketContent}
                highlightContent={ticketData.highlightContent}
                footerContent={ticketData.footerContent}
                showPreview={true}
                onPrint={() => console.log("Impresión iniciada")}
            />
        </div>
    </>
}

export default DevTest;