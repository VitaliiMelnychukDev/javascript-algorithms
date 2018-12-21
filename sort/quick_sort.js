// O(n * lg n)

function quickSort(array, left, right) {
    if (array.length > 1) {
        left = left !== undefined ? left : 0;
        right = right !== undefined ? right : (array.length - 1);
        let index = partition(array, left, right);

        if (left < index - 1) {
            quickSort(array, left, index - 1);
        }

        if (right > index) {
            quickSort(array, index, right);
        }
    }

    return array;
}

function partition(array, left, right) {
    let pivot = array[right - 1];
    let i = left;
    let j = right;

    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }

        while (array[j] > pivot) {
            j--;
        }

        if (i <= j) {
            replaceTwoElements(array, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function replaceTwoElements(array, i, j) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}

console.log(quickSort([5, 6, 3, 1, 19, 2, 1, 15]));