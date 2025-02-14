import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
interface Person {
  id: number;
  name: string;
  email: string[];
  phone: string[];
  // Thêm các thuộc tính khác tùy theo API trả về
}




export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  const customerData = {
    customer: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      cc_emails: req.body.cc_emails,
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
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/customers.json`,
      customerData,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(201).json({
      message: 'Customer created successfully',
      customer: response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create customer',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const listCustomer = async (req: Request, res: Response): Promise<void> => {
    const params = {
    params: {
        page: 1,
        perPage: 100,
        p: "NanaHimo@example.com"
      }
    }
    try {
      const response = await axios.get(
        `${process.env.MAXIO_SUBDOMAIN}/customers.json`,
        {
            params,
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(201).json({
        message: 'Get List Successfully',
        customer: response.data,
      });
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to get list',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
    const customerId = req.params.id;
    try {
      const response = await axios.get(
        `${process.env.MAXIO_SUBDOMAIN}/customers/${customerId}.json`,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(201).json(    
        response.data.customer
      );
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to get list',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  
  export const getInvoicesById = async (req: Request, res: Response): Promise<void> => {
    const subscription_id = req.body.subscription_id;
    try {
      const response = await axios.get(
        `${process.env.MAXIO_SUBDOMAIN}/invoices.json`,
        {
          params: {
              subscription_id: subscription_id
          },
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(201).json(    
        response.data
      );
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to get list',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };


  export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
    const customerId = req.params.id;
    const customerData = {
      customer: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        cc_emails: req.body.cc_emails,
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
      const response = await axios.put(
        `${process.env.MAXIO_SUBDOMAIN}/customers/${customerId}.json`,
        {
          customerData
        },
        {
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );  
      res.status(201).json(    
        response.data.customer
      );
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to update customer',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  
  export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    const customerId = req.params.id;
    
  
    try {
      const response = await axios.delete(
        `${process.env.MAXIO_SUBDOMAIN}/customers/${customerId}.json`,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );  
      res.status(201).json(    
        response.data.customer
      );
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to update customer',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  export const deletePaymentProfile = async (req: Request, res: Response): Promise<void> => {
    const payment_id = req.body.payment_id;
    
  
    try {
      const response = await axios.delete(
        `${process.env.MAXIO_SUBDOMAIN}/payment_profiles/${payment_id}.json`,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );  
      res.status(201).json(    
        response.data.customer
      );
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to update customer',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };


  export const deleteSubcription = async (req: Request, res: Response): Promise<void> => {
    const subscription_id = req.body.subscription_id;
    const payment_id = req.body.payment_id;

  
    try {
      const response = await axios.delete(
        `${process.env.MAXIO_SUBDOMAIN}/subscriptions/${subscription_id}/payment_profiles/${payment_id}.json`,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );  
      res.status(201).json(    
        response.data.subscription
      );
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to update customer',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  export const getAllPersons = async (req: Request, res: Response): Promise<void> => {
    try {
      const baseURL = `${process.env.PIPE_DRIVE_URL}/api/v2/persons`;
      const response = await axios.get(baseURL, {
        params: {
          api_token: process.env.PIPE_DRIVE_API_KEY,
        },
      });
  
      if (response.data && response.data.success) {
        res.status(200).json({
          message: response.data.data,
          persons: response.data.data,
        });
      } else {
        res.status(400).json({
          message: 'Failed to fetch persons',
          error: response.data.error || 'Unknown error',
        });
      }
    } catch (error: any) {
      console.error('Error fetching persons:', error);
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  };

  export const addNewPerson = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        org_id: req.body.org_id,
      };
  
      const response = await axios.post(
        `${process.env.PIPE_DRIVE_URL}/api/v2/persons`,
        customerData,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(201).json({
        message: ' Created Successfully',
        organization: response.data.data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to create organization',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  export const listOrganizationsPipedrive = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await axios.get(
        `${process.env.PIPE_DRIVE_URL}/api/v2/organizations`,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY,
            limit: 100, // Số lượng kết quả trên mỗi trang
            // Các tham số tìm kiếm và lọc tùy chọn
            // term: req.query.term, // Tìm kiếm theo từ khóa
            // filter_id: req.query.filter_id, // Lọc theo filter ID
            // sort: req.query.sort // Sắp xếp kết quả
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(200).json({
        message:response.data.data,
        organizations: response.data.data,
        additional_data: response.data.additional_data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to get organizations list',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

   export const addNewDealField = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData = {
          name: req.body.name,
          field_type: req.body.field_type,
      };
  
      const response = await axios.post(
        `${process.env.PIPE_DRIVE_URL}/v1/dealFields`,
        customerData,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(201).json({
        message: ' Created Successfully',
        organization: response.data.data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to create organization',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };


  export const addNewDeal = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData = {
        title: req.body.title,
        person_id: req.body.person_id,
        org_id: req.body.org_id,
        custom_fields: {
        "43eec5be91b18fd9cb05745936d2bae3228e3d08": req.body.maxioId,
        }
      };
  
      const response = await axios.post(
        `${process.env.PIPE_DRIVE_URL}/api/v2/deals`,
        customerData,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(201).json({
        message: ' Created Successfully',
        organization: response.data.data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to create organization',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };


  export const listUserPipedrive = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await axios.get(
        `${process.env.PIPE_DRIVE_URL}/v1/users`,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY,
            limit: 100, // Số lượng kết quả trên mỗi trang
            // Các tham số tìm kiếm và lọc tùy chọn
            // term: req.query.term, // Tìm kiếm theo từ khóa
            // filter_id: req.query.filter_id, // Lọc theo filter ID
            // sort: req.query.sort // Sắp xếp kết quả
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(200).json({
        message:response.data.data,
        organizations: response.data.data,
        additional_data: response.data.additional_data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to get organizations list',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  export const deleteOrganizationsPipedrive = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await axios.delete(
        `${process.env.PIPE_DRIVE_URL}/api/v2/organizations/1`,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(200).json({
        message:response.data.data,
        organizations: response.data.data,
        additional_data: response.data.additional_data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to get organizations list',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };
  
  export const createOrganizationPipedrive = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData = {
          name: req.body.name
      };
  
      const response = await axios.post(
        `${process.env.PIPE_DRIVE_URL}/organizations`,
        customerData,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(201).json({
        message: 'Organization Created Successfully',
        organization: response.data.data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to create organization',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };

  export const createInvoices = async (req: Request, res: Response): Promise<void> => {
    try {
      const subscription_id = req.body.subscription_id
      const payment = {
          name: req.body.name
      };
  
      const response = await axios.post(
        `${process.env.PIPE_DRIVE_URL}/subscriptions/${subscription_id}/payments.json`,
        payment,
        {
          params: {
            api_token: process.env.PIPE_DRIVE_API_KEY
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      res.status(201).json({
        message: 'Organization Created Successfully',
        organization: response.data.data
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || 'Failed to create organization',
          errors: error.response.data.errors || error.response.data,
        });
      } else {
        res.status(500).json({
          message: 'An unexpected error occurred',
          error: error.message,
        });
      }
    }
  };  

  
export const createOneTimePurchaseProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, handle, price_in_cents } = req.body; // Dữ liệu sản phẩm từ client

  const productData = {
    product: {
      name, // Tên sản phẩm
      handle, // Handle (mã định danh duy nhất)
      price_in_cents: 0, // Giá định kỳ (recurring price) là $0
      interval_unit: 'day', // Chu kỳ định kỳ: theo ngày
      interval: 1, // Định kỳ mỗi 1 ngày
      expiration_interval_unit: 'day', // Thời gian hết hạn: theo ngày
      expiration_interval: 1, // Hết hạn sau 1 ngày
      initial_charge_in_cents: price_in_cents, // Số tiền trả trước (giá sản phẩm)
      trial_interval_unit: null, // Không có giai đoạn dùng thử
      trial_interval: null, // Không có thời gian dùng thử
    },
  };

  try {
    // Gửi yêu cầu POST để tạo sản phẩm
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/product_families/2756551/products.json`,
      productData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`, // Xác thực API Key
          'Content-Type': 'application/json', // Định dạng dữ liệu gửi
        },
      }
    );

    // Trả về dữ liệu phản hồi từ Maxio API
    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    // Xử lý lỗi từ Maxio API
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create product',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      // Xử lý lỗi không mong muốn
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const createProductFamily = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, handle, description } = req.body; // Dữ liệu từ client

  const productFamilyData = {
    product_family: {
      name,
      handle, 
      description, 
    },
  };

  try {
    // Gửi yêu cầu POST để tạo Product Family
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/product_families.json`,
      productFamilyData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`, // Xác thực API Key
          'Content-Type': 'application/json', // Định dạng dữ liệu gửi
        },
      }
    );

    // Trả về dữ liệu phản hồi từ Maxio API
    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    // Xử lý lỗi từ Maxio API
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create Product Family',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      // Xử lý lỗi không mong muốn
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const createSubscriptionWithExisting = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { product_id, customer_id, payment_profile_id } = req.body;

  const subscriptionData = {
    subscription: {
      product_id,
      customer_id,
      payment_profile_id,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscriptions.json`,
      subscriptionData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create subscription',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};


export const addComponentInSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { quantity,subscription_id, component_id } = req.body; // Dữ liệu từ client

  const allocationData = {
    allocation: {
      quantity
    },
  };

  try {
    // Gửi yêu cầu POST để tạo Product Family
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscriptions/${subscription_id}/components/${component_id}/allocations.json`,
      allocationData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`, // Xác thực API Key
          'Content-Type': 'application/json', // Định dạng dữ liệu gửi
        },
      }
    );

    // Trả về dữ liệu phản hồi từ Maxio API
    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    // Xử lý lỗi từ Maxio API
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create Product Family',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      // Xử lý lỗi không mong muốn
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const createSubscriptionHiarchy = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { product_handle, customer_id, payer_id } = req.body; // Lấy dữ liệu từ client

  const subscriptionData = {
    subscription: {
      product_handle: product_handle,
      customer_id: customer_id,
      group: {
        target: {
          type: 'customer',
          id: payer_id,
        },
        billing: {
          align_date: true,
          prorate: false,
          accrue: false,
        },
      },
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscriptions.json`,
      subscriptionData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create Subscription',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};



export const createSubscriptionGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {subscription_id, member_ids = [] } = req.body; // Dữ liệu từ client

  const allocationData = {
    subscription_group: {
      subscription_id,
      member_ids
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscription_groups.json`,
      allocationData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Trả về dữ liệu phản hồi từ Maxio API
    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    // Xử lý lỗi từ Maxio API
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create Product Family',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      // Xử lý lỗi không mong muốn
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const createInvoice= async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subscription_id, unit_price, title,quantity } = req.body;

  const InvoiceData = {
    invoice: {
      line_items: [{
        unit_price,
        title,
        quantity
      }]
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscriptions/${subscription_id}/invoices.json`,
      InvoiceData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create subscription',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};


export const exportInvoice= async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subscription_id, unit_price, title,quantity } = req.body;

  const InvoiceData = {
    invoice: {
      line_items: [{
        unit_price,
        title,
        quantity
      }]
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/internal/invoices/public_urls.json`,
      InvoiceData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create subscription',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const updateSubscriptionWithExisting = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subscription_id, value } = req.body;

  const subscriptionData = {
    metadata: {
      metafield_id: 97013,
      name: "pipeDrive_id",
      value,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscriptions/${subscription_id}/metadata.json`,
      subscriptionData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create subscription',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};





export const createPaymentProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    product_handle,
    customer_id,
    payment_type,
    card_number,
    expiration_month,
    expiration_year,
    cvv,
    billing_address,
    billing_city,
    billing_state,
    billing_zip,
    billing_country,
    billing_address_2,
  } = req.body;
  const paymentData = {
    payment_profile: {
      customer_id,
      payment_type: payment_type || 'credit_card',
      full_number: card_number,
      expiration_month,
      expiration_year,
      cvv,
      billing_address,
      billing_city,
      billing_state,
      billing_zip,
      billing_country,
      billing_address_2,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/payment_profiles.json`,
      paymentData, // Dữ liệu gửi đi
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`,
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    res.status(201).json(response.data.payment_profile); // Trả về thông tin payment_profile
  } catch (error: any) {
    console.error('Response Data:', error);
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create payment profile',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};


export const createBankAccount = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    customer_id,
    bank_name,
    bank_routing_number,
    bank_account_number,
    bank_branch_code,
    payment_type,
    billing_state,
    billing_zip,
    billing_country,
    billing_address,
    billing_city,
    // billing_address_2,
  } = req.body;
  const paymentData = {
    payment_profile: {
      customer_id,
      payment_type: payment_type || 'bank_account',
      bank_name,
      bank_routing_number,
      bank_account_number,
      bank_branch_code,
      // expiration_month,
      // expiration_year,
      // cvv,
      billing_address,
      billing_city,
      billing_state,
      billing_zip,
      billing_country,
      // billing_zip,
      // billing_country,
      // billing_address_2,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/payment_profiles.json`,
      paymentData, // Dữ liệu gửi đi
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY || ''}:x`,
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    res.status(201).json(response.data.payment_profile); // Trả về thông tin payment_profile
  } catch (error: any) {
    console.error('Response Data:', error);
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create payment profile',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const createOneTimeCharge = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subscription_id, payment_id,customer_id,amount_in_cents, memo, product_id, item_name } = req.body;

  const chargeData = {
    charge: {
      subscription_id,
      type: 'Charge',
      kind: 'one_time',
      transaction_type: 'charge',
      success: true,
      customer_id,
      payment_id,
      amount_in_cents,
      memo,
      product_id,
      item_name,
      currency: 'USD', // Mặc định là USD, bạn có thể thay đổi
      created_at: new Date().toISOString(), // Tạo thời gian hiện tại
    },
  };

  try {
    const response = await axios.post(
      `${process.env.MAXIO_SUBDOMAIN}/subscriptions/${subscription_id}/charges.json`,
      chargeData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.MAXIO_API_KEY}:x`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      },
    );

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error('Error:', error);

    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to create one-time charge',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

export const getPaymentProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.MAXIO_SUBDOMAIN}/payment_profiles.json`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            (process.env.MAXIO_API_KEY || '') + ':x',
          ).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        params: {
          page:1 ,
          per_page: 10,
        }
      },
    );
    res.status(200).json({
      message:response.data,
      organizations: response.data,
  
    });
  } catch (error: any) {
    console.error('Error:', error);
  }
};


export const getProduct = async (req:Request ,res: Response
): Promise<void> => {
  const {product_id} = req.body
  try {
    const response = await axios.get(
      `${process.env.MAXIO_SUBDOMAIN}/products/${product_id}.json`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            (process.env.MAXIO_API_KEY || '') + ':x',
          ).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        params: {
          page:1 ,
          per_page: 10,
        }
      },
    );
    res.status(200).json({
      message:response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);
  }
};


export const getProducts = async (req:Request ,res: Response
): Promise<void> => {
  try {
    const response = await axios.get(
      `${process.env.MAXIO_SUBDOMAIN}/products.json`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            (process.env.MAXIO_API_KEY || '') + ':x',
          ).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        params: {
          page:1 ,
          per_page: 10,
        }
      },
    );
    res.status(200).json({
      message:response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);
  }
};

export const getComponentFromFamily = async (req:Request ,res: Response
): Promise<void> => {
  const { product_family_id } = req.body;
  try {
    const response = await axios.get(
      `${process.env.MAXIO_SUBDOMAIN}/components.json`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            (process.env.MAXIO_API_KEY || '') + ':x',
          ).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      },
    );
    res.status(200).json({
      message:response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);
  }
};

export const getComponentPricePoint = async (req:Request ,res: Response
): Promise<void> => {
  const { component_id } = req.body;
  try {
    const response = await axios.get(
      `${process.env.MAXIO_SUBDOMAIN}/components/${component_id}/price_points.json`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            (process.env.MAXIO_API_KEY || '') + ':x',
          ).toString('base64')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      },
    );
    res.status(200).json({
      message:response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);
  }
};


export const getListCustomer = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, per_page = 30, date_field = 'updated_at', q = '' } = req.query;
  try {
    const response = await axios.get(
      `${process.env.MAXIO_SUBDOMAIN}/customers.json`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
          'Content-Type': 'application/json',
        },
        params: {
          page,
          per_page,
          date_field,
          q,
        },
      }
    );
    res.status(201).json(    
      response.data.customer
    );
  } catch (error: any) {
    console.error('Error:', error);
    if (error.response) {
      res.status(error.response.status).json({
        message: error.response.data.message || 'Failed to get list',
        errors: error.response.data.errors || error.response.data,
      });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};