//removes undefined keys from an object

export function removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
        console.log(`key:${key}\nvalue:${obj[key]}\nvalType:${typeof obj[key]}\ndel:${obj[key] === undefined || obj[key] === null}\n++:${typeof obj[key] === 'object' || typeof obj[key] === Object}\n------\n`)
        if (obj[key] === undefined || obj[key] === null) delete obj[key];
        else if (typeof obj[key] === 'object' || typeof obj[key] === Object) removeUndefined(obj[key]);
    });
    console.log(obj.targets);
    return obj;
}