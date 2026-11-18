export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  category: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "anderson",
    quote:
      "The entire process was explained clearly, and I felt much more confident understanding my tax situation. The personalized communication made a stressful experience easier to navigate.",
    name: "Michael Anderson",
    category: "Small Business Owner",
  },
  {
    id: "williams",
    quote:
      "I appreciated the attention to detail and the time taken to explain everything. My tax preparation experience felt much more organized and straightforward.",
    name: "Sarah Williams",
    category: "Small Business Owner",
  },
  {
    id: "wilson",
    quote:
      "Having someone explain my tax concerns in simple terms made a big difference. The professional approach and personalized guidance helped me better understand my options.",
    name: "David Wilson",
    category: "Small Business Owner",
  },
];
