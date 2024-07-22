"use client";

import { Provider } from "react-redux";
import store from "@/store/page";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
