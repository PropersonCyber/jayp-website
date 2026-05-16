import { Resend } from 'resend'

export async function sendOrderEmails(order: {
  order_number: string
  email: string
  first_name: string
  total: number
  items_summary: string
}) {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) {
    console.log('[email mock] Order confirmation:', order.order_number, '→', order.email)
    return
  }

  const resend = new Resend(config.resendApiKey)
  const from = config.resendFromEmail

  await resend.emails.send({
    from,
    to: order.email,
    subject: `BAGLUXE Order Inquiry ${order.order_number}`,
    html: `<p>Hi ${order.first_name},</p><p>We received your inquiry <strong>${order.order_number}</strong>.</p><p>Total: $${order.total.toFixed(2)}</p><p>${order.items_summary}</p><p>Our team will contact you within 24 hours.</p>`,
  })

  await resend.emails.send({
    from,
    to: config.salesEmail,
    subject: `New order inquiry ${order.order_number}`,
    html: `<p>New inquiry from ${order.email}</p><p>${order.items_summary}</p>`,
  })
}

export async function sendSimpleEmail(to: string, subject: string, html: string) {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) {
    console.log('[email mock]', subject, '→', to)
    return
  }
  const resend = new Resend(config.resendApiKey)
  await resend.emails.send({ from: config.resendFromEmail, to, subject, html })
}
