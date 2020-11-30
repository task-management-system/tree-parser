const parse = text => {
	const tree = [];

	const cache = new Map();
	const lines = text.split(/\r\n|\r|\n/g);
	const path = [];
	let previousLevel = null;

	for (const line of lines) {
		const name = line.trim();
		if (name === '') {
			continue;
		}

		const level = (line.match(/^\s+/g) || [''])[0].length;
		const lastLevel = path[path.length - 1];
		if (lastLevel !== level) {
			if (lastLevel > level) {
				const difference = lastLevel - level;
				for (let index = 0; index < difference; index++) {
					const level = path.pop();
					const key = [...cache.keys()].find(entry => entry.endsWith(level));

					if (key !== undefined) {
						cache.delete(key);
					}
				}
			} else {
				path.push(level);
			}
		}

		if (path.length === 0) {
			path.push(0);
		}

		const key = path.join('_');
		const parentKey = path.slice(0, path.length - 1).join('_');
		const branch = {
			name,
			children: []
		};

		if (!cache.has(key) || previousLevel >= level) {
			cache.set(key, branch);
		}

		if (cache.has(parentKey)) {
			cache.get(parentKey).children.push(branch);
		} else {
			tree.push(branch);
		}

		previousLevel = level;
	}

	return tree;
};

export default parse;