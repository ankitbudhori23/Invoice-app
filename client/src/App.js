import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import Home from "./pages/Home";
import InvoiceView from "./pages/InvoiceView";
import View from "./pages/View";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
function App() {
  const isLogin = localStorage.getItem("user");

  return (
    <BrowserRouter>
      {!isLogin ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/share/:id" element={<View />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/invoice-preview" element={<InvoiceView />} />
            <Route path="/share/:id" element={<View />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
