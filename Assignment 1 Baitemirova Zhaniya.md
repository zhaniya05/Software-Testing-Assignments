# **Documentation pack: money transfer feature**

## **1\. Test plan section**

### **Scope**

**In:** transfer in the mobile app (amount validation, daily limit, SMS confirmation, balance and statement update).   
**Out:** transfers to other customers, currency conversion, fees, push notifications, performance and load testing, security testing of the SMS provider.

### **Approach**

* Levels: system testing through the mobile UI.  
* Techniques: equivalence partitions and 3-value boundary analysis (amount), decision table (daily limit), state transition testing (SMS code).  
* Automation: none this release; the regression suite is the release checklist (section 4).  
* Environment: test environment 2, iOS and Android release builds; test customer TC-067 with balance 1,000,000 KZT and daily total 0, deposit ending 4417\. Daily total must be settable through a test-data script.


### **Entry criteria**

* Build deployed to test environment 2 and smoke tests pass.  
* Test customer TC-067 loaded with the agreed balance and daily total.  
* Acceptance criteria for REQ-3.1 to REQ-3.4 written and agreed with the product owner.  
* SMS gateway in the test environment returns codes to a known test number.


### **Exit criteria**

* All 12 planned test cases executed; none "not run" or "blocked" without a written reason.  
* Zero open critical or high defects.  
* 3-value boundary tests for amount and daily limit passed.  
* SMS code state table covered at valid-transition level.  
* Requirements without coverage (see section 3\) listed in the completion report and accepted in writing by the product owner, with date.


### **Top three product risks**

1. Money moved incorrectly: double debit or a transfer that passes the limit (high impact on customers and regulator).  
2. SMS confirmation bypass or failure: code accepted after expiry or after three wrong attempts, or code never arrives and the customer is stuck.  
3. Wrong balance or daily total shown or stored: the customer sees stale data, and the daily limit is enforced against wrong numbers.

## **2\. Test cases**

Common preconditions for all cases: test environment 2, customer TC-067, deposit ending 4417 as the recipient, unless stated otherwise. Common path: Open Transfers \-\> Between my accounts \-\> select deposit ending 4417\.

### **TR-AMT-001 · traces to REQ-3.1**

**Title:** Amount just below minimum is rejected   
**Preconditions:** TC-067, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 99\.   
3. Tap Continue. 

**Expected:** A validation error is shown (text not specified in the requirements); no SMS screen; balance still 1,000,000; no statement entry; daily total still 0\.

### **TR-AMT-002 · traces to REQ-3.1**

**Title:** Minimum amount is accepted without SMS   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 100\.   
3. Tap Continue.   
4. Confirm the transfer. 

**Expected:** Transfer completes with no SMS screen; balance 999,900; one statement entry of 100; daily total 100\.

### **TR-AMT-003 · traces to REQ-3.1**

**Title:** Maximum amount is accepted with SMS   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 500,000.   
3. Tap Continue.   
4. Enter the correct SMS code. 

**Expected:** SMS screen appears within 3 s; after the correct code the balance is 500,000; one statement entry of 500,000; daily total 500,000.

### **TR-AMT-004 · traces to REQ-3.1**

**Title:** Amount just above maximum is rejected   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 500,001.   
3. Tap Continue. 

**Expected:** A validation error is shown; no SMS screen; balance still 1,000,000; no statement entry; daily total still 0\.

### **TR-AMT-005 · traces to REQ-3.1**

**Title:** Non-whole amount is rejected   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 150.50.   
3. Tap Continue. 

**Expected:** Either the field does not accept the decimal separator or a validation error is shown; no SMS screen; balance and daily total unchanged.

### **TR-DAY-001 · traces to REQ-3.2**

**Title:** Transfer that brings the daily total exactly to the limit is accepted   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 500,000  
**Steps:** 

1. Common path.   
2. Enter 500,000.   
3. Tap Continue.   
4. Enter the correct SMS code. 

**Expected:** Transfer completes; balance 500,000; daily total 1,000,000.

### **TR-DAY-002 · traces to REQ-3.2**

**Title:** Transfer that exceeds the daily limit by 1 KZT is rejected   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 500,001   
**Steps:** 

