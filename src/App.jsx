// import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PageLayout from "./components/PageLayout";
import MessageDisplay from "./components/MessageDisplay";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="param/:message" element={<MessageDisplay />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
