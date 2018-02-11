import addQuote from 'actions/addquote';

function wrapThunkAction(action, ...args) {
    return new Promise((accept, reject) => {
        try {
            console.log("accept", accept)
            action(...args)(function() {                console.warn(accept, arguments);
                console.log("accept", accept, arguments)
                accept.apply(null, arguments);
            });
        } catch(e) {
            reject(e);
        }
    })
}

describe('addquote', () => {

    describe('when there is a valid network connection', () => {

        it('dispatches an action with the right body', () => {
            return wrapThunkAction(addQuote, "body")
                .then((quote) => {
                    expect(quote.body).toEqual("body");
                });
        })

    })

})