1. Common path.   
2. Enter 500,000.   
3. Tap Continue. 

**Expected:** Transfer is refused with a limit message (text not specified); no SMS code requested; balance still 1,000,000; daily total still 500,001.

### **TR-OTP-001 · traces to REQ-3.3**

**Title:** Amount at the SMS threshold needs no code   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0  
**Steps:** 

1. Common path.   
2. Enter 100,000.   
3. Tap Continue.  
4. Confirm the transfer. 

**Expected:** No SMS screen; balance 900,000; one statement entry of 100,000.

### **TR-OTP-002 · traces to REQ-3.3**

**Title:** Amount just above the threshold asks for the SMS code   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 100,001.   
3. Tap Continue. 

**Expected:** SMS code screen within 3 s; balance still 1,000,000; no statement entry until the code is entered.

### **TR-OTP-003 · traces to REQ-3.3**

**Title:** Code entered after 120 seconds is rejected   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 100,001.   
3. Tap Continue.   
4. Wait 121 s without entering the code.   
5. Enter the correct code received by SMS. 

**Expected:** Code is rejected as expired; balance still 1,000,000; no statement entry; daily total still 0\.

### **TR-OTP-004 · traces to REQ-3.3**

**Title:** Third wrong code cancels the transfer   
**Preconditions:** TC-014, balance 1,000,000 KZT, daily total 0   
**Steps:** 

1. Common path.   
2. Enter 100,001.   
3. Tap Continue.   
4. Enter 000000 three times in a row.   
5. Enter the correct code. 

**Expected:** After the third wrong code the transfer is cancelled; the correct code in step 5 does not complete it; balance still 1,000,000; no statement entry; daily total still 0\.

### **TR-BAL-001 · traces to REQ-3.4 (assumption)**

**Title:** Transfer above the available balance is rejected   
**Preconditions:** test customer with balance 50,000 KZT and daily total 0 (a second test customer is needed; TC-014 has 1,000,000)   
**Steps:** 

1. Common path.   
2. Enter 50,001.   
3. Tap Continue. 

**Expected:** Transfer is refused with an insufficient-funds message (text not specified); balance still 50,000; no statement entry.

## **3\. Traceability matrix**

| Requirement | Test cases | Technique | Status |
| :---- | :---- | :---- | :---- |
| REQ-3.1 Amount 100 – 500,000, whole tenge | TR-AMT-001…005 | Partitions \+ 3-value BVA | 5 planned, not yet run |
| REQ-3.2 Daily limit 1,000,000 | TR-DAY-001…002 | Boundary on cumulative total | 2 planned, partially covered |
| REQ-3.3 SMS code above 100,000 | TR-OTP-001…004 | State transition \+ BVA | 4 planned, partially covered |
| REQ-3.4 Insufficient balance | TR-BAL-001 | Single partition (assumption) | 1 planned, needs second test customer |

### 

### **Gaps and why**

* Midnight Almaty reset (REQ-3.2): not covered. It needs a controllable clock in the test environment, which this pack does not assume. Raised as a risk in the completion report.  
* Code validity boundary at 119/120 s (REQ-3.3): only the rejected side (121 s) is covered; the accepted side is not, because a tester cannot reliably hit the 119–120 s window by hand. It needs a configurable expiry value or automation (week 5).  
* Code that arrives late or never arrives (REQ-3.3): the brief gives no requirement for resend or timeout of delivery; the release checklist carries a 30 s item as a proposed value.  
* Combined daily total across several smaller transfers: only a single transfer against a pre-set total is covered.

## **4\. Release checklist — SMS code flow**

* \[ \] Code arrives within 30 seconds  
* \[ \] Code is 6 digits  
* \[ \] Code expires after 120 seconds  
* \[ \] Code entered after expiry is rejected  
* \[ \] First and second wrong code can be retried  
* \[ \] Third wrong code cancels the transfer  
* \[ \] Correct code after cancellation does not complete the transfer  
* \[ \] Confirm tapped twice debits once  
* \[ \] No code requested at 100,000; code requested at 100,001  
* \[ \] SMS text is correct in KZ, RU and EN  
* \[ \] Balance and statement update after confirmation  
* \[ \] Daily total updates after confirmation

