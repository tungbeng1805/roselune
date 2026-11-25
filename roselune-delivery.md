# ROSELUNE storefront handoff

The homepage, header and footer are active in the isolated Shopify development theme **roselune-home-c97cc44-preview** (ID `205441859665`). Horizon 4.5.0 is the base. The store continues to serve its existing live Horizon theme (ID `205315309649`). [Open the development Theme Editor](https://fwhekz-9g.myshopify.com/admin/themes/205441859665/editor) · [Open the storefront preview](https://fwhekz-9g.myshopify.com/?preview_theme_id=205441859665)

## Set up the development theme

1. Open the development Theme Editor and select **Home page**. The Header group contains the optional announcement followed by the ROSELUNE header. The homepage contains Cinema, Princess Dress, Royal Dress, Mother & Me, Accessories, Community, Feedback and Newsletter. The Footer group contains the ROSELUNE footer. Use the eye icons to control visibility and the drag handles to reorder sections. The ROSELUNE presets are available under **Add section**.
2. In **Header**, upload the original desktop and mobile logos. Set widths, spacing, the sticky option and the homepage transparency colors. Without an uploaded logo, the header uses the configured Horizon logo or the ROSELUNE wordmark. The footer also supports its own logo. Use the original artwork at its original aspect ratio.
3. In Shopify **Content → Menus**, prepare a main menu with **Home**, **Princess Dress**, **Royal Dress**, **Mother & Me**, **Accessories** and **About**. Assign the actual resources and nest any submenus there. Select this menu in the ROSELUNE header. The preview currently uses the store’s existing Home, Catalog and Contact menu. Set up separate Shop, About and Customer Care menus and assign them to the footer blocks. An optional social menu accepts merchant-supplied profile links.
4. In **Cinema**, choose the desktop and mobile posters and Shopify-hosted videos. Choose the overlay logo or brand heading, text, both CTA destinations, placement, heights and playback controls. A mobile poster without a mobile film produces a still mobile banner. Without a mobile override, the desktop campaign serves both sizes. The primary CTA initially opens the store’s all-products collection.
5. Assign the corresponding collection to each dress and accessory section. Manual product selections take precedence over a collection. A blank View All destination uses the selected collection URL. Princess Dress and Accessories share a showcase with side or centered copy and selectable grid or carousel. Royal Dress and Mother & Me share the editorial section with reversible splits, a full banner, or products alongside the editorial. The mobile natural-ratio option preserves the full selected image.
6. Set product count, image treatment, information visibility and responsive columns in the showcase. The initial layout uses four columns on desktop, three on tablet and two on mobile. For quick add, enable the section option and Horizon’s **Quick add** theme setting. Horizon also controls mobile quick add, cart drawer versus cart page, customer accounts and sale pricing. The header exposes a wishlist link only when enabled and supplied with a working wishlist destination.
7. Add each **Community** photo or film as a gallery block. Add a description, customer credit, post URL and linked product as applicable. Add a **Feedback** block for each approved customer review. Enter the authentic review text and enable its rating only when the customer supplied one. Empty feedback is hidden on the storefront. An empty community gallery with no social destination is also hidden. Both remain available for editing.
8. Set the **Newsletter** labels, colors and optional floral image. Both newsletter placements use Shopify’s customer form and newsletter tag. The optional footer signup starts disabled. Assign the footer logo, menus, social links and policy/payment preferences. Policy links and payment logos follow Shopify’s store configuration. Country and language controls appear when multiple choices are available.
9. Set the heading font in each branded section. The default is Shopify-hosted Playfair Display. Body copy inherits Horizon’s existing body font. Color, spacing and layout controls apply to the section instance being edited.

## Assets for styling approval

These are recommended source sizes. Shopify generates responsive derivatives.

| Asset | Suggested source | Placement |
| --- | --- | --- |
| Original ROSELUNE logo | Transparent PNG, at least 800 px wide, original aspect ratio | Header, mobile header, footer and optional hero overlay |
| Homepage mockup | Original full-resolution design, plus mobile artboard if available | Visual comparison and spacing approval |
| Desktop hero film and poster | 1920 × 1080 MP4 and matching image, or 2400 × 1350 poster | Full-width cinema |
| Mobile hero film and poster | 1080 × 1920, with a separate portrait composition | Mobile cinema |
| Royal Dress and Mother & Me editorial images | 2400 × 1400 for a full banner, approximately 1600 × 1800 for a split | Each editorial section has independent media pickers |
| Mobile editorial crops | Approximately 1080 × 1350 with both faces and dress details in frame | Mobile editorial pickers |
| Product photography | Consistent 1600 × 2000 front and alternate views | Shopify product media, with actual variants and prices |
| Community photography or video | 1080 × 1350 or 1080 × 1080 | Gallery blocks, with meaningful alt text |
| Genuine customer photos and avatars | Approximately 1000 px wide and 160 × 160 respectively | Testimonial blocks |
| Optional floral artwork | Transparent PNG, approximately 700 px wide | Newsletter decoration |

The attachment supplied for implementation contained the brief. The first preview uses responsive text branding and Shopify editorial placeholders. The original mockup, logo and campaign assets are still needed for visual approval.

## Integration and rollback

| Existing file modified | Reason |
| --- | --- |
| `templates/index.json` | Activates the eight homepage content sections in order and retains both original homepage sections in their original order, disabled. |
| `sections/header-group.json` | Activates the ROSELUNE announcement and header sitewide and retains the original announcement and header configurations for rollback. |
| `sections/footer-group.json` | Activates the ROSELUNE footer with three editable menu blocks and retains the original footer and footer utilities configurations for rollback. |

The development preview has already been activated. To preview from this checkout with the installed Shopify CLI, explicitly target the same development theme:

```powershell
shopify theme dev --store fwhekz-9g.myshopify.com --theme 205441859665
```

For editor rollback, hide the new homepage sections and show the two original ones. In the Header group, hide both ROSELUNE entries and show the original announcement and header. In the Footer group, hide ROSELUNE and show the original footer and utilities. Save the development theme. The original section settings and nested blocks are preserved.

The exact pre-customization JSON is available at Git revision `c97cc44a28e9f42fbb035538fb4ecbf1de98ec55`. For a source-level rollback, first save any newer merchant configuration changes. The following restores the three integration files in the local working tree:

```powershell
git restore --source=c97cc44a28e9f42fbb035538fb4ecbf1de98ec55 -- templates/index.json sections/header-group.json sections/footer-group.json
```

Preview the restored checkout on the development theme. For a future launch, configure a persistent unpublished theme copy and publish that copy only after storefront approval.

## Newly created files

The CSS lives with the sections and snippets in Shopify `stylesheet` tags. Shopify bundles these styles, and section IDs scope the merchant-selected values.

| Directory | Files |
| --- | --- |
| `sections/` | `roselune-announcement-bar.liquid`, `roselune-header.liquid`, `roselune-hero-video.liquid`, `roselune-collection-showcase.liquid`, `roselune-collection-banner.liquid`, `roselune-community.liquid`, `roselune-testimonials.liquid`, `roselune-newsletter.liquid`, `roselune-footer.liquid` |
| `snippets/` | `roselune-section-style.liquid`, `roselune-picture.liquid`, `roselune-intro.liquid`, `roselune-campaign-media.liquid`, `roselune-product-card.liquid`, `roselune-products.liquid`, `roselune-rail.liquid`, `roselune-localization.liquid`, `roselune-signup.liquid` |
| `assets/` | `roselune-carousel.js`, `roselune-film.js`, `roselune-header.js` |
| Project root | `roselune-delivery.md` |

## Validation

| Check | Result |
| --- | --- |
| Shopify server validation | Shopify accepted the nine custom section schemas, homepage template and section groups on the development theme. |
| Theme JSON | Parsed all 101 theme JSON/JSONC files and all 145 embedded section and block schemas. |
| Theme Check | The final report matches the baseline. The installed checker reports two pre-existing unknown-filter errors for `applicable_disclosures` in `blocks/disclosures.liquid` and `snippets/cart-disclosure-tooltip.liquid`, plus seven existing warnings. |
| Source isolation | Compared all six original integration entries, including their settings and blocks, with Git. Only their disabled flag changed. Node syntax checks passed for all three new modules. |
| Responsive preview | Tested in Chromium at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px. Each rendered one H1, with no horizontal page overflow, header icon/logo collisions or broken visible images in the starter configuration. |
| Header and search | Verified mobile drawer opening, focus containment and Escape, desktop sticky behavior, and a predictive search response from Shopify. The cart trigger opened the native empty cart drawer. |
| Interior pages | The existing all-products collection and cart routes both returned HTTP 200 with the ROSELUNE header and footer and their own native page content. |
| Newsletter | Verified the native Shopify POST destination, newsletter tag, and rejection and acceptance of email syntax. A subscriber was not created during testing. |
| Media and carousels | Browser-only fixtures exercised the production scripts with two carousel instances and separate desktop/mobile video sources. Checked viewport selection, source requests, reduced-motion startup, play/pause, mute, responsive column counts, pagination and editor block selection after reconnect. |
| Editor lifecycle | Shopify’s Section Rendering API returned updated homepage section markup. Local browser tests exercised component removal and reinsertion. An interactive admin editing and saving session remains unverified. |
| Catalog and customer content | The preview storefront exposed zero published products and only the Home page collection. Real product-link navigation, variant selection, price presentation, successful cart mutations, newsletter receipt and configured localization require merchant data and an appropriate test session. |

The source and development preview are available for configuration. Final sign-off requires the original design assets, assigned merchandise and menus, and a storefront check with that content.
