export interface DrawnPayload {
  features: object[];
}

export class DrawnEvent extends CustomEvent<DrawnPayload> {
  static key = "drawn";

  constructor(e: DrawnPayload) {
    super(DrawnEvent.key, { detail: e });
  }
}
