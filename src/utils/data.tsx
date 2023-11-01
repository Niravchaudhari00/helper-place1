export interface ResumeType {
  resume_type_id: number;
  resume_type_name: string;
}

export interface Gender {
  id: number;
  value: string;
}

export const resume_type: ResumeType[] = [
  {
    resume_type_id: 1,
    resume_type_name: "Direct",
  },
  {
    resume_type_id: 2,
    resume_type_name: "Agency",
  },
];

export const gender_data: Gender[] = [
  {
    id: 1,
    value: "Male",
  },
  {
    id: 2,
    value: "Female",
  },
];
