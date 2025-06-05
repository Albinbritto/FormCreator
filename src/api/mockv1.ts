import { IFormMetaData } from "../pages/FormBuilder/type";

export const formMetaData: IFormMetaData = {
  formId: "efa4c9b4-596c-4358-a410-a3bf2710a782",
  formName: "Job Seeker Resume Builder",
  formDescription:
    "Collect comprehensive information from job seekers to build a professional resume.",
  pages: [
    {
      pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
      pageName: "Personal Information",
      pageDescription: "Basic personal details.",
      fields: [
        {
          fieldId: "672fe060-e8a0-469c-b146-3de245fa1c87",
          fieldName: "basicDetails",
          label: "Basic Details",
          type: "section",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
        },
        {
          fieldId: "c63ea6a9-08a0-4322-9e4d-d18553ed4a90",
          fieldName: "firstName",
          label: "First Name",
          type: "singleline",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
          validations: {
            required: {
              value: true,
              message: "First name is required.",
            },
          },
        },
        {
          fieldId: "52c0744f-5bb7-4483-8549-b9011d05e987",
          fieldName: "lastName",
          label: "Last Name",
          type: "singleline",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
          validations: {
            required: {
              value: true,
              message: "Last name is required.",
            },
          },
        },
        {
          fieldId: "5cf93948-6d95-44a3-afa8-0206e679dfc2",
          fieldName: "email",
          label: "Email",
          type: "email",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
          validations: {
            required: {
              value: true,
              message: "Email is required.",
            },
          },
        },
        {
          fieldId: "390efbdf-3f43-416c-a60b-25084126386d",
          fieldName: "phone",
          label: "Phone Number",
          type: "singleline",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
        },
        {
          fieldId: "12abba61-fd3b-41e4-9895-e8960ccea994",
          fieldName: "dob",
          label: "Date of Birth",
          type: "singleline",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
        },
        {
          fieldId: "f045ec01-7b51-4642-a3d0-64b245add6a7",
          fieldName: "gender",
          label: "Gender",
          type: "select",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
          options: [
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Other",
              value: "other",
            },
          ],
        },
      ],
    },
    {
      pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
      pageName: "Education Background",
      pageDescription: "Academic qualifications.",
      fields: [
        {
          fieldId: "331069f0-69c0-43a3-bfe7-84bd06b60323",
          fieldName: "educationSection",
          label: "Education",
          type: "section",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
        {
          fieldId: "bbe91e3d-0f80-4f2f-b281-b9db604a815d",
          fieldName: "highestQualification",
          label: "Highest Qualification",
          type: "singleline",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
        {
          fieldId: "6d2b1551-ed73-4fc3-82f8-be5b00c31958",
          fieldName: "university",
          label: "University / Institute",
          type: "singleline",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
        {
          fieldId: "9bddd166-cb29-4af2-a697-4919866348eb",
          fieldName: "graduationYear",
          label: "Year of Graduation",
          type: "singleline",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
        {
          fieldId: "436d15b7-149a-41f1-9db8-70ccd836178e",
          fieldName: "fieldOfStudy",
          label: "Field of Study",
          type: "singleline",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
      ],
    },
    {
      pageId: "3138c733-943f-4809-be50-3907671c9995",
      pageName: "Work Experience",
      pageDescription: "Previous employment details.",
      fields: [
        {
          fieldId: "b5c6ef53-100a-470b-b4b9-ce6604180f3c",
          fieldName: "experienceSection",
          label: "Experience",
          type: "section",
          pageId: "3138c733-943f-4809-be50-3907671c9995",
        },
        {
          fieldId: "99c68044-7f8c-4847-879e-43caef2b2c26",
          fieldName: "totalExperience",
          label: "Total Years of Experience",
          type: "singleline",
          pageId: "3138c733-943f-4809-be50-3907671c9995",
        },
        {
          fieldId: "f08dc1ad-16ab-4831-bd6a-c3bdd32399d5",
          fieldName: "currentCompany",
          label: "Current Company",
          type: "singleline",
          pageId: "3138c733-943f-4809-be50-3907671c9995",
        },
        {
          fieldId: "501312ff-7150-4932-8a80-4606170163b2",
          fieldName: "jobTitle",
          label: "Job Title",
          type: "singleline",
          pageId: "3138c733-943f-4809-be50-3907671c9995",
        },
        {
          fieldId: "c01f2e1b-2d7a-482b-8680-b532831c7d73",
          fieldName: "jobDescription",
          label: "Job Description",
          type: "multiline",
          pageId: "3138c733-943f-4809-be50-3907671c9995",
        },
      ],
    },
    {
      pageId: "93850684-563c-4eb1-b6fb-4c689973a99b",
      pageName: "Skills & Certifications",
      pageDescription: "Technical and soft skills.",
      fields: [
        {
          fieldId: "df2674ec-e1de-4865-a48b-602ec21152b9",
          fieldName: "skillsSection",
          label: "Skills",
          type: "section",
          pageId: "93850684-563c-4eb1-b6fb-4c689973a99b",
        },
        {
          fieldId: "ede771e0-073a-42f5-8b21-f37623a001fe",
          fieldName: "technicalSkills",
          label: "Technical Skills",
          type: "multiline",
          pageId: "93850684-563c-4eb1-b6fb-4c689973a99b",
        },
        {
          fieldId: "d7ddf98a-2c18-4b4a-8a6a-06990e93aaa4",
          fieldName: "softSkills",
          label: "Soft Skills",
          type: "multiline",
          pageId: "93850684-563c-4eb1-b6fb-4c689973a99b",
        },
        {
          fieldId: "c6c46b0a-02cf-48ac-a36c-8dc56d163f23",
          fieldName: "certifications",
          label: "Certifications",
          type: "multiline",
          pageId: "93850684-563c-4eb1-b6fb-4c689973a99b",
        },
      ],
    },
    {
      pageId: "04eacef6-d1ba-4a1a-beb4-6b346bdd90cf",
      pageName: "Job Preferences",
      pageDescription: "Job expectations and preferences.",
      fields: [
        {
          fieldId: "7c7490ac-c200-4bb7-abd5-ce9993cabd28",
          fieldName: "preferencesSection",
          label: "Preferences",
          type: "section",
          pageId: "04eacef6-d1ba-4a1a-beb4-6b346bdd90cf",
        },
        {
          fieldId: "4d6b88ed-543b-402f-9d11-a4288deb97dd",
          fieldName: "preferredLocation",
          label: "Preferred Job Location",
          type: "singleline",
          pageId: "04eacef6-d1ba-4a1a-beb4-6b346bdd90cf",
        },
        {
          fieldId: "8dc31a8a-131b-491a-a898-ae17d4d6a535",
          fieldName: "expectedSalary",
          label: "Expected Salary",
          type: "singleline",
          pageId: "04eacef6-d1ba-4a1a-beb4-6b346bdd90cf",
        },
        {
          fieldId: "249075f3-f9e3-47e7-9066-b6e66490c2e4",
          fieldName: "noticePeriod",
          label: "Notice Period",
          type: "singleline",
          pageId: "04eacef6-d1ba-4a1a-beb4-6b346bdd90cf",
        },
        {
          fieldId: "0103b342-3037-4fa5-b87e-303170625575",
          fieldName: "jobType",
          label: "Job Type",
          type: "select",
          pageId: "04eacef6-d1ba-4a1a-beb4-6b346bdd90cf",
          options: [
            {
              label: "Full-time",
              value: "fulltime",
            },
            {
              label: "Part-time",
              value: "parttime",
            },
            {
              label: "Freelance",
              value: "freelance",
            },
            {
              label: "Internship",
              value: "internship",
            },
          ],
        },
      ],
    },
  ],
};

export const formMetaDataTrimmed: IFormMetaData = {
  formId: "efa4c9b4-596c-4358-a410-a3bf2710a782",
  formName: "Job Seeker Resume Builder",
  formDescription:
    "Collect comprehensive information from job seekers to build a professional resume.",
  pages: [
    {
      pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
      pageName: "Personal Information",
      pageDescription: "Basic personal details.",
      fields: [
        {
          fieldId: "672fe060-e8a0-469c-b146-3de245fa1c87",
          fieldName: "basicDetails",
          label: "Basic Details",
          type: "section",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
        },
        {
          fieldId: "c63ea6a9-08a0-4322-9e4d-d18553ed4a90",
          fieldName: "firstName",
          label: "First Name",
          type: "singleline",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
          validations: {
            required: {
              value: true,
              message: "First name is required.",
            },
          },
        },
        {
          fieldId: "52c0744f-5bb7-4483-8549-b9011d05e987",
          fieldName: "lastName",
          label: "Last Name",
          type: "singleline",
          pageId: "58b39333-5d9d-4518-a777-0b9513ecebd2",
          validations: {
            required: {
              value: true,
              message: "Last name is required.",
            },
          },
        },
      ],
    },
    {
      pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
      pageName: "Education Background",
      pageDescription: "Academic qualifications.",
      fields: [
        {
          fieldId: "331069f0-69c0-43a3-bfe7-84bd06b60323",
          fieldName: "educationSection",
          label: "Education",
          type: "section",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
        {
          fieldId: "bbe91e3d-0f80-4f2f-b281-b9db604a815d",
          fieldName: "highestQualification",
          label: "Highest Qualification",
          type: "singleline",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
        {
          fieldId: "6d2b1551-ed73-4fc3-82f8-be5b00c31958",
          fieldName: "university",
          label: "University / Institute",
          type: "singleline",
          pageId: "ce0ee860-1b8d-4a27-b4e8-2dc852b93dab",
        },
      ],
    },
  ],
};
