import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useRedirectBack() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => { }, [searchParams]);
  const redirect = (url?: string) => {
    let new_location = url !== undefined ? url : searchParams.get("from");
    if (new_location === null) {
      new_location = "/";
    } else {
      searchParams.delete("from");
      setSearchParams(searchParams);
    }
    if(new_location.startsWith("http")) {
      window.location.href = new_location;
    } else {
      navigate(new_location);
    }
  };
  return {
    searchParams,
    redirect,
  };
}
