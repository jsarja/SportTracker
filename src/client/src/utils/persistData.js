export const loadState = () => {
    try {
        let serializedState = localStorage.getItem("state");

        if (serializedState === null) {
            return {};
        }

        const state = JSON.parse(serializedState);
        state.liveWorkout.startTime = new Date(state.liveWorkout.startTime);
        return state;
    }
    catch (err) {
        return {};
    }
}

export const saveState = ({auth, liveWorkout, message, form}) => {
    try {
        let serializedState = JSON.stringify({auth, liveWorkout, message, form});
        localStorage.setItem("state", serializedState);

    }
    catch (err) {}
}