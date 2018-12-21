// O(n * lg n)

function mergeSort(array) {

    let newArrays = [];
    array.forEach(function (value) {
        newArrays.push([value]);
    });
    array = [...newArrays];

    while (array.length > 1) {
        newArrays = [];
        while (array.length > 0) {
            let arr = array.splice(0, 2);
            if (arr.length === 2) {
                newArrays.push(concatAndSortTwoArrays(arr[0], arr[1]));
            } else {
                newArrays.push(arr[0]);
            }
        }
        array = [...newArrays];
    }

    return array[0];
}

function concatAndSortTwoArrays(array1, array2) {
    let mergedArray = [];
    let array2Index = 0;
    array1.forEach(function (value) {
        for (let i = array2Index; i < array2.length; i++) {
            if (value > array2[i]) {
                mergedArray.push(array2[i]);
                array2Index++;
            } else {
                break;
            }
        }
        mergedArray.push(value);
    });

    mergedArray = mergedArray.concat(array2.slice(array2Index));
    return mergedArray;
}

console.log(mergeSort([5, 6, 3, 1, 19, 2, 1, 15]));
