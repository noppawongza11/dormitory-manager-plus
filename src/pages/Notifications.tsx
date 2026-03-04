import Navbar from "@/components/Navbar";
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "info",
    title: "แจ้งเตือนค่าเช่า",
    message: "กรุณาชำระค่าเช่าประจำเดือนมีนาคม ภายในวันที่ 5 มี.ค. 2569",
    date: "1 มี.ค. 2569",
    icon: Info,
  },
  {
    id: 2,
    type: "warning",
    title: "ปิดน้ำชั่วคราว",
    message: "จะมีการปิดน้ำเพื่อซ่อมบำรุงในวันที่ 6 มี.ค. 2569 เวลา 09:00-12:00 น.",
    date: "28 ก.พ. 2569",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "success",
    title: "ซ่อมแอร์เสร็จสิ้น",
    message: "การซ่อมเครื่องปรับอากาศห้อง 305 เสร็จเรียบร้อยแล้ว",
    date: "25 ก.พ. 2569",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "info",
    title: "กิจกรรมทำความสะอาดส่วนกลาง",
    message: "ขอเชิญผู้พักอาศัยร่วมกิจกรรมทำความสะอาดส่วนกลาง วันเสาร์ที่ 8 มี.ค. 2569",
    date: "24 ก.พ. 2569",
    icon: Bell,
  },
];

const typeStyles: Record<string, string> = {
  info: "border-l-primary",
  warning: "border-l-accent",
  success: "border-l-room-available",
};

const iconStyles: Record<string, string> = {
  info: "text-primary",
  warning: "text-accent",
  success: "text-room-available",
};

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <h1 className="font-prompt text-3xl font-bold text-center text-foreground mb-2">แจ้งเตือน</h1>
        <p className="text-center text-muted-foreground mb-10">ข่าวสารและการแจ้งเตือนจากหอพัก</p>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-card rounded-xl border border-border border-l-4 ${typeStyles[n.type]} p-5 shadow-sm animate-fade-in`}
            >
              <div className="flex items-start gap-3">
                <n.icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconStyles[n.type]}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-prompt font-semibold text-foreground">{n.title}</h3>
                    <span className="text-xs text-muted-foreground">{n.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
