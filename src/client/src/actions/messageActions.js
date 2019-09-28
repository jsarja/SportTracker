import { CREATE_MESSAGE, CLEAR_MESSAGE } from './types';

export const createMessage = (message, type) => {
    return { 
        type: CREATE_MESSAGE,
        payload: {
            message,
            type
        }
    };	
}

export const clearMessage = () => {
    return { 
        type: CLEAR_MESSAGE,
    };	
}