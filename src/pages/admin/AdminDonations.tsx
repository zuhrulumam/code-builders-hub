import { mockDonations, mockCourses, formatRupiah } from "@/lib/mockData";
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
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Coffee } from "lucide-react";

const AdminDonations = () => {
  const getCourse = (courseId: string) => mockCourses.find(c => c.id === courseId);

  const totalDonations = mockDonations
    .filter(d => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Success</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donations</h1>
        <p className="text-muted-foreground mt-1">Donasi dari user untuk course gratis</p>
      </div>

      {/* Summary Card */}
      <Card className="card-custom">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Coffee className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Donasi</p>
              <p className="text-2xl font-bold text-foreground">{formatRupiah(totalDonations)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="card-custom overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Donor</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold text-right">Amount</TableHead>
              <TableHead className="font-semibold">Message</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDonations.map((donation) => {
              const course = getCourse(donation.course_id);
              return (
                <TableRow key={donation.id} className="hover:bg-muted/30">
                  <TableCell className="text-muted-foreground">
                    {format(new Date(donation.created), "dd MMM yyyy", { locale: localeId })}
                  </TableCell>
                  <TableCell className="font-medium">{donation.donor_name}</TableCell>
                  <TableCell>{course?.title || "Unknown"}</TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {formatRupiah(donation.amount)}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {donation.message || "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {mockDonations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Belum ada donasi.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;
