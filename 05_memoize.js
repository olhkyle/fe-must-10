/**
 * Problem 5 : Memoize
 *
 * Implement a function that caches the results of another function
 * saving computed results for future calls with the same projects
 *
 * @example
 * // Basic caching
 * let callCount = 0;
 * const times10 = (n) => {
 *    callCount += 1;
 *    return n * 10;
 * }
 * const memoized = memoize(times10);
 * memoized(5);  // => 50 (computed)
 * memoized(5);  // => 50 (cached)
 * callCount;    // => 1 (function called only once)
 *
 * // Different Arguments
 * callCount = 0;
 * memoized(5);  // => 50 (cached)
 * memoized(6);  // => 60 (computed)
 * callCount;    // => 1 (new computation only for new argument)
 *
 */

const memoize = func => {
	const cache = new Map();

	return function (...args) {
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			console.log('cached');
			return cache.get(key);
		}

		const result = func.apply(this, args);
		cache.set(key, result);

		console.log(`Not cached | `, cache);
		return result;
	};
};

let count = 0;

const times10 = n => {
	count += 1;
	return n * 10;
};

const memoized = memoize(times10);
console.log(memoized(5)); // Not cached 50
console.log(memoized(5)); // Cached 50
console.log(memoized(6)); // Not cached 60
