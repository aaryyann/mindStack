import { motion } from "framer-motion";
import favicon from "../assets/favicon.ico"
import { Share2, Plus} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CreateContentModal } from "./CreateContentModal";
import Card from "./Card";
import { Sidebar } from "./SideBar";
import {useContent} from "./customHooks/useContent";




export const Dashboard = () => {
  const [modalOpen , setModalOpen] = useState(false)
  const {data , refreshContent , error , isLoading} =  useContent()
  console.log("h")
  useEffect(() => {
    refreshContent()
    console.log("E")
    
  } ,[refreshContent])

  //   try {
  //     const response = await axios.post("http://localhost:3000/api/v1/brain/share", 
  //       { share: true },
  //       {
  //         withCredentials: true // This enables sending cookies with the request
  //       }
  //     );
      
  //     if (response.data.hash) {
  //       // You could show this in a modal or copy to clipboard
  //       alert(`Your share link: ${response.data.hash}`);
  //     }
  //   } catch (err) {
  //     console.error("Failed to generate share link:", err);
  //   }
  // };

  return (
    <>
      <CreateContentModal
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        refreshContent = {refreshContent}
      />
      <div className="min-h-screen bg-gray-900">
        <nav className="shadow-sm fixed w-full bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img src={favicon} width="50" height="50"/>
                <span className="ml-2 text-md md:text-xl font-bold text-white">MindStack</span>
              </div>
              <div className="hidden md:inline-flex  items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    startIcon={<Share2 size={20} />}
                    variant="secondary"
                    size="md"
                    onClick={() => { }}
                    text="Share Brain"
                    className="text-gray-700 hover:bg-gray-100"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    startIcon={<Plus size={20} />}
                    variant="primary"
                    size="md"
                    onClick={() => setModalOpen(true)}
                    text="Add Content"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  />
                </motion.div>
              </div>
              <div className="display md:hidden flex items-center gap-1">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    startIcon={<Share2 size={20} />}
                    variant="secondary"
                    size="md"
                    onClick={() => { }}
                    text="Share"
                    className="text-gray-700 hover:bg-gray-100"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    startIcon={<Plus size={20} />}
                    variant="primary"
                    size="md"
                    onClick={() => setModalOpen(true)}
                    text="Add"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </nav>

        <div className="md:flex">
          <div className="hidden lg:block mt-16 fixed">
            <Sidebar />
          </div>

          <main className="max-w-7xl mx-auto lg:ml-[15%] px-4 sm:px-6 lg:px-8 py-24">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            ) : !data ? (
              <div className="text-center text-gray-600 p-4">
                No content found. Click "Add Content" to get started!
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {data.map(({title , link , type , description} ) => (
                  <Card
                    title={title}
                    type={type}
                    link={link}
                    description={description}
                    refreshContent={refreshContent}
                  />
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};