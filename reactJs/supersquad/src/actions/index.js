export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER'

// First Action Creator
export function addCharacterByID(id) {
    const action = {
        type: ADD_CHARACTER,
        id
    }

    return action;
} 

export function removeCharacterByID(id) {
    const action = {
        type: REMOVE_CHARACTER,
        id
    }

    return action;
}