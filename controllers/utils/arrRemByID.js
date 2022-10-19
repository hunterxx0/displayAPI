// remove a element by ID from an array of objects

export async function arrRemByID(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    console.log(arr);
    console.log('objWithIdIndex:...........');
    console.log(objWithIdIndex);
    if (objWithIdIndex !== -1) arr.splice(objWithIdIndex, 1);
    console.log(arr);
    return arr;
}