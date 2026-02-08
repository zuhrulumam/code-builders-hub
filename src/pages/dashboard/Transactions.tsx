import { useMemo } from "react";
import { Receipt, CheckCircle2, Clock, XCircle } from "lucide-react";
import { mockTransactions, mockCourses, formatRupiah } from "@/lib/mockData";

const Transactions = () => {
  const currentUserId = "user-1";

  const transactions = useMemo(() => {
    return mockTransactions
      .filter(t => t.user_id === currentUserId)
      .map(transaction => {
        const course = mockCourses.find(c => c.id === transaction.course_id);
        return { transaction, course };
      })
      .sort((a, b) => new Date(b.transaction.created).getTime() - new Date(a.transaction.created).getTime());
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3" />
            Success
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-destructive/10 text-destructive">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h2 className="text-xl font-bold mb-1">Riwayat Transaksi</h2>
        <p className="text-muted-foreground">
          Semua transaksi pembelian course kamu
        </p>
      </div>

      {transactions.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block card-custom overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Tanggal</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Course</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground">Harga Asli</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground">Diskon</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground">Total Bayar</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(({ transaction, course }) => (
                  <tr key={transaction.id} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                    <td className="py-4 px-6 text-sm">
                      {formatDate(transaction.created)}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-sm line-clamp-1">
                        {course?.title || "Course tidak ditemukan"}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-sm text-right text-muted-foreground">
                      {formatRupiah(transaction.original_price)}
                    </td>
                    <td className="py-4 px-6 text-sm text-right text-red-500">
                      {transaction.discount_applied > 0 
                        ? `-${formatRupiah(transaction.discount_applied)}`
                        : "-"
                      }
                    </td>
                    <td className="py-4 px-6 text-sm text-right font-bold">
                      {formatRupiah(transaction.amount)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(transaction.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {transactions.map(({ transaction, course }) => (
              <div key={transaction.id} className="card-custom p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm line-clamp-2 mb-1">
                      {course?.title || "Course tidak ditemukan"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.created)}
                    </p>
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>

                <div className="space-y-2 pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Harga asli</span>
                    <span>{formatRupiah(transaction.original_price)}</span>
                  </div>
                  {transaction.discount_applied > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Diskon</span>
                      <span className="text-red-500">-{formatRupiah(transaction.discount_applied)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                    <span>Total bayar</span>
                    <span className="text-primary">{formatRupiah(transaction.amount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card-custom p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Receipt className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Belum ada transaksi</h3>
          <p className="text-muted-foreground">
            Riwayat transaksi pembelian course akan muncul di sini.
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
