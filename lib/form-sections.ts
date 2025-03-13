// export const formSections = [
//   {
//     label: "Personal Information",
//     questions: [
//       {
//         id: "name",
//         question: "Full Name",
//         type: "text",
//         placeholder: "Enter your full name",
//         required: true,
//       },
//       {
//         id: "email",
//         question: "Email Address",
//         type: "text",
//         placeholder: "Enter your email address",
//         required: true,
//       },
//       {
//         id: "phone",
//         question: "Phone Number",
//         type: "text",
//         placeholder: "Enter your phone number",
//         required: false,
//       },
//     ],
//   },
//   {
//     label: "Company Details",
//     questions: [
//       {
//         id: "companyName",
//         question: "Company Name",
//         type: "text",
//         placeholder: "Enter your company name",
//         required: true,
//       },
//       {
//         id: "companySize",
//         question: "Company Size",
//         type: "number",
//         placeholder: "Enter the number of employees",
//         required: false,
//       },
//     ],
//   },
//   {
//     label: "Information Gathering",
//     questions: [
//       {
//         id: "annualIncome",
//         question: "Estimated Annual Income",
//         type: "text",
//         placeholder: "Enter your estimated annual income",
//         required: true,
//       },
//       {
//         id: "taxYear",
//         question: "Which tax year did you last file?",
//         type: "text",
//         placeholder: "Enter the last tax year",
//         required: true,
//       },
//       {
//         id: "llcDetails",
//         question: "Do you have an LLC? If so, can you share some details?",
//         type: "textarea",
//         placeholder: "Enter LLC details",
//         required: false,
//       },
//       {
//         id: "startingTimeline",
//         question: "When do you plan to get started?",
//         type: "text",
//         placeholder: "Enter your planned start date",
//         required: true,
//       },
//       {
//         id: "businessOverview",
//         question: "Can you tell me a little about your business?",
//         type: "textarea",
//         placeholder: "Enter a brief overview of your business",
//         required: true,
//       },
//     ],
//   },
//   {
//     label: "Confirmation",
//     questions: [
//       {
//         id: "confirmationInfo",
//         question:
//           "Thank you. Let me repeat: Your estimated income is [annualIncome], you filed taxes for [taxYear], you [have/do not have] an LLC, and you're planning to start [startingTimeline]. Is that correct?",
//         type: "info",
//       },
//     ],
//   },
// ]

export interface Message {
  speaker: "agent" | "customer";
  label?: string;
  content: string;
  fieldId?: string;
  placeholder?: string;
}

export interface Step {
  id: string;
  messages: Message[];
  next?: string[]; 
}

export interface Scenario {
  tabName: string;
  description: string;
  steps: Step[];
}

export interface CallScript {
  basic: { [key: string]: Message };
  scenarios: Scenario[];
}

// What is your estimated annual income?
// Which tax year did you last file?"
// Do you have a limited liability company? If so, can you share some details?
// When do you plan to get started?
// Can you tell me a little about your business?



// Optional interfaces for clarity

