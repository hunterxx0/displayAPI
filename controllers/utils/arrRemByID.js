// remove a element by ID from an array of objects

export async function arrRemByID(arr, id) {
    const arrCopy = Array.from(arr);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === id);
    if (objWithIdIndex !== -1) arrCopy.splice(objWithIdIndex, 1);
    return arrCopy;
}