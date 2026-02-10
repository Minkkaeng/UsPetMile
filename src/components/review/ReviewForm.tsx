import { useState } from "react";

interface ReviewData {
  rating: number;
  content: string;
  images: File[];
}

export default function ReviewForm({ title, onSubmit }: { title: string; onSubmit: (data: ReviewData) => void }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, content, images });
    setContent("");
    setImages([]);
    setRating(5);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="bg-[#111] p-6 rounded-xl border border-[#333] shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">리뷰 작성하기</h3>
      <p className="text-sm text-gray-400 mb-6">{title}에서의 경험을 공유해주세요!</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">별점</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform hover:scale-110 ${
                  star <= rating ? "text-yellow-400" : "text-gray-600"
                }`}
              >
                <i className={star <= rating ? "ph-fill ph-star" : "ph ph-star"}></i>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">내용</label>
          <textarea
            className="w-full bg-[#222] border border-[#333] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors h-32 resize-none"
            placeholder="솔직한 후기를 남겨주세요. (최소 10자 이상)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">사진 첨부 (선택)</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-[#222] border border-[#333] hover:border-gray-500 text-gray-400 rounded-lg w-24 h-24 flex flex-col items-center justify-center transition-colors">
              <i className="ph ph-camera text-2xl mb-1"></i>
              <span className="text-xs">사진 추가</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {/* Image Preview */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#333]">
                  <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                  >
                    <i className="ph ph-x"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
