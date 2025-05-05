import {Vendor} from "../../../generated/prisma/index.js";

export interface NewVendorPayload {
    name: Vendor['name'];
    type: Vendor['type'];
}
