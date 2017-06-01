import {PopulatedRequest} from "./populatedrequest";
import renderMeta from "./rendermeta";
import classifyQuote from "../lib/classifyquote";
import isomorphicFetch from "isomorphic-fetch";

export const root = (api_handle) =>
    (req : PopulatedRequest, res, next) => {
        api_handle.qdbQuoteGet({count: 1})
           .then(quotes => quotes[0].id)
           .catch(_ => 0)
           .then(numQuotes => {
                let args = {
                    title: "qdb.esports.moe",
                    description: "we say dumb shit",
                };

                if (numQuotes > 0) {
                    Object.assign(args, {
                        twitterLabels: {
                            label1: "Total Quotes",
                            data1: numQuotes
                        }
                    });
                }

                req.headerMeta = renderMeta(args);
                next();
           });
    };

export const quoteId = (api_handle) =>
    (req : PopulatedRequest, res, next) => {
        // try to fetch quote ID from prepopulated state
        const id = req.params.id;
        const stateQuote = req.initialState
            ? req.initialState.quotes[id]
            : null;

        const passMetaWithQuote = (quote) => {
            if (!quote) return;

            let parsedQuote = classifyQuote(quote.body);

            if (parsedQuote.messages)
                req.headerMeta = renderMeta({
                    title: parsedQuote.messages[0].speaker,
                    description: parsedQuote.messages[0].body,
                });
            else
                req.headerMeta = renderMeta({
                    title: "Quote",
                    description: parsedQuote.message,
                });

            next();
        };

        // fetch the quote if it was not in the state, otherwise
        // use the stored quote in the next stage of middleware.
        if (!stateQuote) {
            api_handle.qdbQuoteGetById({quoteId: id})
                .then(fetchedQuote => {
                    passMetaWithQuote(fetchedQuote);
                }, next);
        } else {
            passMetaWithQuote(stateQuote);
        }
    };
