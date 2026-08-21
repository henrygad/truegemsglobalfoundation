import "server-only";

// Uploads go through next-cloudinary's <CldUploadWidget> on the client (unsigned preset).
// Deletion requires the API secret, so it stays server-only, called from an API route.
export async function deleteFilesFromCloudinary(
  publicIds: string[],
  resourceType: "image" | "video" = "image"
) {
  if (publicIds?.length === 0) {
    throw new Error("No public IDs provided.");
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const authToken = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authToken}`,
      },
      body: JSON.stringify({ public_ids: publicIds }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    throw new Error(data?.error?.message || "Failed to delete files from Cloudinary.");
  }

  return data;
}
