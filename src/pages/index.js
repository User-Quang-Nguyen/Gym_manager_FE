import { useRouter } from "next/navigation";
import { authApi } from "src/api/auth";
import { useAuth } from "src/hooks/use-auth";
const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  if (auth.isAuthenticated) {
    const { user } = auth;
    if (user.role_name === "MANAGER") router.push("/dashboard/admin");
    else if (
      user.role_name === "CUSTOMER_CARE" ||
      user.role_name === "TRAINER" ||
      user.role_name === "SALE"
    )
      router.push("/dashboard/employee");
    else router.push("/dashboard/user");
  } else router.push("auth/login");
};

export default Page;
