import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        justifyContent: "space-between",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="icons/auth-image.svg"
            alt="Auth Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}
