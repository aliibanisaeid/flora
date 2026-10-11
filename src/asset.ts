/** Public assets must work both locally and under a GitHub Pages project path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
