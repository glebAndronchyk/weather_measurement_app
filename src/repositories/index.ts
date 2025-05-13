import {VendorsRepository} from "./Vendors/index.js";
import {prisma} from "./connections.js";
import {MeasurementsBaseRepository} from "./measurements/index.ts";

const repositories = {
    vendors: new VendorsRepository(prisma),
    measurementsBase: new MeasurementsBaseRepository(prisma),
}

export default repositories;
