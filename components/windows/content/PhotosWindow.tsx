"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Photo {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  medium: string;
  image: string;
  thumbnail: string;
  shopUrl: string | null;
  price: string;
  available: boolean;
}

export function PhotosWindow() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // 加载 photos 数据
  useEffect(() => {
    fetch("/data/photos.json")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.photos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 打开购买链接
  const handleBuy = (photo: Photo) => {
    if (photo.shopUrl) {
      window.open(photo.shopUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">加载中...</div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50">暂无作品</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* 网格列表 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* 图片 */}
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${photo.thumbnail || photo.image})`,
                    backgroundColor: "#2a2a3e",
                  }}
                />
                {/* 悬浮遮罩 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    查看详情
                  </span>
                </div>
                {/* 售罄标记 */}
                {!photo.available && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-500/80 rounded text-xs text-white">
                    已售
                  </div>
                )}
              </div>
              {/* 信息 */}
              <div className="mt-2">
                <h3 className="text-white/90 text-sm font-medium truncate">{photo.title}</h3>
                <p className="text-white/50 text-xs">{photo.year} · {photo.dimensions}</p>
                <p className="text-white/70 text-sm mt-1">{photo.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedPhoto && (
        <div 
          className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-10"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90%] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 大图 */}
            <div 
              className="aspect-video bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${selectedPhoto.image})`,
                backgroundColor: "#2a2a3e",
              }}
            />
            {/* 详情 */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">{selectedPhoto.title}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-white/50">年份</span>
                  <p className="text-white/90">{selectedPhoto.year}</p>
                </div>
                <div>
                  <span className="text-white/50">尺寸</span>
                  <p className="text-white/90">{selectedPhoto.dimensions}</p>
                </div>
                <div>
                  <span className="text-white/50">材质</span>
                  <p className="text-white/90">{selectedPhoto.medium}</p>
                </div>
                <div>
                  <span className="text-white/50">价格</span>
                  <p className="text-white/90">{selectedPhoto.price}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBuy(selectedPhoto)}
                  disabled={!selectedPhoto.available || !selectedPhoto.shopUrl}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedPhoto.available && selectedPhoto.shopUrl
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {!selectedPhoto.available ? "已售罄" : selectedPhoto.shopUrl ? "购买" : "暂不可购买"}
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 text-sm transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
