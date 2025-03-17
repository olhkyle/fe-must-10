/**
 * Problem 2 : Flatten
 *
 * Implement a function that flattens a nested array structure
 * The function should accept an optional depth parameter.
 *
 * @example
 * flatten([1, [2, 3], [4, [5, 6]]])     // => [1,2,3,4,5,6]
 * flatten([1, [2, [3, [4]] ] ], 2)      // => [1, 2, 3, [4]]
 * flatten([1, [], [2, []], []])       // => [1,2]
 * flatten([1, [2, [3, [4, [5]]]]])    // => [1,2,3,4,5]
 */

const flatten = (array, depth = Infinity) => {
	return depth > 0
		? array.reduce((acc, item) => {
				const currentItem = Array.isArray(item) ? flatten(item, depth - 1) : item;

				return acc.concat(currentItem); // returns a new merged array
			}, [])
		: [...array];
};

console.log(flatten([1, [2, 3], [4, [5, 6]]]));
console.log(flatten([1, [2, [3, [4]]]], 2));
console.log(flatten([1, [], [2, []], []]));
console.log(flatten([1, [2, [3, [4, [5]]]]]));
