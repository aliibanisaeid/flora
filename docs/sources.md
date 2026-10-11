# Sources and assets

Reviewed October 11, 2026

## References

- [LOOMERE](https://loomere.higgsfield.app/): full-screen continuous scroll film, large chapter titles, six phases and a final color-selection panel
- [Woshe](https://woshe.co/): editorial photography, collections, occasion browsing and arrangement-led merchandising
- Higgsfield website-builder guidance: one continuous motion, device-specific encodes, precise posters and coalesced seeks
- [Marketing research](messaging-research.md): Woshe, Venus et Fleur, Floom and Bloom & Wild

Both visual references were inspected in the browser. Flora uses original branding and copy. No Woshe contact details or logo are used

## Original Higgsfield generations

| Asset | Generation ID | Model | Used file |
| --- | --- | --- | --- |
| Florist at work | 40ca64d4-161d-4a0c-abd0-8915e77696f9 | gpt_image_2_5 | public/images/atelier.webp |
| Coral bouquet | 77dd9862-7525-4fb2-b6bc-54e6e36546b1 | gpt_image_2_5 | public/images/coral.webp |
| Ivory box | 419191f5-0db6-4f2f-b539-be9109a3600f | gpt_image_2_5 | public/images/ivory.webp |
| Apricot bouquet | 8118ea07-40ce-4194-be7d-45844e66ec14 | gpt_image_2_5 | public/images/apricot.webp |
| Lilac vase | 35484104-a5ea-4036-9f86-5ee6e0c4541c | gpt_image_2_5 | public/images/lilac.webp |
| Film starting image | 9b62e80e-c162-4c49-8c4a-0c92cac231c2 | gpt_image_2_5 | assets/source/cinema-start.png |
| Continuous flower film | 3b69f15f-40c9-4d4b-a9e7-9ac5af447acb | grok_video_v15_lite | public/images/flora-film-desktop.mp4 and flora-film-mobile.mp4 |
| Flora logo concept | 7e7b0746-12c8-4d9e-aa11-9a5d60907745 | gpt_image_2_5 | assets/source/flora-logo-generated.png |

The 15.04-second continuous source film is encoded in H.264 with frequent keyframes for scrolling. Six posters per device are extracted from the encoded files. Earlier five-second film and frame iterations are retained locally in assets/source/unused-iterations and excluded from publication

## Woshe editorial photographs

The user explicitly requested extraction of Woshe photographs for inspiration. These five photographs are used as editorial reference imagery in this prototype; they do not document Flora inventory or events

| Local file | Original source |
| --- | --- |
| floral-pink.webp | https://woshe.co/images/com_hikashop/upload/thumbnails/1125x750/img_1853_1.webp |
| floral-garden.webp | https://woshe.co/images/com_hikashop/upload/thumbnails/1125x750/img_1854_1.webp |
| floral-white.webp | https://woshe.co/images/com_hikashop/upload/thumbnails/1125x750/img_1852_1.webp |
| birthday.webp | https://woshe.co/media/templates/site/netparsi/img/cat-birthday.webp |
| wedding.webp | https://woshe.co/media/templates/site/netparsi/img/cat-wedding.webp |

Unused reference campaigns are retained locally under assets/source/woshe-reference and excluded from publication. Product photographs, the studio photograph and film are generated images rather than records of a real Flora shop

## Typography and brand files

- Bonyade Koodak FaNum Regular, Medium and Bold: existing local Calendar font assets, self-hosted
- Cabinet Grotesk: Fontshare CDN, self-hosted
- Inter Tight: Google Fonts, self-hosted
- Logo lettering: outlined Cormorant Garamond Medium from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond), with its OFL license retained in assets/source
- Botanical emblem: original vector rendition of the generated concept

All visible media and fonts are served by the project
