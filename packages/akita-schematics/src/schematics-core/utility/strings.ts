/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const STRING_DASHERIZE_REGEXP = /[ _]/g;
const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
const STRING_CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;
const STRING_UNDERSCORE_REGEXP_1 = /([a-z\d])([A-Z]+)/g;
const STRING_UNDERSCORE_REGEXP_2 = /-|\s+/g;

/**
 * Converts a camelized string into all lower case separated by underscores.
 *
 ```javascript
 decamelize('innerHTML');         // 'inner_html'
 decamelize('action_name');       // 'action_name'
 decamelize('css-class-name');    // 'css-class-name'
 decamelize('my favorite items'); // 'my favorite items'
 ```
 */
export function decamelize(str: string): string {
  return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

/**
 Replaces underscores, spaces, or camelCase with dashes.

 ```javascript
 dasherize('innerHTML');         // 'inner-html'
 dasherize('action_name');       // 'action-name'
 dasherize('css-class-name');    // 'css-class-name'
 dasherize('my favorite items'); // 'my-favorite-items'
 ```
 */
export function dasherize(str?: string): string {
  return decamelize(str || '').replace(STRING_DASHERIZE_REGEXP, '-');
}

/**
 Returns the lowerCamelCase form of a string.

 ```javascript
 camelize('innerHTML');          // 'innerHTML'
 camelize('action_name');        // 'actionName'
 camelize('css-class-name');     // 'cssClassName'
 camelize('my favorite items');  // 'myFavoriteItems'
 camelize('My Favorite Items');  // 'myFavoriteItems'
 ```
 */
export function camelize(str: string): string {
  return str
    .replace(
      STRING_CAMELIZE_REGEXP,
      (_match: string, _separator: string, chr: string) => {
        return chr ? chr.toUpperCase() : '';
      }
    )
    .replace(/^([A-Z])/, (match: string) => match.toLowerCase());
}

/**
 Returns the UpperCamelCase form of a string.

 ```javascript
 'innerHTML'.classify();          // 'InnerHTML'
 'action_name'.classify();        // 'ActionName'
 'css-class-name'.classify();     // 'CssClassName'
 'my favorite items'.classify();  // 'MyFavoriteItems'
 ```
 */
export function classify(str: string): string {
  return str
    .split('.')
    .map((part) => capitalize(camelize(part)))
    .join('.');
}

/**
 More general than decamelize. Returns the lower\_case\_and\_underscored
 form of a string.

 ```javascript
 'innerHTML'.underscore();          // 'inner_html'
 'action_name'.underscore();        // 'action_name'
 'css-class-name'.underscore();     // 'css_class_name'
 'my favorite items'.underscore();  // 'my_favorite_items'
 ```
 */
export function underscore(str: string): string {
  return str
    .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
    .replace(STRING_UNDERSCORE_REGEXP_2, '_')
    .toLowerCase();
}

/**
 Returns the Capitalized form of a string

 ```javascript
 'innerHTML'.capitalize()         // 'InnerHTML'
 'action_name'.capitalize()       // 'Action_name'
 'css-class-name'.capitalize()    // 'Css-class-name'
 'my favorite items'.capitalize() // 'My favorite items'
 ```
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 Returns the plural form of a string

 ```javascript
 'innerHTML'.pluralize()         // 'innerHTMLs'
 'action_name'.pluralize()       // 'actionNames'
 'css-class-name'.pluralize()    // 'cssClassNames'
 'regex'.pluralize()            // 'regexes'
 'user'.pluralize()             // 'users'
 ```
 */
export function pluralize(str: string): string {
  return camelize(
    [/([^aeiou])y$/, /()fe?$/, /([^aeiou]o|[sxz]|[cs]h)$/].map(
      (c, i) => (str = str.replace(c, `$1${'iv'[i] || ''}e`))
    ) && str + 's'
  );
}

export function group(name: string, group: string | undefined) {
  return group ? `${group}/${name}` : name;
}

export function featurePath(
  group: boolean | undefined,
  flat: boolean | undefined,
  path: string,
  name: string
) {
  if (group && !flat) {
    return `../../${path}/${name}/`;
  }

  return group ? `../${path}/` : './';
}
