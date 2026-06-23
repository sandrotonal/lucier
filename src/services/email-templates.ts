export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    price: number
    quantity: number
    size?: string
  }>
  subtotal: number
  discount: number
  total: number
  shippingAddress: string
}

export const emailTemplates = {
  orderConfirmation(data: OrderEmailData): EmailTemplate {
    const itemsHtml = data.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
          <strong>${item.name}</strong>
          ${item.size ? `<br><span style="font-size: 12px; color: #666;">Size: ${item.size}</span>` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
          $${item.price.toFixed(2)}
        </td>
      </tr>
    `
      )
      .join('')

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 2px solid #000;">
          
          <tr>
            <td style="padding: 40px; text-align: center; border-bottom: 2px solid #000;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">LUCIR</h1>
              <p style="margin: 8px 0 0; font-size: 12px; color: #666; letter-spacing: 1px;">ARCHITECTURAL FASHION</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                Order Confirmed
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; color: #666; line-height: 1.6;">
                Thank you for your order, ${data.customerName}. We're preparing your items for shipment.
              </p>

              <div style="background-color: #f5f5f5; border: 1px solid #000; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
                <p style="margin: 8px 0 0; font-size: 18px; font-weight: bold; letter-spacing: 1px;">${data.orderId}</p>
              </div>

              <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                Order Details
              </h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #000; margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #f5f5f5;">
                    <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px;">Subtotal:</td>
                  <td style="padding: 8px 0; font-size: 14px; text-align: right;">$${data.subtotal.toFixed(2)}</td>
                </tr>
                ${
                  data.discount > 0
                    ? `
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #d32f2f;">Discount:</td>
                  <td style="padding: 8px 0; font-size: 14px; text-align: right; color: #d32f2f;">-$${data.discount.toFixed(2)}</td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #666;">Shipping:</td>
                  <td style="padding: 8px 0; font-size: 14px; text-align: right; color: #666;">FREE</td>
                </tr>
                <tr style="border-top: 2px solid #000;">
                  <td style="padding: 16px 0 0; font-size: 18px; font-weight: bold;">Total:</td>
                  <td style="padding: 16px 0 0; font-size: 18px; font-weight: bold; text-align: right;">$${data.total.toFixed(2)}</td>
                </tr>
              </table>

              <div style="background-color: #f5f5f5; border: 1px solid #000; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-line;">${data.shippingAddress}</p>
              </div>

              <p style="margin: 24px 0 0; font-size: 13px; color: #666; line-height: 1.6;">
                You will receive a shipping confirmation email with tracking information once your order ships.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 40px; background-color: #f5f5f5; border-top: 2px solid #000; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                Questions? Contact us
              </p>
              <p style="margin: 0; font-size: 13px;">
                <a href="mailto:hello@lucir.com" style="color: #000; text-decoration: none;">hello@lucir.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    const text = `
LUCIR - Order Confirmation

Thank you for your order, ${data.customerName}!

Order Number: ${data.orderId}

Order Details:
${data.items.map((item) => `- ${item.name} ${item.size ? `(Size: ${item.size})` : ''} x${item.quantity} - $${item.price.toFixed(2)}`).join('\n')}

Subtotal: $${data.subtotal.toFixed(2)}
${data.discount > 0 ? `Discount: -$${data.discount.toFixed(2)}\n` : ''}Shipping: FREE
Total: $${data.total.toFixed(2)}

Shipping Address:
${data.shippingAddress}

You will receive a shipping confirmation email once your order ships.

Questions? Contact us at hello@lucir.com
    `

    return {
      subject: `Order Confirmation - ${data.orderId}`,
      html,
      text,
    }
  },
}
