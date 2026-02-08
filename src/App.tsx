import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import PaymentCallbackPage from "./pages/PaymentCallbackPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import MyCourses from "./pages/dashboard/MyCourses";
import BrowseCourses from "./pages/dashboard/BrowseCourses";
import Transactions from "./pages/dashboard/Transactions";
import Settings from "./pages/dashboard/Settings";
import LearningPage from "./pages/LearningPage";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCourseForm from "./pages/admin/AdminCourseForm";
import AdminCourseContent from "./pages/admin/AdminCourseContent";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminWaitlist from "./pages/admin/AdminWaitlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/payment/callback" element={<PaymentCallbackPage />} />
          
          {/* Learning Routes */}
          <Route path="/learn/:courseSlug" element={<LearningPage />} />
          <Route path="/learn/:courseSlug/:lessonSlug" element={<LearningPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<MyCourses />} />
            <Route path="browse" element={<BrowseCourses />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminCourses />} />
            <Route path="courses/new" element={<AdminCourseForm />} />
            <Route path="courses/:id/edit" element={<AdminCourseForm />} />
            <Route path="courses/:courseId/content" element={<AdminCourseContent />} />
            <Route path="content" element={<AdminCourses />} />
            <Route path="enrollments" element={<AdminEnrollments />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="waitlist" element={<AdminWaitlist />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
