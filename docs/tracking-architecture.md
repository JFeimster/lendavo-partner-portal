# 📡 ANALYTICS & TELEMETRY PROTOCOL
**Project:** Lendavo Partner Portal
**Document Purpose:** Define the data layer, custom event tracking, and attribution architecture.
**Directive:** You cannot optimize what you do not measure. Implement these tracking protocols via Google Tag Manager (GTM) to ensure structural visibility.

---

## 1. THE CENTRAL HUB (Google Tag Manager)
All tracking scripts, pixels, and custom HTML must be deployed through GTM. Hardcoding tracking pixels directly into the `index.html` or `success.html` is strictly prohibited to maintain page load speed and code cleanliness.

**Base Implementation:**
Ensure the GTM container snippet is placed immediately after the opening `<head>` tag and the `noscript` fallback immediately after the opening `<body>` tag in all `.html` files.

---

## 2. CUSTOM EVENT TRIGGERS (The Data Layer)
To measure the effectiveness of our psychological UI triggers, we must push custom events to the Data Layer. 

### Event: `calculator_engage`
* **Trigger:** Fires when a user interacts with the slider on the "Trust Equity Leakage Calculator" (`id="clientSlider"`).
* **Purpose:** Measures the engagement rate of the Loss Aversion trigger.
* **Data Variables to Pass:** `slider_value`, `projected_denials`, `lost_revenue`.

### Event: `link_copied`
* **Trigger:** Fires when the user clicks the "COPY" button on the `success.html` page (`id="linkBtn"`).
* **Purpose:** This is our primary indicator of "Active Deployment." A partner who registers but does not copy their link is functionally dormant. 

### Event: `swipe_copied`
* **Trigger:** Fires when the user clicks "COPY SWIPE FILE" (`id="swipeBtn"`).
* **Purpose:** Tracks immediate lead-generation intent.

---

## 3. AD NETWORK MAPPING (Meta & LinkedIn)
When driving traffic to the Partner Portal via paid acquisition, map the custom events to the standard network events to train the bidding algorithms.

| User Action | Custom Event (GTM) | Meta Pixel Standard Event | LinkedIn Insight Tag |
| :--- | :--- | :--- | :--- |
| Views Landing Page | `page_view` | `ViewContent` | `Page View` |
| Plays with Calculator | `calculator_engage` | `Lead` (Low Intent) | `Interact` |
| Clicks "Generate Protocol" | `initiate_checkout` | `InitiateCheckout` | `Click` |
| Reaches success.html | `partner_registered` | `CompleteRegistration` | `Sign Up` |
| Copies Deployment Link | `link_copied` | `Purchase` (High Intent) | `Conversion` |

*Note: By mapping `link_copied` to `Purchase`, you force the Meta algorithm to optimize ad delivery specifically for partners who take action, rather than those who just passively register.*

---

## 4. UTM & POSTBACK ARCHITECTURE
Because the actual Lendavo AI Scan takes place on the main Credit Suite domain, attribution preservation is critical.

**1. UTM Passthrough:**
Ensure any UTM parameters appended to your deployment link (e.g., `?utm_source=linkedin&utm_medium=swipe_file`) are dynamically passed through to the final AI diagnostic form.

**2. Sub-ID Tracking:**
Instruct advanced partners to append Sub-IDs (e.g., `&subid=webinar_april`) to their unique partner links. This allows them to track exactly which campaigns generated the most funded deals inside their command center dashboard.

---
*End of Analytics Protocol.*
