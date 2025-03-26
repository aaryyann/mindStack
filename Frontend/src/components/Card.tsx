import axios from "axios";
import { motion } from "framer-motion";
import { Share2, Twitter, Youtube, FileText, Trash2, Link2, Instagram } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "link" | "instagram";
  description: string
  refreshContent : ()=> void
}

const Card = ({ link, title, type, description , refreshContent }: CardProps) => {

  const handleDelete = async () => {
    try {
      await axios.request(
        {
          method: "DELETE",
          url: "http://localhost:3000/api/v1/content",
          data: {title: title },
          withCredentials: true
        }
        
      );


      toast.success("Content deleted")
      refreshContent()

    }catch(e){
      toast.error("Content not deletd")
      console.log("Something wrong" , e)
    }
  }

  useEffect(() => {
    if (type === "instagram") {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type, link]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {type === "twitter" && <Twitter className="text-blue-400" />}
          {type === "youtube" && <Youtube className="text-red-500" />}
          {type === "document" && <FileText className="text-gray-600" />}
          {type === "link" && <Link2 className="text-gray-600" />}
          {type === "instagram" && <Instagram className="text-gray-600" />}
          <h3 className="font-semibold text-lg text-gray-800">{type.toUpperCase()} POST</h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handleDelete} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Trash2 className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>

      <div className="font-bold text-lg">
        {title}
      </div>

      <div className="rounded-lg overflow-hidden bg-gray-100">
        {type === "youtube" && (
          <iframe
            className="w-full rounded-lg"
            height="200"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace('x.com', 'twitter.com')}></a>
          </blockquote>
        )}

        {type === "instagram" && (
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={link}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: "0",
              borderRadius: "3px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "326px",
              padding: "0",
              width: "99.375%"
            }}
          />
        )}

        {type === "link" && (
          <div className="pl-2 pr-6 py-3 text-sm">
            {link}
          </div>
        )}
      </div>

      <div>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Card;