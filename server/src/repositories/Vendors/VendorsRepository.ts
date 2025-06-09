import {PrismaClient} from "../../generated/prisma/index.js";
import {PaginationParams} from "../../model/controllers/PaginationParams.ts";
import {NewVendorPayload} from "../../model/domain/vendors/index.ts";


export class VendorsRepository {
    constructor(private connection: PrismaClient) {}

    async updateVendor(id: number, payload: Partial<NewVendorPayload>) {
        await this.connection.vendor.update({
            where: {
                id,
            },
            data: payload
        })
    }
    
    async createVendor(payload: NewVendorPayload) {
        await this.connection.vendor.create({
            data: payload,
        });
    }

    async getAllVendors(pagination: PaginationParams) {
        const data = await this.connection.vendor.findMany({
            ...pagination,
        });

        return data;
    }

    async getVendor(id: number) {
        const data = await this.connection.vendor.findUnique({
            where: {
                id,
            },
        });

        return data;
    }
}
