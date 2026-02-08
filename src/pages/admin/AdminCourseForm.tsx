import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockCourses, Course, formatRupiah } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const AdminCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Course>>({
    title: "",
    slug: "",
    short_desc: "",
    long_desc: "",
    cover_image: "/placeholder.svg",
    price: 0,
    discount_price: null,
    status: "draft",
    is_free: false,
    order_index: 1,
    mayar_link: "",
    wa_group_link: "",
  });

  useEffect(() => {
    if (isEditing) {
      const course = mockCourses.find(c => c.id === id);
      if (course) {
        setFormData(course);
      }
    }
  }, [id, isEditing]);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleChange = (field: keyof Course, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!formData.is_free && formData.discount_price && formData.discount_price > (formData.price || 0)) {
      toast.error("Discount price cannot be greater than original price");
      return;
    }

    // Mock save
    toast.success(isEditing ? "Course berhasil diupdate" : "Course berhasil dibuat");
    navigate("/admin");
  };

  const getDiscountPercentage = () => {
    if (!formData.discount_price || !formData.price || formData.price === 0) return 0;
    return Math.round(((formData.price - formData.discount_price) / formData.price) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? "Edit Course" : "Tambah Course Baru"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Update informasi course" : "Buat course baru untuk platform"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="card-custom p-6 space-y-6">
            <h2 className="font-semibold text-lg">Informasi Dasar</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Masukkan judul course"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="auto-generated-slug"
                  className="mt-1.5 font-mono text-sm"
                />
              </div>

              <div>
                <Label htmlFor="short_desc">
                  Short Description
                  <span className="text-muted-foreground font-normal ml-2">
                    ({formData.short_desc?.length || 0}/300)
                  </span>
                </Label>
                <Textarea
                  id="short_desc"
                  value={formData.short_desc}
                  onChange={(e) => handleChange("short_desc", e.target.value.slice(0, 300))}
                  placeholder="Deskripsi singkat yang muncul di card"
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="long_desc">Long Description (Markdown)</Label>
                <Textarea
                  id="long_desc"
                  value={formData.long_desc}
                  onChange={(e) => handleChange("long_desc", e.target.value)}
                  placeholder="Deskripsi lengkap dengan format markdown..."
                  className="mt-1.5 font-mono text-sm"
                  rows={10}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="coming_soon">Coming Soon</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => handleChange("order_index", parseInt(e.target.value) || 0)}
                  className="mt-1.5"
                  min={1}
                />
                <p className="text-xs text-muted-foreground mt-1">Urutan tampil di landing page</p>
              </div>
            </div>
          </div>

          <div className="card-custom p-6 space-y-6">
            <h2 className="font-semibold text-lg">Harga</h2>
            
            <div className="flex items-center gap-4">
              <Switch
                id="is_free"
                checked={formData.is_free}
                onCheckedChange={(checked) => handleChange("is_free", checked)}
              />
              <Label htmlFor="is_free">Course Gratis</Label>
            </div>

            {!formData.is_free && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Harga Asli (Dicoret)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", parseInt(e.target.value) || 0)}
                    className="mt-1.5"
                    min={0}
                    step={1000}
                  />
                </div>
                <div>
                  <Label htmlFor="discount_price">Harga Jual (Ditampilkan)</Label>
                  <Input
                    id="discount_price"
                    type="number"
                    value={formData.discount_price || ""}
                    onChange={(e) => handleChange("discount_price", e.target.value ? parseInt(e.target.value) : null)}
                    className="mt-1.5"
                    min={0}
                    step={1000}
                    placeholder="Kosongkan jika tidak ada diskon"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="card-custom p-6 space-y-6">
            <h2 className="font-semibold text-lg">Links</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="mayar_link">Link Pembayaran Mayar</Label>
                <Input
                  id="mayar_link"
                  value={formData.mayar_link}
                  onChange={(e) => handleChange("mayar_link", e.target.value)}
                  placeholder="https://mayar.id/..."
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="wa_group_link">WhatsApp Group Link</Label>
                <Input
                  id="wa_group_link"
                  value={formData.wa_group_link}
                  onChange={(e) => handleChange("wa_group_link", e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              {isEditing ? "Update Course" : "Simpan Course"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
              Batal
            </Button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
            </div>
            
            <div className="card-custom overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img 
                  src={formData.cover_image || "/placeholder.svg"} 
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                {formData.status === "coming_soon" && (
                  <Badge className="absolute top-3 left-3 badge-coming-soon">
                    COMING SOON
                  </Badge>
                )}
                {formData.is_free && (
                  <Badge className="absolute top-3 left-3 badge-free">
                    FREE
                  </Badge>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg line-clamp-2">
                  {formData.title || "Judul Course"}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {formData.short_desc || "Deskripsi singkat course..."}
                </p>
                
                <div className="pt-2 border-t border-border">
                  {formData.is_free ? (
                    <span className="text-primary font-bold text-lg">Gratis</span>
                  ) : formData.discount_price && formData.discount_price < (formData.price || 0) ? (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground line-through text-sm">
                        {formatRupiah(formData.price || 0)}
                      </span>
                      <span className="text-primary font-bold text-lg">
                        {formatRupiah(formData.discount_price)}
                      </span>
                      <Badge className="bg-destructive/10 text-destructive text-xs">
                        -{getDiscountPercentage()}%
                      </Badge>
                    </div>
                  ) : (
                    <span className="font-bold text-lg">{formatRupiah(formData.price || 0)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseForm;
