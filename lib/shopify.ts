/**
 * Shopify Integration Service for REMODELY AI Marketplace
 * Handles product management, orders, and inventory for contractors and homeowners
 */

export interface ShopifyProduct {
    id: string
    title: string
    description: string
    vendor: string
    product_type: string
    handle: string
    status: 'active' | 'archived' | 'draft'
    images: ShopifyImage[]
    variants: ShopifyVariant[]
    tags: string
    created_at: string
    updated_at: string
}

export interface ShopifyVariant {
    id: string
    product_id: string
    title: string
    price: string
    sku: string
    inventory_quantity: number
    inventory_management: string
    fulfillment_service: string
    requires_shipping: boolean
    taxable: boolean
    weight: number
    weight_unit: string
}

export interface ShopifyImage {
    id: string
    product_id: string
    src: string
    alt: string
    width: number
    height: number
}

export interface ShopifyOrder {
    id: string
    order_number: string
    email: string
    created_at: string
    updated_at: string
    total_price: string
    subtotal_price: string
    tax_lines: ShopifyTaxLine[]
    line_items: ShopifyLineItem[]
    billing_address: ShopifyAddress
    shipping_address: ShopifyAddress
    customer: ShopifyCustomer
    financial_status: string
    fulfillment_status: string
}

export interface ShopifyLineItem {
    id: string
    variant_id: string
    title: string
    quantity: number
    price: string
    vendor: string
    product_id: string
    sku: string
}

export interface ShopifyTaxLine {
    title: string
    price: string
    rate: number
}

export interface ShopifyAddress {
    first_name: string
    last_name: string
    address1: string
    address2: string
    city: string
    province: string
    country: string
    zip: string
    phone: string
}

export interface ShopifyCustomer {
    id: string
    email: string
    first_name: string
    last_name: string
    phone: string
    created_at: string
    updated_at: string
    tags: string
}

class ShopifyService {
    private apiKey: string
    private apiSecret: string
    private shopDomain: string
    private accessToken: string
    private baseUrl: string

    constructor() {
        this.apiKey = process.env.SHOPIFY_API_KEY || ''
        this.apiSecret = process.env.SHOPIFY_API_SECRET_KEY || ''
        this.shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || ''
        this.accessToken = process.env.SHOPIFY_ACCESS_TOKEN || ''
        this.baseUrl = `https://${this.shopDomain}/admin/api/2024-04`
    }

