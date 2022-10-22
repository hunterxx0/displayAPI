//removes undefined keys from an object

export function removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === Array) obj[key].filter(element => {
            return element !== null;
        });
        if (obj[key] === undefined || obj[key] === null) delete obj[key];
        else if (typeof obj[key] === Object) removeUndefined(obj[key]);
    });
    return obj;
}