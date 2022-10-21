//removes undefined keys from an object

export function removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
        if (!obj[key]) delete obj[key];
        else if (typeof obj[key] === Object) removeUndefined(obj[key])
    });
    return obj;
}