import { getQueryParams } from "@/helper";
import jwtDecode from "jwt-decode";
import { fromUnixTime, isBefore } from "date-fns";
import { json } from "react-router-dom";

export const utilitiesLoader = async ({ request }) => {
  const params: any = getQueryParams(request.url);
  if (params.token) {
    try {
      const decoded: any = jwtDecode(params.token);
      if (isBefore(new Date(), new Date(fromUnixTime(decoded.exp)))) {
        return json({ user: decoded }, { status: 200 });
      } else {
        throw new Response("Not Found", { status: 401 });
      }
    } catch (error) {
      throw new Response("Not Found", { status: 401 });
    }
  } else {
    throw new Response("Not Found", { status: 401 });
  }
};
