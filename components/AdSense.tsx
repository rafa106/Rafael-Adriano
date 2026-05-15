
import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adClient?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle';
  fullWidthResponsive?: boolean;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  adSlot, 
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX', // Placeholder ID
  adFormat = 'auto', 
  fullWidthResponsive = true,
  className = ""
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`adsense-container my-10 overflow-hidden flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdSense;
