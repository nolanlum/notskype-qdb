import * as express from 'express';

// add initialState prop
export interface PopulatedRequest extends express.Request {
    initialState : any;
    headerMeta : any;
}
