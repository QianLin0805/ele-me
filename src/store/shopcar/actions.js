export default {
    add : ({commit}, obj) => {
        commit('add');
    },
    minus : ({commit}, obj) => {
        commit('minus')
    },
    empty : ({commit}) => {
        commit('empty')
    },
}