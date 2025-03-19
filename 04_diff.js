/**
 * Problem 4 : Diff
 *
 * Implement a function that compares two objects and returns their differences.
 * The output should include both changed values and their paths.
 *
 * @example
 * // Flat Objects
 *
 * diff(
 *  { a: 1, b: 2, c: 3},
 *  { a: 1, b: 3, d: 4}
 * )
 *
 * // => {
 *      b : { before: 2, after: 3 },
 *      c : { before : 3, after : undefined },
 *      d : { before : undefined, after : 4 },
 * }
 *
 * // Nested Objects
 * diff(
 *  { a : { b: 1, c : 2 } },
 *  { a : { b: 1, c : 3 } },
 * )
 *
 * // => {
 *  'a.c' : { before : 2, after : 3}
 * }
 *
 * // Arrays
 * diff([ 1, 2, 3 ], [1, 4, 3])
 * // => { '1' : { before : 2, after : 4 } }
 */

const diff = (obj1, obj2) => {
	if (obj1 === obj2) {
		return {};
	}

	if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
		return { before: obj1, after: obj2 };
	}

	const diffs = {};

	const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

	for (const key of keys) {
		const valueA = obj1[key];
		const valueB = obj2[key];

		if (typeof valueA === 'object' && typeof valueB === 'object' && valueA !== null && valueB !== null) {
			const nestedDiffs = diff(valueA, valueB);

			Object.entries(nestedDiffs).forEach(([nestedKey, value]) => {
				diffs[`${key}.${nestedKey}`] = value;
			});
		} else if (valueA !== valueB) {
			diffs[key] = { before: valueA, after: valueB };
		}
	}

	return diffs;
};

console.log(diff({ a: 1, b: 2, c: 3 }, { a: 1, b: 3, d: 4 }));
console.log(diff({ a: { b: 1, c: 2 } }, { a: { b: 1, c: 3 } }));
console.log(diff([1, 2, 3], [1, 4, 3]));
