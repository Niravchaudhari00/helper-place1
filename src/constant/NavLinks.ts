interface NavLinksType {
  id: number;
  title: string;
  path: string;
}

export const NavLinks: NavLinksType[] = [
  {
    id: 1,
    title: "jobs",
    path: "/find-job",
  },
  {
    id: 2,
    title: "candidates",
    path: "/find-candidate",
  },
  {
    id: 3,
    title: "agency services",
    path: "/find-agency",
  },
  {
    id: 4,
    title: "news & more",
    path: "#",
  },
];
