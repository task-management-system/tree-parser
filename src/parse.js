const ITEM_CREATOR = value => ({
    name: value,
    children: []
});

const CHILDREN_EXTRACTOR = entry => entry.children;

const parse = (text, itemCreator = ITEM_CREATOR, childrenExtractor = CHILDREN_EXTRACTOR) => {
    const tree = [];

    const cache = new Map();
    const lines = text.split(/\r\n|\r|\n/g);
    const path = [];
    let previousLevel = null;

    for (const line of lines) {
        const value = line.trim();
        if (value === '') {
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
        const item = itemCreator(value);

        if (!cache.has(key) || previousLevel >= level) {
            cache.set(key, item);
        }

        if (cache.has(parentKey)) {
            childrenExtractor(cache.get(parentKey)).push(item);
        } else {
            tree.push(item);
        }

        previousLevel = level;
    }

    return tree;
};

export default parse;
