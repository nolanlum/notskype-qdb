import {PopulatedRequest} from "./populatedrequest";

// intitialize prestored state
export const init = (req : PopulatedRequest, res, next) => {
    req.initialState = {
        quotes: {},
        authenticated: req.cookies.qdbToken !== undefined, // req.get("X-Qdb-Token") !== undefined,
    };
    next();
};

// prepop state
export const quoteId = (req : PopulatedRequest, res, next) => {
    if (!req.apiHandle) {
        next();
        return;
    }

    req.apiHandle.qdbQuoteGetById(req.params.id)
        .then((quote) => {
            // fetch the quote on the server
            req.initialState.quotes = {[quote.id]: quote};
            next();
        })
        .catch((e) => {
            next();
        });
    };
