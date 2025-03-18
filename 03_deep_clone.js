/**
 * Problem 3 : Deep Clone
 *
 * Implement a function that creates a deep copy of an object,
 * handling nested objects and arrays
 *
 * @example
 * // Basic object cloning
 * const original = { a: 1, b : {c: 2} };
 * const clone = deepClone(original);
 * assertEqual(clone, original); // true
 * clone.b.c = 3;
 * assertEqual(original.b.c, 2); // true (original is unchanged)
 *
 * // Nested objects
 * const obj = { user : { role: "admin", id : "123" } }
 * const clonedObj = deepClone(obj);
 * clonedObj.user.role = "bar";
 * obj.user.role                        // => "admin" (original is unchanged)
 *
 * // Array cloning
 * const arr = [1, { a: 2 }, [3,4]];
 * const clonedArr = deepClone(arr)
 * clonedArr[1].a = 99;
 * arr[1].a                             // => 2 (original is unchanged)
 *
 * // Special values
 * deepClone(null)                      // => null
 * deepClone(undefined)                 // => undefined
 *
 */

const test1 = {
	name: 'kyle',
	profile: { email: 'test1@gmail.com' },
};

// 1. shallow copy
const test2 = { ...test1 };
test2.profile.email = 'test2@gmail.com';

console.log(test1); // { name: 'kyle', profile: { email: 'test2@gmail.com' } }
console.log(test2); // { name: 'kyle', profile: { email: 'test2@gmail.com' } }

// 2. deep copy
const test3 = JSON.parse(JSON.stringify(test1));
test3.profile.email = 'test3@gmail.com';
console.log(test1);
console.log(test3);

// 3. structuredClone(value, options)
const test4 = structuredClone(test1);
test4.profile.email = 'test4@gmail.com';
console.log(test1);
console.log(test4);

const deepClone = value => {
	// - check data type of target (check if it's null separately), using `typeof` operator
	if (typeof value !== 'object' || typeof value === null) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(item => deepClone(item));
	}

	// - recursive call using `map` and `Object.entries`
	const entries = Object.entries(value).map(([key, value]) => {
		return [key, deepClone(value)];
	});

	return Object.fromEntries(entries); // [key, deepClone(value)] => { key: deepClone(value) }
};

console.log();
