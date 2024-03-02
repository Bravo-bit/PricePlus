import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("compareData");

  if (window.location.pathname === "/") {
    window.location.reload();
  }

  return redirect("/");
}
