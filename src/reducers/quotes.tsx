import * as api from '../api/api';
import {merge, withoutKey} from '../lib/objectutils';
import AddQuoteAction from '../actions/addquote';

interface RemoveQuoteAction {
    type: "RemoveQuote";
    quoteId: number;
};

export type QuoteAction = AddQuoteAction | RemoveQuoteAction;

export default (state, action : QuoteAction) => {
    switch (action.type) {
        case "AddQuote":
            return merge(state, {[action.quoteId]: action.quote});
        case "RemoveQuote":
            return withoutKey(state, action.quoteId);
        default:
    }
}