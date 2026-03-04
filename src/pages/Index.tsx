import Navbar from "@/components/Navbar";
import { MapPin, Phone, Wifi, Car, ShieldCheck, Droplets } from "lucide-react";

const features = [
  { icon: Wifi, label: "Wi-Fi ฟรี" },
  { icon: Car, label: "ที่จอดรถ" },
  { icon: ShieldCheck, label: "รปภ. 24 ชม." },
  { icon: Droplets, label: "น้ำประปา" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="/images/building.jpg"
          alt="DORMITORYNAME"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(var(--hero-overlay)/0.55)]" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="animate-fade-in">
            <h1 className="font-prompt text-4xl md:text-6xl font-bold text-[hsl(0,0%,100%)] text-shadow-hero mb-4">
              DORMITORYNAME
            </h1>
            <p className="text-lg md:text-xl text-[hsl(0,0%,90%)] max-w-2xl mx-auto">
              หอพักรายเดือนคุณภาพ ใจกลางเมือง สะดวกสบาย ปลอดภัย ราคาเริ่มต้น 3,500 บาท/เดือน
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-prompt text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
            สิ่งอำนวยความสะดวก
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-3 bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <f.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Details */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-prompt text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            เกี่ยวกับหอพัก
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <h3 className="font-prompt font-semibold text-lg text-foreground">รายละเอียด</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• อาคาร 5 ชั้น จำนวน 100 ห้อง</li>
                <li>• ห้องพักขนาด 24-32 ตร.ม.</li>
                <li>• เฟอร์นิเจอร์ครบชุด พร้อมแอร์</li>
                <li>• ห้องน้ำในตัวทุกห้อง</li>
                <li>• ค่าเช่าเริ่มต้น 3,500 บาท/เดือน</li>
                <li>• ค่าไฟ 8 บาท/หน่วย, ค่าน้ำ 18 บาท/หน่วย</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <h3 className="font-prompt font-semibold text-lg text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                ที่ตั้ง
              </h3>
              <p className="text-sm text-muted-foreground">
                9/3 หมู่ 6 ถนนประโคนชัย ต.อีสาณ อ.เมือง จ.บุรีรัม 31000
              </p>
              {/* Map embed */}
              <div className="rounded-lg overflow-hidden border border-border aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15300.0!2d103.1!3d14.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDU5JzI0LjAiTiAxMDPCsDA2JzAwLjAiRQ!5e0!3m2!1sth!2sth!4v1600000000000!5m2!1sth!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="แผนที่ DORMITORYNAME"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            083-260-0108
          </p>
          <p className="mt-2">© 2026 DORMITORYNAME. สงวนลิขสิทธิ์.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
