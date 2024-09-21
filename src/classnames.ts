// ! Copyright (c) 2024, Brandon Ramirez

export type ClassnamesFuncArgs =
    | string
    | undefined
    | boolean
    | null
    | number
    | Record<string, unknown>
    | Array<ClassnamesFuncArgs>;

/**
 * Generate an HTML `class` attribute string based on the given input args.
 * Different types of values have the following handling:
 * - `string` or `number`: strings are added directly as class names
 * - `object`: the key is the class name, and the value is a truthy value
 *              indicating whether we should add the key to the class string
 * - `array`: call the function recursively with the array as arguments
 */
export default function classnames(...args: ClassnamesFuncArgs[]): string {
    let response = '';

    for (const arg of args) {
        if (!arg) continue;

        if (typeof arg === 'string' || typeof arg === 'number') {
            response += `${arg} `;
        } else if (Array.isArray(arg)) {
            // Recursively call the function on the array
            response += classnames(...arg) + ' ';
        } else if (arg && typeof arg === 'object') {
            const argKeys = Object.keys(arg);
            if (argKeys.length === 0) continue;

            // Get an array of the object's keys that have truthy values
            const filteredClassStrings = argKeys.filter(
                (argKey) => !!arg[argKey],
            ); // Filter out keys with falsy values

            // Recursively call the function on the filtered arguments
            response += classnames(...filteredClassStrings) + ' ';
        }
    }

    // Filter out all excess spaces
    response = response.replace(/\s+/g, ' ').trim();

    return response;
}
