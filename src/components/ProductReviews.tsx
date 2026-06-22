import { motion } from 'framer-motion'
import { useState } from 'react'

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
}

interface ProductReviewsProps {
  productId: number
}

const MOCK_REVIEWS: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-12-15',
      title: 'Perfect daily bag',
      comment: 'The quality is exceptional. The leather feels premium and the architectural design is stunning. Worth every penny.',
      verified: true,
    },
    {
      id: 2,
      author: 'Alex K.',
      rating: 5,
      date: '2024-12-10',
      title: 'Love it!',
      comment: 'Spacious and stylish. Gets compliments everywhere I go.',
      verified: true,
    },
  ],
  2: [
    {
      id: 3,
      author: 'Jordan T.',
      rating: 4,
      date: '2024-12-20',
      title: 'Great jacket, size up',
      comment: 'Amazing quality and unique design. I recommend sizing up for a more relaxed fit.',
      verified: true,
    },
  ],
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = MOCK_REVIEWS[productId] || []
  const [showAll, setShowAll] = useState(false)
  
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2)
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  if (reviews.length === 0) {
    return (
      <div className="border border-primary p-6 md:p-8">
        <h3 className="font-headline-md text-[20px] uppercase tracking-tighter mb-4">Reviews</h3>
        <p className="font-body-md text-body-md text-secondary">No reviews yet. Be the first to review this product.</p>
      </div>
    )
  }

  return (
    <div className="border border-primary p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary">
        <h3 className="font-headline-md text-[20px] uppercase tracking-tighter">Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-primary text-xl"
                style={{ fontVariationSettings: star <= Math.round(Number(averageRating)) ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="font-label-caps text-label-caps uppercase">
            {averageRating} ({reviews.length})
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="pb-6 border-b border-primary/30 last:border-0 last:pb-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-caps text-label-caps uppercase">{review.author}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span className="font-label-caps text-[9px] uppercase">Verified</span>
                    </span>
                  )}
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-body-md text-[11px] text-secondary">
                {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h4 className="font-label-caps text-label-caps uppercase mb-2">{review.title}</h4>
            <p className="font-body-md text-body-md text-secondary">{review.comment}</p>
          </motion.div>
        ))}
      </div>

      {reviews.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full border border-primary px-6 py-3 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors"
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  )
}
