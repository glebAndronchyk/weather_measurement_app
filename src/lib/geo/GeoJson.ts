export class GeoJson {
    private readonly _data: string;

    constructor(data: string) {
        this._data = data;
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
