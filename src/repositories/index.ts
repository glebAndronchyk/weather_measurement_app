import {VendorsRepository} from "./Vendors/index.js";
import {prisma} from "./connections.js";
import {MeasurementsBaseRepository} from "./measurements/index.ts";
import {LocationsRepository} from "./locations/index.js";

const repositories = {
    vendors: new VendorsRepository(prisma),
    measurementsBase: new MeasurementsBaseRepository(prisma),
    locations: new LocationsRepository(prisma),
}

export default repositories;
