import type { CreateMeasurementRequestPayloadWithTemporalId } from "../../../../app/api/types/CreateMeasurementRequestPayload.ts";

export class MeasurementsBuffer {
  private _entries: CreateMeasurementRequestPayloadWithTemporalId[] = [];

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

  private constructor(
    entries: CreateMeasurementRequestPayloadWithTemporalId[],
  ) {
    this._entries = entries;
  }

  addEntry(entry: Partial<CreateMeasurementRequestPayloadWithTemporalId>) {
    this._entries.push(entry as CreateMeasurementRequestPayloadWithTemporalId);
  }

  clear() {
    this._entries = [];
  }

  static instantiate() {
    return new this([]);
  }

  static clone(buff: MeasurementsBuffer) {
    return new this(buff.entries);
  }
}
