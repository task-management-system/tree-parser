// class Branch {
// 	constructor(name, parent = null) {
// 		this.name = name;
// 		this.children = [];

// 		Object.defineProperty(this, 'parent', {
// 			get: () => parent
// 		});
// 	}

// 	add(...children) {
// 		this.children.push(...children);
// 	}
// }

const parse = text => {
	const tree = [];

	const cache = new Map();
	const rows = text.split(/\r\n|\r|\n/g);
	const path = [];
	let previous = null;

	for (const row of rows) {
		const name = row.trim();
		if (name === '') {
			continue;
		}

		const level = (row.match(/^\t+/g) || [''])[0].length;

		if (path[path.length - 1] !== level) {
			if (path[path.length - 1] > level) {
				const count = path[path.length - 1] - level;
				for (let index = 0; index < count; index++) {
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
		// const branch = new Branch(name, cache.get(parentKey) || null);
		const branch = {
			name,
			children: []
		};

		if (!cache.has(key) || previous >= level) {
			cache.set(key, branch);
		}

		// if (branch.parent !== null) {
		// 	branch.parent.add(branch);
		if (cache.has(parentKey)) {
			cache.get(parentKey).children.push(branch);
		} else {
			tree.push(branch);
		}

		previous = level;
	}

	return tree;
};

export default parse;