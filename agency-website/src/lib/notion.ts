export async function saveLeadToNotion(data: {
  fullName: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
}) {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    console.log("[Notion CRM] API keys not set in environment. Storing lead in fallback log:", data);
    return { success: true, mode: "fallback", data };
  }

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: data.fullName || "İsimsiz Müşteri",
                },
              },
            ],
          },
          Email: {
            email: data.email || "",
          },
          Phone: {
            phone_number: data.phone || "",
          },
          Industry: {
            select: {
              name: data.industry || "Diğer",
            },
          },
          Notes: {
            rich_text: [
              {
                text: {
                  content: data.message || "",
                },
              },
            ],
          },
          Status: {
            status: {
              name: "New Lead",
            },
          },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Notion CRM Error]", errText);
      return { success: false, error: errText };
    }

    const result = await res.json();
    return { success: true, result };
  } catch (error: any) {
    console.error("[Notion CRM Exception]", error);
    return { success: false, error: error.message };
  }
}
