import { Request, Response } from 'express';
import { ApiError, Client, CustomersController, Environment } from '@maxio-com/advanced-billing-sdk';



export const createCustomer = async (req: Request, res: Response) => {
    const client = new Client({
        basicAuthCredentials: {
          username: 'manhnv.bhsoft@gmail.com',
          password: 'Manhbhsoft123 '
        },
      });
    
    const customersController = new CustomersController(client);
    const body = {
      customer: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        ccEmails: req.body.ccEmails,
        organization: req.body.organization,
        reference: req.body.reference,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        locale: req.body.locale,
      },
    };
  
    try {
      const { result, ...httpResponse } = await customersController.createCustomer(body);
      console.log('HTTP Response:', httpResponse); // In ra phản hồi để kiểm tra
      res.status(201).json({
        message: 'Customer created successfully',
        customer: result,
        response: httpResponse,
      });
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode || 500).json({
          message: 'Failed to create customer',
          errors: error.result,
        });
      } 
    }
  };
  
// export const getCustomer = async (req: Request, res: Response) => {
//   const customerId = req.params.id;

//   try {
//     const customer = await maxio.customer.retrieve(customerId);
//     res.status(200).json(customer);
//   } catch (error) {
//     console.error('Error retrieving customer:', error);
//     res.status(500).json({ message: 'Failed to retrieve customer', error: error.message });
//   }
// };
