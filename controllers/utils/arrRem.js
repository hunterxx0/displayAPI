// remove the value from an array
export function arrRem(arr, value) {
	const index = arr.indexOf(value);
    arr.splice(index, 1);
    console.log(arr);
    return arr;
}