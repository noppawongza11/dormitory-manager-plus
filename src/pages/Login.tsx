import { Building2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate(isAdmin ? "/admin" : "/dashboard", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName, phone },
          },
        });
        if (error) throw error;
        toast.success("สมัครสมาชิกสำเร็จ", {
          description: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี แล้วเข้าสู่ระบบ",
        });
        setIsRegister(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("เข้าสู่ระบบสำเร็จ");
      }
    } catch (err: any) {
      const msg: string = err?.message ?? "เกิดข้อผิดพลาด";
      toast.error(
        msg.includes("Invalid login credentials")
          ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
          : msg.includes("already registered")
          ? "อีเมลนี้ถูกใช้สมัครแล้ว"
          : msg
      );
    } finally {
      setBusy(false);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) toast.error(error.message);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-prompt font-bold text-2xl text-primary">
            <Building2 className="w-8 h-8" />
            DORMITORYNAME
          </Link>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-fade-in">
          <h2 className="font-prompt text-xl font-bold text-foreground text-center mb-6">
            {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ชื่อ-นามสกุล"
                className={inputClass}
              />
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล"
              className={inputClass}
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className={inputClass}
            />
            {isRegister && (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="เบอร์โทรศัพท์"
                className={inputClass}
              />
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            หรือ
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            เข้าสู่ระบบด้วย Google
          </button>

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
