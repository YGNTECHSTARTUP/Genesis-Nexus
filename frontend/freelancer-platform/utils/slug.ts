export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export function getFreelancerBySlug(freelancers: any[], slug: string) {
  return freelancers.find((freelancer) => generateSlug(freelancer.fullName) === slug)
}
