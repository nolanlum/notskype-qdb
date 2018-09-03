import * as api from "../api/api";
import {PopulatedRequest} from "./populatedrequest";
import * as cookieParser from "cookie-parser";
import * as isomorphicFetch from "isomorphic-fetch";

const authorizedApiHandle = (req : PopulatedRequest, res, next) => {
    if (req.cookies.qdbToken) {
        req.apiHandle = new api.QuoteApi({ apiKey: req.cookies.qdbToken }, "http://localhost:8000/api/v1", isomorphicFetch);
    }
    next();
};

export default authorizedApiHandle;
