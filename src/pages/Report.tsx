import Navbar from "@/components/Navbar";
import { useState, useRef } from "react";
import { Send, ImagePlus, X } from "lucide-react";

const Report = () => {
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setImages([]);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <h1 className="font-prompt text-3xl font-bold text-center text-foreground mb-2">แจ้งปัญหา</h1>
        <p className="text-center text-muted-foreground mb-10">แจ้งปัญหาหรือข้อเสนอแนะเกี่ยวกับหอพัก</p>

        {submitted ? (
          <div className="bg-room-available/10 border border-room-available rounded-xl p-8 text-center animate-fade-in">
            <p className="text-foreground font-semibold text-lg">ส่งเรื่องเรียบร้อยแล้ว!</p>
            <p className="text-muted-foreground mt-2">เราจะดำเนินการแก้ไขโดยเร็ว</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-5 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">หมายเลขห้อง</label>
              <input
                type="text"
                required
                placeholder="เช่น 301"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">ประเภทปัญหา</label>
              <select className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>ไฟฟ้า</option>
                <option>ประปา</option>
                <option>แอร์</option>
                <option>ห้องน้ำ</option>
                <option>อื่นๆ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">รายละเอียด</label>
              <textarea
                required
                rows={4}
                placeholder="อธิบายปัญหาที่พบ..."
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">รูปภาพ (ถ้ามี)</label>
              <div className="flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={img.preview} alt={`รูปที่ ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-0.5 right-0.5 bg-foreground/70 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3 text-background" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-[10px] mt-1">เพิ่มรูป</span>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageAdd}
                className="hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              ส่งเรื่อง
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Report;
