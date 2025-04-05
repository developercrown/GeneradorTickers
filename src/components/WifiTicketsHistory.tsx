import { Trash2 } from "lucide-react";

interface WifiTicketsHistoryProps {
  wifiTickets: any;
  onRemove: (index: number)=>void
}

const WifiTicketsHistory = ({wifiTickets, onRemove}: WifiTicketsHistoryProps) => {
  return (
    <div className="space-y-1 p-4">
      {wifiTickets.length === 0 ? (
        <p className="text-center text-gray-500">No hay tickets en el historial</p>
      ) : (
        wifiTickets.map((ticket: any, index: number) => (
          <div key={index} className="p-1 border border-gray-700 rounded-lg bg-black bg-opacity-70 h-22 flex flex-row justify-between items-start hover:bg-opacity-90 cursor-pointer">
            <div className="content w-full flex flex-row items-center justify-around">
              <div className="flex justify-center shadow-md border border-black border-opacity-40 w-12 h-12 items-center">
                <img src={ticket.qrCode} alt="QR Code" className="w-12 h-12 hover:scale-150 opacity-45 hover:opacity-100" />
              </div>
              <div className="flex justify-between items-start w-9/12">
                <div>
                  <h3 className="font-bold text-white">Solicitate: {ticket.requester}</h3>
                  <p className="text-xs text-white">SSID: {ticket.ssid}</p>
                  <p className="text-xs text-white">Password: {ticket.password}</p>
                  <p className="text-xs text-gray-700">{new Date(ticket.timedate).toLocaleString()}</p>
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