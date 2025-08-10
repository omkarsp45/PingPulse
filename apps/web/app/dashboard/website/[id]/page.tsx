import { WebsiteDetailsClient } from '@/components/website-details-client';

interface WebsiteDetailPageProps {
  params: { id: string };
}

export default function WebsiteDetailPage({ params }: WebsiteDetailPageProps) {
  return <WebsiteDetailsClient websiteId={params.id} />;
}