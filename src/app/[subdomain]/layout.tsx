import { useRouter } from "next/router";

export default function SubdomainPage() {
  const router = useRouter();
  const { subdomain } = router.query;

  return (
    <div>
      <h1>Welcome to {subdomain} subdomain!</h1>
    </div>
  );
}
