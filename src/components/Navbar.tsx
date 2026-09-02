import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "หน้าหลัก", path: "/" },
  { label: "จองหอพัก", path: "/booking" },
  { label: "แจ้งปัญหา", path: "/report" },
  { label: "แจ้งเตือน", path: "/notifications" },
  { label: "ติดต่อเรา", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setMobileOpen(false);
    navigate("/");
  };

  const dashPath = isAdmin ? "/admin" : "/dashboard";

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-prompt font-bold text-xl text-primary">
          <Building2 className="w-7 h-7" />
          <span>DORMITORYNAME</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to={dashPath}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                {isAdmin ? "ผู้ดูแล" : "บัญชีของฉัน"}
              </Link>
              <button
                onClick={handleSignOut}
                className="ml-1 p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                aria-label="ออกจากระบบ"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="เมนู"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to={dashPath}
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold bg-accent text-accent-foreground text-center"
                >
                  {isAdmin ? "ผู้ดูแล" : "บัญชีของฉัน"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold bg-accent text-accent-foreground text-center"
              >
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
