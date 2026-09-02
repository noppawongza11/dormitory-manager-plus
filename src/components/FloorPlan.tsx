import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import RoomDetailModal from "@/components/RoomDetailModal";
import { supabase } from "@/integrations/supabase/client";

export type RoomStatus = "available" | "occupied" | "reserved";

export interface Room {
  id: string;
  room_code: string;
  floor: number;
  number: number;
  status: RoomStatus;
  price: number;
  size: number;
}

const statusColors: Record<RoomStatus, string> = {
  available: "bg-room-available text-primary-foreground hover:opacity-80",
  occupied: "bg-room-occupied text-primary-foreground hover:opacity-80",
  reserved: "bg-room-reserved text-foreground hover:opacity-80",
};

const FloorPlan = () => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("rooms")
      .select("id, room_code, floor, number, status, price, size")
      .order("floor")
      .order("number");
    setRooms((data ?? []) as Room[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const floors = Array.from(new Set(rooms.map((r) => r.floor))).sort((a, b) => a - b);
  const maxFloor = floors.length ? floors[floors.length - 1] : 1;
  const minFloor = floors.length ? floors[0] : 1;
  const floorRooms = rooms.filter((r) => r.floor === currentFloor);
  const half = Math.ceil(floorRooms.length / 2);
  const leftRooms = floorRooms.slice(0, half);
  const rightRooms = floorRooms.slice(half);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-prompt text-2xl font-bold text-foreground">ชั้นที่ {currentFloor}</h2>
        <p className="text-muted-foreground text-sm mt-1">กดที่ห้องเพื่อดูรายละเอียด</p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-room-available" />
          <span className="text-muted-foreground">ว่าง</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-room-occupied" />
          <span className="text-muted-foreground">มีผู้เช่า</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-room-reserved" />
          <span className="text-muted-foreground">จองแล้ว</span>
        </div>
      </div>

      {/* Floor layout */}
      <div className="bg-floor-bg rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 grid grid-cols-5 gap-2">
            {leftRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${statusColors[room.status]}`}
              >
                <span className="text-[10px] opacity-80">ห้อง</span>
                <span>{room.room_code}</span>
              </button>
            ))}
          </div>

          {/* Hallway + Stairs */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            <button
              onClick={() => setCurrentFloor((f) => Math.min(f + 1, maxFloor))}
              disabled={currentFloor >= maxFloor}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stairs text-foreground text-xs font-medium transition-colors hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronUp className="w-4 h-4" />
              <span>ขึ้น</span>
            </button>

            <div className="flex-1 w-full bg-hallway rounded-lg flex items-center justify-center min-h-[100px]">
              <span className="text-xs font-medium text-muted-foreground [writing-mode:vertical-lr]">
                โถงชั้น {currentFloor}
              </span>
            </div>

            <button
              onClick={() => setCurrentFloor((f) => Math.max(f - 1, minFloor))}
              disabled={currentFloor <= minFloor}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stairs text-foreground text-xs font-medium transition-colors hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-4 h-4" />
              <span>ลง</span>
            </button>
          </div>

          <div className="flex-1 grid grid-cols-5 gap-2">
            {rightRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${statusColors[room.status]}`}
              >
                <span className="text-[10px] opacity-80">ห้อง</span>
                <span>{room.room_code}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedRoom && (
        <RoomDetailModal
          open={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          room={selectedRoom}
          onBooked={load}
        />
      )}
    </div>
  );
};

export default FloorPlan;
