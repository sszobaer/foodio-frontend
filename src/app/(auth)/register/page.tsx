import AuthCard from "@/components/features/auth/AuthCard";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4">
      <AuthCard mode="register" />
    </main>
  );
}