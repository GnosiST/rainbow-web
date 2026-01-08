"use client";

import { useState, useEffect } from "react";
import { MobileThemeConfig } from "@/lib/mobile-theme-config";

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

interface MobilePhotosPageProps {
  config: MobileThemeConfig;
}

export function MobilePhotosPage({ config }: MobilePhotosPageProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetch("/data/photos.json")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.photos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBuy = (photo: Photo) => {
    if (photo.shopUrl) {
      window.open(photo.shopUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: config.page.bg }}
      >
        <div style={{ color: config.page.secondaryTextColor }}>加载中...</div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-auto p-4"
      style={{ background: config.page.bg }}
    >
      {/* 网格 */}
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="text-left overflow-hidden transition-transform active:scale-[0.98]"
            style={{
              background: config.page.cardBg,
              borderRadius: config.page.cardRadius,
            }}
          >
            <div
              className="aspect-square bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${photo.thumbnail || photo.image})`,
                backgroundColor: config.page.bg,
              }}
            >
              {!photo.available && (
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-red-500/80 rounded text-[10px] text-white">
                  已售
                </div>
              )}
            </div>
            <div className="p-2">
              <h3
                className="text-sm font-medium truncate"
                style={{ color: config.page.textColor }}
              >
                {photo.title}
              </h3>
              <p
                className="text-xs"
                style={{ color: config.page.secondaryTextColor }}
              >
                {photo.price}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* 详情弹窗 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-h-[80%] overflow-auto"
            style={{
              background: config.page.cardBg,
              borderRadius: `${config.page.cardRadius} ${config.page.cardRadius} 0 0`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 图片 */}
            <div
              className="w-full aspect-video bg-cover bg-center"
              style={{
                backgroundImage: `url(${selectedPhoto.image})`,
                backgroundColor: config.page.bg,
              }}
            />
            {/* 信息 */}
            <div className="p-4">
              <h2
                className="font-bold text-lg mb-2"
                style={{ color: config.page.textColor }}
              >
                {selectedPhoto.title}
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <span style={{ color: config.page.secondaryTextColor }}>
                    年份
                  </span>
                  <p style={{ color: config.page.textColor }}>
                    {selectedPhoto.year}
                  </p>
                </div>
                <div>
                  <span style={{ color: config.page.secondaryTextColor }}>
                    尺寸
                  </span>
                  <p style={{ color: config.page.textColor }}>
                    {selectedPhoto.dimensions}
                  </p>
                </div>
                <div>
                  <span style={{ color: config.page.secondaryTextColor }}>
                    材质
                  </span>
                  <p style={{ color: config.page.textColor }}>
                    {selectedPhoto.medium}
                  </p>
                </div>
                <div>
                  <span style={{ color: config.page.secondaryTextColor }}>
                    价格
                  </span>
                  <p style={{ color: config.page.textColor }}>
                    {selectedPhoto.price}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBuy(selectedPhoto)}
                  disabled={!selectedPhoto.available || !selectedPhoto.shopUrl}
                  className="flex-1 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background:
                      selectedPhoto.available && selectedPhoto.shopUrl
                        ? config.navigation.activeColor
                        : config.page.bg,
                    color:
                      selectedPhoto.available && selectedPhoto.shopUrl
                        ? "#FFF"
                        : config.page.secondaryTextColor,
                  }}
                >
                  {!selectedPhoto.available
                    ? "已售罄"
                    : selectedPhoto.shopUrl
                    ? "购买"
                    : "暂不可购买"}
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-3 rounded-lg text-sm transition-colors"
                  style={{
                    background: config.page.bg,
                    color: config.page.textColor,
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
