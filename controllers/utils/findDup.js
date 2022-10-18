//finds and returns the last Duplicate index

export function findDup(array) {
	const indeces = [];
	const findDuplicate = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
	const findindex = arr => arr.filter((item, index) => {
		if (item == findDuplicate(array)[0])
			indeces.push(index);
	})
	findindex(array);
	return indeces[1];
}