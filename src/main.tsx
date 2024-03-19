import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/assets/styles/index.scss";
import AppProvider from "./context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
