//removes undefined keys from an object

export function removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
        console.log(`key:${key}\nvalue:${obj[key]}\ndel:${obj[key] === undefined || obj[key] === null}\n++:${typeof obj[key] === Object}\n------\n`)
        if (obj[key] === undefined || obj[key] === null) delete obj[key];
        else if (typeof obj[key] === Object) removeUndefined(obj[key]);
    });
    return obj;
}