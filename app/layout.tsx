export const metadata = {
  title: 'Arto, a dog.',
  description: 'Arto app',
};

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
