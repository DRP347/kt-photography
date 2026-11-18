import type { GoogleReview } from "@/data/googleReviews";

export function ClientReview({ review, className = "" }: { review: GoogleReview; className?: string }) {
  return <figure className={`client-review ${className}`} id={review.id}>
    <blockquote cite={review.source}><p>{review.quote}</p></blockquote>
    <figcaption>
      <span className="client-review__name">{review.reviewer}</span>
      <a className="text-link" href={review.source} target="_blank" rel="noopener noreferrer" aria-label={`Read ${review.reviewer}'s original review on Google (opens in a new tab)`}>Read on Google</a>
    </figcaption>
  </figure>;
}
