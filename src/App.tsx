import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./routes";

import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
