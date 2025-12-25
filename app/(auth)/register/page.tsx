import RegisterForm from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-xl mx-auto flex mt-32 mb-8">
        <RegisterForm />
      </div>
    </div>
  );
}
