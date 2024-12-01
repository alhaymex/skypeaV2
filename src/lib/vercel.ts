import fetch from "node-fetch";

export async function createSubdomain(blogSlug: string) {
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const rootDomain = process.env.ROOT_DOMAIN;
  const token = process.env.VERCEL_API_TOKEN;

  if (!projectId || !teamId || !rootDomain || !token) {
    throw new Error("Missing required environment variables");
  }

  const subdomain = `${blogSlug}.${rootDomain}`;

  try {
    const response = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subdomain,
          teamId: teamId,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create subdomain: ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    console.log(`Subdomain ${subdomain} created successfully`);
    return subdomain;
  } catch (error) {
    console.error("Error creating subdomain:", error);
    throw error;
  }
}
