# Samivrah: search intent and enquiry plan

## Page focus

These are service-aligned keyword hypotheses, not search-volume or ranking claims.

| Page | Primary intent | Supporting terms |
| --- | --- | --- |
| Home | Website design for startups | digital services, small business websites |
| Web solutions | Website design and development for small businesses | responsive website design, landing page design, website redesign |
| Social media | Social media management for small businesses | branded social content, content planning for startups |
| Business systems | Lead tracking and business dashboards | workflow tools, task delegation |
| TaskFlow | Task delegation system for service businesses | team progress updates, Google Sheets task tracker |

Each core page has descriptive metadata, a canonical URL, visible service copy and relevant internal links. Google does not use the meta-keywords tag; no stuffing or fabricated location pages were added. FORM is a clearly labelled fictional portfolio concept and is noindex to avoid attracting real headphone shoppers.

## Lead measurement

Existing GA4 property retained. Events distinguish intent from completed outcomes:
- `project_enquiry_open`: visitor opens the popup.
- `contact_click`: phone/email click, not a confirmed conversation.
- `enquiry_prepared`: email draft prepared, not sent and not a captured lead.

The site has no backend lead storage. Visitors must send the prepared email in their own mail app; the popup offers a clipboard alternative. Actual received enquiries should be tracked separately, with source, service, qualification and outcome. No personal form values are sent to analytics by this change.

## After deployment

1. Verify the live domain, desktop/mobile interactions and GA4 events.
2. Submit the existing sitemap in Search Console and inspect changed URLs.
3. Track impressions, qualified enquiries and booked calls; review over several weeks rather than promise instant rankings.
4. Add actual client case studies only with permission and evidence for results.
5. Consider a secure server-backed form/CRM integration as a separate project with delivery monitoring and spam protection.

## International growth

Positioning supports remote collaboration without claiming foreign offices or an established international client base. First validate the offer and delivery process locally. Then select a target market, collect evidence-backed case studies and agree on timezone coverage, support, currency and commercial terms before marketing there. Neither rankings nor revenue are guaranteed.

References: https://developers.google.com/search/docs/appearance/title-link ; https://developers.google.com/search/docs/crawling-indexing/special-tags
