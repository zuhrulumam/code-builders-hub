import { useState } from "react";
import { User, Mail, Phone, Save, Loader2, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { mockCurrentUser } from "@/lib/mockData";

const Settings = () => {
  const user = mockCurrentUser;
  const [waNumber, setWaNumber] = useState(user.wa_number);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation: pb.collection('users').update(user.id, { wa_number: waNumber })
    mockCurrentUser.wa_number = waNumber;
    
    setIsSaving(false);
    toast({
      title: "Berhasil! ✅",
      description: "Profil kamu berhasil diupdate."
    });
  };

  const handleLogout = () => {
    // In real implementation: pb.authStore.clear()
    toast({
      title: "Logout berhasil",
      description: "Sampai jumpa lagi! 👋"
    });
    // Redirect to home
    window.location.href = "/";
  };

  return (
    <div className="space-y-8 pb-20 lg:pb-0 max-w-xl">
      <div>
        <h2 className="text-xl font-bold mb-1">Pengaturan Akun</h2>
        <p className="text-muted-foreground">
          Kelola profil dan preferensi kamu
        </p>
      </div>

      {/* Profile Section */}
      <div className="card-custom p-6 space-y-6">
        <h3 className="font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profil
        </h3>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary text-2xl font-bold">{user.name[0]}</span>
            )}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">Foto dari Google</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name (readonly) */}
          <div>
            <label className="block text-sm font-medium mb-2">Nama</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={user.name}
                readOnly
                className="pl-10 bg-muted cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Diambil dari akun Google</p>
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={user.email}
                readOnly
                className="pl-10 bg-muted cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Diambil dari akun Google</p>
          </div>

          {/* WhatsApp Number (editable) */}
          <div>
            <label className="block text-sm font-medium mb-2">Nomor WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="tel"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                placeholder="08123456789"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Untuk notifikasi dan support via WhatsApp
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary w-full justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </>
          )}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="card-custom p-6 border-destructive/30">
        <h3 className="font-semibold text-destructive mb-4">Zona Bahaya</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Logout dari semua device</p>
            <p className="text-xs text-muted-foreground">
              Kamu akan keluar dari akun di semua perangkat
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-destructive text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
