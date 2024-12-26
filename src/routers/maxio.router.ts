import { Router } from 'express';
import { createCustomer, getCustomerById, listCustomer,createOrganizationPipedrive, listOrganizationsPipedrive,getAllPersons, updateCustomer, deleteOrganizationsPipedrive, listUserPipedrive, createOneTimePurchaseProduct, createProductFamily, createSubscriptionWithExisting, createPaymentProfile, createOneTimeCharge } from '../controllers/maxio.controller';

const router = Router();

router.post('/create-customer', createCustomer);
router.post('/create-organizations', createOrganizationPipedrive);
router.post('/create-profile', createPaymentProfile);
router.post('/create-subcription', createSubscriptionWithExisting);
router.post('/create-product', createOneTimePurchaseProduct);
router.post('/create-charge', createOneTimeCharge)
router.post('/create-product-family', createProductFamily);
router.get('/list-customer', listCustomer);
router.get('/get-customer', getCustomerById);
router.get('/get-person', getAllPersons);
router.get('/get-user', listUserPipedrive);
router.get('/get-organizations', listOrganizationsPipedrive);
router.put('/update-customer', updateCustomer);
router.delete('/delete-organizations', deleteOrganizationsPipedrive);

export default router;
