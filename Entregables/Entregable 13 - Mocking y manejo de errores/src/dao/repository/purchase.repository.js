import PurchaseModel from "../../models/ticket.models.js";

class PurchaseRepository {
    async createPurchase(customerInfo) {
        try {
           return await PurchaseModel.create(customerInfo)
        } catch (error) {
        }
    }
}

export default PurchaseRepository;
