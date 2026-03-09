import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
}

export default function FeatureCard({
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
