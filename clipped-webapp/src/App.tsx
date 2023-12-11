import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login/Page.tsx";
import AppHome from "./pages/AppHome/Page.tsx";

import MainLayout from "./layouts/MainLayout.tsx";
import SidebarLayout from "./layouts/SidebarLayout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<MainLayout />}>
          <Route element={<SidebarLayout />}>
            <Route path="home" element={<AppHome />}></Route>
            <Route path="browse" element={<h1>BROWSE</h1>} />
            <Route path="preferences" element={<h1>PREFERENCES</h1>} />
          </Route>
          <Route path="editor" element={<h1>Editor</h1>}></Route>
          <Route path="upload" element={<h1>Upload</h1>}></Route>
          <Route path="share" element={<h1>Share</h1>}></Route>
          <Route path="*" element={<Navigate to={"home"} />} />
          <Route index element={<Navigate to={"home"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
