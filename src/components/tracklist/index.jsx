import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { usePlaylist } from "../../lib/usePlaylist";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import ModalPlaylist from "../modal-create-playlist";
import MusicCard from "../music-card";
import toast from "react-hot-toast";
import { useUser } from "../../lib/useUser";
import { useTracklist } from "../../lib/useTracklist";
import { useDispatch } from "react-redux";
import { clearList, storeTracklist } from "../../store/tracklist";
import { getTopTracks } from "../../lib/spotify";
import { motion } from "framer-motion";
const MotionGrid = motion(SimpleGrid);

const Playlist = () => {
  const {
    selectedTrack,
    checkSelected,
    handleSelect,
    createPlaylist,
    isLoading,
  } = usePlaylist();

  const { isAuthenticated, accessToken, user } = useUser();
  const dispatch = useDispatch();
  const { tracklist } = useTracklist();
  const isEmpty = selectedTrack.length === 0;
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCreatePlaylist = (payload) => {
    isAuthenticated &&
      createPlaylist(accessToken, user.id, payload).then(() => {
        setModalOpen(false);
        toast.success("Successfully created!", {
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getTopTracks(accessToken).then((data) => {
        dispatch(storeTracklist(data.items));
      });
    }
    return () => {
      dispatch(clearList());
    };
  }, [dispatch, isAuthenticated, accessToken]);
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };
  return (
    <>
      {tracklist.length > 0 && (
        <MotionGrid
          columns={[1, 1, 2]}
          spacing={2}
          variants={containerVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {tracklist.map((music) => (
            <MusicCard
              data={music}
              handleSelect={handleSelect}
              isSelected={checkSelected(music.uri)}
            />
          ))}
        </MotionGrid>
      )}
      <ModalPlaylist
        isLoading={isLoading}
        createPlaylist={handleCreatePlaylist}
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      {isAuthenticated && !isEmpty && (
        <Box pos="fixed" bottom={18} right={18}>
          <Button
            leftIcon={<FaPlusCircle />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create playlist
          </Button>
        </Box>
      )}
    </>
  );
};

export default Playlist;
