// remove the value from an array
export async function arrRem(arr, value) {
	const index = arr.indexOf(value);
    arr.splice(index, 1);
    return arr;
}