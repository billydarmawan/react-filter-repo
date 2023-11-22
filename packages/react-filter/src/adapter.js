export class BaseAdapter {
  constructor(defaultValue = "") {
    this.defaultValue = defaultValue;
  }
  toString(string) {
    return string ?? "";
  }
  toValue(string) {
    return string ?? this.defaultValue;
  }
  equal(valueA, valueB) {
    return valueA === valueB;
  }
}

export class StringAdapter extends BaseAdapter {
  constructor(defaultValue = "") {
    super(defaultValue);
  }
}

export class NumberAdapter extends BaseAdapter {
  constructor(defaultValue = 0) {
    super(defaultValue);
  }

  toString(number) {
    return number.toString() ?? "";
  }

  toValue(string) {
    if (string && !Number.isNaN(Number(string))) {
      return Number(string);
    }
    return this.defaultValue;
  }
}

export class BooleanAdapter extends BaseAdapter {
  constructor(defaultValue = false) {
    super(defaultValue);
  }

  toValue(string) {
    if (string && (string === "true" || string === "false")) {
      return string === "true";
    }
    return this.defaultValue;
  }
}

/**
 * only flat json is supported
 */
export class JSONAdapter extends BaseAdapter {
  constructor(defaultValue = {}) {
    super(defaultValue);
  }

  toString(object) {
    try {
      return encodeURIComponent(JSON.stringify(object)) ?? "";
    } catch (error) {
      return "";
    }
  }

  toValue(string) {
    try {
      return JSON.parse(decodeURIComponent(string)) ?? this.defaultValue;
    } catch (error) {
      return this.defaultValue;
    }
  }

  equal(valueA, valueB) {
    if (!valueA || !valueB) return false;
    if (valueA === valueB) return true;

    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);
    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const kA of keysA) {
      if (!valueA[kA] || !valueB[kA]) {
        return false;
      } else if (valueA[kA] !== valueB[kA]) {
        return false;
      }
    }
    return true;
  }
}

export class ArrayAdapter extends BaseAdapter {
  constructor(
    defaultValue = [],
    itemAdapter = new BaseAdapter(),
    delimiter = ","
  ) {
    super(defaultValue);
    this.itemAdapter = itemAdapter;
    this.delimiter = delimiter;
  }

  toString(array) {
    return array?.map(this.itemAdapter.toString).join(this.delimiter) ?? "";
  }

  toValue(string) {
    if (string) {
      try {
        const arr = string.split(this.delimiter);
        if (Array.isArray(arr)) {
          return arr.map(this.itemAdapter.toValue);
        }
      } catch (error) {
        // noop
      }
    }
    return this.defaultValue;
  }

  equal(valueA, valueB) {
    if (!valueA || !valueB) return false;
    if (valueA === valueB) return true;

    if (valueA.length !== valueB.length) {
      return false;
    }

    for (let i = 0; i < valueA.length; i++) {
      const vA = valueA[i];
      const vB = valueB[i];
      if (!this.itemAdapter.equal(vA, vB)) {
        return false;
      }
    }

    return true;
  }
}
