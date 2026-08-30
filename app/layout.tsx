import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MazaoLoop — AI-Powered Agricultural Waste Marketplace | By Michael Ogutu Mokua (mikesth3tic.dev)',
  description: 'Turn agricultural crop waste and byproducts into revenue. Two-sided AI marketplace pairing Kenyan farmers with bio-energy, briquette, animal feed, and compost manufacturers. Created by Michael Ogutu Mokua (mikesth3tic.dev).',
  keywords: [
    'MazaoLoop',
    'Michael Ogutu Mokua',
    'mikesth3tic.dev',
    'Kenya crop waste',
    'agricultural biomass marketplace',
    'maize stalks briquettes',
    'sugarcane bagasse biogas',
    'coffee husks fuel',
    'circular economy Kenya',
    'cleantech agritech Kenya',
  ],
  authors: [{ name: 'Michael Ogutu Mokua', url: 'https://mikesth3tic.dev' }],
  openGraph: {
    title: 'MazaoLoop — AI-Powered Crop Waste Marketplace',
    description: 'Transforming agricultural residue into tradeable clean-economy assets for farmers and industrial off-takers. Built by Michael Ogutu Mokua (mikesth3tic.dev).',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="ambient-bg">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
        </div>
        {children}
      </body>
    </html>
  );
}
