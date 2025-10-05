"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Mail, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title?: string;
  link: string;
  text?: string;
  successMessage?: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

interface ShareOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  className?: string;
}

export function ShareButton({
  title = "Share",
  link,
  text = "",
  successMessage = "Link copied to clipboard!",
  className = "w-full",
  variant = "outline",
  size = "default"
}: ShareButtonProps) {
  const shareText = text ? `${text}\n\n${link}` : link;
  const encodedText = encodeURIComponent(shareText);
  const encodedLink = encodeURIComponent(link);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success(successMessage);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success(successMessage);
    }
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppShare = () => {
    handleOpenUrl(`https://wa.me/?text=${encodedText}`);
  };

  const handleTelegramShare = () => {
    handleOpenUrl(
      `https://t.me/share/url?url=${encodedLink}&text=${encodeURIComponent(
        text
      )}`
    );
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title || "Check this out!");
    const body = encodeURIComponent(
      `Hi,\n\nI wanted to share this with you: ${text}\n\n${link}\n\nBest regards`
    );
    handleOpenUrl(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareOptions: ShareOption[] = [
    {
      id: "whatsapp",
      label: "Share on WhatsApp",
      icon: <MessageCircle className="w-4 h-4 text-green-600" />,
      action: handleWhatsAppShare
    },
    {
      id: "telegram",
      label: "Share on Telegram",
      icon: <Send className="w-4 h-4 text-blue-500" />,
      action: handleTelegramShare
    },
    {
      id: "email",
      label: "Share via Email",
      icon: <Mail className="w-4 h-4 text-gray-600" />,
      action: handleEmailShare
    },
    {
      id: "copy",
      label: "Copy to Clipboard",
      icon: <Copy className="w-4 h-4 text-gray-600" />,
      action: handleCopyToClipboard
    }
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          {title}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto max-w-[400px] max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Share the link</DrawerTitle>
          <DrawerDescription>
            Choose how you'd like to share this content
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-2">
          {shareOptions.map(option => (
            <div key={option.id}>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={option.action}
              >
                <span className="mr-3">{option.icon}</span>
                {option.label}
              </Button>
            </div>
          ))}
        </div>

        <div className="px-4">
          <Separator />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
