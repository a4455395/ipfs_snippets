const snippets = (state = {items: [], loading: false},
                  action) => {
    switch (action.type) {
        case 'FETCH_PENDING':
        case 'DELETE_PENDING':
        case 'CREATE_PENDING':
        case 'UPDATE_PENDING':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_SUCCESS':
            return {
                items: action.payload.sort((a, b) => a.updatedAt < b.updatedAt),
                loading: false
            };
        case 'FETCH_FAILURE':
            return {
                items: [],
                loading: false
            };
        case 'DELETE_SUCCESS': {
            const snippetId = action.id;
            return {
                items: state.items.filter(({id}) => id !== snippetId),
                loading: false
            }
        }
        case 'CREATE_SUCCESS':
            return {
                items: [action.payload].concat(state.items),
                loading: false
            };
        case 'UPDATE_SUCCESS': {
            const {id, ...rest} = action.payload;

            return {
                items: state.items
                    .map(snippet => {
                        if (snippet.id === id) {
                            return {...snippet, ...rest};
                        }
                        return snippet;
                    }),
                loading: false
            };
        }
        case 'CREATE_FAILURE':
        case 'DELETE_FAILURE':
        case 'UPDATE_FAILURE':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default snippets;
