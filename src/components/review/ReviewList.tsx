import { useState } from "react";
import type { Review } from "../../types/review";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-[#111] rounded-xl border border-[#333]">
        <i className="ph ph-chat-teardrop-text text-4xl mb-2"></i>
        <p>아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨주세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-[#111] p-6 rounded-xl border border-[#333] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {review.userName.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{review.userName}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{review.visitDate ? `${review.visitDate} 방문` : "방문일 미기재"}</span>
                </div>
              </div>
            </div>
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={i < review.rating ? "ph-fill ph-star" : "ph ph-star text-gray-600"}></i>
              ))}
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-line">{review.content}</p>

          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Review ${idx}`}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-[#333]"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 border-t border-[#222] pt-4">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <i className="ph ph-thumbs-up"></i> 도움이 돼요 ({review.likes || 0})
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <i className="ph ph-warning-circle"></i> 신고하기
            </button>
          </div>
        </div>
      ))}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Full size" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <i className="ph ph-x"></i>
          </button>
        </div>
      )}
    </div>
  );
}
