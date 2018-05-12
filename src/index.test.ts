import BiDirectionalMap from './index';

describe('empty map', () => {
  const map = new BiDirectionalMap();
  it('size', () => {
    expect(map.size).toBe(0);
  });
  it('clear', () => {
    map.clear();
    expect(map.size).toBe(0);
  });
  it('inspect', () => {
    expect(map.inspect()).toBe('BidirectionalMap {}');
  });
});

describe('single item {"A": 1}', () => {
  const map = new BiDirectionalMap<string, number>();
  beforeEach(() => {
    map.set('A', 1);
  });

  it('size', () => {
    expect(map.size).toBe(1);
  });
  it('get', () => {
    expect(map.get('A')).toBe(1);
  });
  it('getKey', () => {
    expect(map.getKey(1)).toBe('A');
  });
  it('getValue', () => {
    expect(map.getValue('A')).toBe(1);
  });
  it('set', () => {
    map.set('A', 2);
    expect(map.get('A')).toBe(2);
  });
  it('setKey', () => {
    map.setKey(1, 'B');
    expect(map.get('B')).toBe(1);
    expect(map.size).toBe(1);
  });
  it('setValue', () => {
    map.setValue('A', 3);
    expect(map.get('A')).toBe(3);
  });
  it('clear', () => {
    map.clear();
    expect(map.size).toBe(0);
    expect(map.get('A')).toBe(undefined);
  });
  it('delete', () => {
    map.delete('A');
    expect(map.size).toBe(0);
    expect(map.get('A')).toBe(undefined);
  });
  it('deleteKey', () => {
    map.deleteKey('A');
    expect(map.size).toBe(0);
    expect(map.get('A')).toBe(undefined);
  });
  it('deleteValue', () => {
    map.deleteValue(1);
    expect(map.size).toBe(0);
    expect(map.get('A')).toBe(undefined);
  });
  it('forEach', () => {
    let iterations = 0;
    map.forEach((value, key, mapRef) => {
      iterations++;
      expect(key).toBe('A');
      expect(value).toBe(1);
      expect(mapRef.get(key)).toBe(value);
    });
    expect(iterations).toBe(map.size);
  });
  it('has', () => {
    expect(map.has('A')).toBe(true);
    expect(map.has('B')).toBe(false);
  });
  it('hasKey', () => {
    expect(map.hasKey('A')).toBe(true);
    expect(map.hasKey('B')).toBe(false);
  });
  it('hasValue', () => {
    expect(map.hasValue(1)).toBe(true);
    expect(map.hasValue(2)).toBe(false);
  });
  it('inspect', () => {
    expect(map.inspect()).toBe('BidirectionalMap {A => 1}');
  });
});

describe('alphabet letter => index', () => {
  const map = new BiDirectionalMap<string, number>();
  beforeEach(() => {
    for (let i = 1; i <= 26; i++) {
      map.set(String.fromCharCode(i + 64), i);
    }
  });

  it('size', () => {
    expect(map.size).toBe(26);
  });
  it('inspect', () => {
    expect(map.inspect()).toBe(
      'BidirectionalMap {' +
        'A => 1, B => 2, C => 3, D => 4, E => 5, ' +
        'F => 6, G => 7, H => 8, I => 9, J => 10, ' +
        'K => 11, L => 12, M => 13, N => 14, O => 15, ' +
        'P => 16, Q => 17, R => 18, S => 19, T => 20, ' +
        'U => 21, V => 22, W => 23, X => 24, Y => 25, ' +
        'Z => 26}'
    );
  });
  it('get', () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.get(String.fromCharCode(i + 64))).toBe(i);
    }
  });
  it('getKey', () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.getKey(i)).toBe(String.fromCharCode(i + 64));
    }
  });
  it('getValue', () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.getValue(String.fromCharCode(i + 64))).toBe(i);
    }
  });
  it('set', () => {
    for (let i = 1; i <= 26; i++) {
      map.set(String.fromCharCode(i + 64), i + 10);
      expect(map.getValue(String.fromCharCode(i + 64))).toBe(i + 10);
    }
  });
  it('setKey', () => {
    for (let i = 1; i <= 26; i++) {
      map.setKey(i + 100, String.fromCharCode(i + 64));
      expect(map.get(String.fromCharCode(i + 64))).toBe(i + 100);
    }
  });
  it('setValue', () => {
    for (let i = 1; i <= 26; i++) {
      map.setValue(String.fromCharCode(i + 64), i + 10);
      expect(map.getValue(String.fromCharCode(i + 64))).toBe(i + 10);
    }
  });

  it('clear', () => {
    map.clear();
    expect(map.size).toBe(0);
    for (let i = 1; i <= 26; i++) {
      expect(map.get(String.fromCharCode(i + 64))).toBe(undefined);
    }
  });
  it('delete', () => {
    for (let i = 1; i <= 26; i++) {
      map.delete(String.fromCharCode(i + 64));
      expect(map.get(String.fromCharCode(i + 64))).toBe(undefined);
    }
    expect(map.size).toBe(0);
  });
  it('deleteKey', () => {
    for (let i = 1; i <= 26; i++) {
      map.deleteKey(String.fromCharCode(i + 64));
      expect(map.get(String.fromCharCode(i + 64))).toBe(undefined);
    }
    expect(map.size).toBe(0);
  });
  it('deleteValue', () => {
    for (let i = 1; i <= 26; i++) {
      map.deleteValue(i);
      expect(map.get(String.fromCharCode(i + 64))).toBe(undefined);
    }
    expect(map.size).toBe(0);
  });
  it('forEach', () => {
    let iterations = 0;
    map.forEach((value, key, mapRef) => {
      iterations++;
      expect(map.get(key)).toBe(value);
      expect(map.getKey(value)).toBe(key);
      expect(mapRef.get(key)).toBe(value);
    });
    expect(iterations).toBe(map.size);
  });
  it('has', () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.has(String.fromCharCode(i + 64))).toBe(true); // A-Z
      expect(map.has(String.fromCharCode(i + 96))).toBe(false); // a-z
    }
  });
  it('hasKey', () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.hasKey(String.fromCharCode(i + 64))).toBe(true); // A-Z
      expect(map.hasKey(String.fromCharCode(i + 96))).toBe(false); // a-z
    }
  });
  it('hasValue', () => {
    for (let i = 1; i <= 26; i++) {
      expect(map.hasValue(i)).toBe(true); // A-Z
      expect(map.hasValue(i + 100)).toBe(false); // a-z
    }
  });
});
