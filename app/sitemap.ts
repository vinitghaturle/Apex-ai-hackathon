import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://apexai.gdgocghrce.in'
    const lastModified = new Date()

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/#about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/#tracks`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#schedule`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#team`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/#faq`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]
}
