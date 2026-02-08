import { useState } from "react";
import { mockEnrollments, mockCourses, mockCurrentUser } from "@/lib/mockData";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const AdminEnrollments = () => {
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getCourse = (courseId: string) => mockCourses.find(c => c.id === courseId);

  const filteredEnrollments = mockEnrollments.filter(enrollment => {
    if (courseFilter !== "all" && enrollment.course_id !== courseFilter) return false;
    if (statusFilter !== "all" && enrollment.payment_status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Paid</Badge>;
      case "free":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Free</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Enrollments</h1>
        <p className="text-muted-foreground mt-1">Lihat semua data enrollment user</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="w-48">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {mockCourses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-40">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="card-custom overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">User</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Payment Status</TableHead>
              <TableHead className="font-semibold">Progress</TableHead>
              <TableHead className="font-semibold">Enrolled At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.map((enrollment) => {
              const course = getCourse(enrollment.course_id);
              return (
                <TableRow key={enrollment.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {mockCurrentUser.name.charAt(0)}
                      </div>
                      <span className="font-medium">{mockCurrentUser.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {mockCurrentUser.email}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{course?.title || "Unknown"}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(enrollment.payment_status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{enrollment.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(enrollment.enrolled_at), "dd MMM yyyy", { locale: localeId })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredEnrollments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Tidak ada enrollment yang ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnrollments;
