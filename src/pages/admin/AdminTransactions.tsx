import { useState } from "react";
import { mockTransactions, mockCourses, mockCurrentUser, formatRupiah } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { DollarSign, TrendingUp, Clock } from "lucide-react";

const AdminTransactions = () => {
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getCourse = (courseId: string) => mockCourses.find(c => c.id === courseId);

  const filteredTransactions = mockTransactions.filter(tx => {
    if (courseFilter !== "all" && tx.course_id !== courseFilter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Success</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return null;
    }
  };

  // Summary calculations
  const totalRevenue = mockTransactions
    .filter(tx => tx.status === "success")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalTransactions = mockTransactions.length;
  const pendingCount = mockTransactions.filter(tx => tx.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        <p className="text-muted-foreground mt-1">Riwayat transaksi dan pembayaran</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatRupiah(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold text-foreground">{totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <SelectItem value="success">Success</SelectItem>
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
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">User</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold text-right">Original Price</TableHead>
              <TableHead className="font-semibold text-right">Discount</TableHead>
              <TableHead className="font-semibold text-right">Amount</TableHead>
              <TableHead className="font-semibold">Payment Ref</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => {
              const course = getCourse(tx.course_id);
              return (
                <TableRow key={tx.id} className="hover:bg-muted/30">
                  <TableCell className="text-muted-foreground">
                    {format(new Date(tx.created), "dd MMM yyyy", { locale: localeId })}
                  </TableCell>
                  <TableCell className="font-medium">{mockCurrentUser.name}</TableCell>
                  <TableCell>{course?.title || "Unknown"}</TableCell>
                  <TableCell className="text-right">
                    {formatRupiah(tx.original_price)}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    {tx.discount_applied > 0 ? `-${formatRupiah(tx.discount_applied)}` : "-"}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatRupiah(tx.amount)}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {tx.payment_ref || "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(tx.status)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Tidak ada transaksi yang ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransactions;
