import {VendorsRepository} from "./Vendors/index.js";
import {prisma} from "./connections.js";

const repositories = {
    vendors: new VendorsRepository(prisma),
}

export default repositories;
