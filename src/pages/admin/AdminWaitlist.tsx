import { useState } from "react";
import { mockWaitlist, mockCourses } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminWaitlist = () => {
  const [waitlist, setWaitlist] = useState(mockWaitlist);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getCourse = (courseId: string) => mockCourses.find(c => c.id === courseId);

  const handleDelete = () => {
    if (deleteId) {
      setWaitlist(prev => prev.filter(w => w.id !== deleteId));
      toast.success("Entry deleted");
      setDeleteId(null);
    }
  };

  const exportToCSV = () => {
    const headers = ["Date", "Course", "Email", "WhatsApp"];
    const rows = waitlist.map(w => [
      format(new Date(w.created), "yyyy-MM-dd"),
      getCourse(w.course_id)?.title || "Unknown",
      w.email || "",
      w.wa_number || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `waitlist-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast.success("CSV exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Waitlist</h1>
          <p className="text-muted-foreground mt-1">User yang menunggu course coming soon</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="card-custom overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">WhatsApp</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waitlist.map((entry) => {
              const course = getCourse(entry.course_id);
              return (
                <TableRow key={entry.id} className="hover:bg-muted/30">
                  <TableCell className="text-muted-foreground">
                    {format(new Date(entry.created), "dd MMM yyyy", { locale: localeId })}
                  </TableCell>
                  <TableCell className="font-medium">{course?.title || "Unknown"}</TableCell>
                  <TableCell>{entry.email || "-"}</TableCell>
                  <TableCell className="font-mono text-sm">{entry.wa_number || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteId(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {waitlist.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Belum ada waitlist entry.
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              Entry ini akan dihapus dari waitlist. Aksi ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminWaitlist;
