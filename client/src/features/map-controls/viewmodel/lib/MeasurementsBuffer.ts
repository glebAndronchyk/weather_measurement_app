export class MeasurementsBuffer {
  private _entries: [] = [];

  get entries() {
    return this._entries;
  }

  get isSomethingCreating() {
    return this._entries.some((entry) => !entry.area);
  }

  get hasEntries() {
    return Boolean(this._entries.length);
  }

  get last() {
    const lastEntry = this._entries.at(-1);
    if (!lastEntry) return null;

    return {
      applyPolygon(polygon: object) {
        lastEntry.area = polygon;
      },
    };
  }

  private constructor(entries: []) {
    this._entries = entries;
  }

  addEntry(entry: never) {
    this._entries.push(entry);
  }

  static instantiate() {
    return new this([]);
  }

  static clone(buff: MeasurementsBuffer) {
    return new this(buff.entries);
  }
}
