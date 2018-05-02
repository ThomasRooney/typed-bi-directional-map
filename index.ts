export interface IBidirectionalMap<K, V> extends Map<K, V> {
  readonly size: number; // returns the total number of elements
  get: (key: K) => V | undefined; // returns a specified element
  getValue: (key: K) => V | undefined; // returns a specified element
  getKey: (value: V) => K | undefined; // returns a specified element
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
}

export default class BidirectionalMap<K, V> implements IBidirectionalMap<K, V> {
  private keyValueMap: Map<K, V> = new Map<K, V>();
  private valueKeyMap: Map<V, K> = new Map<V, K>();

  /* tslint:disable member-ordering */
  public [Symbol.toStringTag]: 'Map';
  public size: number = 0;
  public [Symbol.iterator]: () => IterableIterator<[K, V]> = this.keyValueMap[Symbol.iterator];
  /* tslint:enable */

  public entries = () => this.keyValueMap.entries();
  public keys = () => this.keyValueMap.keys();
  public values = () => this.keyValueMap.values();

  public get = (a: K): V | undefined => this.keyValueMap.get(a);
  public getValue = (a: K): V | undefined => this.get(a);
  public getKey = (b: V): K | undefined => this.valueKeyMap.get(b);
  public set = (key: K, value: V) => {
    if (!this.has(key)) {
      this.size += 1;
    }

    this.keyValueMap.set(key, value);
    this.valueKeyMap.set(value, key);

    return this;
  };
  public setValue = (key: K, value: V) => this.set(key, value);
  public setKey = (value: V, key: K) => {
    if (!this.has(key)) {
      this.size += 1;
    }

    this.keyValueMap.set(key, value);
    this.valueKeyMap.set(value, key);

    return this;
  };
  public clear = () => {
    this.keyValueMap.clear();
    this.valueKeyMap.clear();
    this.size = 0;
  };
  public delete = (key: K) => {
    if (this.has(key)) {
      const value = this.keyValueMap.get(key) as V;
      this.keyValueMap.delete(key);
      this.valueKeyMap.delete(value);
      this.size -= 1;
      return true;
    }
    return false;
  };
  public deleteKey = (key: K) => this.delete(key);
  public deleteValue = (value: V) => {
    if (this.hasValue(value)) {
      const key = this.valueKeyMap.get(value) as K;
      this.keyValueMap.delete(key);
      this.valueKeyMap.delete(value);
      this.size -= 1;
      return true;
    }
    return false;
  };
  public forEach = (
    callbackfn: (value: V, key: K, map: IBidirectionalMap<K, V>) => void,
    thisArg?: any
  ) => {
    this.keyValueMap.forEach((value, key) => {
      callbackfn.apply(thisArg, [value, key, this]);
    });
  };
  public has = (key: K) => this.keyValueMap.has(key);
  public hasKey = (key: K) => this.has(key);
  public hasValue = (value: V) => this.valueKeyMap.has(value);
}
