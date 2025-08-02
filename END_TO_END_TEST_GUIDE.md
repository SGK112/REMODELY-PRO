## 🧪 **COMPLETE END-TO-END TESTING GUIDE**

### **🎯 Test Overview**
We'll test the complete user journey from registration to dashboard access, including password reset functionality.

---

## **📝 STEP 1: FRESH REGISTRATION**

### **Registration Details:**
- **Email**: `joshb@surprisegranite.com`
- **Name**: `Joshua Breese`
- **Phone**: `480-255-5887` (or `+14802555887`)
- **Password**: `testpass123`
- **User Type**: `CONTRACTOR`

### **Testing URL**: http://localhost:3000/signup

### **Expected Flow:**
1. **Step 1 - Basic Information**:
   - Fill out all fields (Name, Email, Phone, Password, Confirm Password)
   - Select "Contractor" as user type
   - Click "Send Verification Code"
   - ✅ Should show "Verification code sent to 480-255-5887"

2. **Step 2 - Phone Verification**:
   - Check your phone for SMS code
   - Enter the 6-digit code
   - Click "Verify & Create Account"
   - ✅ Should create account and show success

3. **Step 3 - Complete**:
   - Show success message
   - Option to "Sign In to Your Account"

---

## **📱 STEP 2: VERIFY SMS FUNCTIONALITY**

### **What to Check:**
- SMS should arrive within 30 seconds
- Code should be 6 digits
- Code should work when entered correctly
- Invalid codes should show error message

### **Troubleshooting:**
- If SMS doesn't arrive, check server logs for Twilio errors
- If code doesn't work, check expiry (10 minutes max)
- Use "Resend Code" if needed

---

## **🔐 STEP 3: INITIAL LOGIN TEST**

### **Testing URL**: http://localhost:3000/auth/signin

### **Login Credentials:**
- **Email**: `joshb@surprisegranite.com`
- **Password**: `testpass123`

### **Expected Flow:**
1. Enter email and password
2. Click "Sign In"
3. ✅ Should redirect to `/dashboard`
4. ✅ Dashboard should detect user type and redirect to `/dashboard/contractor`
5. ✅ Should show contractor dashboard with profile management options

---

## **🔄 STEP 4: PASSWORD RESET TEST**

### **Testing URL**: http://localhost:3000/auth/forgot-password

### **Expected Flow:**
1. **Request Reset**:
   - Enter email: `joshb@surprisegranite.com`
   - Click "Send Reset Link"
   - ✅ Should show "Reset link sent to your email"

2. **Check Email**:
   - Check Gmail account: `help.remodely-ai@gmail.com`
   - ✅ Should receive password reset email
   - Click the reset link in email

3. **Reset Password**:
   - Enter new password: `newpass123`
   - Confirm new password: `newpass123`
   - Click "Reset Password"
   - ✅ Should show success message

---

## **✅ STEP 5: LOGIN WITH NEW PASSWORD**

### **Testing URL**: http://localhost:3000/auth/signin

### **New Login Credentials:**
- **Email**: `joshb@surprisegranite.com`
- **Password**: `newpass123` (the new password)

### **Expected Flow:**
1. Enter email and new password
2. Click "Sign In"
3. ✅ Should successfully log in
4. ✅ Should redirect to contractor dashboard
5. ✅ Should show phone verification status (verified)

---

## **🎯 STEP 6: VERIFY PROFILE DATA**

### **What to Check in Dashboard:**
- User name should be "Joshua Breese"
- Email should be "joshb@surprisegranite.com"
- Phone should be "+14802555887"
- Phone verification status should be "Verified" ✅
- User type should be "CONTRACTOR"

---

## **📊 MONITORING & DEBUGGING**

### **Server Logs to Watch:**
```bash
# In terminal, monitor these events:
- "Verification sent: VE..." (SMS sent)
- "Verification check result: approved" (Code verified)
- "prisma:query SELECT" (Database operations)
- Any error messages
```

### **Database Verification:**
After each step, you can verify data was saved correctly:
```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.findUnique({
  where: { email: 'joshb@surprisegranite.com' },
  include: { contractor: true }
}).then(user => {
  console.log('User Data:', {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    phoneVerified: user?.phoneVerified,
    userType: user?.userType,
    hasContractorProfile: !!user?.contractor
  });
  prisma.\$disconnect();
});
"
```

---

## **🚨 COMMON ISSUES & SOLUTIONS**

### **SMS Not Received:**
- Check Twilio account balance
- Verify phone number format (+1 prefix)
- Check server logs for Twilio API errors

### **Verification Code Expired:**
- Codes expire after 10 minutes
- Use "Resend Code" button
- Try fresh registration if needed

### **Email Not Received:**
- Check Gmail SMTP settings
- Verify app password is correct
- Check spam folder

### **Login Issues:**
- Clear browser cache/cookies
- Check password was successfully reset
- Verify user exists in database

---

## **✅ SUCCESS CRITERIA**

The end-to-end test is successful when:
- ✅ User can register with phone verification
- ✅ SMS verification codes are received and work
- ✅ Account is created with verified phone number
- ✅ User can log in with initial password
- ✅ Password reset emails are sent and received
- ✅ User can reset password successfully
- ✅ User can log in with new password
- ✅ Dashboard shows correct user data and verified phone status
- ✅ All data is properly saved in database

---

**🎬 Ready to start? Begin with Step 1 at http://localhost:3000/signup**
