// api/register.js (Vercel serverless function)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { uid1, uid2, uid3, uid4, phone } = req.body;

  // Basic validation
  if (!uid1 || !uid2 || !uid3 || !uid4 || !phone) {
    return res.status(400).send('All fields are required');
  }

  // --- CallMeBot Configuration ---
  // Replace with YOUR phone number (international format, no +)
  const yourPhone = '919876543210';   // e.g. 919876543210
  // Replace with your actual CallMeBot apikey
  const apikey = 'YOUR_CALLMEBOT_APIKEY';

  // Build the message text
  const message = encodeURIComponent(
    `🔥 New Squad Registration 🔥\n` +
    `UID1: ${uid1}\nUID2: ${uid2}\nUID3: ${uid3}\nUID4: ${uid4}\n` +
    `Leader Phone: ${phone}`
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${yourPhone}&text=${message}&apikey=${apikey}`;

  try {
    const callmeResponse = await fetch(url);
    if (callmeResponse.ok) {
      return res.status(200).send('Message sent');
    } else {
      const errorText = await callmeResponse.text();
      return res.status(500).send('CallMeBot error: ' + errorText);
    }
  } catch (err) {
    return res.status(500).send('Failed to send WhatsApp message');
  }
}