import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RoomDetailModalProps {
  open: boolean;
  onClose: () => void;
  room: {
    id: string;
    floor: number;
    number: number;
    status: "available" | "occupied" | "reserved";
    price: number;
    size: number;
  };
}

const roomImages = ["/images/room1.jpg", "/images/room2.jpg", "/images/room3.jpg"];

const statusLabels: Record<string, { label: string; className: string }> = {
  available: { label: "ว่าง", className: "bg-room-available text-primary-foreground" },
  occupied: { label: "มีผู้เช่า", className: "bg-room-occupied text-primary-foreground" },
  reserved: { label: "จองแล้ว", className: "bg-room-reserved text-foreground" },
};

const RoomDetailModal = ({ open, onClose, room }: RoomDetailModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % roomImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + roomImages.length) % roomImages.length);

  const status = statusLabels[room.status];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-card">
        {/* Image carousel */}
        <div className="relative aspect-[4/3] bg-muted">
          <img
            src={roomImages[currentImage]}
            alt={`ห้อง ${room.id} รูปที่ ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {roomImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentImage ? "bg-primary" : "bg-card/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-prompt text-xl font-bold text-foreground">ห้อง {room.id}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
              {status.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">ชั้น</p>
              <p className="font-semibold text-foreground">{room.floor}</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">ขนาดห้อง</p>
              <p className="font-semibold text-foreground">{room.size} ตร.ม.</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">ค่าเช่า/เดือน</p>
              <p className="font-semibold text-primary">฿{room.price.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">สิ่งอำนวยความสะดวก</p>
              <p className="font-semibold text-foreground">แอร์, เฟอร์นิเจอร์</p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>ห้องพักพร้อมเฟอร์นิเจอร์ครบชุด ประกอบด้วยเตียง, ตู้เสื้อผ้า, โต๊ะทำงาน, เครื่องปรับอากาศ และห้องน้ำในตัว</p>
          </div>

          {room.status === "available" && (
            <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              จองห้องนี้
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailModal;
