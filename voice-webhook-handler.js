#!/usr/bin/env node

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

const app = express();
const port = process.env.VOICE_WEBHOOK_PORT || 3005;

// Middleware to parse Twilio webhooks
app.use(express.urlencoded({ extended: false }));

console.log('🎤 REMODELY AI Voice Webhook Handler');
console.log('===================================');
console.log('Handling responses from voice calls...\n');

// Handle contractor greeting responses
app.post('/voice/contractor-greeting-response', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';

    console.log('👋 CONTRACTOR GREETING RECEIVED:');
    console.log(`   Speech: "${userSpeech}"`);

    // Detect if Josh/Joshua answered
    const isJosh = userSpeech.toLowerCase().includes('josh');
    const customerName = isJosh ? 'Josh' : 'there';

    twiml.say({
        voice: 'Polly.Joanna-Neural',
        rate: 'fast'
    }, `
    <prosody rate="110%" pitch="+2st">
      Hey ${customerName}! Thanks for taking my call. 
      
      <break time="0.2s"/>
      
      So I'm calling because we have homeowners in your area specifically asking 
      for contractors who do quality renovation work.
      
      <break time="0.3s"/>
      
      Are you currently taking on new projects, or is your schedule pretty packed right now?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 10,
        speechTimeout: 4,
        action: '/voice/contractor-interest-response',
        hints: 'yes, no, busy, maybe, sure, taking projects, schedule full'
    }).say({
        voice: 'Polly.Joanna-Neural',
        rate: 'fast'
    }, `<prosody rate="105%" pitch="+1st">Just let me know - are you taking new work?</prosody>`);

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle contractor interest responses  
app.post('/voice/contractor-interest-response', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';
    const userInput = req.body.Digits || '';

    console.log('📞 CONTRACTOR INTEREST RESPONSE:');
    console.log(`   Speech: "${userSpeech}"`);
    console.log(`   DTMF: "${userInput}"`);

    // Intelligent response based on what contractor said
    if (userSpeech.toLowerCase().includes('yes') || userSpeech.toLowerCase().includes('taking') || userInput === '1') {
        twiml.say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, `
      <prosody rate="110%" pitch="+2st">
        Perfect! That's exactly what I was hoping to hear.
        
        <break time="0.3s"/>
        
        Here's what makes us different - we pre-screen every single homeowner 
        for budget, timeline, and project readiness before they contact you.
        
        <break time="0.3s"/>
        
        No more tire-kickers or people just shopping around. Our contractors 
        are closing 75% of our leads versus the usual 20% industry average.
        
        <break time="0.5s"/>
        
        Plus, zero upfront costs. We only make money when you make money.
        
        <break time="0.3s"/>
        
        Want to get set up today? Takes about 5 minutes and you could have 
        qualified leads coming in this week.
      </prosody>
    `);

        twiml.gather({
            input: 'speech dtmf',
            timeout: 10,
            action: '/voice/contractor-signup'
        }).say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, '<prosody rate="105%" pitch="+1st">Should I get you signed up, or do you have any quick questions first?</prosody>');

    } else if (userSpeech.toLowerCase().includes('busy') || userSpeech.toLowerCase().includes('full') || userInput === '2') {
        twiml.say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, `
      <prosody rate="110%" pitch="+2st">
        I totally get that - being busy is a great problem to have in this business!
        
        <break time="0.3s"/>
        
        But here's the thing - that's exactly WHY this works so well. 
        We do all the heavy lifting on lead gen and qualification.
        
        <break time="0.3s"/>
        
        You literally only talk to people who are ready to hire and have 
        the budget to pay. No wasted time on consultations that go nowhere.
        
        <break time="0.5s"/>
        
        Most of our busy contractors use us to fill gaps between big projects 
        or when they want to cherry-pick premium jobs.
        
        <break time="0.3s"/>
        
        Would it make sense if I called you back in a few weeks when things calm down?
      </prosody>
    `);

        twiml.gather({
            input: 'speech dtmf',
            timeout: 10,
            action: '/voice/contractor-followup'
        }).say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, '<prosody rate="105%" pitch="+1st">Should I schedule a follow-up call, or would you rather hear more right now?</prosody>');

    } else {
        // Default response for unclear input
        twiml.say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, `
      <prosody rate="110%" pitch="+2st">
        Sorry, I want to make sure I understand your situation.
        
        <break time="0.3s"/>
        
        Are you currently taking on new renovation projects, 
        or is your schedule pretty full right now?
      </prosody>
    `);

        twiml.gather({
            input: 'speech dtmf',
            timeout: 15,
            action: '/voice/contractor-interest-response'
        }).say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, '<prosody rate="105%">Just say "yes I\'m taking projects" or "no I\'m too busy" - whatever works.</prosody>');
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner greeting responses
app.post('/voice/homeowner-greeting-response', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';

    console.log('👋 HOMEOWNER GREETING RECEIVED:');
    console.log(`   Speech: "${userSpeech}"`);

    // Detect Josh/Joshua and use name appropriately
    let customerName = 'Josh'; // Default to casual
    if (userSpeech.toLowerCase().includes('joshua')) {
        customerName = 'Joshua';
    }

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, `
    <prosody rate="115%" pitch="+3st">
      Great to talk with you, ${customerName}! 
      
      <break time="0.2s"/>
      
      So I understand you're interested in some renovation work. 
      That's fantastic - we love helping homeowners find the right contractors.
      
      <break time="0.3s"/>
      
      What kind of project are you thinking about, ${customerName}? 
      Kitchen, bathroom, or something bigger?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 12,
        speechTimeout: 5,
        action: '/voice/homeowner-project-response',
        hints: 'kitchen, bathroom, whole home, renovation, remodel, countertops, cabinets, flooring'
    }).say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, `<prosody rate="110%" pitch="+2st">${customerName}, just tell me what you're planning and I'll help you find the perfect contractor.</prosody>`);

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner project responses
app.post('/voice/homeowner-project-response', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';

    console.log('🏠 HOMEOWNER PROJECT RESPONSE:');
    console.log(`   Speech: "${userSpeech}"`);

    let projectType = 'renovation';
    let specialtyMessage = '';

    if (userSpeech.toLowerCase().includes('kitchen')) {
        projectType = 'kitchen';
        specialtyMessage = 'Kitchen renovation - that\'s exciting, Josh! We work with contractors who really know their stuff with countertops, cabinets, and complete kitchen makeovers.';
    } else if (userSpeech.toLowerCase().includes('bathroom')) {
        projectType = 'bathroom';
        specialtyMessage = 'Bathroom remodel, nice choice Josh! Our contractors specialize in tile work, vanities, and creating really beautiful functional spaces.';
    } else if (userSpeech.toLowerCase().includes('whole') || userSpeech.toLowerCase().includes('entire')) {
        projectType = 'whole_home';
        specialtyMessage = 'Wow, whole home renovation Josh! That\'s a big project. We have contractors who handle large-scale work and manage all the different trades.';
    } else {
        specialtyMessage = 'That sounds like a great project, Josh! Our contractors handle all types of renovation work.';
    }

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, `
    <prosody rate="115%" pitch="+3st">
      ${specialtyMessage}
      
      <break time="0.3s"/>
      
      To match you with the best contractors, Josh, I need to know your area. 
      What city or zip code should I focus on?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 15,
        action: '/voice/homeowner-location-response'
    }).say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, '<prosody rate="110%" pitch="+2st">Just tell me your city or zip code, Josh.</prosody>');

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner location responses
app.post('/voice/homeowner-location-response', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';

    console.log('📍 HOMEOWNER LOCATION RESPONSE:');
    console.log(`   Speech: "${userSpeech}"`);

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, `
    <prosody rate="115%" pitch="+3st">
      Perfect, Josh! We have some really great contractors in that area.
      
      <break time="0.3s"/>
      
      Last question - what's your budget range looking like? 
      This helps me match you with contractors who work in your price point 
      and can deliver the quality you want.
      
      <break time="0.3s"/>
      
      Are we talking under 25K, 25 to 50K, 50 to 100K, or over 100K?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 15,
        action: '/voice/homeowner-budget-response'
    }).say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, '<prosody rate="110%" pitch="+2st">Josh, just give me a rough budget range and I\'ll find the right contractors.</prosody>');

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner budget responses
app.post('/voice/homeowner-budget-response', (req, res) => {
    const twiml = new VoiceResponse();

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, `
    <prosody rate="115%" pitch="+3st">
      Excellent, Josh! Based on your project, location, and budget, 
      I can connect you with 3 to 5 top-rated contractors who are perfect for you.
      
      <break time="0.3s"/>
      
      These are all licensed, insured contractors with great customer reviews. 
      They'll give you detailed quotes and can work within your timeline.
      
      <break time="0.5s"/>
      
      Josh, I can have them reach out within 24 hours with personalized proposals.
      
      <break time="0.3s"/>
      
      What's the best number for them to contact you?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 15,
        action: '/voice/homeowner-confirmation'
    }).say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, '<prosody rate="110%" pitch="+2st">Josh, just confirm your phone number and we\'ll get this rolling.</prosody>');

    res.type('text/xml');
    res.send(twiml.toString());
});

// Final homeowner confirmation
app.post('/voice/homeowner-confirmation', (req, res) => {
    const twiml = new VoiceResponse();

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'fast'
    }, `
    <prosody rate="115%" pitch="+3st">
      Perfect, Josh! I've got everything I need.
      
      <break time="0.3s"/>
      
      You'll get calls from 3 to 5 qualified contractors within 24 hours. 
      Each one specializes in your type of project and works in your budget range.
      
      <break time="0.3s"/>
      
      They'll provide detailed quotes and answer any questions about 
      materials, timeline, and the whole process.
      
      <break time="0.5s"/>
      
      Josh, thanks for choosing REMODELY AI! I'm confident you're going to 
      love the contractors we match you with.
      
      Have an awesome day!
    </prosody>
  `);

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle contractor signup
app.post('/voice/contractor-signup', (req, res) => {
    const twiml = new VoiceResponse();
    const userInput = req.body.Digits || '';
    const userSpeech = req.body.SpeechResult || '';

    console.log('📝 CONTRACTOR SIGNUP RESPONSE:');
    console.log(`   Speech: "${userSpeech}"`);
    console.log(`   DTMF: "${userInput}"`);

    if (userInput === '1' || userSpeech.toLowerCase().includes('yes') || userSpeech.toLowerCase().includes('sign')) {
        twiml.say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, `
      <prosody rate="110%" pitch="+2st">
        Awesome! I'm so excited to get you started.
        
        <break time="0.3s"/>
        
        I'll text you a link right after this call to complete your contractor profile.
        
        It's super quick - license number, insurance info, service areas, 
        and a few photos of your best work.
        
        <break time="0.3s"/>
        
        Once approved - usually within 24 hours - you'll start getting 
        qualified leads in your area.
        
        <break time="0.5s"/>
        
        Welcome to REMODELY AI! You're going to love working with us.
        
        Have a great day!
      </prosody>
    `);
    } else {
        twiml.say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, `
      <prosody rate="110%" pitch="+2st">
        No worries at all! I totally understand this is a big decision.
        
        <break time="0.3s"/>
        
        Let me email you some info so you can review everything when you have time.
        
        <break time="0.3s"/>
        
        What's your best email address?
      </prosody>
    `);

        twiml.pause({ length: 3 });
        twiml.say({
            voice: 'Polly.Joanna-Neural',
            rate: 'fast'
        }, '<prosody rate="105%" pitch="+1st">Perfect! I\'ll send that over today. Thanks for your time!</prosody>');
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner project type responses
app.post('/demo/homeowner-project-type', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';
    const userInput = req.body.Digits || '';

    console.log('🏠 HOMEOWNER PROJECT TYPE RESPONSE:');
    console.log(`   Speech: "${userSpeech}"`);
    console.log(`   DTMF: "${userInput}"`);

    let projectType = 'renovation';
    let specialtyMessage = '';

    if (userSpeech.toLowerCase().includes('kitchen')) {
        projectType = 'kitchen';
        specialtyMessage = 'Kitchen renovations are our specialty! We work with contractors who excel at countertop installations, cabinet work, and complete kitchen transformations.';
    } else if (userSpeech.toLowerCase().includes('bathroom')) {
        projectType = 'bathroom';
        specialtyMessage = 'Bathroom remodels are fantastic projects! Our contractors specialize in tile work, vanity installations, and creating beautiful, functional bathroom spaces.';
    } else if (userSpeech.toLowerCase().includes('whole') || userSpeech.toLowerCase().includes('entire')) {
        projectType = 'whole_home';
        specialtyMessage = 'Whole home renovations - now that\'s exciting! We have contractors who manage large-scale projects with multiple trades and comprehensive timelines.';
    } else {
        specialtyMessage = 'That sounds like a great project! Our contractors handle all types of renovation work with stone and surface installations.';
    }

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'medium'
    }, `
    <prosody rate="95%">
      ${specialtyMessage}
      
      <break time="0.5s"/>
      
      To match you with the perfect contractors, I need a few quick details:
      
      <break time="0.5s"/>
      
      First, what's your zip code or city so I can find contractors in your area?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 15,
        action: '/demo/homeowner-location'
    }).say({
        voice: 'Polly.Matthew-Neural'
    }, 'You can say your city or zip code.');

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner location responses
app.post('/demo/homeowner-location', (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult || '';

    console.log('📍 HOMEOWNER LOCATION RESPONSE:');
    console.log(`   Speech: "${userSpeech}"`);

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'medium'
    }, `
    <prosody rate="95%">
      Perfect! We have several excellent contractors in that area.
      
      <break time="0.5s"/>
      
      Now, what's your estimated budget range? This helps me match you with contractors 
      who specialize in your price point and can deliver the quality you're looking for.
      
      <break time="0.5s"/>
      
      Are you thinking under 25 thousand, 25 to 50 thousand, 50 to 100 thousand, or over 100 thousand?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 15,
        action: '/demo/homeowner-budget'
    }).say({
        voice: 'Polly.Matthew-Neural'
    }, 'You can say your budget range or press a number from 1 to 4.');

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle homeowner budget responses
app.post('/demo/homeowner-budget', (req, res) => {
    const twiml = new VoiceResponse();

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'medium'
    }, `
    <prosody rate="95%">
      Excellent! Based on your project type, location, and budget, I can connect you with 
      3 to 5 highly-rated contractors who are perfect for your needs.
      
      <break time="0.5s"/>
      
      These contractors are all licensed, insured, and have excellent customer reviews. 
      They'll provide you with detailed quotes and can start within your timeline.
      
      <break time="1s"/>
      
      I can have them reach out to you within 24 hours with personalized proposals.
      
      <break time="0.5s"/>
      
      What's the best phone number for them to contact you?
    </prosody>
  `);

    twiml.gather({
        input: 'speech dtmf',
        timeout: 15,
        action: '/demo/homeowner-confirmation'
    }).say({
        voice: 'Polly.Matthew-Neural'
    }, 'You can say your phone number or the digits.');

    res.type('text/xml');
    res.send(twiml.toString());
});

// Final confirmation
app.post('/demo/homeowner-confirmation', (req, res) => {
    const twiml = new VoiceResponse();

    twiml.say({
        voice: 'Polly.Matthew-Neural',
        rate: 'medium'
    }, `
    <prosody rate="95%">
      Perfect! I have everything I need.
      
      <break time="0.5s"/>
      
      You'll receive calls from 3 to 5 qualified contractors within the next 24 hours.
      Each one specializes in your type of project and works within your budget range.
      
      <break time="0.5s"/>
      
      They'll provide detailed quotes and can answer any questions about materials, timeline, and process.
      
      <break time="1s"/>
      
      Thank you for choosing REMODELY AI! We're excited to help you find the perfect contractor 
      for your renovation project.
      
      Have a wonderful day!
    </prosody>
  `);

    res.type('text/xml');
    res.send(twiml.toString());
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'REMODELY AI Voice Webhooks',
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use((error, req, res, next) => {
    console.error('❌ Webhook Error:', error);
    const twiml = new VoiceResponse();
    twiml.say({
        voice: 'Polly.Joanna-Neural'
    }, 'I apologize, but I\'m having trouble processing your response. Let me transfer you to a human assistant.');
    res.type('text/xml');
    res.send(twiml.toString());
});

// Start the webhook server
app.listen(port, () => {
    console.log(`✅ Voice webhook server running on port ${port}`);
    console.log(`📡 Webhook URLs:`);
    console.log(`   Contractor Response: http://localhost:${port}/demo/contractor-response`);
    console.log(`   Homeowner Project: http://localhost:${port}/demo/homeowner-project-type`);
    console.log(`   Health Check: http://localhost:${port}/health`);
    console.log('');
    console.log('🎯 Ready to handle voice call responses!');
});

module.exports = app;
