import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/MainLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Layout>
          {/* TODO */}
          {/* <Toaster /> */}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
