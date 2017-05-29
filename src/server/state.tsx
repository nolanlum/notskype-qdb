import {PopulatedRequest} from "./populatedrequest";

// intitialize prestored state
export const init = (req : PopulatedRequest, res, next) => {
    req.initialState = {
        quotes: {},
    };
    next();
};

// prepop state
export const quoteId = (api_handle) =>
    (req : PopulatedRequest, res, next) => {
        console.log("populating state", api_handle.basePath);
        api_handle.qdbQuoteGetById({ quoteId: req.params.id, })
            .then((quote) => {
                // fetch the quote on the server
                req.initialState.quotes = {[quote.id]: quote};
                next();
            })
            .catch((e) => {
                console.log("state population failed!", e);
                next();
            });
    };
