import type { Metadata } from "next";
import { LabContent } from "@/components/lab/lab-content";

export const metadata: Metadata = {
  title: "Lab - Mateo Kapllani",
  description:
    "Interactive experiments and creative coding demos. Exploring physics simulations, generative art, and real-time visualizations.",
};

export default function LabPage() {
  return <LabContent />;
}
