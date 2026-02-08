import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  FileText, 
  Users, 
  CreditCard, 
  Coffee, 
  ClipboardList,
  Menu,
  X,
  LogOut,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mockCurrentUser } from "@/lib/mockData";

const sidebarItems = [
  { icon: BookOpen, label: "Courses", path: "/admin" },
  { icon: FileText, label: "Content", path: "/admin/content" },
  { icon: Users, label: "Enrollments", path: "/admin/enrollments" },
  { icon: CreditCard, label: "Transactions", path: "/admin/transactions" },
  { icon: Coffee, label: "Donations", path: "/admin/donations" },
  { icon: ClipboardList, label: "Waitlist", path: "/admin/waitlist" },
];

const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname.startsWith("/admin/courses");
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockCurrentUser.name}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              onItemClick?.();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
              isActive(item.path)
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5" strokeWidth={2} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/")}
        >
          <Home className="w-5 h-5" />
          Ke Landing Page
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => navigate("/")}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col bg-card border-r border-border">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-card border-b border-border">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
