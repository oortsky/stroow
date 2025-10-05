"use client";

import { QRCodeSVG } from "qrcode.react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function QRCode(value) {
  return (
    <AspectRatio ratio={1 / 1}>
      <QRCodeSVG
        className="h-full w-full rounded-lg object-cover border"
        value={value}
        marginSize={1}
        title="Troow - QR Code"
      />
    </AspectRatio>
  );
}
