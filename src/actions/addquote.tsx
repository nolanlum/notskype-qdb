import * as api from '../api/api';

export interface AddQuoteAction {
    type: "AddQuote",
    quoteId: number;
    quote: api.Quote;
    meta: any;
}

export const __addQuote = (quoteId, quote, meta) => ({
    type: "AddQuote",
    quoteId: quoteId,
    quote: quote,
    meta: meta,
})

export const addQuote = body => (dispatch): AddQuoteAction => {
    api.qdbQuotePost(body: body)
        .then(result => {
            console.log(result);
            dispatch(__addQuote(null
            })));
};