## **5\. Defect reports**

All three reports are designed from the requirements to show format. They describe plausible failures of the cases above, not observed behaviour.

### **DEF-101**

Title: Transfers: balance not refreshed on Accounts screen after a successful transfer above 100,000 KZT   
Environment: iOS 18.2, app 4.11.0 build 2291, test environment 2 (mocked)   
Preconditions: Test customer TC-014, balance 1,000,000 KZT, daily total 0   
Steps to reproduce:

1. Open Transfers \-\> Between my accounts.  
2. Select the deposit ending 4417\.  
3. Enter 100,001 and tap Continue.  
4. Enter the SMS code.  
5. Return to the Accounts screen. 

Expected result: Balance shows 899,999 KZT immediately (REQ-3.3 flow completes with a debit).   
Actual result: Balance shows 1,000,000 KZT until the app is restarted.   
Reproducibility: 5 of 5 attempts   
Severity / priority (proposed): high / medium   
Evidence: screen recording and request ID (to be attached)   
Traces to: REQ-3.3 / TR-AMT-003

### **DEF-102**

Title: Transfers: transfer of 500,000 KZT accepted when daily total is already 500,001 KZT   
Environment: Android 14, app 4.11.0 build 2291, test environment 2 (mocked)   
Preconditions: Test customer TC-014, balance 1,000,000 KZT, daily total 500,001   
Steps to reproduce:

1. Open Transfers \-\> Between my accounts.  
2. Select the deposit ending 4417\.  
3. Enter 500,000 and tap Continue.  
4. Enter the SMS code. 

Expected result: Transfer is refused because the daily total would reach 1,000,001 KZT.   
Actual result: Transfer completes; balance 500,000; daily total shows 1,000,001.   
Reproducibility: 3 of 3 attempts   
Severity / priority (proposed): high / high (regulatory limit exceeded)   
Evidence: screenshots of the daily total before and after, request ID (to be attached)   
Traces to: REQ-3.2 / TR-DAY-002

### **DEF-103**

Title: SMS code: correct code accepted after the third wrong attempt, transfer not cancelled   
Environment: iOS 18.2, app 4.11.0 build 2291, test environment 2 (mocked)   
Preconditions: Test customer TC-014, balance 1,000,000 KZT, daily total 0   
Steps to reproduce:

1. Open Transfers \-\> Between my accounts.  
2. Select the deposit ending 4417\.  
3. Enter 100,001 and tap Continue.  
4. Enter 000000 three times.  
5. Enter the correct code received by SMS. 

Expected result: After the third wrong code the transfer is cancelled; the correct code is not accepted.   
Actual result: The correct code in step 5 is accepted and the transfer completes; balance 899,999.  
Reproducibility: 4 of 5 attempts (one attempt cancelled correctly)   
Severity / priority (proposed): high / high   
Evidence: screen recording, request IDs of the three failed attempts and the accepted one (to be attached)   
Traces to: REQ-3.3 / TR-OTP-004

## **6\. AI appendix (Level 1\)**

**Tools used:** Claude  
**Prompts used:**  
(attached lecture 4 and week 3 homework)

you are a QA analyst. Write a documentation pack for the money transfer  
 feature, using only the material I attach: my week 3 test design and the requirements.

1. One-page test plan section: scope in and out, approach, entry and exit  
    criteria, top three product risks.  
2. Twelve test cases in full format (ID, title, preconditions with exact  
    state, numbered steps with one action each, observable expected result),  
    each traced to a requirement. Reuse my week 3 test design.  
3. Traceability matrix, including any requirement I cannot cover and why.  
4. Release checklist for the SMS code flow, at most twelve items.  
5. Three defect reports, labelled as mocked. Fields: title in the format  
    \[where\] \+ \[what happens\] \+ \[under what condition\], environment,  
    preconditions, steps to reproduce, expected, actual, reproducibility,  
    severity, priority, evidence needed, traces to.

Rules:

* Use only facts present in the attached material. If something is not  
   there (requirement text, test data, environment, versions), write MISSING  
   and do not guess.  
* Every test case must be runnable by a colleague without asking me anything.  
* List your assumptions separately; do not invent requirements.  
* Mark risk order, severity and priority as proposals.

