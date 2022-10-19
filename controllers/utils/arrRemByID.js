// remove a element by ID from an array of objects

export function arrRemByID(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex !== -1) arr.splice(objWithIdIndex, 1);
    return arr;
}