import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCourses, mockEnrollments, formatRupiah } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Eye, FileText, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(mockCourses);

  const getEnrollmentCount = (courseId: string) => {
    return mockEnrollments.filter(e => e.course_id === courseId && e.payment_status !== "pending").length;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Published</Badge>;
      case "coming_soon":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Coming Soon</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return null;
    }
  };

  const toggleStatus = (courseId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const newStatus = course.status === "published" ? "draft" : "published";
        toast.success(`Course status changed to ${newStatus}`);
        return { ...course, status: newStatus as "published" | "coming_soon" | "draft" };
      }
      return course;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courses Management</h1>
          <p className="text-muted-foreground mt-1">Kelola semua course yang tersedia</p>
        </div>
        <Button onClick={() => navigate("/admin/courses/new")} className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Course
        </Button>
      </div>

      <div className="card-custom overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Discount</TableHead>
              <TableHead className="font-semibold text-center">Enrollments</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} className="hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={course.cover_image} 
                      alt={course.title}
                      className="w-12 h-8 object-cover rounded-lg bg-muted"
                    />
                    <div>
                      <p className="font-medium text-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground">/{course.slug}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(course.status)}</TableCell>
                <TableCell>
                  {course.is_free ? (
                    <span className="text-primary font-medium">Gratis</span>
                  ) : (
                    <span className="font-medium">{formatRupiah(course.price)}</span>
                  )}
                </TableCell>
                <TableCell>
                  {course.discount_price ? (
                    <span className="text-primary font-medium">{formatRupiah(course.discount_price)}</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{getEnrollmentCount(course.id)}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/courses/${course.id}/edit`)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/admin/courses/${course.id}/content`)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Manage Content
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`/courses/${course.slug}`, '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(course.id)}>
                        {course.status === "published" ? (
                          <>
                            <ToggleLeft className="w-4 h-4 mr-2" />
                            Set to Draft
                          </>
                        ) : (
                          <>
                            <ToggleRight className="w-4 h-4 mr-2" />
                            Publish
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCourses;
