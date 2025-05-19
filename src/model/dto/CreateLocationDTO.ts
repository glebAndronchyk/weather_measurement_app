export interface CreateLocationDTO {
    type: string;
    metadata: object;
    point: {
        x: number;
        y: number;
    }
}
