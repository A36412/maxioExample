import { Router } from 'express';
import { createCustomer, getCustomerById, listCustomer,createOrganizationPipedrive, listOrganizationsPipedrive,getAllPersons, updateCustomer, deleteOrganizationsPipedrive, listUserPipedrive, createOneTimePurchaseProduct, createProductFamily, createSubscriptionWithExisting, createPaymentProfile, createOneTimeCharge, getPaymentProfile, addNewDealField, addNewDeal, updateSubscriptionWithExisting, deletePaymentProfile, createBankAccount, deleteSubcription, getInvoicesById, createInvoice, addNewPerson, getProduct, getComponentFromFamily, getComponentPricePoint, addComponentInSubscription, createSubscriptionGroup, createSubscriptionHiarchy } from '../controllers/maxio.controller';

const router = Router();

router.post('/create-customer', createCustomer);
router.post('/create-organizations', createOrganizationPipedrive);
router.post('/create-dealfield', addNewDealField);
router.post('/create-deal', addNewDeal);
router.post('/create-person', addNewPerson);
router.post('/update-subcription', updateSubscriptionWithExisting);
router.post('/create-profile', createPaymentProfile);
router.post('/create-bank', createBankAccount);
router.post('/create-subcription', createSubscriptionWithExisting);
router.post('/create-product', createOneTimePurchaseProduct);
router.post('/create-charge', createOneTimeCharge)
router.post('/create-product-family', createProductFamily);
router.post('/create-invoice', createInvoice);
router.post('/add-allotation', addComponentInSubscription)
router.post('/create-child', createSubscriptionHiarchy)
router.post('/create-subscription-group', createSubscriptionGroup)
router.get('/list-customer', listCustomer);
router.get('/get-product', getProduct);
router.get ('/get-pricePoint', getComponentPricePoint);
router.get('/get-component', getComponentFromFamily);
router.get('/get-customer', getCustomerById);
router.get('/get-person', getAllPersons);   
router.get('/get-user', listUserPipedrive);
router.get('/get-payment', getPaymentProfile);
router.get('/get-invoices', getInvoicesById);
router.get('/get-organizations', listOrganizationsPipedrive);
router.put('/update-customer', updateCustomer);
router.delete('/delete-organizations', deleteOrganizationsPipedrive);
router.delete('/delete-payment_profile', deletePaymentProfile);
router.delete('/delete-subcription', deleteSubcription);


export default router;