    private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`

        const defaultHeaders = {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
        }

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        })

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    // Product Management
    async createProduct(productData: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
        const response = await this.makeRequest<{ product: ShopifyProduct }>('/products.json', {
            method: 'POST',
            body: JSON.stringify({ product: productData }),
        })
        return response.product
    }

    async getProduct(productId: string): Promise<ShopifyProduct> {
        const response = await this.makeRequest<{ product: ShopifyProduct }>(`/products/${productId}.json`)
        return response.product
    }

    async updateProduct(productId: string, productData: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
        const response = await this.makeRequest<{ product: ShopifyProduct }>(`/products/${productId}.json`, {
            method: 'PUT',
            body: JSON.stringify({ product: productData }),
        })
        return response.product
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.makeRequest(`/products/${productId}.json`, {
            method: 'DELETE',
        })
    }

    async getProducts(params: {
        limit?: number
        vendor?: string
        product_type?: string
        status?: string
    } = {}): Promise<ShopifyProduct[]> {
        const queryParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value.toString())
        })

        const response = await this.makeRequest<{ products: ShopifyProduct[] }>(
            `/products.json?${queryParams.toString()}`
        )
        return response.products
    }

    // Order Management
    async getOrders(params: {
        limit?: number
        status?: string
        financial_status?: string
        fulfillment_status?: string
    } = {}): Promise<ShopifyOrder[]> {
        const queryParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value.toString())
        })

        const response = await this.makeRequest<{ orders: ShopifyOrder[] }>(
            `/orders.json?${queryParams.toString()}`
        )
        return response.orders
    }

    async getOrder(orderId: string): Promise<ShopifyOrder> {
        const response = await this.makeRequest<{ order: ShopifyOrder }>(`/orders/${orderId}.json`)
        return response.order
    }

    async updateOrder(orderId: string, orderData: Partial<ShopifyOrder>): Promise<ShopifyOrder> {
        const response = await this.makeRequest<{ order: ShopifyOrder }>(`/orders/${orderId}.json`, {
            method: 'PUT',
            body: JSON.stringify({ order: orderData }),
        })
        return response.order
    }

    // Customer Management
    async createCustomer(customerData: Partial<ShopifyCustomer>): Promise<ShopifyCustomer> {
        const response = await this.makeRequest<{ customer: ShopifyCustomer }>('/customers.json', {
            method: 'POST',
            body: JSON.stringify({ customer: customerData }),
        })
        return response.customer
    }

    async getCustomer(customerId: string): Promise<ShopifyCustomer> {
        const response = await this.makeRequest<{ customer: ShopifyCustomer }>(`/customers/${customerId}.json`)
        return response.customer
    }

    async updateCustomer(customerId: string, customerData: Partial<ShopifyCustomer>): Promise<ShopifyCustomer> {
        const response = await this.makeRequest<{ customer: ShopifyCustomer }>(`/customers/${customerId}.json`, {
            method: 'PUT',
            body: JSON.stringify({ customer: customerData }),
        })
        return response.customer
    }

    // Inventory Management
    async updateInventory(variantId: string, quantity: number): Promise<void> {
        await this.makeRequest(`/variants/${variantId}.json`, {
            method: 'PUT',
            body: JSON.stringify({
                variant: {
                    id: variantId,
                    inventory_quantity: quantity,
                },
            }),
        })
    }

    // Contractor-specific methods
    async createContractorProduct(contractorId: string, productData: {
        title: string
        description: string
        price: string
        sku?: string
        inventory_quantity?: number
        images?: string[]
        category: 'tools' | 'materials' | 'equipment' | 'services'
    }): Promise<ShopifyProduct> {
        const product: any = {
            title: productData.title,
            description: productData.description,
            vendor: `Contractor-${contractorId}`,
            product_type: productData.category,
            status: 'active' as const,
            tags: `contractor,${productData.category},remodely-marketplace`,
            variants: [
                {
                    price: productData.price,
                    sku: productData.sku || `CONTR-${contractorId}-${Date.now()}`,
                    inventory_quantity: productData.inventory_quantity || 1,
                    inventory_management: 'shopify',
                    fulfillment_service: 'manual',
                    requires_shipping: productData.category !== 'services',
                    taxable: true,
                },
            ],
            images: productData.images?.map(src => ({ src })) || [],
        }

        return this.createProduct(product)
    }

    async getContractorProducts(contractorId: string): Promise<ShopifyProduct[]> {
        return this.getProducts({
            vendor: `Contractor-${contractorId}`,
            limit: 250,
        })
    }

    // Marketplace analytics
    async getMarketplaceStats(): Promise<{
        totalProducts: number
        totalOrders: number
        totalRevenue: string
        activeContractors: number
    }> {
        const [products, orders] = await Promise.all([
            this.getProducts({ limit: 1 }),
            this.getOrders({ limit: 1 }),
        ])

        // Get total counts from headers or make additional requests
        const totalProducts = products.length
        const totalOrders = orders.length
        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0).toString()

        // Count unique contractors (vendors)
        const allProducts = await this.getProducts({ limit: 250 })
        const contractors = new Set(allProducts.map(p => p.vendor).filter(v => v.startsWith('Contractor-')))
        const activeContractors = contractors.size

        return {
            totalProducts,
            totalOrders,
            totalRevenue,
            activeContractors,
        }
    }
}

export const shopifyService = new ShopifyService()
export default shopifyService
