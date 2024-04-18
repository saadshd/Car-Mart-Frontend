import "./App.css";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/header/Header";
import { Routes, Route } from "react-router-dom";
import CarInventory from "./pages/CarInventory";
import Customer from "./pages/Customer";
import SalesPerson from "./pages/SalesPerson";
import { Box } from "@mui/material";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import NotFound from "./pages/NotFound";
import { DRAWER_WIDTH } from "./utils/constants";
import EntityDetailPage from "./components/crud/EntityDetailPage";

function App() {
  const { token } = useAuth();
  return (
    <Box sx={{ display: "flex" }}>
      {token && <Header />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 2,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Routes>
          {/* UnProtected routes */}
          <Route path="/login" element={<Login />} />

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/car-inventory" element={<CarInventory />} />
            <Route
              path="/car-inventory/:_id"
              element={<EntityDetailPage endpoint="/car-inventory" />}
            />
            <Route path="/customer" element={<Customer />} />
            <Route
              path="/customer/:_id"
              element={<EntityDetailPage endpoint="/customer" />}
            />
            <Route path="/sales-person" element={<SalesPerson />} />
          </Route>
        </Routes>
        {token && <Footer />}
      </Box>
    </Box>
  );
}

export default App;
