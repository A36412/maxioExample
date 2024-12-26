"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductFamily = exports.createOneTimePurchaseProduct = exports.createOrganizationPipedrive = exports.deleteOrganizationsPipedrive = exports.listUserPipedrive = exports.listOrganizationsPipedrive = exports.getAllPersons = exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.listCustomer = exports.createCustomer = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createCustomer = async (req, res) => {
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
        const response = await axios_1.default.post(`${process.env.MAXIO_SUBDOMAIN}/customers.json`, customerData, {
            headers: {
                'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json({
            message: 'Customer created successfully',
            customer: response.data,
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to create customer',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.createCustomer = createCustomer;
const listCustomer = async (req, res) => {
    const params = {
        page: 1,
        perPage: 100,
    };
    try {
        const response = await axios_1.default.get(`${process.env.MAXIO_SUBDOMAIN}/customers.json`, {
            params,
            headers: {
                'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json({
            message: 'Get List Successfully',
            customer: response.data,
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to get list',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.listCustomer = listCustomer;
const getCustomerById = async (req, res) => {
    const customerId = req.params.id;
    console.log("Id " + req.params);
    try {
        const response = await axios_1.default.get(`${process.env.MAXIO_SUBDOMAIN}/customers/${customerId}.json`, {
            headers: {
                'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json(response.data.customer);
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to get list',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.getCustomerById = getCustomerById;
const updateCustomer = async (req, res) => {
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
        const response = await axios_1.default.put(`${process.env.MAXIO_SUBDOMAIN}/customers/${customerId}.json`, {
            customerData
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json(response.data.customer);
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to update customer',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    const customerId = req.params.id;
    try {
        const response = await axios_1.default.delete(`${process.env.MAXIO_SUBDOMAIN}/customers/${customerId}.json`, {
            headers: {
                'Authorization': `Basic ${Buffer.from((process.env.MAXIO_API_KEY || '') + ':x').toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json(response.data.customer);
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to update customer',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.deleteCustomer = deleteCustomer;
const getAllPersons = async (req, res) => {
    try {
        const baseURL = `${process.env.PIPE_DRIVE_URL}/api/v2/persons`;
        const response = await axios_1.default.get(baseURL, {
            params: {
                api_token: process.env.PIPE_DRIVE_API_KEY,
            },
        });
        if (response.data && response.data.success) {
            res.status(200).json({
                message: response.data.data,
                persons: response.data.data,
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to fetch persons',
                error: response.data.error || 'Unknown error',
            });
        }
    }
    catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({
            message: 'An unexpected error occurred',
            error: error.message,
        });
    }
};
exports.getAllPersons = getAllPersons;
const listOrganizationsPipedrive = async (req, res) => {
    try {
        const response = await axios_1.default.get(`${process.env.PIPE_DRIVE_URL}/api/v2/organizations`, {
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
        });
        res.status(200).json({
            message: response.data.data,
            organizations: response.data.data,
            additional_data: response.data.additional_data
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to get organizations list',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.listOrganizationsPipedrive = listOrganizationsPipedrive;
const listUserPipedrive = async (req, res) => {
    try {
        const response = await axios_1.default.get(`${process.env.PIPE_DRIVE_URL}/v1/users`, {
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
        });
        res.status(200).json({
            message: response.data.data,
            organizations: response.data.data,
            additional_data: response.data.additional_data
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to get organizations list',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.listUserPipedrive = listUserPipedrive;
const deleteOrganizationsPipedrive = async (req, res) => {
    try {
        const response = await axios_1.default.delete(`${process.env.PIPE_DRIVE_URL}/api/v2/organizations/1`, {
            params: {
                api_token: process.env.PIPE_DRIVE_API_KEY,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json({
            message: response.data.data,
            organizations: response.data.data,
            additional_data: response.data.additional_data
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to get organizations list',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.deleteOrganizationsPipedrive = deleteOrganizationsPipedrive;
const createOrganizationPipedrive = async (req, res) => {
    try {
        const customerData = {
            name: req.body.name
        };
        const response = await axios_1.default.post(`${process.env.PIPE_DRIVE_URL}/organizations`, customerData, {
            params: {
                api_token: process.env.PIPE_DRIVE_API_KEY
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json({
            message: 'Organization Created Successfully',
            organization: response.data.data
        });
    }
    catch (error) {
        console.error('Error:', error);
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to create organization',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.createOrganizationPipedrive = createOrganizationPipedrive;
const createOneTimePurchaseProduct = async (req, res) => {
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
        const response = await axios_1.default.post(`https://${process.env.MAXIO_SUBDOMAIN}/products.json`, productData, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.MAXIO_API_KEY || ''}:x`).toString('base64')}`, // Xác thực API Key
                'Content-Type': 'application/json', // Định dạng dữ liệu gửi
            },
        });
        // Trả về dữ liệu phản hồi từ Maxio API
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi từ Maxio API
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to create product',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            // Xử lý lỗi không mong muốn
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.createOneTimePurchaseProduct = createOneTimePurchaseProduct;
const createProductFamily = async (req, res) => {
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
        const response = await axios_1.default.post(`https://${process.env.MAXIO_SUBDOMAIN}/product_families.json`, productFamilyData, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.MAXIO_API_KEY || ''}:x`).toString('base64')}`, // Xác thực API Key
                'Content-Type': 'application/json', // Định dạng dữ liệu gửi
            },
        });
        // Trả về dữ liệu phản hồi từ Maxio API
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi từ Maxio API
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.message || 'Failed to create Product Family',
                errors: error.response.data.errors || error.response.data,
            });
        }
        else {
            // Xử lý lỗi không mong muốn
            res.status(500).json({
                message: 'An unexpected error occurred',
                error: error.message,
            });
        }
    }
};
exports.createProductFamily = createProductFamily;
