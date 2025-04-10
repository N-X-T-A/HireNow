import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import FirstLoginForm from "../../components/auth/FirstLoginForm";

export default function FirstLogin() {
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <FirstLoginForm />
      </AuthLayout>
    </>
  );
}
