import { NextFunction, Request } from "express";
import { isObject } from "lodash";
import qs from "qs";

export async function query(
  request: Request, _, next: NextFunction
) {
  let query = {};
  const queryString = request.url?.split("?")?.[1];
  if (queryString) {
    const _query = qs.parse(queryString);
    if (isObject(_query)) query = { ...query, ..._query };
  }
  request.qs = query;
  next()
}