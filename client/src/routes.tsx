import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import PhoneCardFull from './components/PhoneCardFull/PhoneCardFull';
import MainPage from "./pages/MainPage/MainPage";
import PhonesPage from "./pages/PhonesPage/PhonesPage";
import FavoritePage from "./pages/FavoritesPage/FavoritePage";
import ChartPage from "./pages/CartPage/CartPage";
import TabletsPage from "./pages/TabletsPage/TabletsPage";
// import TabletCardFull from './components/TabletCardFull/TabletCardFull';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AccessoriesPage from "./pages/AccessoriesPage/AccessoriesPage";
// import AccessoriesFullCard from './components/AccessoriesFullCard/AccessoriesFullCard';
import DeviceFullCard from "./components/DeviceFullCard/DeviceFullCard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/phones" element={<PhonesPage />} />

      <Route path="/tablets" element={<TabletsPage />} />

      <Route path="/accessories" element={<AccessoriesPage />} />

      <Route path="/phone/:model_name" element={<DeviceFullCard />} />

      <Route path="/tablet/:model_name" element={<DeviceFullCard />} />

      <Route path="/accessories/:model_name" element={<DeviceFullCard />} />

      <Route path="/favorites" element={<FavoritePage />} />

      <Route path="/cart" element={<ChartPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
