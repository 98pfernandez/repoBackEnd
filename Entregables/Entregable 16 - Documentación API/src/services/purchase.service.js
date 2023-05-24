import PurchaseRepository from "../dao/repository/purchase.repository.js";
const purchaseRepository=new PurchaseRepository();

class PurchaseService{
createPurchase(customerInfo){
   return purchaseRepository.createPurchase(customerInfo);
}
}

export default PurchaseService