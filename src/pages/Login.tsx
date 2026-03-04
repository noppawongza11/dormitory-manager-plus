import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-prompt font-bold text-2xl text-primary">
            <Building2 className="w-8 h-8" />
            สุขสันต์ แมนชั่น
          </Link>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-fade-in">
          <h2 className="font-prompt text-xl font-bold text-foreground text-center mb-6">
            {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            )}
            <input
              type="email"
              placeholder="อีเมล"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {isRegister && (
              <input
                type="tel"
                placeholder="เบอร์โทรศัพท์"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary hover:underline"
            >
              {isRegister ? "มีบัญชีแล้ว? เข้าสู่ระบบ" : "ยังไม่มีบัญชี? สมัครสมาชิก"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
