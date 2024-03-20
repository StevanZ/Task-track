import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/assets/styles/index.scss";
import AppProvider from "./context.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);
