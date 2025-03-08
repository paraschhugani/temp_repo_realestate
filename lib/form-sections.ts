export const formSections = [
  {
    label: "Personal Information",
    questions: [
      {
        id: "name",
        question: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        id: "email",
        question: "Email Address",
        type: "text",
        placeholder: "Enter your email address",
        required: true,
      },
      {
        id: "phone",
        question: "Phone Number",
        type: "text",
        placeholder: "Enter your phone number",
        required: false,
      },
    ],
  },
  {
    label: "Company Details",
    questions: [
      {
        id: "companyName",
        question: "Company Name",
        type: "text",
        placeholder: "Enter your company name",
        required: true,
      },
      {
        id: "companySize",
        question: "Company Size",
        type: "number",
        placeholder: "Enter the number of employees",
        required: false,
      },
    ],
  },
  {
    label: "Information Gathering",
    questions: [
      {
        id: "annualIncome",
        question: "Estimated Annual Income",
        type: "text",
        placeholder: "Enter your estimated annual income",
        required: true,
      },
      {
        id: "taxYear",
        question: "Which tax year did you last file?",
        type: "text",
        placeholder: "Enter the last tax year",
        required: true,
      },
      {
        id: "llcDetails",
        question: "Do you have an LLC? If so, can you share some details?",
        type: "textarea",
        placeholder: "Enter LLC details",
        required: false,
      },
      {
        id: "startingTimeline",
        question: "When do you plan to get started?",
        type: "text",
        placeholder: "Enter your planned start date",
        required: true,
      },
      {
        id: "businessOverview",
        question: "Can you tell me a little about your business?",
        type: "textarea",
        placeholder: "Enter a brief overview of your business",
        required: true,
      },
    ],
  },
  {
    label: "Confirmation",
    questions: [
      {
        id: "confirmationInfo",
        question:
          "Thank you. Let me repeat: Your estimated income is [annualIncome], you filed taxes for [taxYear], you [have/do not have] an LLC, and you're planning to start [startingTimeline]. Is that correct?",
        type: "info",
      },
    ],
  },
]

