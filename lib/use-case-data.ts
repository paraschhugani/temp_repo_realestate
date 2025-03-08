export interface Feature {
  title: string
  description: string
}

export interface Step {
  title: string
  description: string
}

export interface Testimonial {
  text: string
  author: string
  role: string
}

export interface UseCaseData {
  title: string
  subheadline: string
  features: Feature[]
  howItWorks: Step[]
  testimonial: Testimonial
}

export interface IndustryData {
  title: string
  description: string
  color: string
  useCases: {
    [key: string]: UseCaseData
  }
}

const industriesData: Record<string, IndustryData> = {
  health: {
    title: "Revolutionize Healthcare with AI Voice Agents",
    description: "Enhance patient care and streamline healthcare processes with Superu's AI voice solutions.",
    color: "text-blue-600",
    useCases: {
      "automated-appointment-reminders": {
        title: "Automated Appointment Reminders",
        subheadline: "Reduce missed appointments by automatically reminding patients of their upcoming visits.",
        features: [
          { title: "Intelligent Scheduling", description: "Adapts to appointment data" },
          { title: "Multi-Channel Notifications", description: "Via voice, SMS, or email" },
          { title: "Real-Time Rescheduling", description: "During the call" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with the scheduling system" },
          { title: "Configure", description: "Set up reminder preferences" },
          { title: "Notify", description: "AI calls notify patients" },
          { title: "Reschedule", description: "Capture rescheduling responses" },
        ],
        testimonial: {
          text: "Our no-show rate dropped significantly after implementing Superu's reminder calls.",
          author: "Dr. Emily Chen",
          role: "HealthFirst Clinic",
        },
      },
      "telehealth-pre-screening": {
        title: "Telehealth Pre-Screening Calls",
        subheadline: "Streamline patient triage by pre-screening symptoms automatically before appointments.",
        features: [
          { title: "Automated Symptom Assessment", description: "Via voice" },
          { title: "Urgency Detection", description: "For critical cases" },
          { title: "Multi-Lingual Support", description: "For diverse patient needs" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with telehealth platforms" },
          { title: "Configure", description: "Set up screening questions" },
          { title: "Screen", description: "AI conducts pre-screening calls" },
          { title: "Flag", description: "Urgent cases are flagged for immediate attention" },
        ],
        testimonial: {
          text: "Our triage process is more efficient with Superu's pre-screening calls.",
          author: "Dr. Michael Johnson",
          role: "City General Hospital",
        },
      },
      "patient-follow-up": {
        title: "Patient Follow-Up & Engagement",
        subheadline: "Keep patients engaged and monitor their recovery with automated follow-up calls.",
        features: [
          { title: "Personalized Follow-Up", description: "Based on patient history" },
          { title: "Health Check Reminders", description: "For medication and vital monitoring" },
          { title: "Feedback Collection", description: "To measure patient satisfaction" },
        ],
        howItWorks: [
          { title: "Sync", description: "Connect patient records with Superu" },
          { title: "Schedule", description: "Set up follow-up calls automatically" },
          { title: "Call", description: "AI makes calls and collects responses" },
          { title: "Analyze", description: "Review feedback for continuous improvement" },
        ],
        testimonial: {
          text: "Follow-up calls have boosted our patient engagement and recovery tracking.",
          author: "Dr. Linda Parker",
          role: "Wellness Center",
        },
      },
    },
  },
  mortgage: {
    title: "Transform Mortgage Processing with AI Voice Agents",
    description:
      "Streamline loan processes and enhance client communication with Superu's intelligent voice solutions.",
    color: "text-green-600",
    useCases: {
      "loan-pre-qualification": {
        title: "Loan Pre-Qualification Calls",
        subheadline: "Automate initial client screening to determine loan eligibility quickly.",
        features: [
          { title: "Automated Data Collection", description: "During the call" },
          { title: "Real-Time Eligibility Analysis", description: "Instant feedback" },
          { title: "Personalized Loan Recommendations", description: "Tailored to client needs" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with loan processing systems" },
          { title: "Configure", description: "Set up data collection scripts" },
          { title: "Screen", description: "AI conducts pre-qualification calls" },
          { title: "Analyze", description: "Provide instant eligibility feedback" },
        ],
        testimonial: {
          text: "Our processing time has dramatically improved with Superu's pre-qualification calls.",
          author: "Sarah Thompson",
          role: "FirstChoice Bank",
        },
      },
      "document-collection": {
        title: "Document Collection & Verification",
        subheadline: "Simplify the mortgage application process with automated document collection and verification.",
        features: [
          { title: "Automated Requests", description: "For necessary documents" },
          { title: "Intelligent Document Scanning", description: "And data extraction" },
          { title: "Verification Alerts", description: "For missing or inconsistent data" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with document management systems" },
          { title: "Configure", description: "Set up document workflows" },
          { title: "Guide", description: "AI assists applicants through document submission" },
          { title: "Verify", description: "Automatically check document completeness" },
        ],
        testimonial: {
          text: "Our document verification is faster and error-free with Superu.",
          author: "Mark Rodriguez",
          role: "MetroMortgage",
        },
      },
      "rate-update": {
        title: "Rate Update & Follow-Up Calls",
        subheadline: "Keep clients informed about changing mortgage rates with timely, automated updates.",
        features: [
          { title: "Automated Rate Notifications", description: "Timely updates" },
          { title: "Personalized Follow-Up", description: "Address client questions" },
          { title: "Appointment Scheduling", description: "With mortgage advisors" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with rate management systems" },
          { title: "Configure", description: "Set up notification triggers" },
          { title: "Notify", description: "AI calls clients with rate updates" },
          { title: "Schedule", description: "Follow-up calls for consultations" },
        ],
        testimonial: {
          text: "Our clients appreciate the proactive rate updates, increasing our conversion rate.",
          author: "John Davis",
          role: "Mortgage Solutions Inc.",
        },
      },
    },
  },
  recruitment: {
    title: "Revolutionize Recruitment with AI Voice Agents",
    description:
      "Streamline candidate screening and enhance the hiring process with Superu's intelligent voice solutions.",
    color: "text-purple-600",
    useCases: {
      "candidate-pre-screening": {
        title: "Candidate Pre-Screening Calls",
        subheadline: "Automate the initial candidate screening to filter applicants effectively.",
        features: [
          { title: "Customizable Interview Questions", description: "Tailored to each role" },
          { title: "Automated Response Analysis", description: "Quick evaluation" },
          { title: "Rapid Candidate Shortlisting", description: "Efficient selection" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with recruitment platforms" },
          { title: "Configure", description: "Set up screening criteria" },
          { title: "Screen", description: "AI conducts candidate screening calls" },
          { title: "Compile", description: "Gather candidate data for review" },
        ],
        testimonial: {
          text: "Our pre-screening process is faster and more accurate with Superu.",
          author: "Jessica Lee",
          role: "TechInnovate Inc.",
        },
      },
      "interview-scheduling": {
        title: "Interview Scheduling Calls",
        subheadline: "Streamline interview scheduling by automating appointment bookings.",
        features: [
          { title: "Intelligent Availability Matching", description: "Optimal scheduling" },
          { title: "Automated Appointment Confirmations", description: "Instant booking" },
          { title: "Reminder Notifications", description: "Reduce no-shows" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with calendar systems" },
          { title: "Configure", description: "Set up available time slots" },
          { title: "Schedule", description: "AI calls candidates to book interviews" },
          { title: "Confirm", description: "Send automated reminders" },
        ],
        testimonial: {
          text: "Our interview scheduling is now hassle-free and efficient.",
          author: "David Chang",
          role: "Global Enterprises",
        },
      },
      "candidate-onboarding": {
        title: "Candidate Onboarding & Follow-Up",
        subheadline: "Welcome new hires and share essential onboarding information through automated calls.",
        features: [
          { title: "Personalized Welcome Messages", description: "Warm introductions" },
          { title: "Dissemination of Onboarding Materials", description: "Key information sharing" },
          { title: "Follow-Up Surveys", description: "Gather feedback" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with HR systems" },
          { title: "Configure", description: "Set up onboarding workflows" },
          { title: "Welcome", description: "AI conducts welcome calls" },
          { title: "Survey", description: "Collect feedback to improve process" },
        ],
        testimonial: {
          text: "Our onboarding process has never been smoother with Superu's calls.",
          author: "Mark Stevenson",
          role: "TalentFirst",
        },
      },
    },
  },
  "real-estate": {
    title: "Elevate Real Estate Services with AI Voice Agents",
    description: "Enhance property inquiries and client engagement with Superu's intelligent voice solutions.",
    color: "text-orange-600",
    useCases: {
      "property-inquiry": {
        title: "Property Inquiry and Virtual Tours",
        subheadline: "Automate property inquiries and schedule virtual tours seamlessly.",
        features: [
          { title: "Instant Inquiry Handling", description: "Quick responses" },
          { title: "Virtual Tour Appointment Scheduling", description: "Easy booking" },
          { title: "Dynamic Property Overviews", description: "Detailed information via call" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with property listing systems" },
          { title: "Configure", description: "Set up inquiry scripts" },
          { title: "Respond", description: "AI manages inquiries and schedules tours" },
          { title: "Inform", description: "Provide detailed property information" },
        ],
        testimonial: {
          text: "Our inquiry response time has halved with Superu's automated calls.",
          author: "Linda Martinez",
          role: "Prime Properties",
        },
      },
      "client-follow-up": {
        title: "Client Follow-Up & Feedback Collection",
        subheadline: "Enhance client relationships with timely follow-up calls and feedback collection.",
        features: [
          { title: "Automated Follow-Up Post-Viewing", description: "Timely engagement" },
          { title: "Client Feedback Surveys", description: "Gather insights" },
          { title: "Personalized Property Recommendations", description: "Tailored suggestions" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with CRM systems" },
          { title: "Configure", description: "Set up follow-up workflows" },
          { title: "Follow-Up", description: "AI calls clients post-viewing" },
          { title: "Analyze", description: "Review feedback to improve service" },
        ],
        testimonial: {
          text: "Follow-up calls have boosted client satisfaction and retention.",
          author: "Robert Chen",
          role: "Citywide Realty",
        },
      },
      "open-house-notifications": {
        title: "Open House Notifications & Scheduling",
        subheadline: "Maximize open house attendance with automated notifications and scheduling.",
        features: [
          { title: "Timely Open House Alerts", description: "Increase awareness" },
          { title: "Automated Appointment Scheduling", description: "Easy RSVP" },
          { title: "Engagement Metrics", description: "Track interest" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with event management systems" },
          { title: "Configure", description: "Set up notification triggers" },
          { title: "Notify", description: "AI calls potential buyers" },
          { title: "Analyze", description: "Collect data on attendance interest" },
        ],
        testimonial: {
          text: "Our open house attendance has improved dramatically thanks to automated calls.",
          author: "Mark Lee",
          role: "Real Estate Broker",
        },
      },
    },
  },
  fitness: {
    title: "Boost Fitness Engagement with AI Voice Agents",
    description: "Enhance client motivation and streamline operations with Superu's AI-powered calling solutions.",
    color: "text-red-600",
    useCases: {
      "personalized-coaching": {
        title: "Personalized Fitness Coaching Calls",
        subheadline: "Deliver tailored fitness advice and workout reminders through automated voice calls.",
        features: [
          { title: "Custom Workout Recommendations", description: "Personalized plans" },
          { title: "Real-Time Progress Updates", description: "Track improvements" },
          { title: "Motivational Messaging", description: "Encourage consistency" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with fitness tracking systems" },
          { title: "Configure", description: "Set up personalized workout scripts" },
          { title: "Coach", description: "AI conducts coaching calls" },
          { title: "Adjust", description: "Collect performance data and update plans" },
        ],
        testimonial: {
          text: "Our clients love the personalized coaching calls.",
          author: "Alex Turner",
          role: "Elite Performance Center",
        },
      },
      "membership-retention": {
        title: "Membership Engagement & Retention Calls",
        subheadline: "Boost member engagement and reduce churn with regular, automated follow-up calls.",
        features: [
          { title: "Automated Engagement Check-Ins", description: "Regular touchpoints" },
          { title: "Renewal Reminders", description: "Timely notifications" },
          { title: "Feedback Collection", description: "Continuous improvement" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with membership management systems" },
          { title: "Configure", description: "Set up engagement workflows" },
          { title: "Engage", description: "AI conducts regular check-in calls" },
          { title: "Improve", description: "Use feedback to refine retention strategies" },
        ],
        testimonial: {
          text: "Membership retention has improved thanks to Superu's follow-up calls.",
          author: "Sarah Johnson",
          role: "FitLife Gyms",
        },
      },
      "class-scheduling": {
        title: "Class and Appointment Scheduling",
        subheadline: "Streamline scheduling for fitness classes and personal training sessions with automated calls.",
        features: [
          { title: "Real-Time Schedule Management", description: "Up-to-date availability" },
          { title: "Automated Reminders and Confirmations", description: "Reduce no-shows" },
          { title: "Easy Rescheduling via Voice Prompts", description: "Flexible booking" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with scheduling systems" },
          { title: "Configure", description: "Set up class and appointment workflows" },
          { title: "Schedule", description: "AI manages bookings and sends reminders" },
          { title: "Adjust", description: "Allow interactive rescheduling through voice" },
        ],
        testimonial: {
          text: "Our class management process is streamlined thanks to automated scheduling calls.",
          author: "Mark Williams",
          role: "Gym Manager, FitFlex",
        },
      },
    },
  },
  saas: {
    title: "Elevate SaaS Customer Experience with AI Voice Agents",
    description:
      "Enhance customer onboarding, support, and engagement with Superu's intelligent voice solutions for SaaS businesses.",
    color: "text-indigo-600",
    useCases: {
      "automated-meeting-confirmation": {
        title: "Automated Meeting Confirmation Calls",
        subheadline:
          "Streamline your meeting scheduling process and reduce no-shows with AI-powered confirmation calls.",
        features: [
          { title: "Intelligent Scheduling", description: "Seamlessly integrates with your calendar system" },
          { title: "Customizable Scripts", description: "Tailor call scripts to your brand voice" },
          { title: "Real-time Rescheduling", description: "Allow instant rescheduling during the call" },
          { title: "Multi-channel Reminders", description: "Follow up with email or SMS reminders" },
        ],
        howItWorks: [
          { title: "Connect", description: "Integrate with your scheduling and CRM systems" },
          { title: "Configure", description: "Set up call scripts and reminder preferences" },
          { title: "Confirm", description: "AI agent makes confirmation calls to attendees" },
          { title: "Collect", description: "Gather additional information or special requests" },
          { title: "Update", description: "Automatically update your calendar and CRM" },
        ],
        testimonial: {
          text: "Superu's automated meeting confirmation calls have significantly reduced our no-show rates and improved our team's productivity.",
          author: "Emily Chen",
          role: "Customer Success Manager, TechFlow SaaS",
        },
      },
      "smart-meeting-scheduler": {
        title: "Smart Meeting Scheduler",
        subheadline: "Automate meeting bookings with AI-powered follow-up calls after form submissions.",
        features: [
          { title: "Instant Follow-up", description: "Immediate call after form submission" },
          { title: "Intelligent Availability Matching", description: "Find optimal meeting times" },
          { title: "Contextual Understanding", description: "Use form data to personalize calls" },
          { title: "Multi-channel Confirmation", description: "Send confirmations via call, email, and SMS" },
        ],
        howItWorks: [
          { title: "Integrate", description: "Connect with your form submission and calendar systems" },
          { title: "Analyze", description: "AI processes form data for context" },
          { title: "Call", description: "AI agent calls the prospect to schedule a meeting" },
          { title: "Schedule", description: "Book the meeting based on mutual availability" },
          { title: "Confirm", description: "Send multi-channel meeting confirmations" },
        ],
        testimonial: {
          text: "The Smart Meeting Scheduler has dramatically reduced our sales team's workload and accelerated our sales cycle.",
          author: "Alex Rodriguez",
          role: "VP of Sales, TechNova Solutions",
        },
      },
      "subscription-renewal": {
        title: "Proactive Subscription Renewal Calls",
        subheadline: "Increase retention rates with personalized, AI-driven renewal conversations.",
        features: [
          { title: "Predictive Analytics", description: "Identify at-risk accounts" },
          { title: "Personalized Offers", description: "Tailor renewal deals to each customer" },
          { title: "Objection Handling", description: "Address concerns with AI-powered responses" },
          { title: "Seamless Upgrades", description: "Offer and process plan upgrades during calls" },
        ],
        howItWorks: [
          { title: "Predict", description: "Use data to identify accounts nearing renewal" },
          { title: "Prepare", description: "Generate personalized renewal strategies" },
          { title: "Engage", description: "AI initiates proactive renewal conversations" },
          { title: "Negotiate", description: "Handle objections and offer tailored solutions" },
          { title: "Close", description: "Process renewals or escalate to human agents" },
        ],
        testimonial: {
          text: "Superu's renewal calls have helped us increase our renewal rate by 25% and significantly reduced churn.",
          author: "Sarah Thompson",
          role: "VP of Sales, CloudSuite",
        },
      },
    },
  },
}

export function getIndustryData(industry: string): IndustryData | null {
  return industriesData[industry] || null
}

export function getUseCaseData(industry: string, useCase: string): UseCaseData | null {
  return industriesData[industry]?.useCases[useCase] || null
}

export function getAllIndustries(): string[] {
  return Object.keys(industriesData)
}

