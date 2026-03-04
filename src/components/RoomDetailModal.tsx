import { useState } from "react";
import { ChevronLeft, ChevronRight, X, QrCode } from "lucide-react";
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
  const [showBooking, setShowBooking] = useState(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % roomImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + roomImages.length) % roomImages.length);

  const status = statusLabels[room.status];

  const handleClose = () => {
    setShowBooking(false);
    setCurrentImage(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-card max-h-[90vh] overflow-y-auto">
        {!showBooking ? (
          <>
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
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  จองห้องนี้
                </button>
              )}
            </div>
          </>
        ) : (
          /* Booking / QR Code payment screen */
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="font-prompt text-xl font-bold text-foreground mb-1">ยืนยันการจอง</h3>
              <p className="text-muted-foreground text-sm">ห้อง {room.id} ชั้น {room.floor}</p>
            </div>

            {/* Payment details */}
            <div className="bg-muted rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ค่าเช่ารายเดือน</span>
                <span className="font-semibold text-foreground">฿{room.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ค่ามัดจำ (2 เดือน)</span>
                <span className="font-semibold text-foreground">฿{(room.price * 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ค่าประกันห้อง</span>
                <span className="font-semibold text-foreground">฿2,000</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">รวมทั้งหมด</span>
                <span className="font-bold text-primary text-lg">฿{(room.price * 3 + 2000).toLocaleString()}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-foreground">สแกน QR Code เพื่อชำระเงิน</p>
              <div className="bg-[hsl(0,0%,100%)] p-4 rounded-xl border border-border shadow-sm">
                <div className="w-48 h-48 flex items-center justify-center bg-muted rounded-lg relative overflow-hidden">
                  {/* Simulated QR pattern */}
                  <div className="absolute inset-3 grid grid-cols-7 grid-rows-7 gap-0.5">
                    {Array.from({ length: 49 }).map((_, i) => {
                      // Create QR-like pattern
                      const row = Math.floor(i / 7);
                      const col = i % 7;
                      const isCorner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
                      const isFilled = isCorner || Math.random() > 0.45;
                      return (
                        <div
                          key={i}
                          className={`rounded-sm ${isFilled ? "bg-foreground" : "bg-transparent"}`}
                        />
                      );
                    })}
                  </div>
                  <QrCode className="w-12 h-12 text-foreground/20 absolute" />
                </div>
              </div>
              <div className="text-center text-xs text-muted-foreground space-y-1">
                <p>ชื่อบัญชี: DORMITORYNAME</p>
                <p>ธนาคาร: กสิกรไทย</p>
                <p>เลขที่บัญชี: XXX-X-XXXXX-X</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                ชำระเงินแล้ว
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailModal;
