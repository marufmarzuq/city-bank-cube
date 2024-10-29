type TObject = Record<string, unknown>;

function isEqual(obj1: TObject, obj2: TObject): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the keys match
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        // Check if both values are objects and not null
        if (
            typeof value1 === "object" &&
            value1 !== null &&
            typeof value2 === "object" &&
            value2 !== null
        ) {
            // Recursively check nested objects
            if (!isEqual(value1 as TObject, value2 as TObject)) return false;
        } else {
            // Primitive comparison
            if (value1 !== value2) return false;
        }
    }

    return true;
}

export default isEqual;
