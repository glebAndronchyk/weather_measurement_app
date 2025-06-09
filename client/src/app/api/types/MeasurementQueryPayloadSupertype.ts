import type { UNITS } from "../../../shared/constants/UNITS";
import type { EGeojsonMeasurementType } from "../../../shared/enums/EGeojsonMeasurementType";
import type { Coordinates } from "../../../shared/types/Coordinates";

export interface MeasurementQueryPayloadSupertype {
  take?: number;
  skip?: number;
  date?: string;
  coordinates?: Coordinates;
  device?: number;
  dateStart?: string;
  dateEnd?: string;
  within?: number;
  units?: UNITS[];
  type?: EGeojsonMeasurementType & string;
  ltc?: Coordinates<string | number>;
  rbc?: Coordinates<string | number>;
}
