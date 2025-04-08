import { Trash2 } from "lucide-react";
import { useCallback } from "react";

interface WifiTicketsHistoryProps {
  wifiTickets: any;
  onRemove: (index: number) => void,
  onRowClick: (item: any) => void
}

const WifiTicketsHistory = ({ wifiTickets, onRemove, onRowClick }: WifiTicketsHistoryProps) => {

  const handleActionRowClick = useCallback((event: any, item: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (onRowClick) {
      onRowClick(item)
    }
  }, []);

  return (
    <div className="space-y-1 p-4">
      {wifiTickets.length === 0 ? (
        <p className="text-center text-white">No hay tickets en el historial</p>
      ) : (
        wifiTickets.map((ticket: any, index: number) => (
          <div key={index} className="p-1 border border-blue-700 border-opacity-35 rounded-lg bg-blue-700 bg-opacity-20 h-24 flex flex-row justify-between items-start hover:bg-opacity-50 cursor-pointer no-transition-effects" onClick={(event) => handleActionRowClick(event, ticket)}>
            <div className="content w-full h-full flex flex-row items-center justify-around">
              <div className="flex justify-center items-center h-full shadow-md border-opacity-40 w-12 ">
                <img src={ticket.qrCode} alt="QR Code" className="w-12 h-12 hover:scale-[2] opacity-25 hover:opacity-100" />
              </div>
              <div className="flex flex-col justify-between items-start w-9/12">
                <p className="text-xs text-gray-400 w-full text-right">{new Date(ticket.timedate).toLocaleString()}</p>
                <h3 className="text-sm font-bold text-white">Solicitate: {ticket.requester}</h3>
                <div className="flex font-bold gap-4">
                  <p className="text-xs  text-white">SSID: {ticket.ssid}</p>
                  <p className="text-xs text-white">Password: {ticket.password}</p>
                </div>
                <div className="flex font-bold gap-4">
                  <p className="text-xs font-bold text-white">Tiempo de vida: {ticket.expiration}</p>
                  <p className="text-xs font-bold text-white">Visiblidad: {ticket.hidden}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-400 relative float-right top-0"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default WifiTicketsHistory;