import * as api from '../api/api'
import * as express from "express";

// add initialState prop
export interface PopulatedRequest extends express.Request {
    initialState : any;
    headerMeta : any;
    apiHandle : api.QuoteApi;
}
