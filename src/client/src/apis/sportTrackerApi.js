
const baseURL = 'https://sarja-sport-tracker.herokuapp.com/';

export const getLoginInformation = async (googleId) => {
    const resp = await fetch(`${baseURL}/login`, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const getUserSettings = async (googleId) => {
    const resp = await fetch(`${baseURL}/settings`, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const updateUserSettings = async (googleId, payload) => {
    return;
}

export const getWorkouts = async (googleId, order, filterOptions) => {
    let url = `${baseURL}/workouts`;
    if(order) {
        url += `?order=${order}`;
        if(filterOptions) {
            url += `&filters=${JSON.stringify(filterOptions)}`;
        }
    }
    else if(filterOptions) {
        url += `?filters=${JSON.stringify(filterOptions)}`;
    }
    const resp = await fetch(url, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const postWorkout = async (googleId, payload) => {
    const resp = await fetch(`${baseURL}/workouts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': googleId
        }
    });
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const getWorkout = async (googleId, workoutId) => {
    const resp = await fetch(`${baseURL}/workouts/${workoutId}`, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const deleteWorkout = async (googleId, workoutId) => {
    const resp = await fetch(`${baseURL}/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {Authorization: googleId}
    });
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const getWorkoutSummaries = async (googleId, timePeriod = 'all', sport) => {
    let url = `${baseURL}/workouts/summary`;
    url += `?timePeriod=${timePeriod}`;
    if(sport) {
        url += `&sport=${sport}`;
    }

    const resp = await fetch(url, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const getWorkoutSummaryChart = async (googleId, timePeriod = 'all', sport) => {
    let url = `${baseURL}/workouts/summary/chart`;
    url += `?timePeriod=${timePeriod}`;
    if(sport) {
        url += `&sport=${sport}`;
    }

    const resp = await fetch(url, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const getWeights = async (googleId) => {
    let url = `${baseURL}/weight`;

    const resp = await fetch(url, {headers: {Authorization: googleId}});
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

export const saveWeight = async (googleId, payload) => {
    let url = `${baseURL}/weight`;

    const resp = await fetch(url, {
        headers: {'Content-Type': 'application/json', Authorization: googleId},
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const data = await resp.json();
    if (!resp.ok) {
        throw Error(data.msg);
    }
    return data;
}

