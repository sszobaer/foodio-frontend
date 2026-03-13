import AuthCard from "@/components/features/auth/AuthCard";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center">
      <AuthCard mode="register" />
    </main>
  );
}