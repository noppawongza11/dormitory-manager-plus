import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import RoomDetailModal from "@/components/RoomDetailModal";

type RoomStatus = "available" | "occupied" | "reserved";

interface Room {
  id: string;
  floor: number;
  number: number;
  status: RoomStatus;
  price: number;
  size: number;
}

const generateRooms = (): Room[][] => {
  const floors: Room[][] = [];
  for (let f = 1; f <= 5; f++) {
    const rooms: Room[] = [];
    for (let r = 1; r <= 20; r++) {
      // Make ~65% available
      let status: RoomStatus;
      const rand = Math.random();
      if (rand < 0.65) status = "available";
      else if (rand < 0.85) status = "occupied";
      else status = "reserved";

      rooms.push({
        id: `${f}${r.toString().padStart(2, "0")}`,
        floor: f,
        number: r,
        status,
        price: 3500 + (f - 1) * 500,
        size: 24 + Math.floor(Math.random() * 8),
      });
    }
    floors.push(rooms);
  }
  return floors;
};

const allFloors = generateRooms();

const statusColors: Record<RoomStatus, string> = {
  available: "bg-room-available text-primary-foreground hover:opacity-80",
  occupied: "bg-room-occupied text-primary-foreground hover:opacity-80",
  reserved: "bg-room-reserved text-foreground hover:opacity-80",
};

const FloorPlan = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const rooms = allFloors[currentFloor];
  const leftRooms = rooms.slice(0, 10);
  const rightRooms = rooms.slice(10, 20);

  const goUp = () => {
    if (currentFloor < allFloors.length - 1) setCurrentFloor(currentFloor + 1);
  };
  const goDown = () => {
    if (currentFloor > 0) setCurrentFloor(currentFloor - 1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Floor indicator */}
      <div className="text-center mb-6">
        <h2 className="font-prompt text-2xl font-bold text-foreground">ชั้นที่ {currentFloor + 1}</h2>
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
          {/* Left rooms */}
          <div className="flex-1 grid grid-cols-5 gap-2">
            {leftRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${statusColors[room.status]}`}
              >
                <span className="text-[10px] opacity-80">ห้อง</span>
                <span>{room.id}</span>
              </button>
            ))}
          </div>

          {/* Hallway + Stairs */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            {/* Stairs up */}
            <button
              onClick={goUp}
              disabled={currentFloor >= allFloors.length - 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stairs text-foreground text-xs font-medium transition-colors hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronUp className="w-4 h-4" />
              <span>ขึ้น</span>
            </button>

            {/* Hallway */}
            <div className="flex-1 w-full bg-hallway rounded-lg flex items-center justify-center min-h-[100px]">
              <span className="text-xs font-medium text-muted-foreground [writing-mode:vertical-lr]">
                โถงชั้น {currentFloor + 1}
              </span>
            </div>

            {/* Stairs down */}
            <button
              onClick={goDown}
              disabled={currentFloor <= 0}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stairs text-foreground text-xs font-medium transition-colors hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-4 h-4" />
              <span>ลง</span>
            </button>
          </div>

          {/* Right rooms */}
          <div className="flex-1 grid grid-cols-5 gap-2">
            {rightRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${statusColors[room.status]}`}
              >
                <span className="text-[10px] opacity-80">ห้อง</span>
                <span>{room.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Room detail modal */}
      {selectedRoom && (
        <RoomDetailModal
          open={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          room={selectedRoom}
        />
      )}
    </div>
  );
};

export default FloorPlan;
