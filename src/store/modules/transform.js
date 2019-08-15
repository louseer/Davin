export default {
    namespaced: true,
    state: {
        w: 1,
        h: 1
    },
    mutations: {
        SET_W ( state, val ) {
            state.w = val;
        },

        SET_H ( state, val ) {
            state.h = val;
        }
    }
}
