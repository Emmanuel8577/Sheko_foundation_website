export interface CampaignMedia {
  type: "image";
  url: string; // Image relative path
  caption?: string;
}

export interface CampaignSocialLinks {
  youtube?: string;
  instagram?: string;
  facebook?: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: "Healthcare" | "Education" | "Economic Empowerment" | "Relief Aid";
  status: "Active" | "Completed";
  date: string;
  location: string;
  beneficiariesCount: number;
  raised: number;
  goal: number;
  image: string;
  shortDescription: string;
  fullStory: string;
  keyObjectives: string[];
  gallery: CampaignMedia[];
  socialLinks?: CampaignSocialLinks;
}

export const campaignsData: Campaign[] = [
  {
    id: "1",
    slug: "free-medical-outreach-2025",
    title: "Free Medical Outreach & Health Screening",
    category: "Healthcare",
    status: "Active",
    date: "March 2025",
    location: "Makurdi, Benue State",
    beneficiariesCount: 1500,
    raised: 12500000,
    goal: 15000000,
    image: "/images/campaigns/gallery-6.png",
    shortDescription:
      "Providing comprehensive medical consultations, essential drug distributions, and preventive health screenings to underserved rural families.",
    fullStory:
      "Our annual healthcare outreach targets vulnerable populations without immediate access to quality medical services. By bringing doctors, nurses, and laboratory technicians directly into local communities, we bridge critical healthcare gaps, provide free diagnoses, and dispense needed prescriptions.",
    keyObjectives: [
      "Conduct general medical screenings for over 1,500 residents",
      "Distribute free prescription medication and essential health kits",
      "Provide vision testing and complimentary eye glasses",
      "Deliver community health education on hygiene and disease prevention",
    ],
    gallery: [
      {
        type: "image",
        url: "/images/campaigns/gallery-5.png",
        caption: "Medical checkups for community elders and children",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-6.png",
        caption: "Pharmacy team preparing prescriptions for distribution",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-4.png",
        caption: "Doctor conducting optometry & eye examinations",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-2.png",
        caption: "Community members queuing for triage and consultation",
      },
    ],
  },
  {
    id: "2",
    slug: "rural-education-initiative",
    title: "Rural Education & Literacy Drive",
    category: "Education",
    status: "Active",
    date: "January 2025",
    location: "Otukpo, Benue State",
    beneficiariesCount: 800,
    raised: 8200000,
    goal: 10000000,
    image: "/images/campaigns/gallery-3.png",
    shortDescription:
      "Equipping primary school students in hard-to-reach rural communities with textbooks, writing supplies, and learning materials.",
    fullStory:
      "Education remains the strongest catalyst for long-term community transformation. Through this project, we provide essential study kits, repair dilapidated classroom furniture, and support teachers in remote primary schools.",
    keyObjectives: [
      "Distribute 2,500+ exercise books and learning materials",
      "Award educational support scholarships to 50 pupils",
      "Renovate 3 rural school learning blocks",
    ],
    gallery: [
      {
        type: "image",
        url: "/images/campaigns/gallery-2.png",
        caption: "Students receiving new learning kits",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-4.png",
        caption: "Classroom interactive learning session",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-5.png",
        caption: "Distribution of backpacks and writing supplies",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-6.png",
        caption: "Teacher orientation & capacity building workshop",
      },
    ],
  },
  {
    id: "3",
    slug: "women-economic-empowerment",
    title: "Women Empowerment & Skill Acquisition",
    category: "Economic Empowerment",
    status: "Completed",
    date: "November 2024",
    location: "Gboko, Benue State",
    beneficiariesCount: 350,
    raised: 20000000,
    goal: 20000000,
    image: "/images/campaigns/gallery-1.png",
    shortDescription:
      "Training local women in vocational skills and providing seed grants to establish sustainable micro-businesses.",
    fullStory:
      "Financial independence empowers families and strengthens local economies. Our women empowerment program provides intensive practical training in vocational trades alongside financial literacy mentorship.",
    keyObjectives: [
      "Train 350 women in vocational trades and business basics",
      "Provide micro-grant starter equipment for top graduates",
      "Establish cooperative peer-mentorship networks",
    ],
    gallery: [
      {
        type: "image",
        url: "/images/campaigns/gallery-3.png",
        caption: "Practical vocational workshop in session",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-2.png",
        caption: "Beneficiaries with starter equipment grants",
      },
      {
        type: "image",
        url: "/images/campaigns/gallery-1.png",
        caption: "Financial literacy class for small business owners",
      },
    ],
  },
];