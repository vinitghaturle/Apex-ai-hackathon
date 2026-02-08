export default function JsonLd() {
    const eventData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "APEX-AI: The AI Hackathon",
        "description": "Nagpur's ultimate 10-hour AI innovation challenge. Hosted at G.H. Raisoni College of Engineering and powered by GDGOC GHRCE, SRC, and IEEE CS.",
        "startDate": "2026-02-18T08:00:00+05:30",
        "endDate": "2026-02-18T18:00:00+05:30",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": "G.H. Raisoni College of Engineering",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Hingna Road",
                "addressLocality": "Nagpur",
                "addressRegion": "Maharashtra",
                "postalCode": "440016",
                "addressCountry": "IN"
            }
        },
        "organizer": [
            {
                "@type": "Organization",
                "name": "GDGOC GHRCE",
                "url": "https://gdgocghrce.in"
            },
            {
                "@type": "Organization",
                "name": "IEEE CS Student Branch GHRCE"
            },
            {
                "@type": "Organization",
                "name": "Technorian - Student Research Council GHRCE"
            }
        ],
        "image": "https://apex-assets-exl.pages.dev/image/LOGO.svg",
        "offers": {
            "@type": "Offer",
            "url": "https://apexai.gdgocghrce.in",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01T00:00:00+05:30"
        },
        "performer": {
            "@type": "Organization",
            "name": "APEX-AI Organizing Committee"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
        />
    )
}
