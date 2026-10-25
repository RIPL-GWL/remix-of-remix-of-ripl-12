import { describe, expect, it } from "vitest";
import { formatRupeeWords, grantPool, opportunityRules, programmeRules, registrationTotal, rewardPool } from "@/frontend/features/funding-programme/rules";

describe("Funding programme terms", () => {
  it("charges 2999 plus 18 percent GST for two people", () => {
    expect(programmeRules.registrationFee).toBe(2999);
    expect(programmeRules.includedParticipants).toBe(2);
    expect(programmeRules.gstPercent).toBe(18);
    expect(registrationTotal(2)).toBe(3538.82);
  });
  it("charges 2000 plus GST for each extra person", () => {
    expect(programmeRules.additionalParticipantFee).toBe(2000);
    expect(registrationTotal(3)).toBe(5898.82);
    expect(registrationTotal(4)).toBe(8258.82);
  });
  it("scans startups within fifteen days", () => {
    expect(programmeRules.scanningDays).toBe(15);
  });
});

describe("Funding & Investment Program opportunities", () => {
  it("splits a 20 lakh grant pool across five ranks", () => {
    expect(opportunityRules.grantAwards).toEqual([1000000, 500000, 250000, 150000, 100000]);
    expect(grantPool()).toBe(2000000);
  });
  it("offers 25,000 to 50,000 prototype grants to the top 20 ideas", () => {
    expect(opportunityRules.prototypeIdeas).toBe(20);
    expect(opportunityRules.prototypeGrantMin).toBe(25000);
    expect(opportunityRules.prototypeGrantMax).toBe(50000);
  });
  it("rewards 25 ideas with 10,000 each for a 2.5 lakh pool", () => {
    expect(opportunityRules.rewardIdeas).toBe(25);
    expect(opportunityRules.ideaReward).toBe(10000);
    expect(rewardPool()).toBe(250000);
  });
  it("presents investment up to 5 crore as an opportunity, never guaranteed", () => {
    expect(opportunityRules.investmentOpportunityMax).toBe(50000000);
    expect(opportunityRules.fundingGuaranteed).toBe(false);
    expect(formatRupeeWords(opportunityRules.investmentOpportunityMax)).toBe("₹5 Crore");
  });
  it("offers 3 months of mentorship and technology support worth up to 3 lakh", () => {
    expect(opportunityRules.mentorshipMonths).toBe(3);
    expect(opportunityRules.technologySupportMax).toBe(300000);
  });
  it("does not display event dates", () => {
    expect(opportunityRules.showEventDates).toBe(false);
  });
  it("formats amounts in lakh and crore", () => {
    expect(formatRupeeWords(250000)).toBe("₹2.5 Lakh");
    expect(formatRupeeWords(2000000)).toBe("₹20 Lakh");
    expect(formatRupeeWords(10000)).toBe("₹10,000");
  });
});
