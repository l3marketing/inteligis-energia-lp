import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open(
      "https://wa.me/5519999999999?text=Olá! Gostaria de saber mais sobre economia de energia no Mercado Livre.",
      "_blank"
    );
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-secondary hover:bg-secondary/90 shadow-2xl hover:shadow-xl transition-all hover:scale-110 p-0"
      aria-label="Chat no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </Button>
  );
};

export default FloatingWhatsApp;
