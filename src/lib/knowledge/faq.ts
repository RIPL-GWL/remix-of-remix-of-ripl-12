import { faqGroups, type FaqGroup } from "./business-facts";
import { COMPANY } from "@/frontend/content/company";
import { PLAN_RATES, RENT_CAP, RENT_RATES } from "@/lib/ripl-pricing";

// Single source of truth: the FAQ page and the chatbot both read this list,
// so the same fact is never written twice or stated differently.
const ratesGroup: FaqGroup = {
  title: "दरें और संपर्क",
  items: [
    {
      q: "Manufacturer rental plans की दरें क्या हैं?",
      a: `Local ₹${PLAN_RATES.local}/माह, Next Level ₹${PLAN_RATES.next}/माह, Domestic ₹${PLAN_RATES.domestic}/माह। रेवेन्यू शेयर 5–10% आपसी सहमति से तय; 18% GST अलग से।`,
    },
    {
      q: "Retailer को store rent कितना मिलता है?",
      a: `Location class के अनुसार प्रति sq.ft.: ${Object.entries(RENT_RATES)
        .map(([k, v]) => `Class ${k} ₹${v}`)
        .join(", ")}; अधिकतम ₹${RENT_CAP.toLocaleString("en-IN")}/माह। स्टोर निरीक्षण और अंतिम स्वीकृति आवश्यक।`,
    },
    {
      q: "RIPL से संपर्क कैसे करें?",
      a: `Sales: ${COMPANY.email} · General enquiries: ${COMPANY.infoEmail}`,
    },
  ],
};

const programmeGroup: FaqGroup = {
  title: "Startup Funding Programme",
  items: [
    { q: "RIPL Startup Funding Programme क्या है?", a: "RIPL Startup Funding & Investment Program (current event: Startup Summit 2026, 29–31 दिसंबर 2026, Gwalior) founders को idea से build, validate, pitch, raise और scale तक support करता है। Highlights: up to ₹5 crore funding opportunity (investors के through), ₹20 लाख total non-refundable grant opportunity (1st ₹10 लाख, 2nd ₹5 लाख, 3rd ₹2.5 लाख, 4th ₹1.5 लाख, 5th ₹1 लाख), top 20 ideas को ₹25,000–₹50,000 prototype grant, 25 selected ideas को ₹10,000 reward, 3 months free mentorship, up to ₹3 लाख technology support value, legal support, और selected startups के लिए stay, one-side travel और Gwalior tour। Grant ≠ investment। Grant, funding या selection की कोई गारंटी नहीं है — eligibility, evaluation, selection, investor interest, due diligence और Terms & Conditions लागू।" },
    { q: "Funding Programme की प्रक्रिया और fee क्या है?", a: "Journey: Registration → Startup Scanning (15 दिन) → First Pitch → Senior Jury Pitch → Investor Pitch। Fee ₹2,999 + 18% GST (2 participants तक), हर अतिरिक्त participant ₹2,000 + GST। Apply करने के लिए website पर Funding Programme page खोलें।" },
  ],
};

const themeGroup: FaqGroup = {
  title: "Website",
  items: [
    { q: "Website का theme कैसे बदलें?", a: "Website हर बार Navratri theme में खुलती है। Desktop पर header के theme button से, और mobile पर menu खोलकर Navratri Light, Dark या Light चुनें।" },
  ],
};

function dedupe(groups: FaqGroup[]): FaqGroup[] {
  const seen = new Set<string>();
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => {
        const key = i.q.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
    }))
    .filter((g) => g.items.length);
}

export const allFaqGroups: FaqGroup[] = dedupe([...faqGroups, programmeGroup, ratesGroup, themeGroup]);

export const knowledgeText = allFaqGroups
  .flatMap((g) => g.items.map((i) => `[${g.title}] Q: ${i.q}\nA: ${i.a}`))
  .join("\n\n");