// The restructured schema
export const callScript = {
  // --- BASIC SECTION: common steps across all scenarios ---
  basic: [
    {
      id: "step1_firstLine",
      messages: [
        {
          speaker: "agent",
          content: "Hello, This is Emma, from Otto. Can I take 30 seconds of your time?",
          fieldId: "firstLine",
          placeholder: "Hello, This is Emma, from Otto. Can I take 30 seconds of your time?",
        },
        {
          speaker: "customer",
          content: "Yes, go ahead.",
          placeholder: "Customer response",
        },
      ],
      next: ["step2_introduction"],
    },
    {
      id: "step2_introduction",
      messages: [
        {
          speaker: "agent",
          content: "May I speak with [Customer Name]?",
          fieldId: "introduction",
          placeholder: "May I speak with [Customer Name]?",
        },
        {
          speaker: "customer",
          content: "Yes, this is [Customer Name].",
          placeholder: "Customer response",
        },
      ],
      next: ["step3_thankYou"],
    },
    {
      id: "step3_thankYou",
      messages: [
        {
          speaker: "agent",
          content: "Thank you for showing interest in [Company Name].",
          fieldId: "thankYou",
          placeholder: "Thank you for showing interest in [Company Name].",
        },
        {
          speaker: "customer",
          content: "",
          placeholder: "Customer acknowledgement (optional)",
        },
      ],
      next: ["step4_callPurpose"],
    },
    {
      id: "step4_callPurpose",
      messages: [
        {
          speaker: "agent",
          content:
            "I'm calling to collect a few details before your demo? It shouldn't take more than 2 minutes, Is that fine?",
          fieldId: "callPurpose",
          placeholder:
            "I'm calling to collect a few details before your demo? It shouldn't take more than 2 minutes, Is that fine?",
        },
        {
          speaker: "customer",
          content: "Yes, that's fine.",
          placeholder: "Customer response",
        },
      ],
      next: ["step5_annualIncome"],
    },
    {
      id: "step5_annualIncome",
      messages: [
        {
          speaker: "agent",
          content: "What is your estimated annual income?",
          fieldId: "annualIncome",
          placeholder: "What is your estimated annual income?",
        },
        {
          speaker: "customer",
          content: "$200,000.",
          placeholder: "Customer response",
        },
      ],
      next: ["step6_taxYear"],
    },
    {
      id: "step6_taxYear",
      messages: [
        {
          speaker: "agent",
          content: "Which tax year did you last file?",
          fieldId: "taxYear",
          placeholder: "Which tax year did you last file?",
        },
        {
          speaker: "customer",
          content: "2022",
          placeholder: "Customer response",
        },
      ],
      next: ["step7_llcDetails"],
    },
    {
      id: "step7_llcDetails",
      messages: [
        {
          speaker: "agent",
          content:
            "Do you have a limited liability company? If so, can you share some details?",
          fieldId: "llcDetails",
          placeholder:
            "Do you have a limited liability company? If so, can you share some details?",
        },
        {
          speaker: "customer",
          content:
            "Yes, I have an LLC registered in Delaware for my consulting business.",
          placeholder: "Customer response",
        },
      ],
      next: ["step8_startTimeline"],
    },
    {
      id: "step8_startTimeline",
      messages: [
        {
          speaker: "agent",
          content: "When do you plan to get started?",
          fieldId: "startTimeline",
          placeholder: "When do you plan to get started?",
        },
        {
          speaker: "customer",
          content: "I'd like to start next month.",
          placeholder: "Customer response",
        },
      ],
      next: ["step9_businessInfo"],
    },
    {
      id: "step9_businessInfo",
      messages: [
        {
          speaker: "agent",
          content: "Can you tell me a little about your business?",
          fieldId: "businessInfo",
          placeholder: "Can you tell me a little about your business?",
        },
        {
          speaker: "customer",
          content:
            "I run a digital marketing consultancy focusing on small to medium businesses.",
          placeholder: "Customer response",
        },
      ],
      // End of basic section; scenario-specific flows follow
    },
  ],
  // --- SCENARIOS SECTION: additional steps vary by scenario ---
  scenarios: [
    {
      tabName: "Smooth, Complete Information",
      description:
        "Customer provides all information smoothly without complications.",
      steps: [
        {
          id: "s1_confirmation",
          messages: [
            {
              speaker: "agent",
              content:
                "Thank you. Let me repeat: [Agent rephrasing customer response]. Is that correct?",
              fieldId: "confirmation",
              placeholder:
                "Thank you. Let me repeat: [Agent rephrasing customer response]. Is that correct?",
            },
            {
              speaker: "customer",
              content: "Yes, that's correct.",
              placeholder: "Customer confirmation",
            },
          ],
          next: ["s1_meetingSchedule"],
        },
        {
          id: "s1_meetingSchedule",
          messages: [
            {
              speaker: "agent",
              content:
                "Great. You will meet with [Team Member] on [Meeting Date] at [Meeting Time]. Correct?",
              fieldId: "meetingSchedule",
              placeholder:
                "Great. You will meet with [Team Member] on [Meeting Date] at [Meeting Time]. Correct?",
            },
            {
              speaker: "customer",
              content: "Yes, that's right.",
              placeholder: "Customer response",
            },
          ],
          next: ["s1_additionalQuestions"],
        },
        {
          id: "s1_additionalQuestions",
          messages: [
            {
              speaker: "agent",
              content: "Any other questions?",
              fieldId: "additionalQuestions",
              placeholder: "Any other questions?",
            },
            {
              speaker: "customer",
              content: "No, that's all for now.",
              placeholder: "Customer response",
            },
          ],
          next: ["s1_closing"],
        },
        {
          id: "s1_closing",
          messages: [
            {
              speaker: "agent",
              content:
                "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!",
              fieldId: "closingCall",
              placeholder:
                "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!",
            },
            {
              speaker: "customer",
              content: "",
              placeholder: "Customer response (optional)",
            },
          ],
        },
      ],
    },
    {
      tabName: "Customer Unsure About Some Details",
      description:
        "Customer is unsure about certain items. Some answers may be approximate or partial.",
      steps: [
        {
          id: "s2_uncertainty",
          messages: [
            {
              speaker: "agent",
              content:
                "No worries, we can discuss that during your demo.",
              fieldId: "uncertainty",
              placeholder:
                "No worries, we can discuss that during your demo.",
            },
            {
              speaker: "customer",
              content: "",
              placeholder: "Customer acknowledgement (optional)",
            },
          ],
          next: ["s2_confirmation"],
        },
        {
          id: "s2_confirmation",
          messages: [
            {
              speaker: "agent",
              content:
                "You mentioned you’re unsure about [X], but that’s okay—we’ll clarify during the demo.",
              fieldId: "confirmationUnsure",
              placeholder:
                "You mentioned you’re unsure about [X], but that’s okay—we’ll clarify during the demo.",
            },
            {
              speaker: "customer",
              content: "Yes, that sounds right.",
              placeholder: "Customer confirmation",
            },
          ],
          next: ["s2_closing"],
        },
        {
          id: "s2_closing",
          messages: [
            {
              speaker: "agent",
              content:
                "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!",
              fieldId: "closingCall",
              placeholder:
                "Thank you, [Customer Name]. We look forward to speaking with you soon. Have a great day!",
            },
            {
              speaker: "customer",
              content: "",
              placeholder: "Customer response (optional)",
            },
          ],
        },
      ],
    },
    {
      tabName: "Customer Wants to Reschedule",
      description:
        "Customer needs to reschedule the meeting time. Adjust the appointment as requested.",
      steps: [
        {
          id: "s3_meetingSchedule",
          messages: [
            {
              speaker: "agent",
              content:
                "Great. You will meet with [Team Member] on [Meeting Date] at [Meeting Time]. Correct?",
              fieldId: "meetingSchedule",
              placeholder:
                "Great. You will meet with [Team Member] on [Meeting Date] at [Meeting Time]. Correct?",
            },
            {
              speaker: "customer",
              content:
                "Actually, can we do a different date/time? That slot doesn't work for me anymore.",
              placeholder: "Customer response",
            },
          ],
          next: ["s3_rescheduleRequest"],
        },
        {
          id: "s3_rescheduleRequest",
          messages: [
            {
              speaker: "agent",
              content:
                "Of course. Let me adjust that. What day or time would work better?",
              fieldId: "rescheduleResponse",
              placeholder:
                "Of course. Let me adjust that. What day or time would work better?",
            },
            {
              speaker: "customer",
              content: "How about Thursday at 2 PM?",
              placeholder: "Customer response",
            },
          ],
          next: ["s3_rescheduleConfirm"],
        },
        {
          id: "s3_rescheduleConfirm",
          messages: [
            {
              speaker: "agent",
              content:
                "Perfect. So now your meeting is on [New Meeting Date] at [New Meeting Time], is that correct?",
              fieldId: "rescheduleConfirmation",
              placeholder:
                "Perfect. So now your meeting is on [New Meeting Date] at [New Meeting Time], is that correct?",
            },
            {
              speaker: "customer",
              content: "Yes, that works great.",
              placeholder: "Customer confirmation",
            },
          ],
          next: ["s3_additionalClosing"],
        },
        {
          id: "s3_additionalClosing",
          messages: [
            {
              speaker: "agent",
              content:
                "Any other questions? Great. Thank you, [Customer Name]. Have a great day!",
              fieldId: "closingCall",
              placeholder:
                "Any other questions? Great. Thank you, [Customer Name]. Have a great day!",
            },
            {
              speaker: "customer",
              content: "",
              placeholder: "Customer response (optional)",
            },
          ],
        },
      ],
    },
  ],
};
