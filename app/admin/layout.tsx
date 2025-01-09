export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="vi">
        <body className="antialiased">
          {children}
        </body>
      </html>
    );
  }
  