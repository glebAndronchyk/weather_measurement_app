export class GeoJson {
    private readonly _data: string;

    constructor(jsonString: string) {
        this._data = jsonString;
    }

    singleFeature() {
        const obj = JSON.parse(this._data);

        if (obj?.type === 'Feature') {
            return obj;
        }

        return {
            type: 'Feature',
            geometry: {
                ...obj,
            },
        }
    }
}
