import LoginForm from "@/components/LoginForm";

export default async function Login() {
  return (
    <main className="w-[100vw] h-[100vh] bg-gray-200 flex justify-center items-center">
      <LoginForm className="w-[450px]" />
    </main>
  );
}
