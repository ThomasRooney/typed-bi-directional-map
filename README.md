# Typed Bi Directional Map

Provides a simple, efficient two directional map, implemented with two ES6 maps.

Extends and conforms to the ES6 Map<K, V> interface.

```typescript
interface IBidirectionalMap<K, V> extends Map<K, V> {
  readonly size: number; // returns the total number of elements
  get: (key: K) => V | undefined; // returns a specified element
  getKey: (value: V) => K | undefined; // returns a specified element
  getValue: (key: K) => V | undefined; // returns a specified element
  set: (key: K, value: V) => this; // adds or updates the value of an element looked up via the specified key
  setValue: (key: K, value: V) => this; // adds or updates the key of an element looked up via the specified value
  setKey: (value: V, key: K) => this; // adds or updates the value of an element looked up via the specified key
  clear: () => void; // removes all elements
  delete: (key: K) => boolean; // Returns true if an element existed and has been removed, or false if the element does not exist.
  deleteKey: (key: K) => boolean; // Returns true if an element existed and has been removed, or false if the element does not exist.
  deleteValue: (value: V) => boolean; // Returns true if an element existed and has been removed, or false if the element does not exist.
  forEach: (
    callbackfn: (value: V, key: K, map: IBidirectionalMap<K, V>) => void,
    thisArg?: any
  ) => void; // executes the provided callback once for each key of the map
  has: (key: K) => boolean; // Returns true if an element with the specified key exists; otherwise false.
  hasKey: (key: K) => boolean; // Returns true if an element with the specified key exists; otherwise false.
  hasValue: (value: V) => boolean; // Returns true if an element with the specified value exists; otherwise false.
  [Symbol.toStringTag]: 'Map'; // Anything implementing Map must always have toStringTag declared to be 'Map'. I consider this a little silly.
  inspect: () => string; // A utility function to inspect current contents as a string
}
```

# Installation

```
npm install --save typed-bi-directional-map
```
