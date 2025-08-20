import WishlistPage from "@/components/Wishlist";
import { AuthProvider } from "@/contexts/AuthContext";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import DestinationDetails from "@/pages/DestinationDetails";
import Home from "@/pages/Home";
import Notifications from "@/pages/Notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import { Toaster } from "./lib/toast/ToastProvider";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
