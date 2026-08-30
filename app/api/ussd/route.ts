import { NextResponse } from 'next/server';

/**
 * Africa's Talking USSD Webhook Handler (Stubbed)
 * 
 * This endpoint handles USSD requests from Africa's Talking.
 * Currently stubbed with the menu flow documented below.
 * Full implementation will be added in Phase 2.
 * 
 * Setup instructions for Africa's Talking:
 * 1. Create an account at https://africastalking.com
 * 2. Go to USSD > Create Channel
 * 3. Set callback URL to: https://your-domain.com/api/ussd
 * 4. Use the Sandbox for testing (dial *384*shortcode#)
 * 5. Set AT_API_KEY and AT_USERNAME in .env.local
 * 
 * Menu Flow Design:
 * *384*MAZAO#
 * ├── 1. List Crop Waste
 * │   ├── 1. Maize Stalks
 * │   ├── 2. Sugarcane Bagasse
 * │   ├── 3. Coffee Husks
 * │   └── (Select) → Enter quantity in kg → Confirm
 * ├── 2. Check My Matches
 * │   └── (Shows recent matches with scores)
 * ├── 3. My Profile
 * │   └── (Shows registered name, phone, listings count)
 * └── 4. Help
 *     └── (Shows usage instructions)
 */

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const sessionId = formData.get('sessionId') as string;
    const serviceCode = formData.get('serviceCode') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const text = (formData.get('text') as string) || '';

    let response = '';

    // Parse the menu navigation
    const inputs = text.split('*').filter(Boolean);
    const level = inputs.length;

    if (text === '') {
      // Main menu
      response = `CON Welcome to MazaoLoop 🌱
Turn your crop waste into revenue!

1. List Crop Waste
2. Check My Matches
3. My Profile
4. Help`;

    } else if (inputs[0] === '1' && level === 1) {
      // List waste - select type
      response = `CON Select waste type:

1. Maize Stalks & Cobs
2. Sugarcane Bagasse
3. Coffee Husks`;

    } else if (inputs[0] === '1' && level === 2) {
      // List waste - enter quantity
      const types: Record<string, string> = {
        '1': 'Maize Stalks',
        '2': 'Sugarcane Bagasse',
        '3': 'Coffee Husks',
      };
      const selected = types[inputs[1]];
      if (selected) {
        response = `CON ${selected} selected.
Enter quantity in kilograms:`;
      } else {
        response = 'END Invalid selection. Please try again.';
      }

    } else if (inputs[0] === '1' && level === 3) {
      // List waste - confirm
      const qty = parseInt(inputs[2]);
      if (isNaN(qty) || qty <= 0) {
        response = 'END Invalid quantity. Please enter a number greater than 0.';
      } else {
        // TODO: Phase 2 - Actually create the listing in database
        response = `END Thank you! Your listing has been recorded.
Quantity: ${qty} kg
We will notify you when a buyer match is found.

MazaoLoop - Waste to Wealth 🌱`;
      }

    } else if (inputs[0] === '2') {
      // Check matches
      // TODO: Phase 2 - Query actual matches from database
      response = `END Matching feature coming soon!
We will SMS you when matches are found for your listings.

MazaoLoop - Waste to Wealth 🌱`;

    } else if (inputs[0] === '3') {
      // My profile
      // TODO: Phase 2 - Fetch actual profile data
      response = `END Profile for ${phoneNumber}
Feature coming soon! Register on our website for full access.

Visit: mazaoloop.co.ke`;

    } else if (inputs[0] === '4') {
      // Help
      response = `END MazaoLoop Help:
- Dial *384*MAZAO# to start
- Option 1: List your crop waste for sale
- Option 2: Check buyer matches
- Option 3: View your profile
- SMS support: 0700-MAZAO

Visit mazaoloop.co.ke for full features.`;

    } else {
      response = 'END Invalid input. Please dial *384*MAZAO# to start again.';
    }

    return new NextResponse(response, {
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (error) {
    console.error('USSD error:', error);
    return new NextResponse('END An error occurred. Please try again later.', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
