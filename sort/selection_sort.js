// O(n ** 2)

function selectionSort(array) {
    array.forEach(function (value, index) {
        let min = value;
        let minIndex = index;
        for (let j = index; j < array.length; j++) {
            if (min > array[j]) {
                min = array[j];
                minIndex = j;
            }
        }
        array[minIndex] = array[index];
        array[index] = min;
    });

    return array;
}

console.log(selectionSort([5, 6, 3, 1, 19, 2, 1, 15]));