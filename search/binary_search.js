//binary search algorithm makes search in sorting array. O(lg n)

const sortedArray = [1, 2, 4, 5, 6, 7, 8, 13, 24, 35, 46, 47, 56, 57, 68];

function getElementIndex(sortedArray, element) {
    let leftIndex = 0;
    let rightIndex = sortedArray.length - 1;

    let elementIndex = -1;
    while (leftIndex <= rightIndex) {
        let middle = parseInt((leftIndex + rightIndex) / 2);

        if (sortedArray[middle] < element) {
            leftIndex = middle + 1;
        } else if (sortedArray[middle] > element) {
            rightIndex = middle - 1;
        } else {
            elementIndex = middle;
            break;
        }
    }

    return elementIndex;
}

console.log(getElementIndex(sortedArray, 13)); //7
console.log(getElementIndex(sortedArray, 9));  //-1
console.log(getElementIndex(sortedArray, 8)); //6
console.log(getElementIndex(sortedArray, 1)); //0
console.log(getElementIndex(sortedArray, 68)); //14
console.log(getElementIndex(sortedArray, 57)); //13
console.log(getElementIndex(sortedArray, 59)); //-1


