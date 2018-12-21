// O (n** 2)

function insertingSort(array) {
    array.forEach(function (value, index) {
        let suitableIndex = index;
        for (let j = index - 1; j >= 0; j--) {
            if (value < array[j]) {
                suitableIndex = j;
            } else {
                break;
            }
        }
        array.splice(index, 1);
        array.splice(suitableIndex, 0, value);
    });

    return array;
}

console.log(insertingSort([5, 6, 3, 1, 19, 2, 1, 15]));