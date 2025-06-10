// import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import "./App.css";
// import "./index.css";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";

import { BrowserRouter as Router, Routes, Route } from "react-router";
import PageLayout from "./components/PageLayout";
import MessageDisplay from "./components/MessageDisplay";
import Cars from "./pages/Cars";
import { CarsProvider } from "./components/contexts/CarsContext";

import { ThemeProvider } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./components/Theme";

function App() {
  return (
    <>
      <CssBaseline/>
      <Router>
      <ThemeProvider theme={theme}>
      <CarsProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cars" element={<Cars />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="param/:message" element={<MessageDisplay />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </CarsProvider>
      </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
