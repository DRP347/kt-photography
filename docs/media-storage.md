# Media Storage

KT Photography uses a split media model:

- Curated website-ready photographs are served by the production website.
- Full-resolution master archives remain in Google Drive and local storage.
- Full wedding films remain on YouTube.
- Raw local archive folders must not be committed or uploaded to Vercel.

Ignored raw archive paths include:

- `public/Wedding photography/`
- `public/KT-public-ceremonies/`
- `public/raw/`
- `public/originals/`
- `public/archive/`
- `public/media-archive/`

Website galleries should use explicit story manifests, dimensions, orientation, role, and focal data. Do not select public images by upload order or filename order.

Contact sheets, QA screenshots, generated reports, backups, and migration copies are local artifacts and should remain untracked.

Cloudinary cleanup must be report-first. Do not delete original Cloudinary assets, Drive masters, or local masters without explicit owner approval.
