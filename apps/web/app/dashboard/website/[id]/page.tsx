import { mockWebsites } from '@/lib/mock-data';
import { WebsiteDetailsClient } from '@/components/website-details-client';

export async function generateStaticParams() {
  return mockWebsites.map((website) => ({
    id: website.id,
  }));
}

interface WebsiteDetailPageProps {
  params: { id: string };
}

export default function WebsiteDetailPage({ params }: WebsiteDetailPageProps) {
  return <WebsiteDetailsClient websiteId={params.id} />;
}