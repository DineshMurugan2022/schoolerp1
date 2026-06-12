import twilio from 'twilio';

// Use environment variables or fallback to empty strings for safe local dev
const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || '';

let client: twilio.Twilio | null = null;

if (accountSid && authToken) {
  try {
    client = twilio(accountSid, authToken);
  } catch (err) {
    console.error('Failed to initialize Twilio client:', err);
  }
}

/**
 * Sends a WhatsApp message via Twilio.
 * If credentials are not set, it gracefully logs the message to the console instead.
 * 
 * @param toPhoneNumber The recipient's phone number (e.g. '+1234567890')
 * @param message The text body of the WhatsApp message
 */
export const sendWhatsAppMessage = async (toPhoneNumber: string, message: string): Promise<void> => {
  // Ensure the 'to' number is formatted with the whatsapp: prefix
  const formattedTo = toPhoneNumber.startsWith('whatsapp:') ? toPhoneNumber : `whatsapp:${toPhoneNumber}`;
  const formattedFrom = twilioWhatsAppNumber.startsWith('whatsapp:') ? twilioWhatsAppNumber : `whatsapp:${twilioWhatsAppNumber}`;

  if (client && twilioWhatsAppNumber) {
    try {
      const response = await client.messages.create({
        body: message,
        from: formattedFrom,
        to: formattedTo
      });
      console.log(`WhatsApp message dispatched via Twilio! SID: ${response.sid}`);
    } catch (error) {
      console.error('Error sending Twilio WhatsApp message:', error);
    }
  } else {
    // Graceful degradation for local dev without Twilio credentials
    console.log('\n=============================================');
    console.log('📱 [MOCK WHATSAPP DISPATCH]');
    console.log(`To: ${formattedTo}`);
    console.log(`Message: ${message}`);
    console.log('(Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_WHATSAPP_NUMBER to .env to send real messages)');
    console.log('=============================================\n');
  }
};
