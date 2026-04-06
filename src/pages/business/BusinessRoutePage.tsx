import { Navigate, useLocation } from "react-router-dom";
import { getBusinessPageByUrl } from "@/lib/business-navigation";
import { BusinessPageTemplate } from "./BusinessPageTemplate";

export default function BusinessRoutePage() {
  const location = useLocation();
  const page = getBusinessPageByUrl(location.pathname);

  if (!page) {
    return <Navigate to="/app/negocio/loja" replace />;
  }

  return <BusinessPageTemplate page={page} />;
}
