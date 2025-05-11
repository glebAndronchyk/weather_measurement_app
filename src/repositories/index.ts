import {VendorsRepository} from "./Vendors/index.js";
import {prisma} from "./connections.js";
import {MeasurementsBaseRepository} from "./Measurements/index.ts";

const repositories = {
    vendors: new VendorsRepository(prisma),
    measurementsBase: new MeasurementsBaseRepository(prisma),
}

export default repositories;
