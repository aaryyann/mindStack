import axios from "axios";
import { Captions, Link2, Scan } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";





interface ContentModalProps {
  open: boolean,
  onClose: () => void
  refreshContent: () => void
}
export const CreateContentModal = ({ open, onClose, refreshContent }: ContentModalProps) => {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [contentType, setContentType] = useState("none")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    setLoading(true)

    try {
      if (title == '' || link == '' || description == '' || contentType == "none") {
        toast.error("Please fill all feilds")
        setLoading(false)
        return
      }
      await axios.post(`/api/v1/content`, {
        title: title,
        link: link,
        type: contentType,
        description: description
      }, {
        withCredentials: true
      })



      toast.success("Content added Successfully")
      onClose()
      refreshContent()

    } catch (e) {
      console.log(e)
      toast.error("Please add content again")
    } finally {
      setLoading(false)
      setTitle('');
      setLink('');
      setDescription('');
      setContentType('none');

    }


  }
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 w-full max-w-md relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">×</button>
            <h2 className="text-2xl text-white font-bold mb-6 text-center">Add Content</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields... */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Enter Title
                </label>
                <div className="relative">
                  <Captions className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter title"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Link
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Type of Content
                </label>
                <div className="relative">
                  <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full text-gray-400 bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="none">None</option>
                    <option value="document">Document</option>
                    <option value="youtube">Youtube</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="link">Link</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    value={description}
                    rows={5}
                    style={{ resize: "none" }}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-2 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Description"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Adding Contetnt ...." : "Add Content"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};


