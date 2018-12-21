// O(n ** 2)

function bubbleSort(array) {
    let changedElements = true;

    if (array.length > 1) {
        while (changedElements) {
            changedElements = false;
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    let temp = array[i + 1];
                    array[i + 1] = array[i];
                    array[i] = temp;
                    changedElements = true;
                }
            }
        }
    }

    return array;
}

console.log(bubbleSort([5, 6, 3, 1, 19, 2, 1, 15]));