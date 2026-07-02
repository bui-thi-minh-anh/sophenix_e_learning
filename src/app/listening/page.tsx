import { PageTitle } from "@/components/ui/page-title";
import { ListeningBrowser } from "@/components/listening/listening-browser";
import { getListeningTopics } from "@/lib/listening";

// Trang /listening: đọc chủ đề từ docs/09_PAGE_CONTENT/listening (không hardcode).
export default function ListeningPage() {
  const topics = getListeningTopics();
  return (
    <div className="space-y-6">
      <PageTitle description="Practice IELTS Listening with real-world topics and interactive exercises.">
        Nghe
      </PageTitle>
      <ListeningBrowser topics={topics} />
    </div>
  );
}
