"use client";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import './global.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        <main>
          <Provider store={store}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
