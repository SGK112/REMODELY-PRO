const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function makeSouthernMotherlyCall() {
    try {
        console.log('🍑 Initiating SOUTHERN MOTHERLY voice call...');
        console.log(`📞 From: ${process.env.TWILIO_PHONE_NUMBER}`);
        console.log(`📞 To: 602-526-2501`);

        const call = await client.calls.create({
            to: '+16025262501',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="85%" pitch="-10%" volume="medium">
              Well hey there, honey! 
              <break time="0.4s"/>
              This is Sarah callin' from REMODELY AI, and I just had to reach out to ya.
              <break time="0.6s"/>
              Now listen, sugar, I've got some real exciting news about your renovation project.
              <break time="0.8s"/>
              We found y'all some absolutely wonderful contractors right there in your neck of the woods,
              <break time="0.5s"/>
              and bless their hearts, they do just beautiful work.
              <break time="0.7s"/>
              I'm tellin' ya, these folks are the real deal - 
              <break time="0.3s"/>
              licensed, insured, and their customers just rave about 'em.
              <break time="0.8s"/>
              Now don't you worry about a thing, darlin'. 
              <break time="0.5s"/>
              We've already done all the homework for ya.
              <break time="0.6s"/>
              All you gotta do is hop on over to REMODELY dot AI 
              <break time="0.4s"/>
              and take a little peek at what we found.
              <break time="0.8s"/>
              I promise you, sweetheart, 
              <break time="0.3s"/>
              we're gonna get your home lookin' just perfect.
              <break time="0.6s"/>
              Y'all have a blessed day now, you hear?
              <break time="0.4s"/>
              Bye-bye!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ SOUTHERN MOTHERLY call initiated successfully!');
        console.log(`📋 Call SID: ${call.sid}`);
        console.log(`🍑 Voice Style: Southern drawl with motherly warmth`);
        console.log(`📋 Features: Slower pace, lower pitch, caring tone`);

        return call;

    } catch (error) {
        console.error('❌ Error making southern motherly call:', error.message);
        throw error;
    }
}

async function makeSouthernBusinessCall() {
    try {
        console.log('💼 Making SOUTHERN BUSINESS-FRIENDLY call...');

        const call = await client.calls.create({
            to: '+16025262501',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="90%" pitch="-5%" volume="medium">
              Well hello there! 
              <break time="0.5s"/>
              This is Sarah from REMODELY AI, and I hope I'm catchin' you at a good time.
              <break time="0.7s"/>
              Listen, I've got some real good news for ya about your renovation project.
              <break time="0.6s"/>
              We've been workin' hard to find you the best contractors in your area,
              <break time="0.4s"/>
              and honey, do we have some gems for you!
              <break time="0.8s"/>
              These folks are top-notch - 
              <break time="0.3s"/>
              they're gonna treat your home like it's their own mama's house.
              <break time="0.7s"/>
              Now, I don't want to keep you too long, sugar,
              <break time="0.4s"/>
              but you really should check out what we found for ya.
              <break time="0.6s"/>
              Just visit REMODELY dot AI when you get a chance,
              <break time="0.5s"/>
              and I guarantee you're gonna love what you see.
              <break time="0.7s"/>
              Y'all take care now, and we'll talk real soon!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Southern business call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);

        return call;

    } catch (error) {
        console.error('❌ Error making southern business call:', error.message);
        throw error;
    }
}

async function makeSouthernUrgentCall() {
    try {
        console.log('⚡ Making SOUTHERN URGENT but CARING call...');

        const call = await client.calls.create({
            to: '+16025262501',
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `
        <Response>
          <Say voice="Polly.Joanna" language="en-US">
            <prosody rate="95%" pitch="0%" volume="medium">
              Hey there, sweetie! 
              <break time="0.4s"/>
              This is Sarah from REMODELY AI, and I had to call you right away.
              <break time="0.6s"/>
              Now, I don't mean to rush ya, honey, 
              <break time="0.3s"/>
              but we just found somethin' special for your renovation.
              <break time="0.7s"/>
              There's this contractor - bless his heart - 
              <break time="0.4s"/>
              he's got an opening next week that hardly ever happens.
              <break time="0.6s"/>
              And sugar, his work is just gorgeous. 
              <break time="0.5s"/>
              I'm talkin' magazine-quality beautiful.
              <break time="0.8s"/>
              Now I don't want you missin' out on this, darlin',
              <break time="0.4s"/>
              so when you get a minute, 
              <break time="0.3s"/>
              just hop on REMODELY dot AI and take a look.
              <break time="0.6s"/>
              Trust me on this one, honey. 
              <break time="0.4s"/>
              You're gonna thank me later!
              <break time="0.5s"/>
              Y'all have a wonderful day!
            </prosody>
          </Say>
        </Response>
      `
        });

        console.log('✅ Southern urgent call initiated!');
        console.log(`📋 Call SID: ${call.sid}`);

        return call;

    } catch (error) {
        console.error('❌ Error making southern urgent call:', error.message);
        throw error;
    }
}

// Menu for different southern call styles
console.log('🍑 REMODELY AI - SOUTHERN MOTHERLY VOICE TESTER');
console.log('==============================================');
console.log('Choose a Southern call style:');
console.log('1. Classic Southern Motherly (warm & caring)');
console.log('2. Southern Business-Friendly (upbeat & helpful)');
console.log('3. Southern Urgent but Caring (time-sensitive)');
console.log('==============================================');

const callType = process.argv[2] || '1';

switch (callType) {
    case '1':
        console.log('🍑 Executing: Classic Southern Motherly call\n');
        makeSouthernMotherlyCall();
        break;
    case '2':
        console.log('💼 Executing: Southern Business-Friendly call\n');
        makeSouthernBusinessCall();
        break;
    case '3':
        console.log('⚡ Executing: Southern Urgent but Caring call\n');
        makeSouthernUrgentCall();
        break;
    default:
        console.log('🍑 Executing: Default Southern Motherly call\n');
        makeSouthernMotherlyCall();
}
