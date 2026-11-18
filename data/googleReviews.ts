// Verified in the rendered Google Maps panels for KT Photography DAMAN, 2026-11-07.
// Preserve the original spelling, punctuation, capitalization, and line breaks.
// Do not infer wedding/gallery associations from reviewer names.
export const googleReviews = [
  {
    id: "chetali-sharma",
    reviewer: "Chetali Sharma",
    quote: "A photographer is the one who either makes or. Teaks your wedding day. And I literally thank my stars that I met KT bhaiya and his team at the right time. He has made my wedding day soooooo memorable I have no words. His team has captured every emotion so beautifully that even now when I look back to any photo or video my heart just straightaway goes to that emotion. Thankyou so much KT bhaiya and team:)",
    source: "https://maps.app.goo.gl/6zVHw9EQu3UG9eSj9"
  },
  {
    id: "abhishek-sharma",
    reviewer: "Abhishek Sharma",
    quote: "One of the most professional photographer that I have come across. Brilliant team to support him as well. Has a likeable and sincere nature that makes everyone comfortable around him. Keep shining !",
    source: "https://maps.app.goo.gl/awJZxwDt9nkhXTNo6"
  },
  {
    id: "jainam-gala",
    reviewer: "Jainam Gala",
    quote: "Best Photography Skilss and Managment In Valsad District Nd His Work Just awsome Kt Photography .\nHe Works with Cool mind and Coordinate Party As per There situations .\nWe Love Your work Kt Bhai. ❤",
    source: "https://maps.app.goo.gl/CdSVS2mt5eCdqhPN8"
  }
] as const;
export type GoogleReview = (typeof googleReviews)[number];
