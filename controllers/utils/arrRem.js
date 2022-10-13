// remove the value from an array
export async function arrRem(arr, value) {
	return arr.filter(function(ele){ 
        return ele !== value; 
    });
}