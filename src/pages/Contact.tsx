import Navbar from "@/components/Navbar";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <h1 className="font-prompt text-3xl font-bold text-center text-foreground mb-2">ติดต่อเรา</h1>
        <p className="text-center text-muted-foreground mb-10">สอบถามข้อมูลเพิ่มเติมหรือนัดชมห้องพัก</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Phone, label: "โทรศัพท์", value: "02-123-4567, 089-123-4567" },
              { icon: Mail, label: "อีเมล", value: "info@suksant-mansion.com" },
              { icon: MapPin, label: "ที่อยู่", value: "123/45 ซอยสุขสันต์ ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900" },
              { icon: Clock, label: "เวลาทำการ", value: "จันทร์ - เสาร์ 08:00 - 18:00 น." },
              { icon: MessageCircle, label: "Line", value: "@suksant-mansion" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-card rounded-xl border border-border p-5 shadow-sm">
                <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="bg-card rounded-xl border border-border p-6 space-y-5 shadow-sm h-fit"
          >
            <h3 className="font-prompt font-semibold text-lg text-foreground">ส่งข้อความถึงเรา</h3>
            <input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              rows={4}
              placeholder="ข้อความ..."
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              ส่งข้อความ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
